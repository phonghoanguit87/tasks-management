import Banner from "../common/Banner";
import {useDispatch, useSelector} from "react-redux";
import {loadingSelector, loginSelector, usersSelector, userTaskListSelector} from "../../redux/selector";
import {useEffect} from "react";
import {getUserByTeamName} from "../user/userslice";
import taskSlice, {getTasksByUsers} from "./taskSlice";
import {Link} from "react-router-dom";
import Loading from "../common/Loading";
import ToolBarMenu from "../common/ToolBarMenu";

function Dashboard() {
    const dispatch = useDispatch();
    
    const loading = useSelector(loadingSelector);
    const userlogined = useSelector(loginSelector);
    const users = useSelector(usersSelector);
    const tasks = useSelector(userTaskListSelector);
    
    useEffect(() => {
        if(users.length <= 0) {
            dispatch(getUserByTeamName(userlogined.loginUser.teamName));
        }
    }, [dispatch, users]);
    
    useEffect(() => {
        if(tasks.length <= 0) {
            console.log("[Dashboard > useEffect > getTasksByUsers] ", users);
            dispatch(getTasksByUsers(users));
        }
    }, [dispatch, tasks]);
    
    function onClickHandle(e, userName) {
        e.preventDefault();
        console.log("[Dashboard > onClickHandle] ", userName);
        dispatch(getTasksByUsers(userName));
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
                                        <Link id="edit" className="btn btn-warning" to={`/tasks/edit/${task.id}`}><i className="bi bi-pencil-square"/></Link>
                                        <Link id="duplicate" className="btn btn-info" to={`/tasks/add`}><i className="bi bi-files"/></Link>
                                        <Link id="delete" className="btn btn-danger" to={`/tasks/delete/${task.id}`}><i className="bi bi-x-circle"/></Link>
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