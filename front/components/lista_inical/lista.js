"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/lista_inicial/lista.module.css";
import handleDelete from "../../api/del_job";

export default function Lista({ jobs = [], setJobs }) {
  //recebe o job id e a variavel que ira controlar o estado de aberto e fechado de cada um
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

    jobs.map((job) => {
      setDispImage((prevState) => ({
        ...prevState,
        [job.id]: job.has_image,
      }));
    });
  }, [jobs]);

  // cuida da alteracao de estado
  const handleHide = (id, setObject) => {
    setObject((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      {jobs.map((job) => (
        <section className={styles.container} key={job.id}>
          <header>
            <h2>{job.job_name}</h2>
            <button onClick={() => handleHide(job.id, setOpenDescription)}>
              Descricao
            </button>

            {dispImage[job.id] ? (
              <a
                className={styles.disponivel}
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
          </header>

          {openDescription[job.id] && (
            <div>
              <p>{job.job_description}</p>{" "}
            </div>
          )}
          {openImage[job.id] && (
            <div className={styles.image}>
              <p>{job.image}</p>
            </div>
          )}
        </section>
      ))}
    </>
  );
}
