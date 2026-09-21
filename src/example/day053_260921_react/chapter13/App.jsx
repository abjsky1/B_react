import { Route, Routes } from "react-router-dom";
import TopNavi from "./TopNavi";
import UseRefExam1 from "./UseRefExam1";
import UseRefExam2 from "./UseRefExam2";
import UseMemoExam from "./UseMemoExam";

export default function App( props ){
    return (<>
        <TopNavi></TopNavi>
        <Routes>
            <Route path="/" element={<UseRefExam1/>} />
            <Route path="/use-ref1" element={<UseRefExam1/>} />
            <Route path="/use-ref2" element={<UseRefExam2/>} />
            <Route path="/use-memo" element={<UseMemoExam/>} />
            {/* <Route path="/use-callback" element={<UseCallbackExam/>} /> */}
            {/* use-id 는 안 함. */}
            {/* <Route path="/use-id" element={<UseIdExam/>} /> */}
        </Routes>
    </>)
}