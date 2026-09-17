import axios from "axios";
import { useState } from "react";

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
                </tbody>
            </table>
        </div>
    </>)
}

