export default function LanguagesList(props){
    return (
            <span style={{backgroundColor:props.backgroundColor,color:props.color}}>
                {props.name}
            </span>
    )
}