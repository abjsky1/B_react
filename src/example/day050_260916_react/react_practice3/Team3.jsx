import axios from "axios";
import { useEffect, useState } from "react";

export default function Team3( props ){

    const [input1 , setInput1] = useState('');
    const [input2 , setInput2] = useState('');
    const [input3 , setInput3] = useState('');

    const 제품등록 = async (e) => {
        e.preventDefault();
        const body = { name : input1    ,
                        price : input2  ,
                        cno : input3     };
    
        const responce = await axios.post("https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/products" , body);
    
        console.log(responce.data);
        alert("제품 등록 완료");
        setInput1("");
        setInput2("");
        setInput3("");
    }




    const [ myJSON , setMyJSON ] = useState( [] );
    
//  useEffect( ( ) => { 하고싶은코드 } , [ ] )  :  최초 1번만 실행
    useEffect( ( ) => {

//  AXIOS 이용하여 API 통신 하고 응답결과 상태변수에 저장

//      AXIOS 사용 방법 : await axios.HTTP메소드명( "통신할주소" , body값 );        

        const fetchData = async ( ) => {
            const response = await axios.get("http://localhost:8080/t3if");
            
            console.log("통신 결과 : ", response.data);

            const data = response.data;

            setMyJSON(data.body.items.item);

        }; fetchData(); }, [] );



//  현재 상태변수에 존재하는 리스트들을 tr 로 구성하여 하나씩 html 만들기
    let trTag = <td>데이터를 불러오는 중이거나 데이터가 없습니다.</td>;

//  myJSON에 데이터가 담겨있는 경우에만 테이블을 생성합니다.
    if (myJSON && myJSON.length > 0) {
        // 첫 번째 데이터의 속성명(Key)들을 추출하여 테이블 헤더(th)로 사용합니다.
        const keys = Object.keys(myJSON[0]);

        trTag = (
            <td>
                <table border="1">
                    <thead>
                        <tr>
                            {/* 헤더 반복 출력 */}
                            {keys.map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* 데이터 행 반복 출력 */}
                        {myJSON.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                {/* 각 행의 속성값(Value)들만 추출하여 td 반복 출력 */}
                                {Object.values(data).map((value, colIndex) => (
                                    <td key={colIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </td>
        );
    }
        



    return (<>

        
        <div>
            <h2>안병준</h2>
            <table border="1" >
                <tbody>
                    <tr>
                        <th>학과</th>
                        <td>산업경영공학과</td>
                    </tr>
                    <tr>
                        <th >자기소개</th>
                        <td>안녕하세요, 안병준입니다.</td>
                    </tr> 
                    <tr>
                        <th >제품 등록 폼</th>
                        <td>
                            {/* 여기에 작성 부탁드립니다. */}
                            <form onSubmit={제품등록}>
                            <div><input name="name" value={input1} onChange={ (e) => {setInput1(e.target.value);} } placeholder="제품명 (예: 기계식 키보드)" /></div>
                            <div><input name="price" value={input2} onChange={ (e) => {setInput2(e.target.value);} } placeholder="가격 (예: 45000)" /></div>
                            <div><input name="cno" value={input3} onChange={ (e) => {setInput3(e.target.value);} } placeholder="카테고리 번호(cno) (예: 1)" /></div>
                            <div><input type="submit" value="등록"  /></div>
                        </form>
                        </td>
                    </tr> 
                    <tr>
                        <th >해양환경</th>
                        {trTag}
                    </tr> 
                </tbody>
            </table>
        </div>
    </>)
}

