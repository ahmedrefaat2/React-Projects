import Header from "./components/Header"
import StatusGame from "./components/StatusGame"
import LanguagesList from "./components/LanguagesList"
import {languages} from "./data"
import {nanoid} from "nanoid"
import React from "react"
export default function AssemblyEndgame(){
    const [currentword, setCurrentWord]=React.useState("react")
    const test=()=>setCurrentWord("Ahmed")
    const languagesList=languages.map(obj=><LanguagesList key={nanoid()} {...obj}  />)
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return (
        <main>
            <Header />
            <StatusGame />
            <div className="container">
                {languagesList}
            </div>
            <div className="letters">
                {currentword.split("").map(char=><span>{char.toUpperCase()}</span>)}
            </div>
            <div className="keyboard">
                {alphabet.split("").map(char=><button>{char.toUpperCase()}</button>)}
            </div>
            <button onClick={test} className="user-button">New Game</button>
        </main>
    )
}