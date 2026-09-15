import { useState } from "react"
import './index.css'

export default function Contact( props ){

//  일반변수가 아닌 상태변수 사용
    const [ name , setName ] = useState('');
    const [ phone , setPhone ] = useState('');
    const [ age , setAge ] = useState('');

    const [ members , setMembers ] = useState( [ ] );

//  등록함수 : 
    const 등록함수 = ( ) => { 
    
    //  입력받은 값 3가지를 객체로 만든다.
        const obj = { name , phone , age }    

    //  배열에 만든 객체 저장
        members.push( obj );

    //  렌더링을 위한 members setter 에 스프레드 연산자로 배열 복사
        setMembers( [...members] )
    }

//  삭제함수 :
    const 삭제함수 = (index) => {

    //  JS 에서 특정 인덱스에서 1개 삭제
        members.splice( index , 1 ); 

    //  렌더링을 위한 코드 복사
        setMembers( [...members] )
    }

    return (<>
        <h2>전화번호부</h2>
        <div id="inputdiv">
            <input className="inputbox" type="text" placeholder="성명" value={name} onChange={ (e) => {setName(e.target.value);} } />
            <input className="inputbox" type="text" placeholder="연락처 (예 010-1234-5678)" value={phone} onChange={ (e) => {setPhone(e.target.value);} } />
            <input className="inputbox" type="text" placeholder="나이" value={age} onChange={ (e) => {setAge(e.target.value);} } />
            <button id="inputbutton" onClick={등록함수}>등록</button>
        </div>
        {
            members.map( (m , index) => {
                return (<>
                    <div id="contact">
                        <div id="in">
                            <div className="aa">
                            <span><span className="bold" >성명 : </span>{m.name}</span>
                            </div>
                            <div className="aa">
                            <span><span className="bold ma">연락처 : </span>{m.phone}</span>
                            </div>
                            <div className="aa">
                            <span><span className="bold ma">나이 : </span>{m.age}</span>
                            </div>
                        </div>
                        <div><button id="delete" onClick={ () => { 삭제함수(index) } }>삭제</button></div>
                    </div>
                </>);
            })
            
        }
        <br/>
        <div id="total">총 인원 : {members.length}명</div>
    </>)
}