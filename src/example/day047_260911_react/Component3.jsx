// Component3.jsx
// 변수 : 하나의 값을 저장하는 수
// 매개변수 : 인수를 받아서 함수 안에서 사용하는 변수
// 인수/인자 : 함수가 실행될 때, 함수에 전달하는 값

function plus1( x , y ){ }
plus1(3,4)

// 프롭스 : 상위 컴포넌트에서 하위 컴포넌트에게 전달하는 객체 props , 읽기모드
function plus2( props ){ }
plus2( { a : 3 , b : 4 } )

// -------------------------------------------------- //

// 상위요소
export default function Component3( props ){ 

    let name = "김길리";

//  return 부터 jsx 문법 구역  ,  주석 { /* */ }
//  jsx 에서는 HTML문법 {JS표현식} 
    return(<>
        {/* JSX 주석 */}
        <div>{ name }</div>
        <div>{ 10 + 20 }</div>
        {/* 마크업명 속성명="속성값" 속성명="속성값" 속성명="속성값" */}
        <input type="text" value="안녕" name="입력상자" />
        <SubComp1 name="김길리" age="23" />
        <SubComp1 name="홍길동" age="99" />
        <SubComp2 name="가나디" age="1" />
    </>)
} 

// 하위요소
function SubComp1( props ){
    console.log( props )
    return (<>
        <h4>{props.name}님 {props.age}세</h4>
    </>)
}

// 하위요소
function SubComp2({name , age}){
    return(<>
        <h4>{name}님 {age}세</h4>
    </>)
}

//  [*] 구조분해 할당 : 배열 또는 객체에서 값을 분해

//  0. props 는 객체

//  1.
//  const { name , age } = obj1 ;   // 오른쪽 객체 안에 왼쪽에 각 속성값들을 변수/상수에 값 대입
//  console.log(name)
//  console.log(age)

//  2. 
//  const [ name2 , ...array2 ] = obj2;   // 오른쪽 배열 안에 순서대로 값들을 변수/상수에 대입
//  console.log(name2)
//  console.log(array2)  // 나머지(그외) 