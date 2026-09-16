// 자동완성 기능 사용
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import TopNavi from "./TopNavi";
import NotFound from "./NotFound";
import CommonLayout from "./CommonLayout";
import LayoutIndex from "./LayoutIndex";
import RouterHooks from "./RouterHooks";

export default function App( props ){
    return (<>

    {/* <Routes> 에 들어가는 경로들은 주소정의에 따라 렌더링 */}
    <TopNavi></TopNavi>
    <Routes>
        {/* <Route path="/도메인 이후 주소 정의" element={<컴포넌트></컴포넌트>}> */}
        <Route path="/" element={<Home/>}></Route>
        <Route path="/intro" element={<CommonLayout></CommonLayout>}>
            <Route index element={<LayoutIndex></LayoutIndex>}></Route>
            <Route path="router" element={<RouterHooks></RouterHooks>}></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
    </>)
}