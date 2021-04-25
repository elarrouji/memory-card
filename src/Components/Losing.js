import React from "react"
import img from "./Styles/lost.jpg"
import "./Styles/Losing.css";

export default function Losing(props) {

    return (
        <div className="losingContainer">
            <img src={img} alt=""/>
            <span>You Lost Son <br/>Good Luck Next Time!</span>
            <button onClick={props.handleRestart} >Restart</button>
        </div>
    )

}