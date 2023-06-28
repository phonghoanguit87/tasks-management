import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider, useSelector} from "react-redux";
import store from "./redux/store";
import Login from './components/common/Login';
import TaskList from "./components/task/TaskList";
import TaskDetail from "./components/task/TaskDetail";
import EditTask from "./components/task/EditTask";
import {useEffect, useState} from "react";
import {getCookie} from "./utils/commonUtil";
import {loginSelector} from "./redux/selector";
function App() {
    const userlogined = useSelector(loginSelector);
    const [user, setUser] = useState(userlogined);
    
    useEffect(()=>{
        const cUser = getCookie("user")
        if (user) {
            setUser(JSON.parse(cUser))
        }
    },[userlogined])
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/tasks" element={<TaskList/>}/>
                    <Route path="*" element={<Login/>}/>
                    <Route path="/tasks/detail/:taskId" element={<TaskDetail/>}/>
                    <Route path="/tasks/edit/:taskId" element={<EditTask/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;