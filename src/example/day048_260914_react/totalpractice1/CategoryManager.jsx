import React, { useState, useEffect } from 'react';

export default function CategoryManager({ oncategoryupdated }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  // 1. 카테고리 전체 조회
  const fetchcategories = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/categories');
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setCategories(list);
        if (oncategoryupdated) oncategoryupdated(list);
      }
    } catch (err) {
      console.error('카테고리 조회 실패:', err);
    }
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  // 2. 카테고리 등록
  const handlecreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('카테고리명을 입력해주세요.');

    try {
      const res = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setName('');
        fetchcategories();
      }
    } catch (err) {
      console.error('카테고리 등록 실패:', err);
    }
  };

  // 3. 카테고리 삭제 (쿼리 스트링 ?cno=)
  const handledelete = async (cno) => {
    if (!window.confirm('해당 카테고리를 삭제하시겠습니까? (연결된 제품 확인 필요)')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/categories?cno=${cno}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchcategories();
      }
    } catch (err) {
      console.error('카테고리 삭제 실패:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handlecreate} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <input
          type="text"
          placeholder="새 카테고리명 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          추가
        </button>
      </form>

      <div style={{ maxHeight: '250px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '8px' }}>CNO</th>
              <th style={{ padding: '8px' }}>카테고리명</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                  등록된 카테고리가 없습니다.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.cno} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px' }}>{cat.cno}</td>
                  <td style={{ padding: '8px', fontWeight: 500 }}>{cat.name}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button
                      onClick={() => handledelete(cat.cno)}
                      style={{ padding: '4px 8px', color: '#ef4444', background: '#fee2e2', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}