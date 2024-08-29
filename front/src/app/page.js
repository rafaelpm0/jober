"use client";

import Image from "next/image";
import Lista from "../../components/lista_inical/lista.js";
import { useEffect, useState } from "react";
import fetchData from "../../api/get_no_image.js";
import Adicionar from "../../components/adicionar/adicionar.js";

export default function Job() {

  const [jobs, setJobs] = useState([]);


  // fetch dos dados iniciais para display
  useEffect(() => {
    fetchData(setJobs); // Chama a função para buscar os dados
  }, []);

  useEffect(() => {
    fetchData(setJobs); // Chama a função para buscar os dados
  }, [post]);

  return (
    <>
      <main>
        <section>
          <Adicionar job={setPost}/>
        </section>
        <article>
          <Lista jobs={jobs} setJobs={setJobs} />
        </article>
        <article>

        </article>
      </main>
    </>
  );
}
