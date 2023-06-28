import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";
import {loginSelector} from "../../redux/selector";
import {getLoginAuthor} from "./commonSlice";
import {setCookie} from "../../utils/commonUtil";
import logo from "../../resource/tasks_logo.png";
import "../../css/Login.css";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userlogined = useSelector(loginSelector);
    const [user, setUser] = useState(userlogined);
    
    const setValueForUser = (key, value) => {
        const newVal = {...user, [key]: value};
        setUser(newVal);
    };
    const loginEvent = (e) => {
        e.preventDefault();
        dispatch(getLoginAuthor(user));
    };
    
    useEffect(() => {
        if (userlogined.isLogin) {
            navigate("/tasks");
            setCookie("user", JSON.stringify(userlogined));
        }
    }, [userlogined, navigate]);
    
    return (
        <div className="wrapper">
            <div className="logo">
                <img src={logo}/>
            </div>
            <div className="text-center mt-4 name">
                Your's Tasks
            </div>
            <form className="p-3 mt-3">
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Username"
                        onChange={e => setValueForUser("username", e.target.value)}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input
                        type="password"
                        name="password"
                        id="pwd"
                        placeholder="Password"
                        onChange={e => setValueForUser("password", e.target.value)}
                    />
                </div>
                <button
                    className="btn mt-3"
                    onClick={(e) => {
                        loginEvent(e);
                    }}
                >Login</button>
            </form>
            <div className="text-center fs-6">
                <a href="#">Forget password?</a> or <a href="#">Sign up</a>
            </div>
        </div>
    );
}

export default Login;