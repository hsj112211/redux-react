/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React,{ useEffect, useState } from 'react';

/**
 * 현재 url의 querystring을 가져와서 페이지 띄워보기
 */
const UrlTest = (props) => {
    const urlParams = props.match.url.split('/');
    const [isTrue, setIsTrue] = useState(!!(urlParams[2] && urlParams[2] === 'Y'));
    const isTrueBtn = () => {
        setIsTrue(!isTrue);
    }
    useEffect(() => {
        const textBoolean = isTrue === true ? 'Y' : 'N'
        props.history.push(`/urltest/${textBoolean}`)
    },[isTrue])
    return (
        <div>
            <div>
                <button onClick={() => isTrueBtn()}>isTrue</button>
            </div>
            <div>
                {
                    isTrue === true ?
                    <div> True 입니다. </div> :
                    <div> False 입니다. </div>
                }
            </div>
            <hr />
        </div>
    )
}

export default UrlTest;