export default function ArticleList( props ){
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
                    <tr>
                        <td class="cen">1</td>
                        <td>오늘은 React 공부하는 날</td>
                        <td class="cen">낙짜쌤</td>
                        <td class="cen">2030-01-02</td>
                    </tr>
                </tbody>
            </table>
        </article>
    </>)
}