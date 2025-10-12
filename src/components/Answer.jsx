
import clsx from "clsx"


export default function Answer(props){
    return(
        <>
            <button
             className={clsx("answer--btn",{isHeld : props.isHeld, isWrong : props.isWrong, isCorrect : props.isCorrect, isSelected : props.isHeld})} onClick={props.onClick}
             disabled={props.shouldDisable} >
                {props.answer}
            </button>
        </>
    )
}

//className={clsx("answer--btn",{isHeld : props.isHeld, isWrong : (props.isWrong), isCorrect : (props.isCorrect)})} 
//the SELECTED answe still show the green, so if user selects an answe and it is correct then it stays green and is the only coloured button for that question
//if the answer SELECTED is wrong, it still shows the same design as the correct answer but there  will be another button that will be in a red colour indicating
//to the user that thier selected answer was wrong