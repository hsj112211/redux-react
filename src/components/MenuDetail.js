import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getMenu, deleteMenu,deleteMenuImage, updateMenu, storeInit } from '../redux/action/menu'


const MenuDetail = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const menu = useSelector(state => state.menu.menu);

    const user = useSelector(state => state.user);

    const fileInput = useRef();

    // 페이지 첫 진입시 Menu 요청
    useEffect(() => {
        const id = props.match.url.split('/')[2];
        dispatch(getMenu(id));
        dispatch(storeInit());
    },[])

    // Menu값을 받아오면 state에 값 저장 ( store에 값이 저장되어있지만 업데이트시 데이터가 변하므로 생성 )
    const [copyMenu, setCopyMenu] = useState({})
    useEffect(() => {
        if(menu.id){
            setCopyMenu({
                ...menu
            })
        }
    },[menu])

    // 메뉴 삭제 요청
    const isSuccess = useSelector(state => state.menu.isSuccess);
    const isDelete = useSelector(state => state.menu.isDelete);
    const isImageDeleteSuccess = useSelector(state => state.menu.isImageDeleteSuccess);

    const deleteMenuBtn = (params) => {
        dispatch(deleteMenu(params.dataId))
            if(params.imageId){
                dispatch(deleteMenuImage(params.imageId))
            }
    }

    // 메뉴 삭제 또는 수정 성공하면 이전 페이지 이동
    useEffect(() => {
        if(isSuccess && isDelete && isImageDeleteSuccess){
            history.goBack(-1);
        }
    },[isSuccess,isDelete,isImageDeleteSuccess])

     // 인풋 데이터 핸들러
     const updateHandler = (e) => {
        setCopyMenu({
            ...copyMenu,
            [e.target.name]: e.target.value
        })
    }

    // 수정버튼 클릭 여부에 따라 input 활성화 설정
    const [isUpdate, setIsUpdate] = useState(false);
    const updateMenuBtn = () => {
        setIsUpdate(!isUpdate);
        if(isUpdate){
            console.log(copyMenu)
            const formData = new FormData();
            const fieldParam = {
                menu_name: copyMenu.menu_name,
                price: copyMenu.price
            }
            formData.append('files.image_url', copyMenu.image_url, copyMenu.image_url.name)
            formData.append('data',JSON.stringify(fieldParam))
            const updateParam = {
                id: copyMenu.id,
                formData
            }
            // 아 부분에서 먼저 이미지삭제 디스패치 호출
            dispatch(updateMenu(updateParam));
        }
    }

    const inputFileChangeHandler = (e) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setCopyMenu({
                ...copyMenu,
                image_url: e.target.files[0],
                preview_img_url: fileReader.result
            })
        }
        fileReader.readAsDataURL(e.target.files[0])
    };


    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>메뉴명</th>
                        <th>가격</th>
                        <th>그림</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        copyMenu.id ? (
                        <tr>
                            <td>
                                <input name="menu_name" value={copyMenu.menu_name} disabled={!isUpdate} onChange={e => updateHandler(e)} />
                            </td>
                            <td>
                                <input name="price" value={copyMenu.price} disabled={!isUpdate} onChange={e => updateHandler(e)} />
                            </td>
                            <td>
                                {
                                    !isUpdate && copyMenu.image_url ?
                                    <img src={ `http://localhost:1337${copyMenu.image_url[0].url}` } alt=""/> : null
                                }
                                {
                                    copyMenu.preview_img_url ?
                                    <img src={copyMenu.preview_img_url} />: null
                                }
                                {
                                    isUpdate ?
                                    <input type="file" name="image_url" ref={fileInput} onChange={(e) => inputFileChangeHandler(e)}/> : null
                                }
                            </td>
                            <td>
                                <button onClick={() => updateMenuBtn()}>
                                    { isUpdate ?  "수정완료" : "수정" }
                                </button>
                                <button onClick={() => {
                                    const deleteParams = {
                                        dataId: copyMenu.id,
                                        imageId: copyMenu.image_url ? copyMenu.image_url[0].id : null
                                    }
                                    return deleteMenuBtn(deleteParams)
                                }}>삭제</button>
                            </td>
                        </tr>
                        ) : null
                    }
                </tbody>
            </Table>
        </div>
    )
}


export default MenuDetail;