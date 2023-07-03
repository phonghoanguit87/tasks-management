import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../config";
import toastr from "toastr";

const teamSlice = createSlice({
    name:"team",
    initialState: {
        teamInfo: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeamDetail.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTeamDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.teamInfo = action.payload;
            })
            .addCase(getTeamDetail.rejected, (state, action) => {
                state.loading = false
                toastr.error("The system can not load data!", "Error");
            })
    }
});

const getTeamDetail = createAsyncThunk(
    "team/getTeamDetail",
    async () => {
        const url = `${config.apiURL}/teams`;
        const res = await axios.get(url);
        
        return res.data[0];
    }
);

export {getTeamDetail};

export default teamSlice;
