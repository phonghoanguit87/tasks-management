import {getTasksById, updateTask} from "./taskSlice";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {currentUrlSelector, loadingSelector, selectTaskSelector} from "../../redux/selector";
import Banner from "../common/Banner";
import Loading from "../common/Loading";
import {getPriority, getStatus} from "../../utils/commonUtil";
import DatePicker from 'react-datepicker';

function EditTask() {
    let { taskId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const task = useSelector(selectTaskSelector);
    const loading = useSelector(loadingSelector);
    const currentUrl = useSelector(currentUrlSelector);

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
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    
    const handleDeadlineDateChange = (date) => {
        setDeadlineDate(date);
    };
    
    const handleWorkDateChange = (date) => {
        setDeadlineDate(date);
    };
    
    const [ form, setForm ] = useState(task)
    function cancelEvent(e) {
        e.preventDefault();
        navigate(`${currentUrl}`);
    }
    
    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        
        setForm({
            ...form,
            [name]: value
        });
    }
    
    function submitBook(e) {
        e.preventDefault()
        
        dispatch(updateTask(form));
        navigate(`/tasks/detail/${form.id}`);
    }
    
    return <>
        <Banner/>
        {loading && <Loading />}
        <form onSubmit={submitBook} className="main mt-5">
            <div className="d-flex flex-row bd-highlight mt-3 mb-3">
                <button id="cancelBtn" className="btn btn-secondary" onClick={(e)=>{cancelEvent(e)}}>Cancel</button>
                <button type="submit" id="editBtn" className="btn btn-info ms-3">Save</button>
            </div>
            
            <div className="row mt-2">
                <div className="col-2">
                    <div className="row me-1"><span>No.</span></div>
                    <div className="row me-1">
                        <input value={form.id} className="form-control"  disabled={true}/>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row me-1"><span>Title</span></div>
                    <div className="row me-1">
                        <input name="taskTitle" value={form.taskTitle} className="form-control" onChange={(e)=> handleChange(e)}/>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-2">
                    <div className="row me-1"><span>Assign to</span></div>
                    <div className="row me-1">
                        <input name="assignTo" value={form.assignTo} className="form-control" onChange={(e)=> handleChange(e)}/>
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
                    <textarea name="content" value={task.content} className="form-control" rows="10" onChange={(e)=> handleChange(e)}></textarea>
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
                                <td>
                                    <input value={todo.id} className="form-control"/>
                                </td>
                                <td>
                                    <input value={todo.todoTitle} className="form-control"/>
                                </td>
                                <td>
                                    <select className="form-select" id="todoStatus">
                                        {
                                            statuses.map((value, index) => {
                                                if(value === todo.status)
                                                    return <option selected key={index} value={value}>{value}</option>
                                                return <option key={index} value={value}>{value}</option>
                                            })
                                        }
                                    </select>
                                </td>
                                <td>
                                    <DatePicker
                                        id="workDate"
                                        className="form-control"
                                        selected={new Date(todo.workDate)}
                                        onChange={handleDeadlineDateChange}
                                        dateFormat="yyyy/mm/dd"
                                        placeholderText="Select a date"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </>
}

export default EditTask;