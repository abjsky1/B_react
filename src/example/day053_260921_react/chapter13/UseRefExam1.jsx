import { useRef, useState } from "react";

export default function UseRefExam1( props ){

/*

    Hook 훅 : 리액트에서 만든 다양한 함수들 , 컴포넌트와 연관기능
    useState , useEffect , useRef

*/

//  상태변수
    const [stateNum, setStateNum] = useState(0);

//  참조변수
    const refNum = useRef(0);
    
//  지역변수
    let myNum = 0;

//  렌더링 : 함수 재호출

    const plusState = ( ) => { 

        setStateNum(stateNum + 1);
        
        console.log('State증가' , stateNum);
    
    }

    const plusRef = ( ) => {

        refNum.current = refNum.current + 1;

        console.log('Ref증가' , refNum.current);

    }

    const plusMyNum = ( ) => {

        console.log('일반 변수증가' , ++myNum);

    }

    
    return (<>
        <h2>useRef 사용하기 1</h2>
        <div>
            <p>State : {stateNum}</p>
            <p>Ref : {refNum.current}</p>
            <p>myNum : {myNum}</p>
            <button onClick={plusState}>State증가</button>
            <button onClick={plusRef}>Ref증가</button>
            <button onClick={plusMyNum}>myNum증가</button>
        </div>
    </>)

}