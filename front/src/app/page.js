"use client";

import Image from "next/image";
import Lista from "../../components/lista_inical/lista.js";
import styles from "../../styles/lista_inicial/lista_inicial.module.css";
import { useEffect, useState } from "react";

//falta implementar
const handleClick = () => {
  router.push("/adicionar"); // Altere para o caminho da página que você deseja redirecionar
};

export default function Job() {
  // fetch dos dados iniciais para display
  
  const [jobs, setJobs] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
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

    fetchData(); // Chama a função para buscar os dados
  }, []); // O array vazio como segundo argumento garante que o fetch seja executado apenas uma vez

  return (
    <>
      <main className={styles.container}>
        <section>
          <button>Adicionar Job</button>
        </section>
        <section>
          <Lista jobs={jobs} />
        </section>
      </main>
    </>
  );
}
