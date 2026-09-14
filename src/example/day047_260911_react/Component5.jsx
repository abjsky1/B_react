export default function Component5( props ){

    function event1(){alert('이벤트1 발생')}

    const event2 = function(){alert('이벤트2 발생')}

    const event3 = ( ) => {alert('이벤트3 발생')}

    return(<>

        {/* onclick = "함수명()"  ==>>  onClick = 함수명 */}

        
        <button onClick={ event1 }>이벤트1</button>


        <button onClick={ event2 }>이벤트2</button>


        <button onClick={ event3 }>이벤트3</button>


        <button onClick={ ( ) => {alert('이벤트4 발생')} }>이벤트4</button>

    </>)
}