import {Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Login from './components/common/Login';
import TaskList from "./components/task/TaskList";
import TaskDetail from "./components/task/TaskDetail";
import AddTask from "./components/task/AddTask";
import EditTask from "./components/task/EditTask";
import Dashboard from "./components/task/Dashboard";
import DuplicateTask from "./components/task/DuplicateTask";

import {useEffect} from "react";
import {getCookie} from "./utils/commonUtil";
import {loginSelector} from "./redux/selector";
import {getLoginAuthor} from "./components/common/commonSlice";

function App() {
    const dispatch = useDispatch();
    const userlogined = useSelector(loginSelector);
    const navigate = useNavigate();

    useEffect(()=>{
        const cUser = getCookie("user")
        if (cUser) {
            const user = JSON.parse(cUser);
            dispatch(getLoginAuthor(user));
        } else {
            navigate("/");
        }
        
        if (userlogined.isLeader) {
            navigate("/dashboard");
        }
    },[dispatch])

    return (
        <div>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/tasks" element={<TaskList/>}/>
                <Route path="/tasks/detail/:taskId" element={<TaskDetail/>}/>
                <Route path="/tasks/edit/:taskId" element={<EditTask/>}/>
                <Route path="/tasks/add" element={<AddTask/>}/>
                <Route path="/tasks/duplicate/:taskId" element={<DuplicateTask/>}/>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;