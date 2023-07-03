import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { DatePicker } from 'antd';

import Banner from "../common/Banner";
import Loading from "../common/Loading";

import {
    currentUrlSelector,
    loadingSelector,
    selectTaskSelector
} from "../../redux/selector";
import {addTask, getTasksById} from "./taskSlice";
import {STATUS_LIST, PRIORITY_LIST} from "../../config";

/**
 * Add new task includes duplicate
 * @returns {JSX.Element}
 * @constructor
 */
function DuplicateTask() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const loading = useSelector(loadingSelector);
    const task = useSelector(selectTaskSelector);
    const currentUrl = useSelector(currentUrlSelector);

    const dateFormat = 'YYYY/MM/DD';
    let { taskId } = useParams();
    const [ form, setForm ] = useState({})
    
    useEffect(()=>{
        if (Object.keys(task).length === 0) {
            dispatch(getTasksById(taskId));
        }
        
        const { id, ...newForm } = task;
        setForm(newForm)
        
        if (task.id !== undefined && task.id !== Number(taskId)) {
            navigate(`/tasks/detail/${task.id}`);
        }
    },[dispatch, task])
    
    function cancelEvent(e) {
        e.preventDefault();
        navigate(`${currentUrl}`);
    }
    const handleDatePickerChange = (date, dateString, pickerName) => {
        const year = date.year();
        const month = date.month() + 1;
        const day = date.date();
        
        setForm({
            ...form,
            [pickerName]: `${year}/${month}/${day}`
        });
    };
    
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
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
                        <input
                            name="taskTitle"
                            value={form.taskTitle}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-2">
                    <div className="row me-1"><span>Assign to</span></div>
                    <div className="row me-1">
                        <input
                            name="assignTo"
                            onChange={handleChange}
                            value={form.assignTo}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Priority</span></div>
                    <div className="row me-1">
                        <select
                            name="priority"
                            onChange={handleChange}
                            className="form-select"
                            id="priority"
                            defaultValue={form.priority}
                        >
                            {
                                PRIORITY_LIST.map((value, index) => {
                                    return <option key={index} value={value}>{value}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Status</span></div>
                    <div className="row me-1">
                        <select
                            name="status"
                            onChange={handleChange}
                            className="form-select"
                            id="status"
                            defaultValue={form.status}
                        >
                            {
                                STATUS_LIST.map((value, index) => {
                                    return <option key={index} value={value}>{value}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Start</span></div>
                    <div className="row me-1">
                        <DatePicker
                            id="startDate"
                            className="form-control"
                            // defaultValue={form.start}
                            onChange={(date, dateString) => handleDatePickerChange(date, dateString, "start")}
                            dateFormat={dateFormat}
                            placeholderText="Select a date"
                        />
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Deadline</span></div>
                    <div className="row me-1">
                        <DatePicker
                            id="deadlineDate"
                            className="form-control"
                            // defaultValue={form.deadline}
                            onChange={(date, dateString) => handleDatePickerChange(date, dateString, "deadline")}
                            dateFormat={dateFormat}
                            placeholderText="Select a date"
                        />
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row"><span>Content</span></div>
                <div className="row">
                    <textarea
                        name="content"
                        onChange={handleChange}
                        value={form.content}
                        className="form-control"
                        rows="10"
                    />
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
                        <tbody>
                        {form.todo && form.todo.map((todo) => (
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
                    </table>
                </div>
            </div>
        </form>
    </>
}

export default DuplicateTask;