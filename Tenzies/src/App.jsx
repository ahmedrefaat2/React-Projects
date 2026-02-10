import {nanoid} from "nanoid"
import React from "react"
import Die from "./Components/Die"
import Confetti from "react-confetti"
export default function App(){ 
    const generateAllNewDice=()=>{
        return new Array(10).fill(0).map(()=>Math.ceil(Math.random()*6)).map(num=>({
            value:num,
            isHeld:false,
            id:nanoid()
        }));
    }
    const [dice, setDice]=React.useState(generateAllNewDice);
    const gameWon=dice.every(die=>die.isHeld) && dice.every(die=>die.value===dice[0].value);
    const handleRollButton=()=>{
            if (gameWon){
                setDice(generateAllNewDice);
            }
            else{
                setDice(prev=>prev.map(item=>item.isHeld?item:{...item,value:Math.ceil(Math.random()*6)}));
            }
    }
    const hold=(id)=>{
        setDice(prev=>prev.map(el=>el.id===id?{...el,isHeld:!el.isHeld}:el));
    }
    const dieElements=dice.map(obj=><Die hold={hold} key={obj.id} {...obj} />);
    const buttonRef=React.useRef(null)
    React.useEffect(()=>{
        if (gameWon){
            buttonRef.current.focus()
        }
    },[gameWon])
    return (
        <main className="tenzies">
            {gameWon?<Confetti />:null}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {dieElements}
            </div>
            <button ref={buttonRef} onClick={handleRollButton}>{gameWon?"New Game":"Roll"}</button>
        </main>   
    )
}