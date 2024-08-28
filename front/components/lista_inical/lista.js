"use client";

import { useState } from "react";
import styles from "../../styles/lista_inicial/lista.module.css";

export default function Lista({ jobs = [] }) {
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenImage = () => {
    setOpenImage(!openImage);
  };
  console.log(jobs)
  //primeira div deve ser um container relativo
  return (
    <>
      {jobs.map((job) => (
        <div className={styles.container}>
          <div>
            <h1>{job.name}</h1>
            <button onClick={() => handleOpen()}>Abre e fecha</button>
            <button onClick={() => handleOpenImage()}>Incone imagem</button>
          </div>
          <div>
            {open && <p>{job.description}</p>}</div>
            {openImage && (
            <div className={styles.image}>
              <p>{job.image}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
