import clsx from "clsx"
export default function LanguagesList(props){
    const style={
        backgroundColor:props.backgroundColor,
        color:props.color
    }
    const className=clsx({
        chip:true,
        lost:props.isEliminated
    })
    return (
            <span className={className} style={style}>
                {props.name}
            </span>
    )
}