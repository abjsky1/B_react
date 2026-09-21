export default function ArticleList( props ){

    const lists = [];

    for(let i = 0 ; i < props.boardData.length ; i++){

        let row = props.boardData[i];

        lists.push(
            <tr key={row.no}>
                <td className="cen">{row.no}</td>
                <td><a href={'/read/' + row.no} onClick={(e) => {e.preventDefault(); props.onChangeMode(row.no);}}>{row.title}</a></td>
                <td className="cen">{row.writer}</td>
                <td className="cen">{row.date}</td>
            </tr>
        )
    }

    return (<>
        <article>
            <table id="boardTable">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {lists}
                    {/* <tr>
                        <td class="cen">1</td>
                        <td>오늘은 React 공부하는 날</td>
                        <td class="cen">낙짜쌤</td>
                        <td class="cen">2030-01-02</td>
                    </tr> */}
                </tbody>
            </table>
        </article>
    </>)
}