import ArticleList from "./components/article/ArticleList";
import ArticleView from "./components/article/ArticleView";
import ArticleWrite from "./components/article/ArticleWrite";
import ArticleEdit from "./components/article/ArticleEdit";
import NavList from "./components/navigation/NavList";
import NavWrite from "./components/navigation/NavWrite";
import NavView from "./components/navigation/NavView";
import NavEdit from "./components/navigation/NavEdit";
import { useState } from "react";


function Header( props ) {
    return (
        <header>
            <h2>{props.title}</h2>    
        </header>
    );
}

export default function App( props ){



    const [boardData, setBoardData] =  useState([
        {
            no: 1,
            title: "오늘은 리액트 공부하는 날",
            writer: "낙짜썜",
            date: "2025-03-03",
            contents: "리액트를 뽀개봅시당",
        },
        {
            no: 2,
            title: "어제는 자바스크립트 공부했음!",
            writer: "유겸썜",
            date: "2025-02-02",
            contents: "자바스크립트는 할 게 너무 많아요",
        },
        {
            no: 3,
            title: "내일은 프로젝트 만들어야징",
            writer: "미르썜",
            date: "2025-06-08",
            contents: "프로젝트는 뭘 만들어볼까?",
        },
    ]);

    const [mode, setMode] = useState("list");
    const [no, setNo] = useState(null);
    const [nextNo, setNextNo] = useState(4);

    let articleComp, navComp, titleVar, selectRow;

    if( mode === 'list') {
        titleVar = "게시판-목록";
        navComp = (
            <NavList onChangeMode={ ( ) => { setMode( "write" ); } }></NavList>
        );
        articleComp = (
            <ArticleList boardData={boardData} onChangeMode={ ( no ) => { setMode( "view" ); setNo( no ) } }></ArticleList>
        );
    }
    else if( mode === "view" ) {
        titleVar = "게시판-열람";
        navComp = (
            <NavView onChangeMode={ ( pmode ) => { setMode( pmode ); } }></NavView>
        );
        for(let i = 0 ; i < boardData.length ; i++){
            if(no === boardData[i].no){
                selectRow = boardData[i];
            }
        }
        articleComp = <ArticleView selectRow={selectRow}></ArticleView>
    }
    else if( mode === 'write' ) {
        titleVar = "게시판-쓰기";
        navComp = <NavWrite onChangeMode={ ( ) => { setMode( 'list' ); } }></NavWrite>
        articleComp = <ArticleWrite writeAction={ (t, w, c) => { 
            let nowDate = new Date().toISOString().slice(0,10);
            let addBoardData = {no:nextNo , title:t , writer:w , contents:c , date:nowDate};
            let copyBoardData = [...boardData];
            copyBoardData.push(addBoardData);
            setBoardData(copyBoardData);
            setNextNo(nextNo+1);
            setMode('list');
        }}></ArticleWrite>;
    }
    else if( mode === 'delete') {
        let newBoardData = [];
        for( let i = 0 ; i < boardData.length ; i++ ){
            if(no !== boardData[i].no){
                newBoardData.push(boardData[i]);
            }
        }
        setBoardData(newBoardData);
        setMode('list');
    }
    else if( mode === 'edit') {
        titleVar = '게시판-수정';
        navComp = <NavEdit onChangeMode={ () => {setMode('list');} } onBack={ () => {setMode('view');} }></NavEdit>
    
        for(let i = 0 ; i < boardData.length ; i++){
            if(no===boardData[i].no){
                selectRow = boardData[i];
            }
        }
    
        articleComp = <ArticleEdit selectRow={selectRow} editAction={ (t , w , c) => { let editBoardData = {no:no , title:t , writer:w , contents:c , date:selectRow.date};
        
            let copyBoardData = [...boardData];
            
            for(let i = 0 ; i < copyBoardData.length ; i++){
                if(copyBoardData[i].no === no){
                    copyBoardData[i] = editBoardData;
                    break;
                }
            }
            setBoardData(copyBoardData);
            setMode('view');
        } }></ArticleEdit>;
    }

    return (
        <>
            <Header title={titleVar}></Header>
            {navComp}
            {articleComp}
            {/* <NavList></NavList>
            <ArticleList boardData={boardData}></ArticleList> */}
        </>
    );
}