import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {currentUrlSelector} from "../../redux/selector";

function EditsButton(props) {
    const currentUrl = useSelector(currentUrlSelector);
    console.log("EditsButton > currentUrl -->", currentUrl);
    function editBookEvent(e) {
        e.preventDefault();
    }
    function cancelEvent(e) {
        e.preventDefault();
    }
    return (
        <div className="d-flex flex-row bd-highlight mt-3">
            {/*<button id="cancelBtn" className="btn btn-secondary" onClick={(e)=>{cancelEvent(e)}}>Cancel</button>*/}
            <Link id="cancelBtn" className="btn btn-secondary" to={`${currentUrl}`}>Cancel</Link>
            
            <button id="editBtn" className="btn btn-info ms-3" onClick={(e)=>{editBookEvent(e)}}>Save</button>
        </div>
    )
}

export default EditsButton;