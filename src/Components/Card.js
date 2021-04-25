import React from "react";
import uniqid from "uniqid";
import "./Styles/Card.css"

export default function Card(props) {
    let element = props.arr.map((item, index) => {
        return (
          <div className="card" key={uniqid()} >
            <img src={item.img} onClick={props.cardClicked} id={index} alt=""/>
            <span>{item.name}</span>
          </div>
        )
    })
    
    return (
        <div className="cardContainer">
            {element}
        </div>
    )
}