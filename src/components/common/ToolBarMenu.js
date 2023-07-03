import {Link, useNavigate} from "react-router-dom";
import { CSVLink } from "react-csv";
import {useDispatch, useSelector} from "react-redux";

import taskSlice, {deleteTaskById, getTasks, getTasksById} from "../task/taskSlice";
import {loginSelector, selectTaskSelector, taskListSelector, userTaskListSelector} from "../../redux/selector";
import {formatCSVData} from "../../utils/commonUtil";
import Breadcrumb from "./Breadcrumb";
import {useEffect} from "react";
import commonSlice from "./commonSlice";

function ToolBarMenu(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userlogined = useSelector(loginSelector);
    const taskList = useSelector(taskListSelector);
    const tasks = useSelector(userTaskListSelector);
    const selectTask = useSelector(selectTaskSelector);
    
    let taskId = undefined;
    let isLeader = false;
    let isList = false;
    let isDelete = false;
    let isAdd = true;
    let isDuplicate = false;
    let isDown = false;
    let isUp = false;
    let taskIds = [];
    let IndexOfTask = 0;
    
    if(props.taskId) {
        taskId = props.taskId;
        isDelete = true;
        isDuplicate = true;
    }
    
    useEffect(()=>{
        if(selectTask.id === undefined) {
            if(props.isLeader) {
                if(props.isUserList) {
                    navigate(`/users`);
                } else if (props.isTeamDetail) {
                    navigate(`/team`);
                } else {
                    navigate(`/dashboard`);
                }
                
            } else {
                navigate(`/tasks`);
            }
        }
    },[dispatch, selectTask]);
    
    if(props.isAdd) {
        isAdd = props.isAdd;
    }
    
    if(props.isList) {
        isList = props.isList;
        isUp = false;
        isDown = false;
    } else {
        if(props.isLeader) {
            taskIds = tasks.map(task => task.id);
            IndexOfTask = taskIds.indexOf(taskId);
            if(IndexOfTask === 0) {
                isUp = false;
                isDown= true;
            } else if(IndexOfTask === taskIds.length - 1) {
                isUp = true;
                isDown = false;
            } else {
                isUp = true;
                isDown = true;
            }
        } else {
            taskIds = taskList.map(task => task.id);
            IndexOfTask = taskIds.indexOf(Number(taskId));
            if(IndexOfTask === 0) {
                isUp = false;
                isDown= true;
            } else if(IndexOfTask === taskIds.length - 1) {
                isUp = true;
                isDown = false;
            } else {
                isUp = true;
                isDown = true;
            }
        }
    }
    
    if(props.isUserList || props.isTeamDetail) {
        isUp = false;
        isDown = false;
        isAdd = false;
    }
    
    if(props.isLeader) {
        isLeader = props.isLeader;
    }
    
    function resetSelectTask() {
        dispatch(taskSlice.actions.setSelectTask({}));
    }
    function deleteTaskEvent(e, taskId) {
        e.preventDefault();
        dispatch(deleteTaskById(taskId));
    }

    return <>
        <div className="row">
            <div className="col-6">
                <div className="d-flex flex-row-satrt bd-highlight mt-4">
                    <Breadcrumb crumbs={props.crumbs}/>
                </div>
            </div>
            <div className="col-6">
                <div className="d-flex flex-row-reverse bd-highlight mt-4">
                    {userlogined.isLeader ? (
                        <Link id="leader" to={"/dashboard"} className="btn btn-dark me-1"><i className="bi bi-gear"/></Link>
                    ) : ("")}
                    {userlogined.isLeader ? (
                        <Link id="member" to={"/users"} className="btn btn-dark me-1"><i className="bi bi-people-fill"/></Link>
                    ) : ("")}
                    {userlogined.isLeader ? (
                        <Link id="member" to={"/team"} className="btn btn-dark me-1"><i className="bi bi-microsoft-teams"/></Link>
                    ) : ("")}
                    {isList && ((isLeader && tasks.length > 0) || (!isLeader && taskList.length > 0)) ? (
                        <CSVLink
                            data={isLeader ? formatCSVData(tasks) : formatCSVData(taskList)}
                            filename={"task-list.csv"}
                            separator={";"}
                            className="btn btn-secondary me-1"
                        >
                            <i className="bi bi-download"/>
                        </CSVLink>
                    ) : ("")}
                    {isDelete ? (
                        <Link
                            onClick={(e)=>deleteTaskEvent(e, taskId)}
                            id="delete"
                            className="btn btn-danger me-1"
                        ><i className="bi bi-x-circle"/></Link>
                    ) : ("") }
                    {taskId === undefined ? ("") : (
                        <Link id="edit" to={`/tasks/edit/${taskId}`} className="btn btn-warning me-1"><i className="bi bi-pencil-square"/></Link>
                    ) }
                    {isDuplicate ? (
                        <Link id="duplicate" className="btn btn-info" to={`/tasks/duplicate/${taskId}`}><i className="bi bi-files"/></Link>
                    ) : ("")}
                    {isAdd ? (
                        <Link onClick={resetSelectTask} id="add" to={"/tasks/add"} className="btn btn-primary me-1"><i className="bi bi-plus-circle"></i></Link>
                    ) : ("") }
                    {isDown ? (
                        <Link id="down" to={`/tasks/detail/${taskIds[IndexOfTask + 1]}`} className="btn btn-light me-1"><i className="bi bi-chevron-compact-down"></i></Link>
                    ) : ("") }
                    {isUp ? (
                        <Link id="up" to={`/tasks/detail/${taskIds[IndexOfTask - 1]}`} className="btn btn-light me-1"><i className="bi bi-chevron-compact-up"></i></Link>
                    ) : ("") }
                </div>
            </div>
        </div>
    </>
}

export default ToolBarMenu;