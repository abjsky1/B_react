import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductList() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("http://localhost:8080/test1", {
                    headers: { Accept: "application/xml" },
                });

                if (!response.ok) throw new Error("조회 실패");

                const text = await response.text();
                const xml = new DOMParser().parseFromString(text, "text/xml");

                if (xml.querySelector("parsererror")) {
                    throw new Error("XML 형식 오류");
                }

                const rows = Array.from(
                    xml.querySelectorAll("items > item")
                ).map((node) => ({
                    date: node.querySelector("receipt_dt")?.textContent,
                    name: node.querySelector("sample_nm")?.textContent,
                    pesticide: node.querySelector("detn_pstc")?.textContent,
                    density: node.querySelector("detn_dens")?.textContent,
                    result: node.querySelector("rul")?.textContent,
                }));

                setItems(rows);
            } catch (e) {
                setError(e.message);
            }
        }

        getData();
    }, []);

    return (
        <div>
            <h1>남서은 [제품 전체 조회]</h1>

            <table border="1">
                <tbody>
                    <tr>
                        <th style={{ whiteSpace: "nowrap" }}>학과</th>
                        <td>미디어소프트웨어학과</td>
                    </tr>
                    <tr>
                        <th style={{ whiteSpace: "nowrap" }}>자기소개</th>
                        <td>성결대학교 학생입니다.</td>
                    </tr>
                    <tr>
                        <th style={{ whiteSpace: "nowrap" }}>기능 수정</th>
                        <td>
                            {error && <p>{error}</p>}

                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>접수일</th>
                                        <th>시료명</th>
                                        <th>검출 농약</th>
                                        <th>검출 농도</th>
                                        <th>판정</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.name}</td>
                                            <td>{item.pesticide}</td>
                                            <td>{item.density}</td>
                                            <td>{item.result}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}