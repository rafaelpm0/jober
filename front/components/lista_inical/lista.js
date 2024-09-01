"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/lista_inicial/lista.module.css";
import handleDelete from "../../api/del_job";
import Imagem from "../Image/image";
import { handleBoleanoId } from "../handles/handles";
import Editar from "../adicionar_editar/editar";
import Adicionar from "../../components/adicionar_editar/adicionar.js";

/**
 * Componente que exibe uma lista de jobs com opções para visualizar detalhes, editar e excluir.
 * 
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {Array} props.jobs - Lista de jobs a serem exibidos.
 * @param {Function} props.setJobs - Função para atualizar o estado dos jobs.
 * @param {Function} props.setMessage - Função para definir mensagens de feedback.
 * 
 * @returns {JSX.Element} - O componente JSX que renderiza a lista de jobs.
 * 
 * @example
 * import Lista from './path/to/Lista';
 * 
 * function JobList() {
 *   const [jobs, setJobs] = useState([]);
 *   const [message, setMessage] = useState([]);
 * 
 *   return (
 *     <Lista jobs={jobs} setJobs={setJobs} setMessage={setMessage} />
 *   );
 * }
 */

export default function Lista({ jobs = [], setJobs, setMessage }) {
  const [openDescription, setOpenDescription] = useState([]);
  const [dispImage, setDispImage] = useState([]);
  const [openImage, setOpenImage] = useState([]);

  // inicia o estado fechado
  useEffect(() => {
    const initialState = jobs.reduce((acc, job) => {
      acc[job.id] = false;
      return acc;
    }, {});

    setOpenImage(initialState);
    setOpenDescription(initialState);
  }, []);

  //monitora o componente pai quando houver delete
  useEffect(() => {
    jobs.map((job) => {
      setDispImage((prevState) => ({
        ...prevState,
        [job.id]: job.has_image,
      }));
    });
  }, [jobs]);

  return (
    <>
      <div className={styles.title}>
        <h1>Tarefas:</h1>
        <Adicionar setJobs={setJobs} setMessage={setMessage} />
      </div>

      <div className={styles.container}>
        {jobs.map((job) => (
          <section key={job.id}>
            <header>
              <h2 className={styles.sub_title}>{job.job_name}</h2>

              {dispImage[job.id] ? (
                <a
                  className={`${styles.disponivel} ${
                    openImage[job.id] ? styles.checked : ""
                  }`}
                  onClick={() => handleBoleanoId(job.id, setOpenImage)}
                >
                  <img src="/assets/disponivel.png" alt="imagem do job" />
                </a>
              ) : (
                <a className={styles.indisponivel}>
                  <img src="/assets/indisponivel.png" alt="imagem do job" />
                </a>
              )}

              <a
                className={`${styles.accordion} ${
                  openDescription[job.id] ? `${styles.open}` : `${styles.close}`
                }`}
                onClick={() => handleBoleanoId(job.id, setOpenDescription)}
              >
                <img src="/assets/seta.png" alt="abre" />
              </a>
            </header>

            <div
              className={`${styles.data} ${
                openDescription[job.id] ? `${styles.open}` : `${styles.close}`
              }`}
            >
              <div className={`${styles.data_head}`}>
                <p>Data de criação: {job.job_create_at.slice(0, 10)}</p>
                <a
                  id="icon_trash"
                  onClick={() =>
                    handleDelete(setJobs, jobs, job.id, setMessage)
                  }
                >
                  <img src="/assets/trash.png" alt="trash" />
                </a>
                <Editar
                  job={job}
                  setJobs={setJobs}
                  setMessage={setMessage}
                  setOpenImage={setOpenImage}
                />
              </div>
              <div className={styles.description}>
                <h3>Descrição: </h3>
                <p>{job.job_description}</p>
              </div>
            </div>

            {openImage[job.id] && (
              <div className={styles.image}>
                <Imagem id={job.id} />
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
