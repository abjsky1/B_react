export default function NotFound( props ){

    return (<>
        <h2>Not Found</h2>
        <p>
            페이지를 찾을 수 없음.
            <Link to="/list">목록바로가기</Link>
        </p>
    </>);
}