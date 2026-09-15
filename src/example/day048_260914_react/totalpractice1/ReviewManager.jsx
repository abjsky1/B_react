import React, { useState, useEffect } from 'react';

export default function ReviewManager({ product, onclose }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ reviewer: '', content: '', rating: 5 });

  // 1. 특정 제품(bno)의 리뷰 전체 조회 (쿼리 스트링 ?bno=)
  const fetchreviews = async () => {
    if (!product?.bno) return;
    try {
      const res = await fetch(`http://localhost:8080/api/reviews?bno=${product.bno}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('리뷰 조회 실패:', err);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchreviews();
  }, [product?.bno]);

  // 2. 리뷰 등록 (모두 소문자 필드로 전송)
  const handlecreatereview = async (e) => {
    e.preventDefault();
    if (!form.reviewer.trim() || !form.content.trim()) {
      return alert('작성자와 리뷰 내용을 모두 입력해주세요.');
    }

    try {
      const res = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bno: Number(product.bno),
          reviewer: form.reviewer,
          content: form.content,
          rating: Number(form.rating),
        }),
      });
      if (res.ok) {
        setForm({ reviewer: '', content: '', rating: 5 });
        fetchreviews();
      }
    } catch (err) {
      console.error('리뷰 등록 실패:', err);
    }
  };

  // 3. 리뷰 삭제 (쿼리 스트링 ?rno=)
  const handledeletereview = async (rno) => {
    if (!window.confirm('해당 리뷰를 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/reviews?rno=${rno}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchreviews();
      }
    } catch (err) {
      console.error('리뷰 삭제 실패:', err);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
    }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', width: '500px', maxWidth: '90%', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        {/* 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
          <h3 style={{ margin: 0, color: '#1e293b' }}>
            💬 [{product.name} (BNO: {product.bno})] 리뷰 ({reviews.length})
          </h3>
          <button onClick={onclose} style={{ border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* 리뷰 등록 폼 */}
        <form onSubmit={handlecreatereview} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="작성자"
              value={form.reviewer}
              onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
              style={{ flex: 1, padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              style={{ width: '100px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            >
              <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
              <option value="4">⭐⭐⭐⭐ (4점)</option>
              <option value="3">⭐⭐⭐ (3점)</option>
              <option value="2">⭐⭐ (2점)</option>
              <option value="1">⭐ (1점)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="솔직한 리뷰 내용을 작성해주세요."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{ flex: 1, padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
            <button
              type="submit"
              style={{ padding: '6px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
            >
              등록
            </button>
          </div>
        </form>

        {/* 리뷰 목록 테이블/리스트 */}
        <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          {reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
              작성된 리뷰가 없습니다.
            </div>
          ) : (
            reviews.map((r) => (
              <div key={r.rno} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#f59e0b', marginBottom: '2px' }}>
                    {'★'.repeat(r.rating || 5)}{'☆'.repeat(5 - (r.rating || 5))}
                    <span style={{ color: '#64748b', marginLeft: '6px', fontWeight: 600 }}>{r.reviewer}</span>
                    <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: '6px' }}>(RNO: {r.rno})</span>
                  </div>
                  <div style={{ color: '#334155', fontSize: '14px' }}>{r.content}</div>
                </div>
                <button
                  onClick={() => handledeletereview(r.rno)}
                  style={{ padding: '4px 8px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  삭제
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ textAlign: 'right', marginTop: '14px' }}>
          <button
            onClick={onclose}
            style={{ padding: '6px 14px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}