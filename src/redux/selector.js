const loginSelector = state=>state.common.loginInfo;
const taskListSelector = state=>state.task.taskList;
const loadingSelector = state=>state.task.loading;
const selectTaskSelector = state=>state.task.selectTask;


export {
    loginSelector,
    taskListSelector,
    loadingSelector,
    selectTaskSelector
};