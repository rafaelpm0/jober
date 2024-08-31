import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css'; 
export default function Notification({ message, type }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3000 ms = 3 segundos

    
    return () => clearTimeout(timer);
  }, []);

  
  if (!visible) return null;

  const className = `${styles.notification} ${styles[type]}`;

  return (
    <div className={className}>
      {message}
    </div>
  );
}