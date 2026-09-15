import FrontComp from "./FrontComp.jsx";
import BackComp from "./BackComp.jsx";
function Component1( props ){
    
    return(<>
        <h2>React-Modules</h2>
        <ol>
            <FrontComp onMyEvent1={()=>{alert('프론트엔드 클릭됨(부모전달)')}}></FrontComp>
            <BackComp onMyEvent2={(msg)=>{alert(msg)}}></BackComp>
            {/*  msg : '백엔드 클릭됨(자식전달)'  */}
        </ol>
    </>)
}
export default Component1;