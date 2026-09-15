import FrontComp from "./FrontComp.jsx";
import BackComp from "./BackComp.jsx";
import { useState } from "react";
function Component( props ){
    
    const [mode, setMode] = useState('both');
    const handleSetMode = (mode) => { setMode(mode); };

    let contents = '';
    if(mode==='front'){
        contents = <>
            <FrontComp onSetMode={ (mode) => {
                setMode(mode);
            }}></FrontComp>
        </>
    }
    else if(mode==='back'){
        contents = <>
            <BackComp setMode={setMode}/>
        </>
    }
    else{
        contents = <>
            <FrontComp onSetMode = { (mode) => {
                handleSetMode(mode);
            }}></FrontComp>
            <BackComp setMode = {handleSetMode} />
        </>
    }
    return(<>
        <h2><a href="/" onClick={ (e) => { e.preventDefault();
            setMode('both');
        }}>React-State</a></h2>
        <ol>
            {contents}
        </ol>
    </>)
}
export default Component;


