// REACT Practice1 : Practice1 과 Profile 컴포넌트를 구현하여 그림과 같이 완성하시오.
// AXIOS 이용하여 서버로 부터 받은 데이터/자료 가정

//  컴포넌트 만들기

//  1. 첫글자 대문자로 한 컴포넌트명.jsx 파일 생성
//  2. export default function Practice1( props ){ }
//  3. 컴포넌트 안에 return (<> jsx문법 </>)
//  *. jsx : 가상 DOM(HTML) 과 JS 함께 표현하는 문법

//  컴포넌트 최초 렌더링

//  1. main.jsx 파일에서 컴포넌트를 import 함
//  2. import 한 컴포넌트를 creat.render( <컴포넌트/> )


export default function Practice1( props ){
  const data = [
    { name: 'Hedy Lamarr', imageUrl: 'https://i.pravatar.cc/150?img=47' },
    { name: 'Grace Hopper', imageUrl: 'https://i.pravatar.cc/150?img=48' },
    { name: 'Ada Lovelace', imageUrl: 'https://i.pravatar.cc/150?img=49' },
    { name: 'Margaret Hamilton', imageUrl: 'https://i.pravatar.cc/150?img=50' }
  ];

  return (<> 

      { /*여기구현*/ }
      <Profile name={data[0].name} imageUrl={data[0].imageUrl} ></Profile>
      <Profile name={data[1].name} imageUrl={data[1].imageUrl}/>

      {/* JSX 주석 */}
      {
        data.map( (i) => {
          return(<>
            <Profile name={i.name} imageUrl={i.imageUrl}></Profile>
        </>) } )
      }

  </>)
} // func end 

function Profile( props ) { 
  return (<>
      { /*여기구현*/ }
      <h3>{props.name}</h3>
      <img src={props.imageUrl} />

  </> );
} // func end 