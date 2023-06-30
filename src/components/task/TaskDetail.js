import {getTasksById} from "./taskSlice";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadingSelector, selectTaskSelector} from "../../redux/selector";
import Banner from "../common/Banner";
import Loading from "../common/Loading";
import ToolBarMenu from "../common/ToolBarMenu";
import commonSlice from "../common/commonSlice";
function TaskDetail() {
    
    const dispatch = useDispatch()
    let { taskId } = useParams();
    const task = useSelector(selectTaskSelector);
    const loading = useSelector(loadingSelector);
    
    useEffect(() => {
        dispatch(getTasksById(taskId));
        dispatch(commonSlice.actions.setCurrentUrl(`/tasks/detail/${taskId}`));
    }, [dispatch, taskId]);

    return <>
        <Banner/>
        <ToolBarMenu taskId={taskId} />
        
        {loading && <Loading />}
        <div className="main mt-5">
            <div className="row mt-2">
                <div className="col-2">
                    <div className="row me-1"><span>No.</span></div>
                    <div className="row me-1">
                        <input value={task.id} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row me-1"><span>Title</span></div>
                    <div className="row me-1">
                        <input value={task.taskTitle} className="form-control" disabled={true}/>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-2">
                    <div className="row me-1"><span>Assign to</span></div>
                    <div className="row me-1">
                        <input value={task.assignTo} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Priority</span></div>
                    <div className="row me-1">
                        <input value={task.priority} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Status</span></div>
                    <div className="row me-1">
                        <input value={task.status} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Start</span></div>
                    <div className="row me-1">
                        <input value={task.start} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Deadline</span></div>
                    <div className="row me-1">
                        <input value={task.deadline} className="form-control" disabled={true}/>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row"><span>Content</span></div>
                <div className="row">
                    <textarea value={task.content} className="form-control" rows="10" disabled={true}></textarea>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row mt-3"><h4>Todo</h4></div>
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Work Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task.todo && task.todo.map((todo)=>(
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.todoTitle}</td>
                                    <td>{todo.status}</td>
                                    <td>{todo.workDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default TaskDetail;