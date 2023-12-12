import '../App.css';

export function Button(props) {
    return (
        <>
            <button onClick={props.onclick}>{props.name}</button>
        </>
    )
}