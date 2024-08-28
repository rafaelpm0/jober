"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/lista_inicial/lista.module.css";
import handleDelete from "../../api/del_job";

export default function Lista({ jobs = [], setJobs }) {

  //recebe o job id e a variavel que ira controlar o estado de aberto e fechado de cada um
  const [openDescription, setOpenDescription] = useState([]);
  const [openImage, setOpenImage] = useState([]);



  // inicia o estado fechado
  useEffect(()=>{
      
      const initialState = jobs.reduce((acc, job) => {
        acc[job.id] = false;
        return acc;
      }, {});

      setOpenImage(initialState)
      setOpenDescription(initialState)


  },[jobs])
  
  // cuida da alteracao de estado
  const handleHide= (id, setObject) => {
    setObject(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };


  return (
    <>
      {jobs.map((job) => (
        <div className={styles.container} key={job.id}>
          <div>
            <h1>{job.job_name}</h1>
            <button onClick={() => handleHide(job.id, setOpenDescription)}>Descricao</button>
            <button onClick={() => handleHide(job.id, setOpenImage)}>Incone imagem</button>
            <button onClick={() => handleDelete(setJobs, jobs, job.id)}>Delete</button>
          </div>
          <div>
            {openDescription[job.id] && <p>{job.job_description}</p>}</div>
            {openImage[job.id] && (
            <div className={styles.image}>
              <p>{job.image}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
