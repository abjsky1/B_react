// 전통방식의 CSS 파일 import 'css파일경로' or index.html 포함
import './index.css'
import logo from '../../../assets/image1.jpeg'

export default function Component1( props ){

    // CSS 객체 방식의 CSS 적용
    const myStyle = { color : 'white' , backgroundColor : "DodgerBlue" , padding : "10px" , fontFamily : "Verdana" }

    const iWidth = { maxWidth : '300px' }

    return (<>
        <h2>리액트 스타일</h2>
        <ol>
            {/* 인라인 방식의 CSS 적용 */}
            {/* { key : value } */}
            <li style={ { color : "red" } }>프론트엔드</li>
            <ul>
                {/* 이미지 삼입하는 방법 */}
                <li><img src="/img/image1.jpeg" style={iWidth}/></li>
                <li><img src={logo} style={iWidth}/></li>
                <li><img src="http://nakja.co.kr/images/reactjs.png" style={iWidth}/></li>
            </ul>
            <li className="backEnd">백엔드</li>
            <ul>
                {/* 전통방식의 CSS파일 적용 */}
                <li id="backEndSub">java</li>
                <li class="warnings">oracle</li>
                <li style={myStyle}>jsp</li>
            </ul>
        </ol>
    </>)
}