import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setTestMessage, getMenus, storeInit } from '../redux/action/menu'

const Menu = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const testMessage = useSelector(state => state.menu.testMessage);
    const menuList = useSelector(state => state.menu.menuList);
    const isSuccess = useSelector(state => state.menu.isSuccess);

    useEffect(() => {
       dispatch(setTestMessage('메뉴를 선택해 주세요.'))
       dispatch(getMenus());
       if(isSuccess){
        dispatch(storeInit());
       }
    },[testMessage])

    const goDetail = (id) => {
        history.push(`/menu/${id}`)
    }
    const checkMenu = (e) => {
        console.log(e.target.value)
    }
    return (
        <div>
            <h2>
                안녕하세요 메뉴입니다. { testMessage }
            </h2 >
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>메뉴명</th>
                        <th>가격</th>
                        <th>그림</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menuList.length > 0 ?
                        menuList.map((item) => {
                            return (
                                <tr>
                                    <td>
                                        <span key={item.id} onClick={() => goDetail(item.id)}> { item.menu_name } </span>
                                        <input type="checkbox" value={item.id} onClick={(e) => checkMenu(e)}/>
                                    </td>
                                    <td>
                                        { item.price }
                                    </td>
                                    <td>
                                        {
                                            item.image_url ?
                                            <img src={`http://localhost:1337${item.image_url[0].url}`} alt=""/> : null
                                        }
                                    </td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </Table>
            <hr />
            <h2>선택한 메뉴</h2>
        </div>
    )
}

export default Menu;