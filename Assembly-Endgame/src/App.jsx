import Header from "./components/Header"
import GameStatus from "./components/GameStatus"
import LanguagesList from "./components/LanguagesList"
import {languages} from "./data"
import React from "react"
import clsx from "clsx"
export default function AssemblyEndgame(){
    const [currentword, setCurrentWord]=React.useState("react")
    const [guessedLetters, setGuessedLetters]=React.useState([])
    const wrongGuessCount=guessedLetters.filter(char=>!currentword.includes(char)).length;
    const isGameWon=currentword.split("").every(letter => guessedLetters.includes(letter));
    const isGameLost=wrongGuessCount>=(languages.length -1);
    const isGameOver= isGameLost|| isGameWon;
    const handleGuessedWord=(char)=>{
        setGuessedLetters(prev=>prev.includes(char)?prev:[...prev, char])
    }
    const languagesList=languages.map((obj,index)=>(
        <LanguagesList isEliminated={wrongGuessCount > index} key={obj.id} {...obj}  />)
        )
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const letterElements=currentword.split("").map((char,index)=>(
            <span key={index}>
                {guessedLetters.includes(char)?char.toUpperCase():""}
            </span>));
    const keyboardElements=alphabet.split("").map((char,index)=>{
        const isGuessed= guessedLetters.includes(char)
        const isCorrect= isGuessed && currentword.includes(char)
        const isWrong= isGuessed && !currentword.includes(char)
        const className=clsx({
            correct:isCorrect,
            wrong:isWrong
        })
        return (
            <button className={className} key={index} onClick={()=>handleGuessedWord(char)}>
                {char.toUpperCase()}
            </button>
        )
    });
    return (
        <main>
            <Header />
            <GameStatus isGameWon={isGameWon} isGameOver={isGameOver} />
            <div className="container">
                {languagesList}
            </div>
            <div className="letters">
                {letterElements}
            </div>
            <div className="keyboard">
                {keyboardElements}
            </div>
            {isGameOver?<button className="user-button">New Game</button>:null}
        </main>
    )
}