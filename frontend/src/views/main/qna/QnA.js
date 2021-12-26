import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QnA = () => {
    const [value, setValue] = useState([]);//질문


    useEffect(function(){
        Questions()
    },[])


    async function Questions(){
        const response=await axios.get("/api/questions")
        setValue(response.data.questions)
    }
 

    
    return (
        <div>
        <p>QnA</p>
    

        {value.map((question) => ( //질문 title
        <div>
        <ul>
            <li key={question.id}><Link to={`/qna/${question.id}`}><p>{question.title}</p></Link> </li>
        </ul>
        </div> 
        ))}


        
    </div>
    );
};  



export default QnA;