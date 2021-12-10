import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';

const QnA = () => {
    const [value, setValue] = useState([]);

    useEffect(function(){
        test()
    },[])

    async function test(){
        const response=await axios.get("/api/questions")
        setValue(response.data.questions)
    }

    return (
        <div>
        <p>FAQ</p>
        {value.map((question) => (
            <div>
                <div>{question.id}</div>
                <div>{question.title}</div>
                <div>{question.createdAt}</div>
                <div>{question.updatedAt}</div>
            </div>
        ))}
    </div>
    );
};


export default QnA;