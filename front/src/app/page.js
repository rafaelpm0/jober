"use client";

import Image from "next/image";
import Lista from "../../components/lista_inical/lista.js";
import { useEffect, useState } from "react";
import fetchData from "../../api/get_no_image.js";
import Adicionar from "../../components/adicionar_editar/adicionar.js";
import Message from "../../components/utilitarios/message.js";

export default function Job() {

  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState();
  
  

  // fetch dos dados iniciais para display
  useEffect(() => {
    fetchData(setJobs); 
  }, []);

  return (
    <>
      <main>
        <section>  
          <Adicionar setJobs={setJobs} setMessage={setMessage}/>
        </section>
        <article>
          <Lista jobs={jobs} setJobs={setJobs} setMessage={setMessage}/>
        </article>
        <article>

        </article>
        <Message message={message} setMessage={setMessage} />
      </main>
    </>
  );
}
