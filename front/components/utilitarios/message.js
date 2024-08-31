import React, { useEffect, useState } from "react";
import styles from "../../styles/utilitarios/notification.module.css";

export default function Message({ message, setMessage }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message[0] !== "") {
      setVisible(true); // Mostrar a mensagem se não estiver vazia

      const timer = setTimeout(() => {
        setVisible(false);
        setMessage(["", ""]); // Limpar a mensagem após 3 segundos
      }, 3000); // 3000 ms = 3 segundos

      return () => clearTimeout(timer);
    } else {
      setVisible(false); // Esconder se a mensagem estiver vazia
    }
  }, [message]);

  if (!visible) return null;

  const className = `${styles.notification} ${styles[message[1]]}`;

  return <div className={className}>{message[0]}</div>;
}
