"use client";

import Image from "next/image";
import Lista from "../../components/lista_inical/lista.js";
import styles from "../../styles/lista_inicial/lista_inicial.module.css";
import { useEffect, useState } from "react";
import fetchData from '../../api/get_no_image.js'




//falta implementar
const handleClick = () => {
  router.push("/adicionar"); // Altere para o caminho da página que você deseja redirecionar
};


export default function Job() {
 
  
  const [jobs, setJobs] = useState([]);


   // fetch dos dados iniciais para display
  useEffect(() => {
    fetchData(setJobs); // Chama a função para buscar os dados
  }, []); 

  return (
    <>
      <main className={styles.container}>
        <section>
          <button>Adicionar Job</button>
        </section>
        <section>
          <Lista jobs={jobs} setJobs={setJobs}/>
        </section>
      </main>
    </>
  );
}
