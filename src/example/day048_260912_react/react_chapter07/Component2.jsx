// 구조분해 : 객체/배열 안에 요소들을 각각 변수로 분해

import { useState } from "react";

// const[ name , age ] = { name:'김길리' , age:23 }
// console.log( name , age )

// const[ name , setName ] = { name:'김길리 , function setter(){} }
// console.log( name ); setName( );



// 함수 밖 변수
let 전역변수 = 0;

export default function Component2( props ){

    // 함수 안 변수
    let 지역변수 = 0;

    // 1. 전역변수 , 지역변수 증가함수 : 내부적으로는 증가 O , 화면으로는 증가 X
    const 증가함수1 = ( ) => { 전역변수++; 지역변수++; console.log( 전역변수 , 지역변수 ); }

    // 2. useState 함수 이용한 새로고침/재렌더링 ( 함수재호출 -> 함수 return )
    const[ count , setCount ] = useState(0);

    // setXXX() : 자동으로 현재 함수/컴포넌트 재실행
    const 증가함수2 = ( ) => { setCount( count+1 ) }

    // 수박 요소 1개를 갖는 배열 초기값으로 상태변수 선언
    // 3(상수101호) -> 4(상수102호) : 1 + 2 = 3(상수101호) , 리터럴은 고정값 => 상수처럼 사용
    // * : useState 상태(값)의 주소값이 변경되어야지만 새로고침된다.
    const [ array , setArray ] = useState( ['수박'] );
    // 내부적으로는 요소 추가 O , 화면으로는 요소 추가 X
//  const 증가함수3 = ( ) => { array.push('사과'); setArray(array); console.log(array); }
    // 주로 스프레드 연산자 이용하여 배열/객체 복사(주소값 새로만들기)함.
    // 스포레드 연산자 : ...객체명 , ...배열명
    const 증가함수3 = ( ) => { array.push('사과'); setArray( [...array] ); console.log(array); }

    return(<>
        <h3>상태 관리</h3>
        <h4>전역변수 : {전역변수} , 지역변수 : {지역변수}</h4>
        <button onClick={ 증가함수1 }>버튼1</button>
        <h4>상태변수:{count}</h4>
        <button onClick={ 증가함수2 }>버튼2</button>
        <h4>상태변수:{array}</h4>
        <button onClick={ 증가함수3 }>버튼3</button>
    </>)
}