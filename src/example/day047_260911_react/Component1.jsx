/*
    1. 컴포넌트명.jsx 파일 생성

    2. export default function 컴포넌트명( props ){ }

        2-0. props : 상태/데이터
        
        2-1. export default : 다른 파일에서 import 할 수 있도록 내보내기  

        2-2. 내부에서 사용하는 컴포넌트는 생략 가능

        2-2. 컴포넌트명 : 첫글자 무조건 대문자로 시작

    3. { } 안에 return 에서는 JSX 문법 가능 , 그 외 JS 문법

        3-1. return 에서는 2줄 이상 입력시 ( <> <> ) 묶는다.
*/

// 헤더
function Header( props ){       
    
    return <div>헤더구역</div>

}

// 본문
export default function Component1( props ){    

    return (<>
        <Header></Header>
        <div>메인페이지</div>
        <Footer></Footer>
    </>)

}

// 푸터
function Footer( props ){

    return <div>푸터구역</div>

}

