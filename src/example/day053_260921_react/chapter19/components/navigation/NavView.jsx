export default function NavView( props ){
    return (<>
        <nav>
            <a href="/" onClick={function (e) {e.preventDefault(); props.onChangeMode("list");}}>목록</a>&nbsp;
            <a href="/" onClick={function (e) {e.preventDefault(); props.onChangeMode("edit");}}>수정</a>&nbsp;
            <a href="/" onClick={function (e) {e.preventDefault(); if( window.confirm('삭제할까요?') ){ props.onChangeMode('delete'); }} }>삭제</a>
        </nav>
    </>);
}