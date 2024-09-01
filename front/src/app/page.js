"use client";

import Lista from "../../components/lista_inical/lista.js";
import { useEffect, useState } from "react";
import fetchData from "../../api/get_no_image.js";
import Message from "../../components/utilitarios/message.js";

/**
 * Componente principal para exibir e gerenciar uma lista de tarefas (jobs) e mensagens de notificação.
 * 
 * Utiliza o hook `useEffect` para buscar dados iniciais de tarefas através da função `fetchData` e atualiza o estado `jobs`.
 * Também renderiza o componente `Lista` para exibir as tarefas e o componente `Message` para exibir mensagens de notificação.
 * 
 * @returns {JSX.Element} - O componente JSX que renderiza a lista de tarefas e mensagens de notificação.
 * 
 * @example
 * import Job from './path/to/Job';
 * 
 * function App() {
 *   return <Job />;
 * }
 */
export default function Job() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState(["", ""]); // conferir comportamento estranho sem não tiver instanciado assim
  
  // Hook para buscar dados iniciais ao montar o componente
  useEffect(() => {
    async function info() {
      try {
        const jobsData = await fetchData(setMessage);
        setJobs(jobsData);
      } catch (err) {
        console.log("Erro ao buscar dados iniciais: ", err);
      }
    }
    info();
  }, []);

  return (
    <>
      <main>
        <article>
          <Lista jobs={jobs} setJobs={setJobs} setMessage={setMessage}/>
        </article>
        <article>
          {/* Outras seções podem ser adicionadas aqui */}
        </article>
        <Message message={message} setMessage={setMessage} />
      </main>
    </>
  );
}
