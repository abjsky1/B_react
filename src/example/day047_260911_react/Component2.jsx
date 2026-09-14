// Component2.jsx 만들고 78~79p 코드 따라서 생성
// App.jsx -> Component2.jsx

// 1. 선언적 함수 방법으로 컴포넌트 생성
function FrontComp( props ){
    return(<>
        <li>프론트엔드</li>
        <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Javascript</li>
            <li>jQuery</li>
        </ul>
    </>)
}

// 2. 화살표 함수 방법으로 컴포넌트 생성
const BackComp = ( props ) => {
    return(<>
        <li>백엔드</li>
        <ul>
            <li>Java</li>
            <li>Oracle</li>
            <li>JSP</li>
            <li>Spring Boot</li>
        </ul>
    </>)
}

// 3. 익명함수 방법으로 컴포넌트 생성
let FormComp = function( props ){
    return(<>
        <form>
            <select name="gubun">
                <option value="front">프론트엔드</option>
                <option value="back">백엔드</option>
            </select>
            <input type="text" name="title" />
            <input type="submit" value="추가" />
        </form>
    </>)
}

// 4. 3가지의 컴포넌트를 합치는 컴포넌트
//    - 79p 와 다르게 App -> Component2
export default function Component2( props ){
    return(<>
        <div>
            <h2>React - Component</h2>
            <ol>
                <FrontComp></FrontComp>
                <BackComp />
            </ol>
            <FormComp />
        </div>
    </>)
}
