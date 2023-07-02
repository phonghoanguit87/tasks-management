import { useDispatch, useSelector } from "react-redux"
import {currentUrlSelector, loginSelector, paginationSelector, usersSelector} from "../../redux/selector"
import {setPerPage, setPage} from "../task/taskSlice";

function Pagination() {
    const dispatch = useDispatch();
    const pagination = useSelector(paginationSelector);
    const userlogined = useSelector(loginSelector);
    const currentUrl = useSelector(currentUrlSelector);
    const isDashboard = currentUrl === "/dashboard";
    const users = useSelector(usersSelector);
    let usersParam = [userlogined.loginUser.loginName];
    if(isDashboard) {
        usersParam = users.map(user=>user.loginName);
    }
    
    const selectPerPage = (e)=>{
        dispatch(setPage(usersParam, 1, isDashboard));
        dispatch(setPerPage(usersParam, e.target.value, isDashboard));
    }
    
    const perPage = parseInt(pagination.perPage);
    const totalRecord = parseInt(pagination.totalRecord);
    const page = parseInt(pagination.page);
    const numberOfPage = Math.floor(totalRecord / perPage) + ((totalRecord % perPage === 0) ? 0 : 1);
    const pageArray = [];
    for (let i = 0; i < numberOfPage; i++) pageArray.push(i+1);
    
    return <div className="row">
        <div className="col-4">
            <select onChange={selectPerPage} className="form-select">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
        <div className="col-8">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    {pageArray.map(item=>
                        <li key={item} className={"page-item " + ((page === item) ? "active" : "")}>
                            <button onClick={()=>dispatch(setPage(usersParam, item, isDashboard))} className="page-link">{item}</button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    </div>
}

export default Pagination;