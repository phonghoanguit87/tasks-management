import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import taskSlice from "../task/taskSlice";
import {useDispatch, useSelector} from "react-redux";
import {loginSelector, taskListSelector, userTaskListSelector} from "../../redux/selector";
import {formatCSVData} from "../../utils/commonUtil";

function ToolBarMenu(props) {
    const dispatch = useDispatch();
    const userlogined = useSelector(loginSelector);
    const taskList = useSelector(taskListSelector);
    const tasks = useSelector(userTaskListSelector);
    
    let csvData = [];
    let taskId = undefined;
    let isLeader = false;
    let isList = false;
    let isDelete = false;
    let isAdd = true;
    let isDuplicate = false;
    let isDown = false;
    let isUp = false;
    let task = {};
    if(props.taskId) {
        taskId = props.taskId;
        isDelete = true;
        isDuplicate = true;
        // Todo: get from db to disable or enable down/up
        isDown = true;
        isUp = true;
    }
    if(props.isAdd) {
        isAdd = props.isAdd;
    }
    
    if(props.isList) {
        isList = props.isList;
    }
    
    if(props.isLeader) {
        isLeader = props.isLeader;
    }
    
    function resetSelectTask() {
        dispatch(taskSlice.actions.setSelectTask({}));
    }
    
    return (
        <div className="d-flex flex-row-reverse bd-highlight">
            {userlogined.isLeader ? (
                <Link id="leader" to={"/dashboard"} className="btn btn-dark me-1"><i className="bi bi-gear"/></Link>
            ) : ("")}
            {isList && (tasks.length > 0 || taskList.length > 0) ? (
                <CSVLink data={isLeader && isList ? formatCSVData(tasks) : formatCSVData(taskList)} separator={";"} className="btn btn-secondary me-1">
                    <i className="bi bi-download"/>
                </CSVLink>
            ) : ("")}
            {isDelete ? (
                <Link id="delete" to={"/"} className="btn btn-danger me-1"><i className="bi bi-x-circle"/></Link>
            
            ) : ("") }
            {taskId === undefined ? ("") : (
                <Link id="edit" to={`/tasks/edit/${taskId}`} className="btn btn-warning me-1"><i className="bi bi-pencil-square"/></Link>
            ) }
            {isDuplicate ? (
                <Link id="duplicate" className="btn btn-info" to={`/tasks/add`}><i className="bi bi-files"/></Link>
            ) : ("")}
            {isAdd ? (
                <Link onClick={resetSelectTask} id="add" to={"/tasks/add"} className="btn btn-primary me-1"><i className="bi bi-plus-circle"></i></Link>
            ) : ("") }
            {isDown ? (
                <Link id="down" to={"/"} className="btn btn-light me-1"><i className="bi bi-chevron-compact-down"></i></Link>
            ) : ("") }
            {isUp ? (
                <Link id="up" to={"/"} className="btn btn-light me-1"><i className="bi bi-chevron-compact-up"></i></Link>
            ) : ("") }
        </div>
    )
}

export default ToolBarMenu;