import React from "react"
import { useState,useEffect } from "react"
import { nanoid } from "nanoid"

export default function Quiz(){

    const [questions,setQuestions] = useState([])
    const [answers,setAnswers] = useState([])
    setAnswers

   

    useEffect(() => {
        async function fetchQuestions() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');
            const data = await res.json();
            setQuestions(data.results); 
            
        }
    
        fetchQuestions(); 
    }, []);


    console.log(questions)

    const questionEl = questions.map(q => {
        const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(()=> Math.random() - 0.5);
        
        return(
        <React.Fragment key={nanoid()}>
            <main className="question--answer--component">
                <h4>{q.question}</h4>
                    <div className="btn-container">{allAnswers.map(answer => <button className="answer--btn" key={nanoid()}>{answer}</button>)}</div>
                <hr></hr>
            </main>
        </React.Fragment>
        )
    })

   
    
   

   
    
    
    return(
        <>
        <main className="question--component--main">
            {/* ADD QUESTIONS */}
            {/* ADD ANSWERS */}
            {/* ADD LINE BREAK? */}

            {questionEl}
            {/*<button>Check Answers</button>*/}
            
            
            
        </main>
        </>
    )
}