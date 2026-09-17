import { Route, Routes } from "react-router-dom";
import TopNavi from "./TopNavi";
import Lifecycle from "./Lifecycle";
import ExternalApiAxios from "./ExternalApiAxios";

export default function App( props ){
    return (<>
    <TopNavi></TopNavi>
    <Routes>
        <Route path="/" element={<Lifecycle/>}></Route>
        <Route path="/external" element={<ExternalApiAxios></ExternalApiAxios>}></Route>
    </Routes>
    </>)
}

