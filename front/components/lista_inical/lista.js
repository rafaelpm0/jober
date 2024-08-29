"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/lista_inicial/lista.module.css";
import handleDelete from "../../api/del_job";
import Imagem from "../Image/image";

export default function Lista({ jobs = [], setJobs }) {
  //recebe o job id e a variavel que ira controlar o estado de aberto e fechado de cada um
  const [openDescription, setOpenDescription] = useState([]);
  const [dispImage, setDispImage] = useState([]);
  const [openImage, setOpenImage] = useState([]);

  //monitora o componente pai quando houver delete
  useEffect(() => {
    jobs.map((job) => {
      setDispImage((prevState) => ({
        ...prevState,
        [job.id]: job.has_image,
      }));
    });
  }, [jobs]);

  // inicia o estado fechado
  useEffect(() => {
    const initialState = jobs.reduce((acc, job) => {
      acc[job.id] = false;
      return acc;
    }, {});

    setOpenImage(initialState);
    setOpenDescription(initialState);
  }, []);

  // cuida da alteracao de estado
  const handleHide = (id, setObject) => {
    setObject((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <h1 className={styles.title}>Jobs:</h1>
      {jobs.map((job) => (
        <section className={styles.container} key={job.id}>
          <header>
            <h2>{job.job_name}</h2>

            {dispImage[job.id] ? (
              <a
                className={`${styles.disponivel} ${
                  openImage[job.id] ? styles.checked : ""
                }`}
                onClick={() => handleHide(job.id, setOpenImage)}
              >
                <img src="/assets/disponivel.png" alt="imagem do job" />
              </a>
            ) : (
              <a className={styles.indisponivel}>
                <img src="/assets/indisponivel.png" alt="imagem do job" />
              </a>
            )}

            <button onClick={() => handleDelete(setJobs, jobs, job.id)}>
              Delete
            </button>
            <a
              className={`${openDescription[job.id] ? `${styles.open}` : `${styles.close}`}`}
              onClick={() => handleHide(job.id, setOpenDescription)}
            >
              <img
              src="/assets/seta.png" alt="abre"
              />

            </a>
          </header>

          {openDescription[job.id] && (
            <>
              <div>
                <p>Data de criação: {job.job_create_at}</p>
              </div>
              <div>
                <h3>Descrição: </h3>
                <p>{job.job_description}</p>
              </div>
            </>
          )}
          {openImage[job.id] && (
            <div className={styles.image}>
              <Imagem id={job.id} />
            </div>
          )}
        </section>
      ))}
    </>
  );
}
