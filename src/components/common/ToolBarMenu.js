import { Link } from "react-router-dom";

function ToolBarMenu() {
    return (
        <div className="d-flex flex-row-reverse bd-highlight">
            <Link id="delete" to={"/"} className="btn btn-light me-1"><i className="bi bi-x-circle"/></Link>
            <Link id="edit" to={"/"} className="btn btn-light me-1"><i className="bi bi-pencil-square"/></Link>
            <Link id="add" to={"/"} className="btn btn-light me-1"><i className="bi bi-plus-circle"></i></Link>
            <Link id="down" to={"/"} className="btn btn-light me-1"><i className="bi bi-chevron-compact-down"></i></Link>
            <Link id="up" to={"/"} className="btn btn-light me-1"><i className="bi bi-chevron-compact-up"></i></Link>
        </div>
    )
}

export default ToolBarMenu;