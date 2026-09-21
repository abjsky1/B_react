export default function NavEdit( props ){
    return (<>
        <nav>
            <a href="/" onClick={function(e){e.preventDefault(); props.onBack();}}>뒤로</a>&nbsp;
            <a href="/" onClick={function(e){e.preventDefault(); props.onChangeMode();}}>목록</a>
        </nav>
    </>)
}