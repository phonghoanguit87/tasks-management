import {getTasksById} from "./taskSlice";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadingSelector, selectTaskSelector} from "../../redux/selector";
import Banner from "../common/Banner";
import Loading from "../common/Loading";
import {getPriority, getStatus} from "../../utils/commonUtil";
import DatePicker from 'react-datepicker';
import EditsButton from "../common/EditsButton";
function EditTask() {
    const dispatch = useDispatch()
    let { taskId } = useParams();
    const task = useSelector(selectTaskSelector);
    const loading = useSelector(loadingSelector);
    console.log("EditTask > taskId -->", taskId);
    let priorities = [];
    let statuses = [];
    
    useEffect(() => {
        dispatch(getTasksById(taskId));
    }, [dispatch, taskId]);
    
    if (task.id) {
        priorities = getPriority(task.priority);
        statuses = getStatus(task.status);
    }
    const [startDate, setStartDate] = useState(task.start);
    const [deadlineDate, setDeadlineDate] = useState(task.deadline);
    console.log("EditTask > startDate -->", startDate);
    console.log("EditTask > deadlineDate -->", deadlineDate);
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    
    const handleDeadlineDateChange = (date) => {
        setDeadlineDate(date);
    };

    
    return <>
        <Banner/>
        <EditsButton/>
        {loading && <Loading />}
        <div className="main mt-5">
            <div className="row mt-2">
                <div className="col-2">
                    <div className="row me-1"><span>No.</span></div>
                    <div className="row me-1">
                        <input value={task.id} className="form-control"  disabled={true}/>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row me-1"><span>Title</span></div>
                    <div className="row me-1">
                        <input value={task.taskTitle} className="form-control"/>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-2">
                    <div className="row me-1"><span>Assign to</span></div>
                    <div className="row me-1">
                        <input value={task.assignTo} className="form-control"/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Priority</span></div>
                    <div className="row me-1">
                        <select className="form-select" id="priority">
                            <option selected>{task.priority}</option>
                            {
                                priorities.map((value, index) => {
                                    return <option key={index} value={value}>{value}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Status</span></div>
                    <div className="row me-1">
                        <select className="form-select" id="status">
                            <option selected>{task.status}</option>
                            {
                                statuses.map((value, index) => {
                                    return <option key={index} value={value}>{value}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Start</span></div>
                    <div className="row me-1">
                        {startDate === undefined ? ("") : (
                            <DatePicker
                                id="startDate"
                                className="form-control"
                                selected={new Date(startDate)}
                                onChange={handleStartDateChange}
                                dateFormat="yyyy/mm/dd"
                                placeholderText="Select a date"
                            />
                        )}
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Deadline</span></div>
                    <div className="row me-1">
                        {deadlineDate === undefined ? ("") : (
                            <DatePicker
                                id="deadlineDate"
                                className="form-control"
                                selected={new Date(deadlineDate)}
                                onChange={handleDeadlineDateChange}
                                dateFormat="yyyy/mm/dd"
                                placeholderText="Select a date"
                            />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row"><span>Content</span></div>
                <div className="row">
                    <textarea value={task.content} className="form-control" rows="10"></textarea>
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

export default EditTask;