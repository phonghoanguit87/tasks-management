import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import Banner from "../common/Banner";
import Loading from "../common/Loading";

import {getTasksById, updateTask} from "./taskSlice";
import {currentUrlSelector, loadingSelector, selectTaskSelector} from "../../redux/selector";
import {STATUS_LIST, PRIORITY_LIST, DATE_FORMAT} from "../../config";
import {getCurrentDate} from "../../utils/commonUtil";

function EditTask() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    let { taskId } = useParams();
    const task = useSelector(selectTaskSelector);
    const loading = useSelector(loadingSelector);
    const currentUrl = useSelector(currentUrlSelector);
    const [ form, setForm ] = useState(task);
    let currentDate = getCurrentDate();

    useEffect(() => {
        if (Object.keys(task).length === 0 || task.id !== Number(taskId)) {
            dispatch(getTasksById(taskId));
        }
        
        setForm(task)
    }, [dispatch, taskId, task]);
    
    const handleDatePickerChange = (date, dateString, pickerName) => {
        const year = date.year();
        const month = date.month() + 1;
        const day = date.date();
        
        setForm({
            ...form,
            [pickerName]: `${year}/${month}/${day}`
        });
    };
    
    function cancelEvent(e) {
        e.preventDefault();
        navigate(`${currentUrl}`);
    }
    
    function handleChange(e) {
        e.preventDefault();
        
        setForm({
            ...form,
            [e.target.name]:e.target.value
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
                        <input name="taskTitle" value={form.taskTitle} className="form-control" onChange={handleChange}/>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-2">
                    <div className="row me-1"><span>Assign to</span></div>
                    <div className="row me-1">
                        <input name="assignTo" value={form.assignTo} className="form-control" onChange={handleChange}/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Priority</span></div>
                    <div className="row me-1">
                        <select
                            defaultValue={form.priority}
                            className="form-select"
                            id="priority"
                            name="priority"
                            onChange={handleChange}
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
                            defaultValue={form.status}
                            className="form-select"
                            id="status"
                            name="status"
                            onChange={handleChange}
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
                        {form.start !== undefined && form.start !== null ? (
                            <DatePicker
                                id="startDate"
                                className="form-control"
                                defaultValue={dayjs(form.start, DATE_FORMAT)}
                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "start")}
                                format={DATE_FORMAT}
                            />
                        ) : (
                                <DatePicker
                                id="startDate"
                                className="form-control"
                                defaultValue={dayjs(currentDate, DATE_FORMAT)}
                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "start")}
                                format={DATE_FORMAT}
                            />
                        )}
                    </div>
                </div>
                <div className="col-3">
                    <div className="row me-1"><span>Deadline</span></div>
                    <div className="row me-1">
                        {form.deadline !== undefined && form.deadline !== null ? (
                                <DatePicker
                                    id="deadlineDate"
                                    className="form-control"
                                    defaultValue={dayjs(form.deadline, DATE_FORMAT)}
                                    onChange={(date, dateString) => handleDatePickerChange(date, dateString, "deadline")}
                                    format={DATE_FORMAT}
                                />
                        ) : (
                                <DatePicker
                                    id="deadlineDate"
                                    className="form-control"
                                    defaultValue={dayjs(currentDate, DATE_FORMAT)}
                                    onChange={(date, dateString) => handleDatePickerChange(date, dateString, "deadline")}
                                    format={DATE_FORMAT}
                                />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row"><span>Content</span></div>
                <div className="row">
                    <textarea
                        name="content"
                        value={form.content}
                        className="form-control"
                        rows="10"
                        onChange={handleChange}>
                    </textarea>
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
                        {form.todo && form.todo.map((todo)=>(
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
                                    {todo.workDate !== undefined && todo.workDate !== null ? (
                                            <DatePicker
                                                id="workDate"
                                                className="form-control"
                                                defaultValue={dayjs(todo.workDate, DATE_FORMAT)}
                                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "workDate")}
                                                format={DATE_FORMAT}
                                            />
                                    ) : (
                                            <DatePicker
                                                id="workDate"
                                                className="form-control"
                                                defaultValue={dayjs(currentDate, DATE_FORMAT)}
                                                onChange={(date, dateString) => handleDatePickerChange(date, dateString, "workDate")}
                                                format={DATE_FORMAT}
                                            />
                                    )}
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