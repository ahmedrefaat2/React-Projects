import Header from "./components/Header"
import GameStatus from "./components/GameStatus"
import LanguagesList from "./components/LanguagesList"
import {languages} from "./data"
import React from "react"
import clsx from "clsx"
import {getRandomWord} from "./utils"
import Confetti from "react-confetti"
export default function AssemblyEndgame(){
    const [currentWord, setCurrentWord]=React.useState(getRandomWord)
    const [guessedLetters, setGuessedLetters]=React.useState([])
    const lastGuessedLetter=guessedLetters.length > 0 && !currentWord.includes(guessedLetters[guessedLetters.length -1])
    const wrongGuessCount=guessedLetters.filter(char=>!currentWord.includes(char)).length;
    const isGameWon=currentWord.split("").every(letter => guessedLetters.includes(letter));
    const isGameLost=wrongGuessCount>=(languages.length -1);
    const isGameOver= isGameLost|| isGameWon;
    const handleGuessedWord=(char)=>{
        setGuessedLetters(prev=>prev.includes(char)?prev:[...prev, char])
    }
    const languagesList=languages.map((obj,index)=>(
        <LanguagesList isEliminated={wrongGuessCount > index} key={obj.id} {...obj}  />)
        )
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const letterElements=currentWord.split("").map((char,index)=>{
        const letterElementsStyle=clsx({
            lost:isGameLost && !guessedLetters.includes(char)
        })
        return (
            <span className={letterElementsStyle} key={index}>
                {isGameLost?char.toUpperCase():guessedLetters.includes(char)?char.toUpperCase():""}
            </span>
        )})
    const keyboardElements=alphabet.split("").map((char,index)=>{
        const isGuessed= guessedLetters.includes(char)
        const isCorrect= isGuessed && currentWord.includes(char)
        const isWrong= isGuessed && !currentWord.includes(char)
        const className=clsx({
            correct:isCorrect,
            wrong:isWrong,
            gameover:isGameOver
        })
        return (
            <button 
                className={className}
                key={index}
                onClick={()=>isGameOver?null:handleGuessedWord(char)}
                aria-disabled={guessedLetters.includes(char)}
                aria-label={`Letter ${char}`}
            >
                {char.toUpperCase()}
            </button>
        )
    });
    const gameReset=()=>{
        setCurrentWord(getRandomWord)
        setGuessedLetters([])
    }
    return (
        <main>
            {isGameWon?<Confetti recycle={false} numberOfPieces={400} />:null}
            <Header />
            <GameStatus 
                lastGuessed={lastGuessedLetter}
                isGameWon={isGameWon}
                isGameLost={isGameLost}
                isGameOver={isGameOver}
                wrongGuessCount={wrongGuessCount}
            />
            <div className="w-full max-w-304 flex flex-wrap gap-3 justify-center mt-20 mb-36">
                {languagesList}
            </div>
            <div className="flex gap-[0.2rem] max-w-352 flex-wrap justify-center letters">
                {letterElements}
            </div>
            <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {languages.length - 1 - wrongGuessCount} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            </section>
            <div className="flex flex-wrap justify-center gap-[0.4rem] max-w-480 mt-48 mb-24 keyboard">
                {keyboardElements}
            </div>
            {isGameOver?
                <button onClick={gameReset} 
                    className="cursor-pointer text-[#1E1E1E] text-16 font font-semibold
                                text-center leading-none font-hanken bg-[#11B5E5]
                                rounded-sm border border-solid border-[#D7D7D7]
                                px-[0.4rem] py-12 w-228 h-40 mb-[0.6rem] active:translate-y-[1px]">
                        New Game
                </button>:null}
        </main>
    )
}