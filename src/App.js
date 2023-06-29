import {Route, Routes, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Login from './components/common/Login';
import TaskList from "./components/task/TaskList";
import TaskDetail from "./components/task/TaskDetail";
import EditTask from "./components/task/EditTask";
import {useEffect, useState} from "react";
import {getCookie} from "./utils/commonUtil";
import {loginSelector} from "./redux/selector";
import {getLoginAuthor} from "./components/common/commonSlice";

function App() {
    const dispatch = useDispatch();
    const userlogined = useSelector(loginSelector);

    useEffect(()=>{
        const cUser = getCookie("user")
        if (cUser) {
            const user = JSON.parse(cUser);
            console.log("App > user");
            console.log(user);
            dispatch(getLoginAuthor(user));
        }
    },[dispatch])
    
    return (
        <div>
            {userlogined.isLogin ? "" : <Navigate to="/"/>}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/tasks" element={<TaskList/>}/>
                <Route path="*" element={<Login/>}/>
                <Route path="/tasks/detail/:taskId" element={<TaskDetail/>}/>
                <Route path="/tasks/edit/:taskId" element={<EditTask/>}/>
            </Routes>
        </div>
    );
    
    // return <>
    //     <Provider store={store}>
    //         <BrowserRouter>
    //             <Routes>
    //                 <Route path="/" element={<Login/>}/>
    //                 <Route path="/tasks" element={<TaskList/>}/>
    //                 <Route path="*" element={<Login/>}/>
    //                 <Route path="/tasks/detail/:taskId" element={<TaskDetail/>}/>
    //                 <Route path="/tasks/edit/:taskId" element={<EditTask/>}/>
    //             </Routes>
    //         </BrowserRouter>
    //     </Provider>
    // </>
}

export default App;