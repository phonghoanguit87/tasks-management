import logo from "../../resource/tasks_logo.png";


function Banner() {
    return <>
        <div className="banner">
            <div className="row">
                <div className="col-1">
                    <img className="banner_logo mt-3" src={logo} alt="Tasks management logo"/>
                </div>
                <div className="col-4">
                    <h1 className="text-muted mt-3">Tasks Managements</h1>
                </div>
                <div className="col-7">
                </div>
            </div>
        </div>
    </>
}

export default Banner;