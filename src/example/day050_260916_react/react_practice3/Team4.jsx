import axios from "axios";
import { useEffect, useState } from "react";

export default function Team4( props ){

    const [name, setName] = useState("");  
    const 등록 = async function() { 
        const response = await axios.post("https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/categories",
        {name: name});
            console.log(response.data);
            alert("카테고리 등록 완료");
            setName("");
        };


    // 공공데이터 저장
    const [tradeList, setTradeList] = useState([]);

    
    useEffect(() => {
        axios.get(
            "http://localhost:8080/practice"
        )
        .then((response) => {
            console.log(response.data);

            const item = response?.data?.body?.items?.item;

            if (Array.isArray(item)) {
                setTradeList(item);
            } else if (item) {
                setTradeList([item]);
            } else {
                console.log("items.item을 찾지 못했습니다. 실제 응답 구조를 확인하세요:", response.data);
                setTradeList([]);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }, []);



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
                <tr>
                    <th >수출입 공공데이터</th>
                    <td>
                        <table border="1">
                                    <thead>
                                        <tr>
                                            <th>연월</th>
                                            <th>국가</th>
                                            <th>품목</th>
                                            <th>HS Code</th>
                                            <th>수출액</th>
                                            <th>수입액</th>
                                            <th>무역수지</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {tradeList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.year}</td>
                                                <td>{item.statCdCntnKor1}</td>
                                                <td>{item.statKor}</td>
                                                <td>{item.hsCd}</td>
                                                <td>{item.expDlr}</td>
                                                <td>{item.impDlr}</td>
                                                <td>{item.balPayments}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </>)
}