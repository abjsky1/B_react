import NavList from "./components/navigation/NavList";
import ArticleList from "./components/article/ArticleList";

function Header( props ) {
    return (
        <header>
            <h2>게시판-목록</h2>    
        </header>
    );
}

export default function App( props ){
    return (
        <>
            <Header></Header>
            <NavList></NavList>
        </>
    );
}