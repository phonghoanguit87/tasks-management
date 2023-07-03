import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import Banner from "../common/Banner";
import Loading from "../common/Loading";
import ToolBarMenu from "../common/ToolBarMenu";

import {loadingSelector, loginSelector, selectedUserSelector, usersSelector} from "../../redux/selector";
import {useEffect} from "react";
import userSlice, {deleteUser, getUserByTeamName} from "./userslice";

function UserList() {
    const dispatch = useDispatch();
    
    const loading = useSelector(loadingSelector);
    const users = useSelector(usersSelector);
    const userlogined = useSelector(loginSelector);
    const selectedUser = useSelector(selectedUserSelector);
    
    useEffect(() => {
        dispatch(getUserByTeamName(userlogined.loginUser.teamName));
    },[dispatch, users, userlogined, selectedUser])
    
    function deleteUserEvent(e, userId) {
        dispatch(deleteUser(userId));
    }
    
    return<>
        <Banner/>
        {loading && <Loading />}
        <ToolBarMenu isUserList={true} isLeader={true} />
        <hr/>
        
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Login Name</th>
                    <th>Team Name</th>
                    <th>Role</th>
                    <th>
                        <Link onClick={
                            (e)=>{
                                if(Object.keys(selectedUser).length !== 0) {
                                    dispatch(userSlice.actions.setSelectedUser({}))
                                }
                            }
                        } id="add" to={"/user/add"} className="btn btn-primary me-1"><i className="bi bi-plus-circle"></i></Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 && users.map((user) => (
                    <tr key={user.id} data-testid={`task-${user.id}`}>
                        <td className="align-middle">{user.id}</td>
                        <td className="align-middle">{user.name}</td>
                        <td className="align-middle">{user.loginName}</td>
                        <td className="align-middle">{user.teamName}</td>
                        <td className="align-middle">{user.role}</td>
                        <td>
                            <Link onClick={
                                (e)=>{
                                    if(Object.keys(selectedUser).length === 0 || selectedUser.id !== Number(user.id)) {
                                        dispatch(userSlice.actions.setSelectedUser(user))
                                    }
                                }
                            } id="edit" className="btn btn-warning" to={`/user/edit/${user.id}`}><i className="bi bi-pencil-square"/></Link>
                            <Link
                                id="delete"
                                className="btn btn-danger"
                                onClick={(e)=>deleteUserEvent(e, user.id)}
                            ><i className="bi bi-x-circle"/></Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
}

export default UserList;