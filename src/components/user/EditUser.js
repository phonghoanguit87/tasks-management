import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import Banner from "../common/Banner";

import {selectedUserSelector} from "../../redux/selector";
import {useNavigate, useParams} from "react-router-dom";
import {getUserById, updateUser} from "./userslice";

function EditUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();;
    
    const {userId} = useParams();
    const selectedUser = useSelector(selectedUserSelector);
    const [ form, setForm ] = useState({})
   
    useEffect(() => {
        if (Object.keys(selectedUser).length === 0 || selectedUser.id !== Number(userId)) {
            dispatch(getUserById(userId));
        }
        
        setForm(selectedUser)
    }, [dispatch, userId, selectedUser]);

    function addUserEvent(e) {
        e.preventDefault()
        
        dispatch(updateUser(form));
        navigate("/users");
    }
    function cancelEvent(e) {
        e.preventDefault();
        
        navigate("/users");
    }
    
    return<>
        <Banner/>
        <hr/>
        <form onSubmit={addUserEvent} className="main mt-5">
            <div className="d-flex flex-row bd-highlight mt-3 mb-3">
                <button id="cancelBtn" className="btn btn-secondary" onClick={(e)=>{cancelEvent(e)}}>Cancel</button>
                <button type="submit" id="editBtn" className="btn btn-info ms-3">Save</button>
            </div>
            <hr/>
            <div className="row mt-2">
                <div className="col-2">
                    <div className="row me-1"><span>No.</span></div>
                    <div className="row me-1">
                        <input value={form.id} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row me-1"><span>Name</span></div>
                    <div className="row me-1">
                        <input
                            name="name"
                            className="form-control"
                            value={form.name}
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
                            value={form.teamName}
                            onChange={(e)=>setForm({...form,teamName:e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="row me-1"><span>Role</span></div>
                    <div className="row me-1">
                        <select
                            id="role"
                            name="role"
                            onChange={(e) => setForm({...form, role: e.target.value})}
                            className="form-select"
                            defaultValue={form.role}
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
                            value={form.loginName}
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
                            value={form.password}
                            onChange={(e)=>setForm({...form,password:e.target.value})}
                        />
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default EditUser;