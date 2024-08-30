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
    fetchData(setJobs); 
  }, []);

  return (
    <>
      <main>
        <section>
          <Adicionar setJobs={setJobs}/>
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
