import React, { useEffect } from 'react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3200);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      className={`notification ${toast.type}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: isSuccess ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 10000,
        fontWeight: 500,
        maxWidth: '320px',
        lineHeight: 1.5,
        transform: 'translateX(0)',
        opacity: 1,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <i className={isSuccess ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'} />
      <span>{toast.message}</span>
    </div>
  );
}
