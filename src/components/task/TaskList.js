import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";

import Loading from "../common/Loading";
import Banner from "../common/Banner";
import ToolBarMenu from "../common/ToolBarMenu";
import Pagination from "../common/Pagination";

import {
    taskListSelector,
    loginSelector,
    loadingSelector,
    selectTaskSelector,
    paginationSelector
} from "../../redux/selector";
import taskSlice, {deleteTaskById, getTasks} from "./taskSlice";
import commonSlice from "../common/commonSlice";

function TaskList() {
    const dispatch = useDispatch();
    
    const taskList = useSelector(taskListSelector);
    const userlogined = useSelector(loginSelector);
    const loading = useSelector(loadingSelector);
    const selectTask = useSelector(selectTaskSelector);
    const pagination = useSelector(paginationSelector);
    
    useEffect(()=>{
        dispatch(getTasks({username: userlogined.loginUser.loginName, pagination: pagination}));
        dispatch(commonSlice.actions.setCurrentUrl("/tasks"));
    },[userlogined, selectTask, pagination, dispatch]);
    
    function deleteTaskEvent(e, taskId) {
        dispatch(deleteTaskById(taskId));
    }
    
    return <>
        <Banner/>
        <ToolBarMenu isList={true}/>
        {loading && <Loading />}
        <hr/>
        <Pagination/>
        <table className="table">
            <thead>
            <tr>
                <th></th>
                <th>ID</th>
                <th>Title</th>
                <th>Assign To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Start</th>
                <th>DeadLine</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {taskList.map(task=>(
                <tr key={task.id} data-testid={`task-${task.id}`}>
                    <td>
                        <Link onClick={
                            (e)=>{
                                if(Object.keys(selectTask).length === 0 || selectTask.id !== Number(task.id)) {
                                    dispatch(taskSlice.actions.setSelectTask(task))
                                }
                            }
                        } id="detail" className="btn btn-info" to={`/tasks/detail/${task.id}`}><i className="bi bi-file"/></Link>
                    </td>
                    <td className="align-middle">{task.id}</td>
                    <td className="align-middle">{task.taskTitle}</td>
                    <td className="align-middle">{task.assignTo}</td>
                    <td className="align-middle">
                        <div className={task.priority}>
                            {task.priority}
                        </div>
                    </td>
                    <td className="align-middle">
                        <div className={task.status}>
                            {task.status}
                        </div>
                    </td>
                    <td className="align-middle">{task.start}</td>
                    <td className="align-middle">{task.deadline}</td>
                    
                    <td>
                        <Link onClick={
                            (e)=>{
                                if(Object.keys(selectTask).length === 0 || selectTask.id !== Number(task.id)) {
                                    dispatch(taskSlice.actions.setSelectTask(task))
                                }
                            }
                        } id="edit" className="btn btn-warning" to={`/tasks/edit/${task.id}`}><i className="bi bi-pencil-square"/></Link>
                        <Link onClick={(e)=> {
                                if(Object.keys(selectTask).length === 0 || selectTask.id !== Number(task.id)) {
                                    dispatch(taskSlice.actions.setSelectTask(task))
                                }
                            }
                        } id="duplicate" className="btn btn-info" to={`/tasks/duplicate/${task.id}`}><i className="bi bi-files"/></Link>
                        <Link
                            onClick={(e)=>deleteTaskEvent(e, task.id)}
                            id="delete"
                            className="btn btn-danger"
                        ><i className="bi bi-x-circle"/></Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}

export default TaskList;