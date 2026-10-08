import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react"
import './ChatRoom.css'
import Notice from "./Notice";
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


//  [기존코드] 컴포넌트 최초 실행시 접속 버튼과 상관없이 자동으로 'general' 방에 접속하던 코드
/*
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
*/

//  [문제] 접속 버튼을 누르기도 전에 서버와 연결되고 , 'general' 방에 접속하면 같은 메세지가 2번씩 출력될 수 있음
//  [원인] 이 useEffect 는 페이지가 열리자마자 'general' 방에 자동으로 접속/구독함
//          connect 함수(접속 버튼)에서 만드는 소켓과 별개로 소켓이 1개 더 생김 → 소켓 2개
//          clientRef.current 도 이 소켓을 가리키고 있어서 전송/퇴장이 접속 버튼으로 만든 소켓이 아닌 이 소켓으로 처리됨
//          'general' 방에 접속하면 두 소켓이 같은 방을 구독 → 같은 메세지를 2번 받음
//  [해결] 접속은 connect 함수(접속 버튼)에서만 하고 , useEffect 는 컴포넌트가 사라질 때 소켓 닫기만 담당
    useEffect( () => {
    //  만약 컴포넌트가 사라지면(생명주기) 소켓 닫기
        return () => { if( clientRef.current != null ){ clientRef.current.deactivate(); } }
    }, [] )



//  2. 전송시 백엔드에게 메세지 보내기
    const sendMessage = (e) => {
        
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
        const info = { type : 'TALK' , roomId , sender , content : message , date : new Date().toLocaleTimeString() };

        clientRef.current.publish({
            destination : "/pub/chat/message" ,
            body : JSON.stringify( info )
        })

    //  [추가] 전송 후 입력창 비우기
    //  [이유] 기존에는 전송 후에도 입력한 내용이 그대로 남아있어서 직접 지워야 했음
        setMessage("");

    }


    // 방 접속 여부 
    const [isConnected, setIsConnected] = useState(false);
    // 입력받은 방
    const [roomId , setRoomId] = useState('');
    // 접속자(닉네임)
    const [sender , setSender] = useState('');
    
    // 접속 함수
    const connect = () => {
        const client = new Client( { 
        //  스프링의 'registerStompEndpoints' 정의 주소와 일치
            brokerURL : "ws://localhost:8080/ws-chat" , 
        //  특정 경로 구독 신청
        //  onConnect : () => { client.subscribe( " 구독 경로 " , ( message ) => { 메세지 받았을 때 }) }
        //  * JSON.parse( 문자열 -> JS객체 변환 ) vs JSON.stringify( JS객체 -> 문자열 변환 )
        //  * AXIOS 통신은 JSON 기본값으로 자동 변환 지원
            onConnect : () => {
            //  접속 상태 변경
                setIsConnected(true); 
                client.subscribe( `/sub/chat/room/${roomId}` , ( message ) => {
                        setMessages( ( prev ) => [ ...prev , JSON.parse( message.body ) ] );
                    }
                );
            
            //  입장 메세지 발행
            //  [기존코드]
            //  body : JSON.stringify( { type : 'ENTER' , roomId , sender , content : '' , date : new Date().toLocaleTimeString } )
            //  [문제] 입장 메세지에 시간이 전송되지 않음
            //  [원인] toLocaleTimeString 뒤에 ( ) 가 없어서 함수를 '실행' 한 게 아니라 '함수 자체' 를 넣음
            //          JSON.stringify 는 함수는 변환하지 않고 빼버림 → date 가 아예 전송되지 않음 → 스프링 MessageDto 의 date 는 null
            //  [해결] toLocaleTimeString( ) 로 함수를 실행해서 '시간 문자열' 을 넣음
                client.publish({
                    destination : "/pub/chat/message" ,
                    body : JSON.stringify( { type : 'ENTER' , roomId , sender , content : '' , date : new Date().toLocaleTimeString() } )
                });
            }
        } );

    //  [기존코드]
    //  ( 없음 ) → new Client( { ... } ) 로 소켓 객체만 만들고 함수가 끝남

    //  [문제] 접속 버튼을 눌러도 채팅방 화면으로 넘어가지 않음 ( 그래서 퇴장 버튼도 누를 수 없음 )
    //  [원인] new Client( ) 는 소켓 '객체를 만들기만' 하고 실제 서버 연결은 하지 않음
    //          client.activate( ) 를 호출해야 서버와 연결이 시작되고 → 연결 성공시 onConnect 실행
    //          activate( ) 가 없으니 onConnect 가 실행되지 않음 → setIsConnected(true) 도 실행 안 됨 → 화면 그대로
    //          또 clientRef.current 에 저장하지 않아서 sendMessage , disconnect 함수에서 이 소켓을 사용할 수 없음
    //  [해결] client.activate( ) 로 연결 시작 + clientRef.current 에 저장
    //  stomp 실행
        client.activate();
    //  client 객체를 다른 함수(전송/퇴장 함수)에서 사용하기 위해
        clientRef.current = client;
    };

    // 퇴장 함수
    const disconnect = () => {

    //  [추가] 소켓이 없거나 연결이 안 된 상태면 실패 ( sendMessage 와 동일 )
    //  [이유] 연결 안 된 상태에서 publish( ) 를 호출하면 'There is no underlying STOMP connection' 에러 발생
        if( clientRef.current == null || !clientRef.current.connected ){ return ;}

    //  [기존코드]
    //  body : JSON.stringify( { type : 'QUIT' , roomId , sender , content : '' , date : new Date().toLocaleTimeString } )
    //  [문제/원인] 입장 메세지와 같음 → ( ) 가 없어서 함수 자체가 들어가고 , JSON.stringify 가 빼버려서 date 가 전송되지 않음
    //  [해결] toLocaleTimeString( ) 로 함수 실행
        clientRef.current.publish({
            destination : "/pub/chat/message" ,
            body : JSON.stringify( { type : 'QUIT' , roomId , sender , content : '' , date : new Date().toLocaleTimeString() } )
        })

    //  소켓 닫기
        clientRef.current.deactivate();
    //  [추가] 소켓을 닫았으니 참조도 비우기 ( 다시 접속하면 connect 에서 새 소켓 저장 )
        clientRef.current = null;
    //  상태변수 초기화
        setIsConnected(false);
    //  [기존코드]
    //  setMessage([]);
    //  [문제] 퇴장 후 다시 접속하면 이전 방의 메세지들이 그대로 남아있음
    //  [원인] setMessage 는 '입력창' 상태 , setMessages 는 '메세지 목록' 상태 → s 하나 차이로 다른 상태를 바꿈
    //          입력창 상태에 빈 배열 [] 이 들어가고 , 메세지 목록은 초기화되지 않음
    //  [해결] setMessages([]) 로 메세지 목록 초기화
        setMessages([]);

    };

    return (

        <div>

            { !isConnected ? (
                <div>
                    <input value={ roomId } placeholder="방제목/번호 입력" onChange={ (e) => { setRoomId( e.target.value ) } } />
                    <input value={ sender } placeholder="채팅 닉네임 입력" onChange={ (e) => { setSender( e.target.value ) } } />
                    <button type="button" onClick={ connect }>접속</button>
                </div>
            ) : (

            //  [기존코드]
            //  ) : (
            //      <h3>Chat-Room</h3>
            //      { messages.map( ... ) }
            //      <input ... />
            //      <button ...>전송</button>
            //  ) }

            //  [문제] BabelError : Unexpected token, expected ","  → 화면이 아예 안 뜸
            //  [원인] 삼항연산자 ( 조건 ? (A) : (B) ) 의 A , B 자리에는 '값(표현식)' 이 딱 1개만 들어갈 수 있음
            //          <h3> , { messages.map } , <input> , <button> 4개가 부모 없이 나란히 있어서 값이 여러 개가 됨
            //          Babel 은 <h3>Chat-Room</h3> 까지를 값 1개로 읽고 , 바로 뒤에 { 가 나오니까
            //          "값을 더 쓰려면 쉼표(,) 가 필요하다" 고 판단해서 expected "," 에러 발생
            //          * 위쪽 ? ( ) 부분은 <div> 로 감싸져 있어서 값이 1개 → 에러 없음
            //  [해결] 여러 마크업을 <> </> ( Fragment , 프래그먼트 ) 로 감싸서 1개의 값으로 만듦
            //          <div> 로 감싸도 되지만 , <> </> 는 실제 화면(HTML)에 불필요한 태그를 만들지 않음
            //  * 여기는 JSX 마크업 밖( JS 영역 ) 이라서 {/* */} 가 아닌 // 주석 사용
            //    ( {/* */} 를 <> 앞에 쓰면 그것도 값 1개로 취급되어 똑같은 에러 발생 )
                <>
                    <h3>Chat-Room</h3>

                    {/* [기존코드] */}
                    {/* <b>방제목:{roomId} / 접속자 : {sender}</b> */}
                    {/* <button type="button" onClick={ disconnect }>퇴장</button> */}
                    {/* { messages.map( ... ) } */}
                    {/* <input ... /> */}
                    {/* <button ...>전송</button> */}
                    {/* → 감싸는 div 없이 모든 마크업이 최상위 div 바로 아래에 나란히 있었음 */}

                    {/* [문제] 접속 전 화면은 CSS 가 잘 나오는데 , 접속 후 채팅방 화면에는 CSS 가 하나도 적용되지 않음 */}
                    {/* [원인] ChatRoom.css 는 class 이름이 아니라 '마크업 구조(위치)' 로 요소를 찾는 선택자를 사용함 */}
                    {/*        body > #root > div > div:has(b)         : b 를 가진 div ( 채팅방 전체를 감싸는 div ) */}
                    {/*        ... > div:has(b) > div:nth-child(1)     : 그 안의 1번째 div ( 방제목 + 퇴장 버튼 ) */}
                    {/*        ... > div:has(b) > div:nth-child(2)     : 그 안의 2번째 div ( 메세지 목록 ) */}
                    {/*        ... > div:has(b) > div:nth-child(3)     : 그 안의 3번째 div ( 입력창 + 전송 버튼 ) */}
                    {/*        기존 코드에는 b 를 감싸는 div 도 , 1/2/3번째 div 도 없음 → 선택자에 맞는 요소가 없음 → CSS 적용 안 됨 */}
                    {/*        * 선택자 뜻 →  > : 바로 아래 자식  ,  :has(b) : b 를 가지고 있는  ,  :nth-child(n) : n번째 자식 */}
                    {/* [해결] CSS 선택자 구조에 맞게 div 로 감싸기 */}
                    {/*        h3 는 감싸는 div 밖에 둠 → 안에 넣으면 h3 가 1번째 자식이 되어서 nth-child 순서가 1칸씩 밀림 → 다시 적용 안 됨 */}
                    {/*        * JSX 주석은 실제 마크업이 생기지 않아서 nth-child 순서에 영향 없음 */}
                    <div>
                    {/* 1번째 div : 방제목 + 퇴장 버튼 */}
                        <div>
                            <b>방제목:{roomId} / 접속자 : {sender}</b>
                            <button type="button" onClick={ disconnect }>퇴장</button>
                        </div>
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
                    {/* 2번째 div : 메세지 목록 */}
                        <div>
                            { messages.map( ( msg , index ) => ( <div key={ index }>
                            {/* [기존코드] 상대방이 보낸 메세지 */}
                            {/* ( <div><small>{msg.sender}</small><div><span>{msg.content}</span><p>{msg.date}</p></div></div> ) */}
                            {/* [문제] 상대방 메세지의 시간이 작은 회색 글씨로 안 나오고 , 일반 문단처럼 크게 + 위아래 여백까지 생김 */}
                            {/* [원인] CSS 는 상대방 시간을 time 태그로 찾음 ( ... div:has(small) > div > div > time ) → p 태그라서 적용 안 됨 */}
                            {/*        * 또 CSS 는 '내 메세지' 를 div:has(p) ( p 를 가진 div ) 로 구분함 */}
                            {/*          상대방 메세지에 p 가 있으면 '내 메세지' 규칙까지 같이 걸려서 스타일이 꼬임 */}
                            {/* [해결] 상대방 메세지의 시간을 p → time 으로 변경 ( 내 메세지와 같은 태그 ) */}
                                { msg.type === 'TALK'
                                    ? msg.sender === sender
                                    //  내가 보낸 메세지 → CSS : div:has(p)
                                        ? ( <div> <time>{msg.date}</time><p>{msg.content}</p></div> )
                                    //  상대방이 보낸 메세지 → CSS : div:has(small)
                                        : ( <div><small>{msg.sender}</small><div><span>{msg.content}</span><time>{msg.date}</time></div></div> )
                                //  입장/퇴장 메세지 → CSS : div > i
                                    : ( <i>{msg.content}</i> ) }
                            </div> ) ) }
                        </div>


                    {/* 3번째 div : 입력창 + 전송 버튼 */}
                        <div>
                            <input value={ message } onChange={ (e) => setMessage(e.target.value) }  />
                            <button type="button" onClick={ sendMessage }>전송</button>
                        </div>
                    </div>
                </>

            ) }

            <Notice></Notice>
        </div>

    )
}