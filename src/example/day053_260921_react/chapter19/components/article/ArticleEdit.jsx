import { useState } from "react";

export default function ArticleEdit( props ){

    const [title, setTitle] = useState(props.selectRow.title);
    const [writer, setWriter] = useState(props.selectRow.writer);
    const [contents, setContents] = useState(props.selectRow.contents); 

    return (<>
        <article>
            <form onSubmit={(e) => {
                e.preventDefault(); // 페이지 새로고침 방지
                
                // input 태그의 name 속성을 이용해 값 가져오기
                const title = e.target.title.value;
                const writer = e.target.writer.value;
                const contents = e.target.contents.value;

                // App.jsx에서 넘겨준 writeAction 함수 실행
                props.editAction(title, writer, contents);
            }}>
                <table id="boardTable">
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td><input type="text" name="writer" value={writer} onChange={ (e) => { setWriter(e.target.value); }} /></td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td><input type="text" name="title" value={title} onChange={ (e) => { setTitle(e.target.value); }}/></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><textarea type="text" name="contents" cols="22" rows="3" value={contents} onChange={ (e) => { setContents(e.target.value); }}></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="수정하기" />
            </form>
        </article>
    </>)
}