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
       dispatch(    getMenus());
       if(isSuccess){
        dispatch(storeInit());
       }
    },[testMessage])

    const goDetail = (id) => {
        history.push(`/menu/${id}`)
    }

    return (
        <div>
            <div>
                안녕하세요 메뉴입니다. { testMessage }
            </div>
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
                                <tr key={item.id} onClick={() => goDetail(item.id)}>
                                    <td>
                                        { item.menu_name }
                                    </td>
                                    <td>
                                        { item.price }
                                    </td>
                                    <td>
                                        {
                                            item.image_url ?
                                            <img src={`http://localhost:1337${item.image_url.url}`} alt=""/> : null
                                        }
                                    </td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </Table>

        </div>
    )
}

export default Menu;