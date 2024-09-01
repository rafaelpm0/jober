import React, { useEffect, useState } from "react";
import styles from "../../styles/utilitarios/notification.module.css";
import Modal from "../Modal/modal";

/**
 * Componente para exibir uma mensagem de notificação dentro de um modal.
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {Array} props.message - Um array contendo a mensagem a ser exibida e o tipo de mensagem (ex: ["Mensagem", "info"]).
 * @param {Function} props.setMessage - Função para atualizar o estado da mensagem, usada para limpar a mensagem após exibição.
 * 
 * @returns {JSX.Element} - O componente JSX que renderiza a mensagem de notificação dentro de um modal.
 * 
 * @example
 * import Message from './path/to/Message';
 * 
 * function App() {
 *   const [message, setMessage] = useState(["", ""]);
 * 
 *   return (
 *     <div>
 *       <Message message={message} setMessage={setMessage} />
 *     </div>
 *   );
 * }
 */

export default function Message({ message = ["", ""], setMessage }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const msg = message || ["", ""];

    if (msg[0] !== "") {
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

  const className = `${styles.notification} ${visible ? `${styles.visible} `: `${styles.not_visible} `} ${styles[message[1]]}`;

  return <Modal><div className={className}>{message[0]}</div></Modal>;
}