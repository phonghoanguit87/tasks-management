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
        pagination: {
            perPage: 5,
            page: 1,
            totalRecord: 0
        },
    },
    reducers: {
        setSelectTask: (state, action) => {
            state.selectTask = action.payload;
        },
        setPerPage: (state, action) => {
            state.pagination.perPage = action.payload
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.taskList = action.payload.data;
                state.pagination.totalRecord = action.payload.number;
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
                // state.userTaskList = action.payload;
                state.userTaskList = action.payload.data;
                state.pagination.totalRecord = action.payload.number;
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
    async ({username, pagination}) => {
        if (pagination === undefined) {
            pagination = {
                perPage: 5,
                page: 1,
                totalRecord: 0
            }
        }
        const urlAllRecord = `${config.apiURL}/tasks?assignTo=${username}`;
        const url = `${config.apiURL}/tasks?assignTo=${username}&_limit=${pagination.perPage}&_page=${pagination.page}`;
        const resOfAll = await axios.get(urlAllRecord);
        const res = await axios.get(url);
        
        return {
            data: res.data,
            number: resOfAll.data.length
        }
    }
);

const getTasksByUsers = createAsyncThunk(
    "task/getTasksByUsers",
    async ({users, pagination}) => {
        if (pagination === undefined) {
            pagination = {
                perPage: 5,
                page: 1,
                totalRecord: 0
            }
        }
        
        let paginationStr = `_limit=${pagination.perPage}&_page=${pagination.page}`;
        let params = "";
        users.forEach((user) => {
            params += `assignTo=${user}&`;
        });
        console.log("getTasksByUsers > params -->", params);
        console.log("getTasksByUsers > paginationStr -->", paginationStr);
        const urlAllRecord = `${config.apiURL}/tasks?${params}`;
        const url = `${config.apiURL}/tasks?${params}${paginationStr}`;
        const resOfAll = await axios.get(urlAllRecord);
        const res = await axios.get(url);
        
        return {
            data: res.data,
            number: resOfAll.data.length
        }
    }
);

const getTasksById = createAsyncThunk(
    "task/getTasksById",
    async (taskId) => {
        const url = `${config.apiURL}/tasks?id=${taskId}`;
        const res = await axios.get(url);
        
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

const setPerPage = (username, perPage, isDashboard) => {
    return (dispatch,getState) => {
        dispatch(taskSlice.actions.setPerPage(perPage))
        if(isDashboard) {
            dispatch(getTasksByUsers({users: username, pagination: {
                    perPage: perPage,
                    page: getState().task.pagination.page
                }
            }));
        } else {
            dispatch(getTasks({username: username[0], pagination: {
                    perPage: perPage,
                    page: getState().task.pagination.page
                }
            }));
        }
    }
}

const setPage = (username, page, isDashboard) => {
    return (dispatch,getState) => {
        dispatch(taskSlice.actions.setPage(page))
        if(isDashboard) {
            console.log("run at isDashboard: ", isDashboard)
            dispatch(getTasksByUsers({users: username, pagination: {
                    perPage:getState().task.pagination.perPage,
                    page: page
                }
            }));
        } else {
            dispatch(getTasks({username: username[0], pagination: {
                    perPage:getState().task.pagination.perPage,
                    page: page
                }}));
        }
    }
    
}

export {
    getTasks,
    getTasksById,
    updateTask,
    addTask,
    getTasksByUsers,
    deleteTaskById,
    setPerPage,
    setPage
};

export default taskSlice;