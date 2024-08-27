"use.cliente";

import Image from "next/image";
import styles from "../../styles/lista_inicial/lista_inicial.module.css"


//falta implementar
const handleClick = () => {
  router.push('/adicionar'); // Altere para o caminho da página que você deseja redirecionar
};

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
