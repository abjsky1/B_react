export default function NavWrite( props ){
    return (<>
        <nav>
            <a href="/" onClick={function(e){e.preventDefault(); props.onChangeMode();}}>목록</a>
        </nav>
    </>);
}