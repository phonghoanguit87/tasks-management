import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import logo from "../../tasks_logo.png";
import userProfile from "../../user.png";

import {loginSelector} from "../../redux/selector";
import {clearCookie} from "../../utils/commonUtil";
import commonSlice from "./commonSlice";

function Banner() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userlogined = useSelector(loginSelector);
    
    function clickEvent(){
        navigate("/tasks");
    }
    
    function logoutOnClick(e) {
        console.log("logoutOnClick");
        e.preventDefault();
        clearCookie("user");
        dispatch(commonSlice.actions.setLoginInfo({
            loginUser: {},
            isLogin: false,
            isLeader: false,
        }));
        navigate("/");
    }
    
    return <>
        <div className="banner">
            <div className="row">
                <div className="col-1">
                    <img onClick={clickEvent} className="banner_logo mt-3" src={logo} alt="Tasks management logo"/>
                </div>
                <div className="col-4">
                    <h1 onClick={clickEvent} className="text-muted mt-3">Tasks Managements</h1>
                </div>
                <div className="col-7">
                    {userlogined.isLogin ? (
                        <button onClick={logoutOnClick} className="btn btn-primary mt-5 float-end">
                            <i className="bi bi-box-arrow-in-right"/>
                        </button>
                    ) : ("")}
                    <img onClick={clickEvent} className="banner_logo mt-3 float-end" src={userProfile} alt="Tasks management logo"/>
                </div>
            </div>
        </div>
    </>
}

export default Banner;