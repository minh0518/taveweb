import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';

const QnA = () => {
    
    useEffect(function(){
        axios.get("/api/questions").then((result)=>{
            console.log(result.data)
        })
    },[])
    return (
        <div>
            <p>QnA 목록</p>
        
            
        </div>
    );
};


function List(){
    
}

export default QnA;
