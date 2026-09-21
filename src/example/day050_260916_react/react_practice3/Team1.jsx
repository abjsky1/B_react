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
                    <tr>
                        <th> 기능수행</th>
                        <td>
                            {/* 여기에 작성 부탁드립니다. */}
                            <Aaa onCategory={(data) => { console.log(data); }}/>
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


function Aaa(props) {

    const [myJSON, setMyJSON] = useState([]);

    useEffect(() => {

        const 조회 = async () => {

            const response = await axios.get(
                "http://localhost:8080/koo",
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            console.log(response.data);

            // 실제 기업 목록 배열
            setMyJSON(response.data.data);
        };

        조회();

    }, []);


        return (

        <table border="1">

            <thead>

                <tr>
                    <th>회사명</th>
                    <th>주소</th>
                    <th>고용인원</th>
                    <th>매출액</th>
                    <th>비고</th>
                </tr>

            </thead>


            <tbody>

                {
                    myJSON.map((data, index) => {

                        return (

                            <tr key={index}>

                                <td>
                                    {data["회사명"]}
                                </td>

                                <td>
                                    {data["주소"]}
                                </td>

                                <td>
                                    { data["고용인원(명)"] === null ? "정보없음" : data["고용인원(명)"] + "명" }
                                </td>

                                <td>
                                    {data["매출액(억원)"]}
                                </td>

                                <td>
                                    {   
                                        data["비고"] === null
                                        ? "-"
                                        : data["비고"]
                                    }
                                </td>

                            </tr>

                        );

                    })
                }

            </tbody>

        </table>

    );
}