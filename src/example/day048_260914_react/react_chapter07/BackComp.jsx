const BackComp = ({setMode}) => {
    return(<>
        <li><a href="/" onClick={(e) => {
            e.preventDefault(); 
            setMode('back')}}>백엔드</a></li>
        <ul>
            <li>Java</li>
            <li>Oracle</li>
            <li>JSP</li>
            <li>Spring Boot</li>
        </ul>
    </>)
}
export default BackComp;


