import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import toastr from "toastr";
import {config} from "../../config";

const LEAER_ROLE = "leader";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        loading: false,
        currentUrl: "",
        loginInfo: {
            loginUser: {},
            isLogin: false,
            isLeader: false,
        },
    },
    reducers: {
        setCurrentUrl: (state,action)=>{
            state.currentUrl = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoginAuthor.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getLoginAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.loginInfo.loginUser = action.payload.data;
                state.loginInfo.isLogin = action.payload.isLogin;
                state.loginInfo.isLeader = action.payload.isLeader;
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

        const url = `${config.apiURL}/users?loginName=${user.loginName}`;
        let isLogin = false;
        let loginUser = {};
        let isLeader = false;
        try {
            const resp = await axios.get(url);

            if (resp.data[0].password === user.password) {
                loginUser = resp.data[0];
                isLogin = true;
            }
            
            if (resp.data[0].role === LEAER_ROLE) {
                isLeader = true;
            }
        } catch (error) {
            console.error(error);
        }
        
        return {
            data: loginUser,
            isLogin: isLogin,
            isLeader: isLeader,
        }
    }
);

export {getLoginAuthor};

export default commonSlice;