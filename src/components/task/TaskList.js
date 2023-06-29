import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {taskListSelector, loginSelector, loadingSelector} from "../../redux/selector";
import {getTasks} from "./taskSlice";
import Loading from "../common/Loading";
import Banner from "../common/Banner";
import { Link } from "react-router-dom";

function TaskList() {
    const dispatch = useDispatch();
    const taskList = useSelector(taskListSelector);
    const userlogined = useSelector(loginSelector);
    const loading = useSelector(loadingSelector);
    console.log("TaskList > userlogined -->", userlogined);
    useEffect(()=>{
        dispatch(getTasks(userlogined.loginUser.loginName));
    },[]);
    
    function deleteTaskEvent(e, task) {
        e.preventDefault();
        // dispatch(bookListSlice.actions.selectBook(item));
    }
    
    return <>
        <Banner/>
        {loading && <Loading />}
        <hr/>
        <table className="table">
            <thead>
            <tr>
                <th></th>
                <th>ID</th>
                <th>Title</th>
                <th>Assign To</th>
                <th>Priority</th>
                <th>Status</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {taskList.map(task=>(
                <tr key={task.id} data-testid={`task-${task.id}`}>
                    <td>
                        <Link id="detail" className="btn btn-info" to={`/tasks/detail/${task.id}`}><i className="bi bi-file"/></Link>
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
                    <td>
                        <Link id="edit" className="btn btn-warning" to={`/tasks/edit/${task.id}`}><i className="bi bi-pencil-square"/></Link>
                        <Link id="duplicate" className="btn btn-info" to={`/tasks/edit/${task.id}`}><i className="bi bi-files"/></Link>
                        <Link id="delete" className="btn btn-danger" to={`/tasks/delete/${task.id}`}><i className="bi bi-x-circle"/></Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}

export default TaskList;