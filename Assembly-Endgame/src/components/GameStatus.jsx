export default function GameStatus(props){
    const conditionalRendering=props.isGameOver?(props.isGameWon?(
        <p className="game-win">
            <span>You win!</span>
            Well done! 🎉
        </p>
    ):(
        <p className="game-lost">
            <span>Game over!</span>
            You lose! Better start learning Assembly 😭:
        </p>
    )):(null)
    return (
        <div className="status-container">
            {conditionalRendering}
        </div>
    )
}
