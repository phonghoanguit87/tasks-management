import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {loadingSelector, selectTaskSelector} from "../../redux/selector";
import Banner from "../common/Banner";
import Loading from "../common/Loading";
import {getPriority, getStatus} from "../../utils/commonUtil";
import DatePicker from 'react-datepicker';
import EditsButton from "../common/EditsButton";

/**
 * Add new task includes duplicate
 * @returns {JSX.Element}
 * @constructor
 */
function AddTask() {
    const loading = useSelector(loadingSelector);
    const selectTask = useSelector(selectTaskSelector);
    console.log("AddTask > selectTask -->", selectTask);
    
    const [ task, setTask ] = useState({})
    const [ type, setType ] = useState("New")
    let priorities = getPriority();
    let statuses = getStatus();
    const [startDate, setStartDate] = useState(new Date());
    const [deadlineDate, setDeadlineDate] = useState(new Date());
    
    useEffect(()=>{
        if (Object.keys(selectTask).length !== 0) {
            setTask(selectTask)
            setType("Duplicate");
            priorities = getPriority(task.priority);
            statuses = getStatus(task.status);
            // setStartDate(new Date(task.start));
            // setDeadlineDate(new Date(task.deadline));
        }
    },[selectTask])
    
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
                        <input className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row me-1"><span>Title</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <input value={task.taskTitle} className="form-control"/>
                        
                        ) : (
                            <input className="form-control"/>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-2">
                    <div className="row me-1"><span>Assign to</span></div>
                    <div className="row me-1">
                        <input value="" className="form-control"/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Priority</span></div>
                    <div className="row me-1">
                        {type === "Duplicate" ? (
                            <select className="form-select" id="priority">
                                <option selected>{task.priority}</option>
                                {
                                    priorities.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })
                                }
                            </select>
                        ) : (
                            <select className="form-select" id="priority">
                                {
                                    priorities.map((value, index) => {
                                        if(index === 0)
                                            return <option selected key={index} value={value}>{value}</option>
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
                            <select className="form-select" id="status">
                                <option selected>{task.status}</option>
                                {
                                    statuses.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })
                                }
                            </select>
                        ):(
                            <select className="form-select" id="status">
                                {
                                    statuses.map((value, index) => {
                                        if(index === 0)
                                            return <option selected key={index} value={value}>{value}</option>
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
                        <DatePicker
                            id="startDate"
                            className="form-control"
                            selected={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="yyyy/mm/dd"
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
                            selected={deadlineDate}
                            onChange={handleDeadlineDateChange}
                            dateFormat="yyyy/mm/dd"
                            placeholderText="Select a date"
                        />
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row"><span>Content</span></div>
                <div className="row">
                    {type === "Duplicate" ? (
                        <textarea value={task.content} className="form-control" rows="10"></textarea>
                    ) : (
                        <textarea value="" className="form-control" rows="10"></textarea>
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
                                        <select className="form-select" id="todoStatus">
                                            {
                                                statuses.map((value, index) => {
                                                    if(index === 0)
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
                                            selected={new Date()}
                                            onChange={handleDeadlineDateChange}
                                            dateFormat="yyyy/mm/dd"
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
        </div>
    </>
}

export default AddTask;