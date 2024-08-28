"use client"; 

import Image from "next/image";
import styles from "../../styles/lista_inicial/lista_inicial.module.css"
import { useEffect, useState } from "react";


//falta implementar
const handleClick = () => {
  router.push('/adicionar'); // Altere para o caminho da página que você deseja redirecionar
};


// fetch dos dados iniciais para display

export default function Job() {
  return (
    <>
    <main className={styles.container}>

      <section>
        <button >Adicionar Job</button>
      </section>

    </main>
    </>

  );
}
