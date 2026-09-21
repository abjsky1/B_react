import { useEffect, useRef } from "react";

export default function UseRefExam2( props ){

    const passRef1 = useRef();
    const passRef2 = useRef();


/*
    useEffect( () => {} , [] ) 컴포넌트 생성시 최초 1번 실행
    useEffect( () => {} ) 컴포넌트 생성시 최초 1번 실행 + 재렌더링마다 실행
    useEffect( () => {} , [state변수명] ) 컴포넌트 생성시 최초 1번 실행 + 특정한 state 변경시 재렌더링 실행
*/
    useEffect( () => {
        console.log('passRef' , passRef1 , passRef2);
        passRef1.current.focus();
    } , []);

    const checkPassword = () => {
        if(!passRef1.current.value || passRef2.current.value==''){
            alert('비밀번호를 입력해주세요');
            passRef1.current.focus();  // .focus() : 해당 dom 에 마우스(깜빡)커서 두기
            return;
        }
        if(passRef1.current.value===passRef2.current.value){
            alert('비밀번호 확인이 완료되었습니다.');
        }
        else{
            alert('비밀번호가 일치하지 않습니다.');
            passRef1.current.value = '';
            passRef2.current.value = '';
            passRef1.current.focus();
        }
    }

    return (<>
        <h2>useRef 사용하기</h2>
        <form>
            패스워드1 : <input type="text" ref={passRef1} name="pass1" /> <br />
            패스워드2 : <input type="text" ref={passRef2} name="pass2" /> <br />
            <button type="button" onClick={checkPassword}>패스워드확인</button>
        </form>
    </>)

}

/*
    입력상자 안에 입력받은 값 제어

    1. useState

        const [title , setTitle] = useState('');

        <input value={ title } onChange={ ( e ) => { setTitle( e.target.value ) } } />

    2. useRef

        const titleRef = useRef('');

        <input ref={ titleRef }

    3. form

        const formRef = useRef('');

        <form ref={formRef}></form>
*/