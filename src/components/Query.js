import React, { useEffect, useState } from 'react';

const Query = () => {

    const [qs, setQs] = useState({
        ca: "defaultCa",
        co: "defaultCo",
        ci: "defaultCi"
    })


    const changeQuery = () => {
        setQs({
            ca: "Engineer",
            co: "Korea",
            ci: "Seoul"
        })
    }

    useEffect(() => {

    },[qs.ca, qs.co, qs.ci])

    const makeQuery = (queryParam) => {
        let linkUrl = "/jobs?";
       Object.keys(qs).forEach(key => {
           console.log(key + ": " + qs[key])
           if(qs[key].includes("default")){
               console.log(qs[key] + "쿼리생성 안함")
           } else {
               linkUrl += key + "=" + qs[key] + "&"
           }
       })
       if(linkUrl.charAt(linkUrl.length -1) === "&"){
           linkUrl = linkUrl.slice(0,-1);
       }
       console.log(linkUrl)
    }


    return (
        <div>
            <button onClick={() => changeQuery()}>쿼리변경</button>
            <button onClick={() => makeQuery()}>
                쿼리생성
            </button>
        </div>
    )
}

export default Query;