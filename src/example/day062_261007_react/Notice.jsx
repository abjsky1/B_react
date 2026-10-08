import { useEffect, useState } from "react";

export default function Notice( props ){

    const [notices , setNotices] = useState([]);

    useEffect( () => {

    //  SSE 구독 신청 , 내장 라이브러리(EventSource)
        const eventSource = new EventSource("http://localhost:8080/api/sse/subscribe");

    //  구독 중에 서버가 메세지를 보내오면 수신 이벤트
    //  eventSource.addEventListener( '이벤트 이름' , (e) => { 메세지 받았을 때 } )
    //  스프링 서비스에 SseEmitter.event().name("식별명")
        eventSource.addEventListener( 'notice' , (e) => { 

        //  받은 메세지의 내용은 e.data 확인 가능
        //  id : 난수 (삭제용) , text (받은 내용물) 
            const newNotice = {id : Math.random() , text : e.data }

        //  상태에 저장
        //  [기존코드]
        //  notices.push( newNotice );
        //  setNotices( [...notices] );

        //  [문제] X 버튼으로 알림을 삭제해도 , 다음 알림이 오면 삭제했던 알림들이 다시 나타남
        //  [원인] useEffect( ... , [] ) 는 최초 1번만 실행 → 이 안의 notices 는 '최초 렌더링 당시의 배열' 로 고정됨 ( stale closure )
        //          removeNotice 에서 filter 로 '새 배열' 을 만들어 상태를 바꿔도 , 여기의 notices 는 여전히 예전 배열을 가리킴
        //          예전 배열에는 삭제한 알림들이 그대로 남아있음 → push + 복사하면 삭제한 알림이 되살아남
        //          * notices.push( ) 처럼 상태 배열을 직접 수정하는 것도 리액트에서 하면 안 되는 방법
        //  [해결] setNotices( ( prev ) => 새값 ) 함수형 업데이트 사용 ( ChatRoom.jsx 의 setMessages 와 같은 방법 )
        //          prev : 리액트가 넘겨주는 '항상 최신' 상태값 → 삭제가 반영된 최신 배열에 새 알림 추가
            setNotices( ( prev ) => [ ...prev , newNotice ] );
        } )

    //  컴포넌트 사라질 때
        return () => { 

        //  SSE 닫기
            eventSource.close(); 

        } 

    } , [])

//  알림 삭제함수
    const removeNotice = (id) => {

    //  const 새로운리스트 = 리스트.map( ( 반복변수 ) => { return 값; } )
    //  const 새로운리스트 = 리스트.filter( ( 반복변수 ) => { return 조건식; } )
    //  만약에 살제할 id 와 같지 않으면 새로운 리스트로 구성하여 렌더링
        setNotices( notices.filter( (notice) => notice.id !== id ));

    }
    
    return(
        <div>
            {/* [기존코드] */}
            {/* {notices.map( (notice) => ( <div key={ index }> ... </div> ))} */}

            {/* [문제] 알림이 올 때마다 'ReferenceError: index is not defined' 에러 발생 */}
            {/* [원인] map 의 콜백함수 매개변수는 ( notice ) 1개만 선언되어 있음 → index 라는 변수가 어디에도 없음 */}
            {/*        ChatRoom.jsx 는 map( ( msg , index ) => ... ) 처럼 2번째 매개변수로 index 를 받아서 에러가 안 났음 */}
            {/*        * 리스트.map( ( 반복변수 , 인덱스 ) => ... ) : 2번째 매개변수를 적어야 인덱스 사용 가능 */}
            {/*        알림이 없을 때( 빈 배열 ) 는 map 이 한 번도 실행 안 돼서 에러가 안 나고 , 알림이 오면 그때 에러 발생 */}
            {/* [해결] index 대신 notice.id 를 key 로 사용 */}
            {/*        index 는 알림을 삭제하면 순서가 당겨지면서 바뀌는 값이라 key 로 부적합 */}
            {/*        notice.id 는 알림마다 고유하고 , 삭제해도 바뀌지 않는 값이라 key 로 적합 */}
            {notices.map( (notice) => (
                <div key={ notice.id }>
                    <p>{notice.text}</p>
                    <button type="button" onClick={ () => removeNotice(notice.id) }>X</button>
                </div>
            ))}
        </div>
    )
}