const loginSelector = state=>state.common.loginInfo;
const currentUrlSelector = state=>state.common.currentUrl;
const taskListSelector = state=>state.task.taskList;
const loadingSelector = state=>state.task.loading;
const selectTaskSelector = state=>state.task.selectTask;


export {
    loginSelector,
    currentUrlSelector,
    taskListSelector,
    loadingSelector,
    selectTaskSelector
};