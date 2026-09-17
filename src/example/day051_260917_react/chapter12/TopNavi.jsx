import { NavLink } from "react-router-dom";

export default function TopNavi( props ){
    return (<>
        <nav>
            <NavLink to="/">생명주기</NavLink>
            <NavLink to="/local">내부통신</NavLink>
            <NavLink to="/external">외부통신</NavLink>
        </nav>
    </>)
}