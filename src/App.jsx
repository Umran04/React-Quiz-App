import React from "react"
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"
import Green from "./images/green.png"
import Orange from "./images/orange.png"

export default function App(){
  return(
    <>
      <Welcome />
      {/* <Quiz /> */}

      <img className="green--img" src={Green}/>
      <img className="orange--img" src={Orange}/>
    </>
  )
}