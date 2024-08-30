"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Componente Modal que utiliza portais para renderizar seu conteúdo fora da hierarquia DOM principal(body).
 * 
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {React.ReactNode} props.children - O conteúdo a ser exibido dentro do modal. Pode ser qualquer elemento React, como textos, imagens ou outros componentes.
 * 
 * @returns {React.ReactElement | null} - Retorna um portal com o conteúdo do modal renderizado no corpo do documento se o componente estiver montado. Caso contrário, retorna `null`.
 * 
 * @description
 * O componente `Modal` usa o hook `useState` para rastrear se o componente está montado e o hook `useEffect` para definir a montagem do componente e limpar o estado quando o componente for desmontado.
 * 
 * O conteúdo passado como `children` é renderizado em um portal, que coloca o conteúdo diretamente no corpo do documento (`document.body`), permitindo que o modal seja exibido acima do restante do conteúdo da aplicação.
 * 
 * A função `createPortal` do React é utilizada para renderizar o conteúdo do modal fora da hierarquia DOM pai do componente.
 * 
 * @example
 * ```jsx
 * <Modal>
 *   <div className="modal-content">
 *     <h1>Este é um Modal</h1>
 *     <button>Fechar</button>
 *   </div>
 * </Modal>
 * ```
 */
export default function Modal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false); // Adicionado cleanup
  }, []);

  return mounted ? createPortal(<>{children}</>, document.body) : null;
}