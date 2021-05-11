import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getMenu, deleteMenu,deleteMenuImage, updateMenu, storeInit } from '../redux/action/menu'

const MenuDetail = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const menu = useSelector(state => state.menu.menu);

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

    const deleteMenuBtn = (id) => {
        // dispatch(deleteMenu(id))
        const deleteImageParams = {
            id,
            filename: menu.image_url.hash,
            ext: menu.image_url.ext
        }
        dispatch(deleteMenuImage(deleteImageParams))
    }

    // 메뉴 삭제 또는 수정 성공하면 이전 페이지 이동
    useEffect(() => {
        // 삭제버튼을 누르고 삭제 성공이면 이미지삭제 성공 체크 후 이전화면
        if(isSuccess && isDelete){
            if(isImageDeleteSuccess){
                history.goBack(-1);
            } else {
                alert(' Error ! ')
                return;
            }
        // 업데이트를 누르고 성공이면 이전화면
        } else if (isSuccess && !isDelete){
            history.goBack(-1);
        }
    },[isSuccess])

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
            dispatch(updateMenu(copyMenu));
        }
    }

   

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>메뉴명</th>
                        <th>가격</th>
                        <th>그림</th>
                        <th></th>
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
                            <td><img src={`http://localhost:1337${copyMenu.image_url.url}`} /></td>
                            <td>
                                <button onClick={() => updateMenuBtn()}>
                                    { !isUpdate ? "수정" : "수정완료" }
                                </button> 
                                <button onClick={() => deleteMenuBtn(copyMenu.id)}>삭제</button>
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