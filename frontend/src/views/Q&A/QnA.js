import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';

const QnA = () => {
    const [value, setValue] = useState([]);//질문들

    const [value2, setValue2] = useState([]);//답변들

    useEffect(function(){
        Questions()
    },[])

    useEffect(function(){
        Answers()
    },[])

    async function Questions(){
        const response=await axios.get("/api/questions")
        setValue(response.data.questions)
    }
    
    async function Answers(){
        const response=await axios.get("/api/answers")
        setValue2(response.data.answers)
    }

    
    return (
        <div>
        <p>QnA</p>
    

        {value.map((question) => ( // 질문들을 보여줌
        <div>
        <Link to={question.id}><p>{question.title}</p></Link> 
        </div> 
        ))}

        {value.map((question) => (   //클릭하면 해당 question_id에 대한 답변 
        <div>
        <Routes>
            <Route exact path={question.id}><DisplayAnswers answers={value2} questionId={question.id}></DisplayAnswers>
            </Route>
        </Routes> 
        </div>

        ))}
        
    </div>
    );
};


const DisplayAnswers=function({answers,questionId}){
    
    const searchedAnswers=answers.filter(function(answer){
        return (answer.question_id)==questionId
    })


    searchedAnswers.map(function(answer){
         return(
            <div>{answer.content}</div>
            )
        
        
    })

    
}


export default QnA;