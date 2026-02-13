import { languages } from "../data"
import {getFarewellText} from "../utils"
import clsx from "clsx"
export default function GameStatus(props){
    const statusClass=clsx({
        default:true,
        won:props.isGameWon,
        lost:props.isGameLost,
    })
    const conditionalRendering=props.isGameOver?(props.isGameWon?(
        <p className={statusClass}>
            <span>You win!</span>
            Well done! 🎉
        </p>
    ):(
        <p className={statusClass}>
            <span>Game over!</span>
            You lose! Better start learning Assembly 😭:
        </p>
    )):(props.lastGuessed?(
        <p className="farewell">
            {getFarewellText(languages[props.wrongGuessCount - 1].name)}
        </p>
    ):(null))
    
    return (
        <div aria-live="polite" role="status" className="status-container">
            {conditionalRendering}
        </div>
    )
}
