import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import Banner from "../common/Banner";

import {selectedUserSelector} from "../../redux/selector";
import {useNavigate} from "react-router-dom";
import {addUser} from "./userslice";

function AddUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();;
    
    const [ form, setForm ] = useState({})
    const selectedUser = useSelector(selectedUserSelector);

    useEffect(()=> {
        if (Object.keys(selectedUser).length !== 0) {
            navigate(`/users`);
        }
    },[dispatch, selectedUser])
    
    function addUserEvent(e) {
        e.preventDefault()
        
        dispatch(addUser(form));
    }
    
    function cancelEvent(e) {
        e.preventDefault();
        
        navigate("/users");
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
                            name="teamName"
                            className="form-control"
                            onChange={(e)=>setForm({...form,teamName:e.target.value})}
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
                            name="loginName"
                            className="form-control"
                            onChange={(e)=>setForm({...form,loginName:e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="row me-1"><span>Password</span></div>
                    <div className="row me-1">
                        <input
                            name="password"
                            className="form-control"
                            onChange={(e)=>setForm({...form,password:e.target.value})}
                        />
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default AddUser;