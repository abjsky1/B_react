import axios from "axios";
import { useState } from "react";

export default function Team4( props ){

    const [name, setName] = useState("");  
    const 등록 = async function() { 
        const response = await axios.post("https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/categories",
        {name: name});
            console.log(response.data);
            alert("카테고리 등록 완료");
            setName("");
        };

    return (<>
        <div>
            <h2>안훈석</h2>
            <table border="1" >
                <tbody>
                <tr>
                    <th>학과</th>
                    <td>산업경영공학과</td>
                </tr>
                <tr>
                    <th >자기소개</th>
                    <td>안녕하세요, 안훈석입니다.</td>
                </tr> 
                <tr>
                    <th >기능 수행</th>
                    <td>
                        {/* 여기에 작성 부탁드립니다. */}
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value);}} placeholder="새 카테고리명"/>
                        <button onClick={등록}>등록</button>
                    </td>
                </tr> 
                </tbody>
            </table>
        </div>
    </>)
}