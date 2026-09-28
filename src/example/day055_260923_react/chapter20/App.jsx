
import { Route, Routes } from "react-router-dom";
import List from "./List";
import Write from "./Write";
import NotFound from "./NotFound";

export default function App( props ){

    return (<>
        <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/write" element={<Write />} />
            {/* path="*" : 와일드카드 (모든주소) */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>)
}