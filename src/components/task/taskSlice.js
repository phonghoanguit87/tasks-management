import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../config";
import toastr from "toastr";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const popupSwal = withReactContent(Swal)

const taskSlice = createSlice({
    name:"task",
    initialState: {
        loading: false,
        taskList: [],
        selectTask: {},
        userTaskList: [],
    },
    reducers: {
        setSelectTask: (state, action) => {
            state.selectTask = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.taskList = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false
                toastr.error("The system can not load data!", "Error");
            })
            .addCase(getTasksById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTasksById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectTask = action.payload;
            })
            .addCase(getTasksById.rejected, (state, action) => {
                state.loading = false
                toastr.error("The system can not load data!", "Error");
            })
            .addCase(updateTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false
                toastr.error("The task can not updated!", "Error");
            })
            .addCase(getTasksByUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTasksByUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.userTaskList = action.payload;
            })
            .addCase(getTasksByUsers.rejected, (state, action) => {
                state.loading = false
                toastr.error("The task can not updated!", "Error");
            })
            .addCase(deleteTaskById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteTaskById.fulfilled, (state, action) => {
                state.loading = false;
                popupSwal.fire({
                    html: <i>The task deleted was success!</i>,
                    icon: 'success'
                }).then(() => {
                    window.location.reload();
                });
            })
            .addCase(deleteTaskById.rejected, (state, action) => {
                state.loading = false
                toastr.error("The task can not updated!", "Error");
            })
    }
});

const getTasks = createAsyncThunk(
    "task/getTasks",
    async (username) => {
        const url = `${config.apiURL}/tasks?assignTo=${username}`;
        const res = await axios.get(url);
        
        return res.data
    }
);

const getTasksByUsers = createAsyncThunk(
    "task/getTasksByUsers",
    async (users) => {
        let params = "";
        users.forEach((user) => {
            params += `assignTo=${user}&`;
        });
        console.log("getTasksByUsers > params -->", params);

        const url = `${config.apiURL}/tasks?${params}`;
        const res = await axios.get(url);
        
        return res.data
    }
);

const getTasksById = createAsyncThunk(
    "task/getTasksById",
    async (taskId) => {
        const url = `${config.apiURL}/tasks?id=${taskId}`;
        const res = await axios.get(url);
        console.log("getTasksById > res.data -->", res.data);
        
        return res.data[0];
    }
);

const updateTask = createAsyncThunk(
    "task/updateTask",
    async (taskData) => {
        const url = `${config.apiURL}/tasks/${taskData.id}`;
        const res = await axios.put(url, taskData);
        
        return res.data
    }
);

const addTask = createAsyncThunk(
    "task/addTask",
    async (taskData) => {
        const url = `${config.apiURL}/tasks`;
        const res = await axios.post(url, taskData);
        
        return res.data
    }
);

const deleteTaskById = createAsyncThunk(
    "task/deleteTaskById",
    async (taskId) => {
        const url = `${config.apiURL}/tasks/${taskId}`;
        const res = await axios.delete(url);
        
        return res.data;
    }
);

export {
    getTasks,
    getTasksById,
    updateTask,
    addTask,
    getTasksByUsers,
    deleteTaskById
};

export default taskSlice;