import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import toastr from "toastr";
import {config} from "../../config";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        loading: false,
        loginInfo: {
            loginUser: {},
            isLogin: false
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLoginAuthor.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getLoginAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.loginInfo.loginUser = action.payload.data;
                state.loginInfo.isLogin = action.payload.isLogin;
            })
            .addCase(getLoginAuthor.rejected, (state, action) => {
                state.loading = false
                toastr.error("The login was broken, please re-login the system!", "Error");
            })
    }
});

const getLoginAuthor = createAsyncThunk(
    "common/getLoginAuthor",
    async (user) => {
        console.log("common/getLoginAuthor ", user);
        const url = `${config.apiURL}/users?loginName=${user.loginName}`;
        let isLogin = false;
        let loginUser;
        try {
            const resp = await axios.get(url);
            console.log("resp.data[0] --> ", resp.data[0]);
            if (resp.data[0].password === user.password) {
                loginUser = resp.data[0];
                isLogin = true;
            }
        } catch (error) {
            console.error(error);
        }
        
        return {
            data: loginUser,
            isLogin: isLogin
        }
    }
);

export {getLoginAuthor};

export default commonSlice;