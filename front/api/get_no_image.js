/**
 * Função assíncrona que realiza uma solicitação para a API de jobs e atualiza o estado com os dados recebidos.
 * 
 * @param {Function} setJobs - Função de atualização de estado do `useState` usada para armazenar a lista de jobs retornada pela API.
 * 
 * @throws {Error} Se a resposta da API não for bem-sucedida, um erro é lançado com o status da resposta.
 * 
 * @example
 * import { useState, useEffect } from 'react';
 * import fetchData from './path/to/fetchData';
 * 
 * export default function JobComponent() {
 *   const [jobs, setJobs] = useState([]);
 * 
 *   useEffect(() => {
 *     fetchData(setJobs);
 *   }, []);
 * 
 *   return (
 *     <div>
 *       {/* Renderiza os dados dos jobs /}
 *     </div>
 *   );
 * }
 **/

export default async function fetchData(setJobs) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/job/?all=true&inst_img=true",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jobs = await response.json();
      setJobs(jobs);

      // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };