import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "../components/common/commonSlice";
import taskSlide from "../components/task/taskSlice";
import teamSlice from "../components/team/teamSlice";
import userSlice from "../components/user/userslice";

const store = configureStore({
    reducer: {
        common: commonSlice.reducer,
        task: taskSlide.reducer,
        team: teamSlice.reducer,
        user: userSlice.reducer,
    },
})

export default store;