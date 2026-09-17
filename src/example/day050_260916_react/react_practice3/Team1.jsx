import axios from "axios";
import { useEffect, useState } from "react";

export default function Team1( props ){

    
    return (<>
        <div>
            <h2>구현승</h2>
            <table border="1" >
                <tbody>
                <tr>
                    <th>학과</th>
                    <td>글로벌물류학부</td>
                </tr>
                <tr>
                    <th >자기소개</th>
                    <td>안녕하세요 자기소개입니다.</td>
                </tr> 
                <tr>
                    <th >카테고리 목록</th>
                    <td>
                        {/* 여기에 작성 부탁드립니다. */}
                        <GetCategories onCategory={(data) => { console.log(data); }}/>
                    </td>
                </tr> 
                </tbody>
            </table>
        </div>
    </>)
}


function GetCategories(props) {

    const [myJSON, setMyJSON] = useState( [] );

    useEffect( () => {
        const 조회 = async () => {
            const response = await axios.get("https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/categories");
            setMyJSON(response.data);    
        };
        조회();
    }, [ ] );

    let trTag = myJSON.map((data) => {
        return (

            <li key={data.cno}>

                <a href="/" onClick={(e) => {
                        e.preventDefault();
                        props.onCategory(data);
                    }}> {data.name} </a> 
                (cno: {data.cno})
                
            </li>
        );
    });

    return (
        <ul>
            {trTag}
        </ul>
    );
}
