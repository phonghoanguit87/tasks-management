import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { DatePicker } from 'antd';

import Banner from "../common/Banner";
import Loading from "../common/Loading";

import {currentUrlSelector, loadingSelector, selectTaskSelector} from "../../redux/selector";
import {addTask, getTasksById, updateTask} from "./taskSlice";
import {STATUS_LIST, PRIORITY_LIST} from "../../config";

/**
 * Add new task includes duplicate
 * @returns {JSX.Element}
 * @constructor
 */
function AddTask() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const loading = useSelector(loadingSelector);
    const selectTask = useSelector(selectTaskSelector);
    const currentUrl = useSelector(currentUrlSelector);
    
    const dateFormat = 'YYYY/MM/DD';
    const [ task, setTask ] = useState({})
    const [ type, setType ] = useState("New")

    useEffect(()=>{
        if (Object.keys(selectTask).length !== 0) {
            setTask(selectTask)
            setType("Duplicate");
        }
        
        if (Object.keys(selectTask).length !== 0 && type === "New") {
            navigate(`/tasks/detail/${selectTask.id}`);
        }
    },[dispatch, selectTask])
    
    const [ form, setForm ] = useState(task)
    function cancelEvent(e) {
        e.preventDefault();
        navigate(`${currentUrl}`);
    }
    const handleDatePickerChange = (date, dateString, pickerName) => {
        const year = date.year();
        const month = date.month() + 1;
        const day = date.date();
        
        handleChange(pickerName,`${year}/${month}/${day}`);
    };
    function handleChange(name, value) {
        setForm({
            ...form,
            [name]: value
        });
    }
    function addTaskEvent(e) {
        e.preventDefault()
        
        dispatch(addTask(form));
    }
    
    return <>
        {loading && <Loading />}
        <Banner/>
        <form onSubmit={addTaskEvent} className="main mt-5">
            <div className="d-flex flex-row bd-highlight mt-3 mb-3">
                <button id="cancelBtn" className="btn btn-secondary" onClick={(e)=>{cancelEvent(e)}}>Cancel</button>
                <button type="submit" id="editBtn" className="btn btn-info ms-3">Save</button>
            </div>
            
            <div className="row mt-2">
                <div className="col-2">
                    <div className="row me-1"><span>No.</span></div>
                    <div className="row me-1">
                        <input className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row me-1"><span>Title</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <input
                                name="taskTitle"
                                value={form.taskTitle}
                                className="form-control"
                                onChange={(e)=>setForm({...form,taskTitle:e.target.value})}
                            />
                        
                        ) : (
                            <input
                                name="taskTitle"
                                className="form-control"
                                onChange={(e)=>setForm({...form,taskTitle:e.target.value})}
                            />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-2">
                    <div className="row me-1"><span>Assign to</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <input
                                name="assignTo"
                                onChange={(e)=>setForm({...form,assignTo:e.target.value})}
                                value={form.assignTo}
                                className="form-control"
                            />
                        ) : (
                            <input
                                name="assignTo"
                                onChange={(e)=>setForm({...form,assignTo:e.target.value})}
                                className="form-control"
                            />
                        )}
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Priority</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <select
                                name="priority"
                                onChange={(e)=>setForm({...form,priority:e.target.value})}
                                className="form-select"
                                id="priority"
                                defaultValue={task.priority}
                            >
                                {
                                    PRIORITY_LIST.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })
                                }
                            </select>
                        ) : (
                            <select
                                name="priority"
                                onChange={(e)=>setForm({...form,priority:e.target.value})}
                                className="form-select"
                                id="priority"
                                defaultValue={PRIORITY_LIST[0]}
                            >
                                {
                                    PRIORITY_LIST.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })
                                }
                            </select>
                        )}
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Status</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <select
                                name="status"
                                onChange={(e)=>setForm({...form,status:e.target.value})}
                                className="form-select"
                                id="status"
                                defaultValue={task.status}
                            >
                                {
                                    STATUS_LIST.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })
                                }
                            </select>
                        ):(
                            <select
                                name="status"
                                onChange={(e)=>setForm({...form,status:e.target.value})}                                className="form-select"
                                id="status"
                                defaultValue={STATUS_LIST[0]}
                            >
                                {
                                    STATUS_LIST.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })
                                }
                            </select>
                        )}

                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Start</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <DatePicker
                                id="startDate"
                                className="form-control"
                                // defaultValue={form.start}
                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "start")}
                                dateFormat={dateFormat}
                                placeholderText="Select a date"
                            />
                        ) : (
                            <DatePicker
                                id="startDate"
                                className="form-control"
                                // defaultValue={moment().format(dateFormat)}
                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "start")}
                                dateFormat={dateFormat}
                                placeholderText="Select a date"
                            />
                        )}
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Deadline</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <DatePicker
                                id="deadlineDate"
                                className="form-control"
                                // defaultValue={form.deadline}
                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "deadline")}
                                dateFormat={dateFormat}
                                placeholderText="Select a date"
                            />
                        ) : (
                            <DatePicker
                                id="deadlineDate"
                                className="form-control"
                                // defaultValue={moment().format(dateFormat)}
                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "deadline")}
                                dateFormat={dateFormat}
                                placeholderText="Select a date"
                            />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row"><span>Content</span></div>
                <div className="row">
                    {type === "Duplicate" ? (
                        <textarea
                            onChange={(e)=>setForm({...form,content:e.target.value})}
                            value={task.content}
                            className="form-control"
                            rows="10"/>
                    ) : (
                        <textarea
                            onChange={(e)=>setForm({...form,content:e.target.value})}
                            className="form-control"
                            rows="10"/>
                    )}
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
                            <th></th>
                        </tr>
                        </thead>
                        {type === "Duplicate" ? (
                            <tbody>
                            {task.todo.map((todo)=>(
                                <tr key={todo.id}>
                                    <td>
                                        <input value={todo.id} className="form-control"/>
                                    </td>
                                    <td>
                                        <input value={todo.todoTitle} className="form-control"/>
                                    </td>
                                    <td>
                                        <select defaultValue={todo.status} className="form-select" id="todoStatus">
                                            {
                                                STATUS_LIST.map((value, index) => {
                                                    return <option key={index} value={value}>{value}</option>
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <DatePicker
                                            id="workDate"
                                            className="form-control"
                                            // defaultValue={new Date(todo.workDate)}
                                            onChange={(date, dateString) => handleChange("start", dateString)}
                                            dateFormat={dateFormat}
                                            placeholderText="Select a date"
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td>
                                        <input value="" className="form-control"/>
                                    </td>
                                    <td>
                                        <input value="" className="form-control"/>
                                    </td>
                                    <td>
                                        <select defaultValue={STATUS_LIST[0]} className="form-select" id="todoStatus">
                                            {
                                                STATUS_LIST.map((value, index) => {
                                                    return <option key={index} value={value}>{value}</option>
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <DatePicker
                                            id="workDate"
                                            className="form-control"
                                            // defaultValue={moment().format(dateFormat)}
                                            onChange={(date, dateString) => handleChange("start", dateString)}
                                            dateFormat={dateFormat}
                                            placeholderText="Select a date"
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-info"><i className="bi bi-plus-circle"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </form>
    </>
}

export default AddTask;