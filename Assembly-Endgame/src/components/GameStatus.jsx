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
        <p className="
            max-w-352 w-full text-16 font-medium leading-none text-[#F9F4DA] p-8
            bg-[#7A5EA7] rounded-sm h-[3.6rem] flex justify-center items-center
            border border-[#323232] border-dashed">
            {getFarewellText(languages[props.wrongGuessCount - 1].name)}
        </p>
    ):(null))
    
    return (
        <div aria-live="polite" role="status" className="max-w-352 w-full h-82 flex items-center">
            {conditionalRendering}
        </div>
    )
}
