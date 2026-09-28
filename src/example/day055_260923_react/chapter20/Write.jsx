import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Write( props ){

    const navigate = useNavigate();

    const 등록함수 = async (event) => {
        event.preventDefault();
        console.log(event.target)

        const obj = {
            name : event.target.writer.value,
            subject : event.target.title.value,
            content : event.target.contents.value
        }

    //  비동기통신
        const response = await axios.post("http://localhost:8080/api" , obj);
        const data = response.data;

    //  반환값이 true 이면 페이지전환
        if(data==true){navigate("/list")}
    }

    return (<>
        <div>
            <Link to="/list">목록</Link>
            <form onSubmit={ (event) => {등록함수(event)} }>
                작성자 : <input name="writer" /> <br/>
                제목 : <input name="title" /> <br/>
                내용 : <textarea name="contents" rows="3"></textarea> <br/>
                <input type="submit" value="작성" />
            </form>
        </div>
    </>)

}