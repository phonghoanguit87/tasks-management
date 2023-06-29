import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../config";
import toastr from "toastr";

const taskSlice = createSlice({
    name:"task",
    initialState: {
        loading: false,
        taskList: [],
        selectTask: {},
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

const getTasksById = createAsyncThunk(
    "task/getTasksById",
    async (taskId) => {
        const url = `${config.apiURL}/tasks?id=${taskId}`;
        const res = await axios.get(url);
        console.log("getTasksById > res.data -->", res.data);
        
        return res.data[0];
    }
);

const updateTaskById = createAsyncThunk(
    "task/updateTaskById",
    async (task) => {
        const url = `${config.apiURL}/tasks/id=${task.id}`;
        const res = await axios.put(url, task);
        
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

export {
    getTasks,
    getTasksById,
    updateTaskById,
    addTask
};

export default taskSlice;