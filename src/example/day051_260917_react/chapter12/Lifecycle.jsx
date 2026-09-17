import { useEffect, useState } from "react";

function MoveBox( props ){
    console.log('LifeCycle ==> 1. 컴포넌트 실행 ( 함수 호출 )');

//  position 상태/변수 에 50 대입 : props.initPosition : <MoveBox initPosition={50} />
    const [position , setPosition] = useState(props.initPosition);
//  leftCount 상태/변수 에 1 대입
    const [leftCount, setLeftCount] = useState(1)
    const boxStyle = {
        backgroundColor : 'red' , position : 'relative' , textAlign : 'center' ,
        width : '100px' , height : '100px' , margin : '10px' , lineHeight : '100px' , left : `${position}px`
    };

    const moveLeft = ( ) => {
        setPosition( ( ) => position - 20 )
        setLeftCount( ( ) => leftCount + 1 )
    }

    const moveRight = ( ) => {
        setPosition ( ( ) => position + 20 )
    }

//  ***** 생명주기 *****
    useEffect( ( ) => {
        console.log( 'useEffect 실행 ==> 3. 컴포넌트 마운트' )
        return ( ) => { console.log( 'useEffect 실행 ==> 4. 컴포넌트 언마운트' ) }
//  } );                    // [1] 의존성 배열 생략       : 최초 1번 실행 , 업데이트
//  } , [ ] );              // [2] 의존성 배열 공백       : 최초 1번 실행 
  } , [ leftCount ] );    // [3] 의존성 배열 특정 변수   : 최초 1번 실행 , 특정 변수 업데이트


//  LifeCycle ==> 1. 컴포넌트 실행 ( 함수 호출 )
//  return실행 ==> 2. 렌더링(return문)
//  useEffect 실행 ==> 3. 컴포넌트 마운트

//  [1]
//      LifeCycle ==> 1. 컴포넌트 실행 ( 함수 호출 )
//      return실행 ==> 2. 렌더링(return문)
//      useEffect 실행 ==> 4. 컴포넌트 언마운트
//      useEffect 실행 ==> 3. 컴포넌트 마운트

//  [2]
//      LifeCycle ==> 1. 컴포넌트 실행 ( 함수 호출 )
//      return실행 ==> 2. 렌더링(return문)

//  [3]
//  left :
//      LifeCycle ==> 1. 컴포넌트 실행 ( 함수 호출 )
//      return실행 ==> 2. 렌더링(return문)
//      useEffect 실행 ==> 4. 컴포넌트 언마운트
//      useEffect 실행 ==> 3. 컴포넌트 마운트

//  right :
//      LifeCycle ==> 1. 컴포넌트 실행 ( 함수 호출 )
//      return실행 ==> 2. 렌더링(return문)




    console.log('return실행 ==> 2. 렌더링(return문)');

    return (<>
        <div>
            <h4>함수형 컴포넌트의 생명주기</h4>
            <div style={boxStyle}>{leftCount}</div>
            <input type="button" value="좌측이동" onClick={moveLeft} />
            <input type="button" value="우측이동" onClick={moveRight} />
        </div>
    </>)

}

export default function Lifecycle( props ){
    return (<>
        <h2>React Hook - useEffect</h2>
        <MoveBox initPosition={50} />
    </>)
}