import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import Banner from "../common/Banner";
import Loading from "../common/Loading";
import ToolBarMenu from "../common/ToolBarMenu";

import {loadingSelector, usersSelector} from "../../redux/selector";
function UserList() {
    const loading = useSelector(loadingSelector);
    const users = useSelector(usersSelector);
    
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
                        <Link id="add" to={"/user/add"} className="btn btn-primary me-1"><i className="bi bi-plus-circle"></i></Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                {users && users.map((user) => (
                    <tr key={user.id} data-testid={`task-${user.id}`}>
                        <td className="align-middle">{user.id}</td>
                        <td className="align-middle">{user.name}</td>
                        <td className="align-middle">{user.loginName}</td>
                        <td className="align-middle">{user.teamName}</td>
                        <td className="align-middle">{user.role}</td>
                        <td>
                            <Link id="edit" className="btn btn-warning" to={`/user/edit/${user.id}`}><i className="bi bi-pencil-square"/></Link>
                            <Link id="delete" className="btn btn-danger"><i className="bi bi-x-circle"/></Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
}

export default UserList;