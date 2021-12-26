import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Notice = () => {

    const [value,setValue]=useState([]) //공지

    useEffect(function(){
        Notices()
    },[])

    async function Notices(){
        const response=await axios.get("api/notices")
        setValue(response.data.notices);
    }


    return (
        <div>
            <h2>Notices</h2>
           
        </div>
    );
};

export default Notice;
