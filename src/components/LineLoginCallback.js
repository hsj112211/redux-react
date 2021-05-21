import React, { useEffect } from 'react';
import qs from 'query-string'
import { lineLoginAuth } from '../redux/action/user';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


const LineLoginCallback = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
    const query = qs.parse(props.location.search);
    const params = {
        id_token: query.id_token,
        access_token: query.access_token
    }
        dispatch(lineLoginAuth(params))
    },[])

    const user = useSelector(state => state.user)
    if(user.isAuth) {
        sessionStorage.setItem("auth", user.jwt);
        return <Redirect to="/" />
    } else {
        return <div> 지금은 로딩중 .....</div>
    }
}

export default LineLoginCallback;