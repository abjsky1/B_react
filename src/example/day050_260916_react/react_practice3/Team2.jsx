import axios from "axios";
import { useEffect, useState } from "react";

export default function Team2( props ){

    const [products, setProducts] = useState([]);

    useEffect(function () {
        axios.get(
            "https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/products"
        )
        .then(function (response) {
            setProducts(response.data);
        })
        .catch(function (error) {
            console.error(error);
            alert("제품 조회에 실패했습니다.");
        });
    }, []);

    return (<>
        <div>
            <h2>남서은</h2>
            <table border="1" >
                <tbody>
                <tr>
                    <th>학과</th>
                    <td>미디어소프트웨어학과</td>
                </tr>
                <tr>
                    <th >자기소개</th>
                    <td>성결대학교 재학중인 미디어소프트웨어학과 23학번 남서은입니다.</td>
                </tr> 
                <tr>
                    <th >제품 목록</th>
                    <td>
                        <table border="1" >
                            <thead>
                                <tr>
                                    <th>bno</th>
                                    <th>카테고리</th>
                                    <th>상품명</th>
                                    <th>가격</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(function (product) {
                                    return (
                                        <tr key={product.bno}>
                                            <td>{product.bno}</td>
                                            <td>{product.categoryname}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                {Number(product.price)
                                                    .toLocaleString("ko-KR")}원
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr> 
                </tbody>
            </table>
        </div>
    </>)
}