import {Link} from "react-router-dom";

function Breadcrumb(props) {
    let crumbs = [{
        title: "Home",
        path: "/tasks"
    }];
    if (props.crumbs !== undefined) {
        crumbs = [...crumbs,props.crumbs];
    }
    let indexOfLastCrumbs = crumbs.length - 1;
    
    return<>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {
                    crumbs && crumbs.map((crumb, index) => {
                        if(index === indexOfLastCrumbs)
                            return <li className="breadcrumb-item active" aria-current="page">{crumb.title}</li>
                        
                        return <li className="breadcrumb-item"><Link to={crumb.path}>{crumb.title}</Link></li>
                    })
                }
            </ol>
        </nav>
    </>
}

export default Breadcrumb;