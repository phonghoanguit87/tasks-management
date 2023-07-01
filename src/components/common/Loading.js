import { useState } from "react";
import { useEffect } from "react";

function Loading(props) {
    const [ str, setStr ] = useState("");
    
    useEffect(()=>{
        setTimeout(()=>{
            if (str.length > 2) {
                setStr("")
            } else {
                setStr(str+".")
            }
        },500)
    },[str]);
    
    return <div className="loading-container">
        <span className="loading-content">{str}</span>
    </div>
}

export default Loading