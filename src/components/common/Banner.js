import logo from "../../tasks_logo.png";
import {useNavigate} from "react-router-dom";


function Banner() {
    const navigate = useNavigate();
    function clickEvent(){
        navigate("/tasks");
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
                </div>
            </div>
        </div>
    </>
}

export default Banner;