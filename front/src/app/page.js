"use client"; 

import Image from "next/image";
import Lista from '../../components/lista_inical/lista.js'
import styles from "../../styles/lista_inicial/lista_inicial.module.css"
import { useEffect, useState } from "react";

const jobs = [
  { name: 'rafael', description: 'descricao', image: 'imagem' },
  { name: 'maria', description: 'outra descricao', image: 'outra_imagem' },
  { name: 'joao', description: 'mais uma descricao', image: 'mais_uma_imagem' }
];

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
      <section>
        <Lista jobs={jobs}/>
      </section>

    </main>
    </>

  );
}
