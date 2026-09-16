import { Link, NavLink } from "react-router-dom";

export default function TopNavi( props ){
    return (<>
        <div>
            {/* html 링크 마크업 <a href="/">HOME</a> */}
            {/* 페이지 로드 (새로고침) 있다 */}
            <a href="/">HOME</a>

            {/* <NavLink to="이동할 경로">텍스트</NavLink> */}
            {/* 페이지 로드 (새로고침) 없다 */}
            <NavLink to="/intro">인트로</NavLink>
            <NavLink to="/intro/router">라우터 관련 훅</NavLink>
            <Link to="/xyz">잘못된 주소</Link>
        </div>
    </>)
}