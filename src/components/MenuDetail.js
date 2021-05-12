/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
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
                                { copyMenu.image_url ?
                                    <img src={`http://localhost:1337${copyMenu.image_url.url}`} alt=""/> : null
                                }
                            </td>
                            <td>
                                <button onClick={() => updateMenuBtn()}>
                                    { !isUpdate ? "수정" : "수정완료" }
                                </button>
                                <button onClick={() => {
                                    const deleteParams = {
                                        dataId: copyMenu.id,
                                        imageId: copyMenu.image_url ? copyMenu.image_url.id : null
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