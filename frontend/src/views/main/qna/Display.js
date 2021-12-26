import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QnA from './QnA'
import { Link , useParams} from 'react-router-dom';



const DisplayAnswers=function(){
    let params=useParams(); 
    console.log(params);
    console.log(params.questionID);

    const [question,setQuestion]=useState([]);//질문 content
    const [answer, setAnswer] = useState([]);//답변
    
    useEffect(function(){
        Questions()
    },[])

    
    useEffect(function(){
        Answers()
    },[])
       

    async function Questions(){
        const response=await axios.get("/api/questions")
        setQuestion(response.data.questions)
    }

    async function Answers(){
        const response=await axios.get("/api/answers")
        setAnswer(response.data.answers)
    }



    let question_content={
        content : "질문 내용을 찾을 수 없습니다"
    }

    let selected_answer={
        content : "답변을 찾을 수가 없습니다"
    }
    
    for(let i=0; i<question.length; i++){
        if(question[i].id===Number(params.questionID)){
            question_content.content=question[i].content
            break;
        }
    }

    for(let i=0; i<answer.length; i++){
        if(answer[i].question_id===Number(params.questionID)){
            selected_answer.content=answer[i].content
            break;
        }
    }




    return(
    <div>
        <div><h3>질문내용</h3><p>{question_content.content}</p></div>
        <div><h3>답변</h3><p>{selected_answer.content}</p></div>
    </div>
    )
}


export default DisplayAnswers;