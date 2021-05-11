import React,{ useEffect, useState } from 'react';

const UrlTest = (props) => {
    const urlParams = props.match.url.split('/');
    const [isTrue, setIsTrue] = useState(urlParams[2] && urlParams[2] === 'Y' ? true : false);
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