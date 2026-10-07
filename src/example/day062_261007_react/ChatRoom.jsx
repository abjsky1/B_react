import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react"
// ** 웹소켓/STOMP 설치 ** //


export default function ChatRoom( props ){

//  1. useState( ) : 상태(값) 저장하고 변경시 해당 컴포넌트/함수를 재실행/재호출 지원하는 훅/라이브러리
//  const [ 변수명 , set변수명 ] = useState(초기값);
//  입력 받은 메세지
    const [ message , setMessage ] = useState("");

//  메세지들 , 서버로부터 받은 메세지들
    const [messages , setMessages ] = useState([]);


//  * useRef : 상태(값) 저장하고 다른 상태와 상관없이 새로고침/초기화 방지 => 상태 유지
    const clientRef = useRef(null);

//  * 지역변수 vs 상태(useState)변수 vs 참조(useRef)변수


//  [컴포넌트 최초 실행시 1번 실행]
    useEffect( () => {
    
        //  const client = new Client( { brokerURL : "접속할 백엔드 브로커 주소" , onConnect : 접속 성공 이벤트 })
        const client = new Client( { 
        //  스프링의 'registerStompEndpoints' 정의 주소와 일치
            brokerURL : "ws://localhost:8080/ws-chat" , 
        //  특정 경로 구독 신청
        //  onConnect : () => { client.subscribe( " 구독 경로 " , ( message ) => { 메세지 받았을 때 }) }
        //  * JSON.parse( 문자열 -> JS객체 변환 ) vs JSON.stringify( JS객체 -> 문자열 변환 )
        //  * AXIOS 통신은 JSON 기본값으로 자동 변환 지원
            onConnect : () => {
                client.subscribe( "/sub/chat/room/general" ,

                //  [기존코드]
                //  ( message ) => { messages.push( JSON.parse( message.body ) );
                //      setMessages( messages );
                //  }

                //  [문제] 서버에서 메세지는 잘 도착하는데 화면이 다시 그려지지(재렌더링) 않음
                //  [원인1] messages.push() 는 기존 배열 자체를 수정(변경)함
                //          setMessages( messages ) 에 '같은 배열(같은 주소값)' 을 다시 넣으면
                //          리액트는 이전값과 새값을 Object.is( 이전 , 새값 ) 으로 비교해서 같다고 판단 → 재렌더링 하지 않음
                //          * 리액트 상태(배열/객체)는 직접 수정하지 말고 '새로운 배열/객체' 를 만들어서 set 해야함
                //  [원인2] useEffect( ... , [] ) 는 컴포넌트 최초 실행시 1번만 실행됨
                //          그래서 이 안의 messages 는 최초 렌더링 당시의 값( [] ) 으로 고정됨 ( stale closure , 오래된 값 )
                //          → 이후 messages 가 바뀌어도 이 함수 안에서는 최신값을 볼 수 없음
                //  [해결] setMessages( ( prev ) => 새값 ) 함수형 업데이트 사용
                //          prev : 리액트가 넘겨주는 '항상 최신' 상태값
                //          [ ...prev , 새메세지 ] : 스프레드 연산자로 기존 메세지들을 복사한 '새로운 배열' 생성 → 주소값이 달라져서 재렌더링 됨
                    ( message ) => {
                        setMessages( ( prev ) => [ ...prev , JSON.parse( message.body ) ] );
                    }
                );
            }
        } );

    //  stomp 실행
        client.activate();

    //  client 객체를 다른 함수(전송함수)에서 사용하기 위해
        clientRef.current = client;

    //  만약 컴포넌트가 사라지면(생명주기)
        return () => { client.deactivate(); }

    }, [] )



//  2. 전송시 백엔드에게 메세지 보내기
    const sendMessage = (e) => {

        console.log("메세지 보내기")
        
    //  만약 소켓객체가 없으면 실패
    //  [기존코드]
    //  if( clientRef.current == null ){ return ;}

    //  [문제] 서버와 연결이 완료되기 전( 또는 서버가 꺼져있을 때 ) 전송 버튼을 누르면 에러 발생
    //  [원인] client 객체는 만들어져 있어도( null 아님 ) 아직 STOMP 연결이 안 된 상태일 수 있음
    //          연결 안 된 상태에서 publish() 를 호출하면 'There is no underlying STOMP connection' 에러 발생
    //  [해결] client.connected ( 연결 여부 true/false ) 도 같이 확인
        if( clientRef.current == null || !clientRef.current.connected ){ return ;}

    //  메세지 전송
    //  clientRef.current.publish({ destination : "/발행주소" , body : 내용물 })
    //  발행주소 : 스프링의 configureMessageBroker 정의된 발행주소 + @MessageMapping 정의된 주소

    //  스프링 MessageDto 참조하여 구성
        const info = { type : 'TALK' , roomId : "general" , sender : "user" , content : message , date : new Date().toLocaleString() };

        clientRef.current.publish({
            destination : "/pub/chat/message" ,
            body : JSON.stringify( info )
        })

    //  [추가] 전송 후 입력창 비우기
    //  [이유] 기존에는 전송 후에도 입력한 내용이 그대로 남아있어서 직접 지워야 했음
        setMessage("");

    }


    return (<>
        <h3>Chat-Room</h3>
        {/* [기존코드] */}
        {/* { messages.map( ( msg ) => { <div> { msg.sender } : { msg.content } </div> } ) } */}

        {/* [문제] messages 배열에 메세지가 있어도 화면에 아무것도 출력되지 않음 */}
        {/* [원인] 화살표 함수에서 => 뒤에 중괄호 { } 를 쓰면 '함수 본문(블록)' 이 되어서 return 을 직접 써야 값이 반환됨 */}
        {/*        return 이 없으니 map 이 [ undefined , undefined , ... ] 를 만들고 → 리액트는 undefined 를 아무것도 그리지 않음 */}
        {/*        ( msg ) => {  <div>..</div>  }    : 반환값 없음 ( undefined ) */}
        {/*        ( msg ) => { return <div>..</div> } : 반환 O */}
        {/*        ( msg ) => (  <div>..</div>  )    : 소괄호는 바로 반환 O ( return 생략 가능 ) */}
        {/* [추가] map 으로 여러 개의 마크업을 만들 때는 key 속성 필요 ( 없으면 콘솔에 경고 발생 ) */}
        {/*        리액트가 각 항목을 구분하기 위해 사용 , 지금은 고유 id 가 없으므로 index 사용 */}
        {/* [해결] 중괄호 { } → 소괄호 ( ) 로 변경 + key 추가 */}
        { messages.map( ( msg , index ) => ( <div key={ index }> {index} : { msg.sender } : { msg.content } : {msg.date} </div> ) ) }


        <input value={ message } onChange={ (e) => setMessage(e.target.value) }  />
        <button type="button" onClick={ sendMessage }>전송</button>

    </>)
}