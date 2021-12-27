import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';


const Notices=function(){
    let getID=useParams()

    console.log(getID)
    console.log(getID.noticeID)

    const [notice,setNotice]=useState([])

    useEffect(function(){
        notices()
    })

    let skip=0;
    let limit=3;


    async function notices(){
        const response=await axios.get("api/notices",{params:{skip,limit}})
        setNotice(response.data.notices)
    }

    let notice_content={
        content:"공지사항을 찾을 수 없습니다"
    }

    for(let i=0; i<notice.length; i++){
        if(notice[i].id==Number(getID.noticeID)){
            notice_content.content=notice[i].content
            break;
        }
    }

    return(
        <>
            <h2>공지사항 : </h2><p>{notice[getID.noticeID].title}</p>
            <h3>내용 : </h3><p>{notice_content}</p>
        </>
    )
}

export default Notices;
