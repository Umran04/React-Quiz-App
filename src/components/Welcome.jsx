import React from "react";

export default function Welcome(props){



    function start(){
        props.startQuiz()
    }

    return(
       <>
        
        <main className={`welcome--main ${props.isSliding ? "animate__animated animate__slideOutUp" : ""}`}>
        <h1 className="heading">Quizzical</h1>
        <p className="description"> Welcome to Quizzical Press 'Start Quiz' when you are ready </p>
        <button onClick={start} className="start--btn">Start Quiz</button>
        </main>
       
       </>
    )
}