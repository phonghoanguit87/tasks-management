const loginSelector = state=>state.common.loginInfo;
const currentUrlSelector = state=>state.common.currentUrl;
const taskListSelector = state=>state.task.taskList;
const loadingSelector = state=>state.task.loading;
const selectTaskSelector = state=>state.task.selectTask;
const userTaskListSelector = state=>state.task.userTaskList;
const paginationSelector = state=>state.task.pagination;
const usersSelector = state=>state.user.users;
const teamSelector = state=>state.team.teamInfo;

export {
    loginSelector,
    currentUrlSelector,
    taskListSelector,
    loadingSelector,
    selectTaskSelector,
    userTaskListSelector,
    paginationSelector,
    usersSelector,
    teamSelector
};