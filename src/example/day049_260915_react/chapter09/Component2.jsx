/*
    입력폼 만들기

    1. submit 타입을 갖는 버튼 클릭시 form onSubmit 이벤트 발생

    2. onSubmit 발생하고 결과값을 콜백함수의 매개변수로 전달
        
        - onSubmit = { (event) => { } }
        
        - event.preventDefault();        기존의 HTTP GET 차단

        - event.target                   해당 이벤트 방생한 마크업

        - event.target.name속성명         form 내부에 특정한 마크업

        - event.target.name속성명.value   입력받은 값
*/

import { useState } from "react"

function WriteForm( props ){
    return (<>
        <form onSubmit={(e) => {console.log("이벤트객체e", e);
            e.preventDefault();

        //  부모컴포넌트로부터 전달받은 함수로부터 부모에게 전달
            let gubun = e.target.gubun.value;
            let title = e.target.title.value;

            props.writeAction(gubun, title);
        }}>
            <select name="gubun">
                <option value="front">프론트엔드</option>
                <option value="back">백엔드</option>
            </select>
            <input type="text" name="title" />
            <input type="submit" value="추가" />
        </form>
    </>)
}

export default function Component2( props ) {

    const [message , setMessage] = useState('폼값 검증 진행 중');

    let 입력받은값 = '김길리';
    const [입력받은값2 , set입력받은값2] = useState('김길리2');

    return(<>
        {/* value 에 초기화하면 재렌더링 없이 수정 불가능/불변 */}
        <input type="text" />           {/*  입력가능  */}
        <input value={입력받은값} />      {/*  입력불가능  */}
        <input value={입력받은값2} onChange={ (e) => {set입력받은값2(e.target.value);} }/>

        <div>
            <h2>React-Form</h2>
            <WriteForm writeAction={(gu, ti) => {
                console.log("Form값", gu , ti);
                if(gu!=='' && ti!==''){
                    let frmValue = `검증 완료 폼값 : ${gu}, ${ti}`;
                    setMessage(frmValue);
                }
                else{alert("빈 값 있음");}
            }}/>
            <pre>{message}</pre>
        </div>
    </>)
}