import {PRIORITY_LIST, STATUS_LIST} from "../../config";
import {DatePicker} from "antd";
import Banner from "../common/Banner";
import {useState} from "react";
import {addTask} from "../task/taskSlice";

function AddUser() {
    const [ form, setForm ] = useState({})
    
    function addUserEvent(e) {
        e.preventDefault()
    }
    
    function cancelEvent(e) {
        e.preventDefault();
    }
    
    return<>
        <Banner/>
        <form onSubmit={addUserEvent} className="main mt-5">
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
                <div className="col-4">
                    <div className="row me-1"><span>Name</span></div>
                    <div className="row me-1">
                        <input
                            name="name"
                            className="form-control"
                            onChange={(e)=>setForm({...form,name:e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Team Name</span></div>
                    <div className="row me-1">
                        <input
                            name="name"
                            className="form-control"
                            onChange={(e)=>setForm({...form,name:e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Role</span></div>
                    <div className="row me-1">
                        <select
                            name="role"
                            onChange={(e) => setForm({...form, role: e.target.value})} className="form-select"
                            id="status"
                            defaultValue="member"
                        >
                            <option key="member" value="member">member</option>
                            <option key="leader" value="leader">leader</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-6">
                    <div className="row me-1"><span>Login Name</span></div>
                    <div className="row me-1">
                        <input
                            name="name"
                            className="form-control"
                            onChange={(e)=>setForm({...form,name:e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="row me-1"><span>Password</span></div>
                    <div className="row me-1">
                        <input
                            name="name"
                            className="form-control"
                            onChange={(e)=>setForm({...form,name:e.target.value})}
                        />
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default AddUser;