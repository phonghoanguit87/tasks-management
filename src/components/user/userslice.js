import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../config";
import toastr from "toastr";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

const popupSwal = withReactContent(Swal)

const userSlice = createSlice({
    name:"user",
    initialState: {
        users: [],
        selectedUser: {},
    },
    reducers: {
        setSelectedUser: (state,action)=>{
            state.selectedUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserByTeamName.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserByTeamName.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUserById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(addUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
                
                popupSwal.fire({
                    html: <i>The user was added success!</i>,
                    icon: 'success'
                })
            })
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
                
                popupSwal.fire({
                    html: <i>The user was updated success!</i>,
                    icon: 'success'
                })
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
                
                popupSwal.fire({
                    html: <i>The user was deleted success!</i>,
                    icon: 'success'
                })
            })
            .addMatcher(
                (action) =>
                    [getUserByTeamName.rejected, getUserById.rejected, addUser.rejected, updateUser.rejected, deleteUser.rejected].includes(
                        action.type
                    ),
                (state, action) => {
                    state.loading = false;
                    toastr.error("The system can not load data!", "Error");
                }
            )
    }
});

const getUserByTeamName = createAsyncThunk(
    "user/getUserByTeamName",
    async (teamName) => {
        const url = `${config.apiURL}/users?teamName=${teamName}`;
        const res = await axios.get(url);

        return res.data;
    }
);

const getUserById = createAsyncThunk(
    "user/getUserById",
    async (userId) => {
        const url = `${config.apiURL}/users?id=${userId}`;
        const res = await axios.get(url);
        
        return res.data[0];
    }
);

const addUser = createAsyncThunk(
    "user/addUser",
    async (userData) => {
        const url = `${config.apiURL}/users`;
        const res = await axios.post(url, userData);

        return res.data;
    }
);

const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData) => {
        const url = `${config.apiURL}/users/${userData.id}`;
        const res = await axios.put(url, userData);
        
        return res.data[0]
    }
);

const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId) => {
        const url = `${config.apiURL}/users/${userId}`;
        const res = await axios.delete(url);
        
        return res.data
    }
);

export {getUserByTeamName, getUserById, addUser, updateUser, deleteUser};
export default userSlice;
