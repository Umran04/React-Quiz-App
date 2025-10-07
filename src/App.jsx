import React from "react"
import { useState } from "react"
import "animate.css"
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"
import Green from "./images/green.png"
import Orange from "./images/orange.png"

export default function App(){
  
  const [loadQuiz,setLoadQuiz] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
  

  function startQuiz(){
    setIsSliding(true)
    setTimeout(() => setLoadQuiz(true), 1000)
   }
  

  return(
    <>
      {!loadQuiz && <Welcome isSliding={isSliding} startQuiz={startQuiz}/>}
      {loadQuiz && <Quiz />}

      <img className="green--img" src={Green}/>
      <img className="orange--img" src={Orange}/>
    </>
  )
}