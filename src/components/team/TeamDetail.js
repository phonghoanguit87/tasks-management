import Banner from "../common/Banner";
import Loading from "../common/Loading";
import ToolBarMenu from "../common/ToolBarMenu";
import {useDispatch, useSelector} from "react-redux";
import {loadingSelector, teamSelector} from "../../redux/selector";
import {useEffect} from "react";
import {getTeamDetail} from "./teamSlice";

function TeamDetail () {
    const dispatch = useDispatch()
    
    const loading = useSelector(loadingSelector);
    const team = useSelector(teamSelector);
    
    useEffect(() => {
        dispatch(getTeamDetail());
    }, [dispatch, team]);
    
    return<>
        <Banner/>
        {loading && <Loading />}
        <ToolBarMenu isTeamDetail={true} isLeader={true} />
        <hr/>
        
        <div className="main mt-5">
            <div className="row mt-2">
                <div className="col-2">
                    <div className="row me-1"><span>No.</span></div>
                    <div className="row me-1">
                        <input value={team.id} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row me-1"><span>Team Name</span></div>
                    <div className="row me-1">
                        <input value={team.teamName} className="form-control" disabled={true}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row me-1"><span>Create By</span></div>
                    <div className="row me-1">
                        <input value={team.createBy} className="form-control" disabled={true}/>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="row"><span>Description</span></div>
                <div className="row">
                    <textarea value={team.description} className="form-control" rows="10" disabled={true}></textarea>
                </div>
            </div>
        </div>
        
    </>
}

export default TeamDetail;