import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";

import Banner from "../common/Banner";
import Loading from "../common/Loading";
import ToolBarMenu from "../common/ToolBarMenu";
import Pagination from "../common/Pagination";

import {
    loadingSelector,
    loginSelector,
    paginationSelector,
    selectTaskSelector,
    usersSelector,
    userTaskListSelector
} from "../../redux/selector";
import {getUserByTeamName} from "../user/userslice";
import taskSlice, {deleteTaskById, getTasksByUsers} from "./taskSlice";
import commonSlice from "../common/commonSlice";

function Dashboard() {
    const dispatch = useDispatch();
    
    const loading = useSelector(loadingSelector);
    const userlogined = useSelector(loginSelector);
    const users = useSelector(usersSelector);
    const tasks = useSelector(userTaskListSelector);
    const pagination = useSelector(paginationSelector);
    const selectTask = useSelector(selectTaskSelector);
    
    useEffect(() => {
        if(users.length <= 0) {
            dispatch(getUserByTeamName(userlogined.loginUser.teamName));
        }
        
        if(tasks.length <= 0) {
            const userNames = users.map(user => user.loginName);
            dispatch(getTasksByUsers({
                users: userNames,
                pagination: pagination
            }));
        }
        dispatch(commonSlice.actions.setCurrentUrl(`/dashboard`));
    }, [dispatch, users]);
    
    function onClickHandle(e, userName) {
        e.preventDefault();
        dispatch(getTasksByUsers({
            users: userName,
            pagination: pagination
        }));
    }
    
    function deleteTaskEvent(e, taskId) {
        e.preventDefault();
        dispatch(deleteTaskById(taskId));
    }
    
    return <>
        <Banner/>
        {loading && <Loading />}
        <ToolBarMenu isList={true} isLeader={true} />
        <div className="row mt-4">
            <div className="col-3">
                <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                    <nav className="nav nav-pills flex-column">
                        <button onClick={(e) => {onClickHandle(e, [])}} className="nav-link">
                            <h4 className="fw-bold">{userlogined.loginUser.teamName}</h4>
                        </button>
                        <nav className="nav nav-pills flex-column">
                            {users && users.map((user, index) => (
                                <button onClick={(e) => {onClickHandle(e, [user.loginName])}} className="nav-link ms-3 my-1" key={index}>{user.name}</button>
                            ))}
                        </nav>
                    </nav>
                </nav>
            </div>
            
            <div className="col-9">
                <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabIndex="0">
                    <div id={`${userlogined.loginUser.teamName}`}>
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
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map(task=>(
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
                                        <Link onClick={
                                            (e)=>{
                                                (selectTask && selectTask.id === task.id)
                                                    ? dispatch(taskSlice.actions.setSelectTask({}))
                                                    : dispatch(taskSlice.actions.setSelectTask(task))
                                            }
                                        } id="edit" className="btn btn-warning" to={`/tasks/edit/${task.id}`}><i className="bi bi-pencil-square"/></Link>
                                        <Link id="duplicate" className="btn btn-info" to={`/tasks/duplicate/${task.id}`}><i className="bi bi-files"/></Link>
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
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;