import { Link, NavLink } from "react-router-dom";


export default function SideBar( props ){
    return (<>
    <div>
            <h2>1조 팀 프로젝트</h2>

            <div><Link to="/">홈 (공통)</Link></div>

            <div>팀원 소개</div>
            {/* <NavLink to="이동할 경로">텍스트</NavLink> */}
            {/* 페이지 로드 (새로고침) 없다 */}
            <div><NavLink to="/t1">구현승 [카테고리 전체 조회]</NavLink></div>
            <div><NavLink to="/t2">남서은 [제품 전체 조회]</NavLink></div>
            <div><NavLink to="/t3">안병준 [제품 등록]</NavLink></div>
            <div><NavLink to="/t4">안훈석 [카테고리 등록]</NavLink></div>

            {/* <Link to="/xyz"><div>잘못된 페이지</div></Link> */}
        </div>
    </>)
}