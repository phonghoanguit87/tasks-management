import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../config";
import toastr from "toastr";

const userSlice = createSlice({
    name:"user",
    initialState: {
        users: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserByTeamName.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserByTeamName.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUserByTeamName.rejected, (state, action) => {
                state.loading = false
                toastr.error("The system can not load data!", "Error");
            })
            .addCase(addUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                toastr.error("The system can not load data!", "Error");
            })
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

const addUser = createAsyncThunk(
    "user/addUser",
    async (userData) => {
        const url = `${config.apiURL}/users`;
        const res = await axios.post(url, userData);
        
        return res.data
    }
);

export {getUserByTeamName};
export default userSlice;
