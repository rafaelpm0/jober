"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/lista_inicial/lista.module.css";
import handleDelete from "../../api/del_job";
import Imagem from "../Image/image";
import { handleBoleanoId } from "../handles/handles";
import Editar from "../adicionar_editar/editar";
import Message from "../utilitarios/message";

export default function Lista({ jobs = [], setJobs }) {
  
  //recebe o job id e a variavel que ira controlar o estado de aberto e fechado de cada um
  const [openDescription, setOpenDescription] = useState([]);
  const [dispImage, setDispImage] = useState([]);
  const [openImage, setOpenImage] = useState([]);
  const [message, setMessage] = useState('');

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
      <Message message={message} setMessage={setMessage} />
      <h1 className={styles.title}>Tarefas:</h1>
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
                  onClick={() => handleDelete(setJobs, jobs, job.id, setMessage)}
                >
                  <img src="/assets/trash.png" alt="trash" />
                </a>
                <Editar job={job} setJobs={setJobs} />
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
