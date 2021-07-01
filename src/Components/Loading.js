import React from "react";
import "./Styles/Loading.css"

export default function Loading() {

    return (
        <div className="loadingContainer" >
            <div className="lds-hourglass"></div>
            <span>Loading ...</span>
        </div>
    )

}