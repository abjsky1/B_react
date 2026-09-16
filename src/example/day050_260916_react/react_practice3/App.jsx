import { Route, Routes } from "react-router-dom";
import "./index.css"
import SideBar from "./SideBar";
import Team1 from "./Team1"
import Team2 from "./Team2"
import Team3 from "./Team3"
import Team4 from "./Team4"
import NotFound from "./NotFound";


export default function App( props ){
    return (<>
    <div id="sidebarMake">
        <SideBar></SideBar>
        <Routes>
            <Route path="/" element={<NotFound></NotFound>}></Route>
            <Route path="/t1" element={<Team1></Team1>}></Route>
            <Route path="/t2" element={<Team2></Team2>}></Route>
            <Route path="/t3" element={<Team3></Team3>}></Route>
            <Route path="/t4" element={<Team4></Team4>}></Route>
        </Routes>
    </div>
    
    {/* <Routes> 에 들어가는 경로들은 주소정의에 따라 렌더링 */}
    
    {/* <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/intro" element={<CommonLayout></CommonLayout>}>
            <Route index element={<LayoutIndex></LayoutIndex>}></Route>
            <Route path="router" element={<RouterHooks></RouterHooks>}></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes> */}
    
    </>)
}