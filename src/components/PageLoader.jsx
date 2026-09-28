import React, { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFading(true);
    }, 600);

    const timer2 = setTimeout(() => {
      setVisible(false);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="page-loader" className={fading ? 'hide' : ''}>
      <div className="loader-content">
        <span className="loader-logo">NB</span>
        <p>Loading Portfolio...</p>
      </div>
    </div>
  );
}
