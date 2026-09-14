// Component4.jsx

// 선언적 함수 방법으로 컴포넌트 생성 + props(객체) + 일반for문
function FrontComp( props ){
    const liRows = [];
    for(let i=0 ; i<=props.propData1.length ; i++){
        liRows.push(
        //  렌더링 속도 향상을 위한 key 값 입력 : PK값
            <li key={i}>{props.propData1[i]}</li>
        )
    }
    return(<>
        <li>{props.frTitle}</li>
        <ul>
            {liRows}
        </ul>
    </>)
}

// 화살표 함수 방법으로 컴포넌트 생성 + 구조분해 + 향상된for문
const BackComp = ({propData2, baTitle}) => {
    const liRows = [];
    let KeyCnt = 0;
    for(let row of propData2){
        liRows.push(
            <li key={KeyCnt++}>{row}</li>
        );
    }
    return(<>
        <li>{baTitle}</li>
        <ul>
            {liRows}
        </ul>
    </>)
}

export default function Component4( props ){
    
//  [*] 연동할 AXIOS : 백엔드와 통신 
    const frontData = [ 'HTML5', 'CSS3' , 'Javascript', 'jQuery', "React" ];
    const backData = [ 'Java' , 'Oracle' , 'JSP' , 'Spring Boot'  ]
    
    return(<>
        <div>
            <h2>React-props</h2>
            <ol>
                <FrontComp propData1={frontData} frTitle="프론트엔드"></FrontComp>
                <BackComp propData2={backData} baTitle="백엔드" />
            </ol>
        </div>
    </>)
}

