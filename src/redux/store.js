import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "../components/common/commonSlice";
import taskSlide from "../components/task/taskSlice";

const store = configureStore({
    reducer: {
        common: commonSlice.reducer,
        task: taskSlide.reducer,
    },
})

export default store;