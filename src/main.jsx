// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// 
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// [필수]
// 1. 리액트 라이브러리 최초 렌더링(그리기)하는 함수
import { createRoot } from "react-dom/client";
// 2. index.html 에서 root 마크업 가져오기  ,  #ID / .Class
const root = document.querySelector( '#root' );
// 3. 가져온 root 마크업을 creatRoot 함수에 전달함
const create = createRoot( root );

// [선택] 최초로 화면을 그리기 할 컴포넌트 가져와서 렌더링
// 1. import 이용하여 컴포넌트 가져오기
// import App from './App.jsx'
// 2. 가져온 컴포넌트 렌더링하기
// create.render( <App> </App> )
// 3. 

// render 는 1개만 가능. SPA 이기때문.

// [day047]

// [day047]
// import MyMarkUp from "./example/day047_260911_react/MyMarkUp";
// create.render( <MyMarkUp> </MyMarkUp> );

// [Component1]
// import Component1 from "./example/day047_260911_react/Component1";
// create.render(<Component1></Component1>)

// [Component2]
// import Component2 from "./example/day047_260911_react/Component2";
// create.render(<Component2></Component2>)

// [Component3]
// import Component3 from "./example/day047_260911_react/Component3";
// create.render(<Component3></Component3>)

// [Component4]
// import Component4 from "./example/day047_260911_react/Component4";
// create.render(<Component4></Component4>)

// [Component5]
// import Component5 from "./example/day047_260911_react/Component5";
// create.render(<Component5></Component5>)

// [Component6]
// import Component6 from "./example/day047_260911_react/Component6";
// create.render(<Component6/>)


// [day048]

// [Practice1]
// import Practice1 from "./example/day048_260912_react/react_practice1/Practice1";
// create.render(<Practice1></Practice1>)

// [chapter06]
// import Component1 from "./example/day048_260912_react/react_chapter06/Component1";
// create.render(<Component1></Component1>)

// [exam_Component2]
// import Component2 from "./example/day048_260912_react/react_exam/Component2";
// create.render(<Component2></Component2>)

// [chapter07]
// import Component from "./example/day048_260912_react/react_chapter07/Component";
// create.render(<Component></Component>)

// [totalpractice1]
// import ProductManager from "./example/day048_260912_react/totalpractice1/ProductManager";
// create.render(<ProductManager></ProductManager>)


// [day049]

// [chapter08]
// import Component1 from "./example/day049_260915_react/chapter08/Component1";
// create.render(<Component1></Component1>)

// [chapter09]
// import Component2 from "./example/day049_260915_react/chapter09/Component2";
// create.render(<Component2></Component2>)

// [chapter10]
// import Component3 from "./example/day049_260915_react/chapter10/Component3";
// create.render(<Component3></Component3>)

// [Practice1]
// import Component from "./example/day049_260915_react/react_practice2/Component";
// create.render(<Component></Component>)


// [day050]

// [chapter11]

// 1. 라우터 라이브러리 가져오기
// import { BrowserRouter } from "react-router-dom"; 
// import App from "./example/day050_260916_react/chapter11/App";
// create.render(<BrowserRouter><App></App></BrowserRouter>)

// [teamproject]
 import { BrowserRouter } from "react-router-dom"; 
 import App from "./example/day050_260916_react/react_practice3/App";
 create.render(<BrowserRouter><App/></BrowserRouter>)


// [day051]

// [chapter12]
// import App from "./example/day051_260917_react/chapter12/App";
// import { BrowserRouter } from "react-router-dom";
// create.render(<BrowserRouter><App/></BrowserRouter>)

