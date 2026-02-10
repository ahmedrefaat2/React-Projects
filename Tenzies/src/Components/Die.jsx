export default function Die(props){
    return (
        <button onClick={()=>props.hold(props.id)} 
                style={{backgroundColor:props.isHeld?"#59E391":"#FFFFFF"}}
                aria-label={`Die with value of ${props.value},${props.isHeld?"held":"not held"}`}
                aria-pressed={props.isHeld}>
            {props.value}
        </button>
    )
}