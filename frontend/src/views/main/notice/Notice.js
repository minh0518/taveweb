import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Notice = () => {

    const [value,setValue]=useState([]) //공지

    useEffect(function(){
        Notices()
    },[])

    let skip=0;
    let limit=3;

    async function Notices(){
        const response=await axios.get("api/notices",{params:{skip,limit}})
        setValue(response.data.notices);
    }


    return (
        <div>
            <h2>Notices</h2>
           
            {value.map((notice)=>(
                <div>
                    <ul>
                        <li key={notice.id}><Link to={`/notice/${notice.id}`}><p>{notice.title}</p></Link></li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Notice;
