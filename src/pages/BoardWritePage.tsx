
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../api/boardApi';

function BoardWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createBoard({ title, content });
      navigate('/boards'); // 성공 시 목록 페이지로 이동
    } catch (err) {
      setError('게시글 작성에 실패했습니다.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>새 글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="content" style={styles.label}>내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            rows={10}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={styles.submitButton} disabled={submitting}>
          {submitting ? '등록 중...' : '등록'}
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BoardWritePage;
