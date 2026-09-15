import React, { useState, useEffect } from 'react';
import CategoryManager from './CategoryManager';
import ReviewManager from './ReviewManager';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // 모달 상태
  const [iscategorymodalopen, setIscategorymodalopen] = useState(false);
  const [iseditmodalopen, setIseditmodalopen] = useState(false);
  const [selectedproductforreview, setSelectedproductforreview] = useState(null);

  // 폼 상태 (모두 소문자)
  const [form, setForm] = useState({ name: '', price: '', cno: '' });
  const [editform, setEditform] = useState({ bno: null, name: '', price: '', cno: '' });

  // 1. 카테고리 전체 조회
  const fetchcategories = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('카테고리 조회 실패:', err);
    }
  };

  // 2. 제품 전체 조회
  const fetchproducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('제품 조회 실패:', err);
    }
  };

  useEffect(() => {
    fetchcategories();
    fetchproducts();
  }, []);

  // 3. 제품 등록 (모두 소문자 필드로 전송)
  const handlecreateproduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.cno) {
      return alert('제품명, 가격 및 카테고리를 모두 선택해주세요.');
    }

    try {
      const res = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          cno: Number(form.cno),
        }),
      });
      if (res.ok) {
        setForm({ name: '', price: '', cno: '' });
        fetchproducts();
      }
    } catch (err) {
      console.error('제품 등록 실패:', err);
    }
  };

  // 4. 제품 삭제 (쿼리 스트링 ?bno=)
  const handledeleteproduct = async (bno) => {
    if (!window.confirm('해당 제품을 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/products?bno=${bno}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchproducts();
      }
    } catch (err) {
      console.error('제품 삭제 실패:', err);
    }
  };

  // 5. 제품 수정 모달 열기
  const openeditmodal = (product) => {
    setEditform({
      bno: product.bno,
      name: product.name,
      price: product.price,
      cno: product.cno || (product.category ? product.category.cno : ''),
    });
    setIseditmodalopen(true);
  };

    // 6. 제품 수정 완료 (Body에 bno 포함 전달)
    const handleupdateproduct = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`http://localhost:8080/api/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            bno: editform.bno,
            name: editform.name,
            price: Number(editform.price),
            cno: Number(editform.cno),
        }),
        });
        if (res.ok) {
        setIseditmodalopen(false);
        fetchproducts();
        }
    } catch (err) {
        console.error('제품 수정 실패:', err);
    }
    };

  return (
    <div style={{ maxWidth: '950px', margin: '30px auto', padding: '24px', fontFamily: 'sans-serif' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #3b82f6', paddingBottom: '12px' }}>
        <h2 style={{ margin: 0, color: '#1e293b' }}>📦 통합 제품 관리 시스템</h2>
        <button
          onClick={() => setIscategorymodalopen(true)}
          style={{ padding: '8px 14px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          ⚙️ 카테고리 관리 ({categories?.length || 0})
        </button>
      </div>

      {/* 제품 등록 폼 */}
      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#334155' }}>신규 제품 등록</h4>
        <form onSubmit={handlecreateproduct} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="제품명"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ flex: 2, minWidth: '160px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          />
          <input
            type="number"
            placeholder="가격 (원)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={{ flex: 1, minWidth: '120px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          />
          <select
            value={form.cno}
            onChange={(e) => setForm({ ...form, cno: e.target.value })}
            style={{ flex: 1, minWidth: '140px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          >
            <option value="">카테고리 선택</option>
            {categories?.map((c) => (
              <option key={c.cno} value={c.cno}>{c.name}</option>
            ))}
          </select>
          <button
            type="submit"
            style={{ padding: '8px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
          >
            등록
          </button>
        </form>
      </div>

      {/* 제품 목록 테이블 */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
            <th style={{ padding: '12px' }}>BNO</th>
            <th style={{ padding: '12px' }}>제품명</th>
            <th style={{ padding: '12px' }}>가격</th>
            <th style={{ padding: '12px' }}>카테고리</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {products?.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                등록된 제품이 없습니다.
              </td>
            </tr>
          ) : (
            products?.map((p) => (
              <tr key={p.bno} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px' }}>{p.bno}</td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{p.name}</td>
                <td style={{ padding: '12px' }}>{Number(p.price || 0).toLocaleString()}원</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', background: '#e0f2fe', color: '#0369a1', borderRadius: '4px', fontSize: '13px' }}>
                    {p.categoryname || (p.category ? p.category.name : `CNO: ${p.cno || '-'}`)}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => setSelectedproductforreview(p)}
                    style={{ padding: '6px 10px', marginRight: '6px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    리뷰
                  </button>
                  <button
                    onClick={() => openeditmodal(p)}
                    style={{ padding: '6px 10px', marginRight: '6px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handledeleteproduct(p.bno)}
                    style={{ padding: '6px 10px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 카테고리 관리 모달 */}
      {iscategorymodalopen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', width: '420px', maxWidth: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>카테고리 관리</h3>
              <button onClick={() => setIscategorymodalopen(false)} style={{ border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <CategoryManager oncategoryupdated={(newlist) => setCategories(newlist)} />
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button
                onClick={() => setIscategorymodalopen(false)}
                style={{ padding: '6px 14px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 제품 수정 모달 */}
      {iseditmodalopen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', width: '360px', maxWidth: '90%' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>제품 수정 (BNO: {editform.bno})</h3>
            <form onSubmit={handleupdateproduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>제품명</label>
                <input
                  type="text"
                  value={editform.name}
                  onChange={(e) => setEditform({ ...editform, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>가격</label>
                <input
                  type="number"
                  value={editform.price}
                  onChange={(e) => setEditform({ ...editform, price: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>카테고리</label>
                <select
                  value={editform.cno}
                  onChange={(e) => setEditform({ ...editform, cno: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                >
                  <option value="">카테고리 선택</option>
                  {categories?.map((c) => (
                    <option key={c.cno} value={c.cno}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIseditmodalopen(false)}
                  style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 리뷰 모달 */}
      {selectedproductforreview && (
        <ReviewManager
          product={selectedproductforreview}
          onclose={() => setSelectedproductforreview(null)}
        />
      )}
    </div>
  );
}