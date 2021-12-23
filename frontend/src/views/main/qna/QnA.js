import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QnA = () => {
    const [value, setValue] = useState([]);//질문들


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
    

        {value.map((question) => ( // 질문들을 보여줌
        <div>
        <ul>
            <li key={question.id}><Link to={`/qna/${question.id}`}><p>{question.title}</p></Link> </li>
        </ul>
        </div> 
        ))}

        {/* <Routes>
            <Route path="/QnA/:questionID" element={<DisplayAnswers/>}/>
        </Routes>  */}

        
        
    </div>
    );
};  


// const DisplayAnswers=function(){
//     let params=useParams();
//    console.log(params);
//    console.log(params.questionID);
//    console.log(params);

    
//     const [value, setValue] = useState([]);//답변들

//     useEffect(function(){
//         Answers()
//     },[])
       
//     async function Answers(){
//         const response=await axios.get("/api/answers")
//         setValue(response.data.answers)
//     }


//     let selected_answer={
//         content : "답변을 찾을 수가 없습니다"
//     }
//     for(let i=0; i<value.length; i++){
//         if(value[i].question_id===Number(params.questionID)){
//             selected_answer.content=value[i].content
//             break;
//         }
//     }

//     return(
//     <div>
//       <p>{selected_answer.content}</p>
      
//     </div>
//     )
// }


export default QnA;