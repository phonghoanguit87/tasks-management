import { useState } from "react";
import { useEffect } from "react";

const styleDiv = {
    width:"100%",
    height:"100%",
    backgroundColor:"white",
    opacity:0.5,
    position:"absolute",
    left:"0",
    top:"0",
    zIndex:"1000",
};

const styleStr = {
    fontSize: "50px",
    fontWeight:"bold",
    display:"block",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform: "translate(-50%,-50%)"
};

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
    return <div style={styleDiv}>
        <span style={styleStr}>{str}</span>
    </div>
}

export default Loading