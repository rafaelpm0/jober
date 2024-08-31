import getImage from "../../api/get_image";
import { useEffect, useState } from "react";
import styles from "../../styles/imagem/imagem.module.css";
import Loading from "../utilitarios/loading";

/**
 * Componente para exibir uma imagem associada a um identificador.
 *
 * Este componente recupera uma imagem usando a função `getImage` com base no `id` fornecido,
 * e exibe a imagem quando o carregamento é concluído. Durante o carregamento, exibe um
 * componente de carregamento (`Loading`).
 *
 * @component
 * @example
 * <Imagem id={123} />
 *
 * @param {Object} props - Propriedades do componente.
 * @param {number} props.id - ID da imagem a ser exibida.
 *
 * @returns {JSX.Element} - Retorna um elemento JSX que representa o conteúdo da imagem.
 */
export default function Imagem({ id }) {
  const [image, setImage] = useState(""); // Estado para armazenar a imagem
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Efeito colateral para carregar a imagem quando o componente é montado
  useEffect(() => {
    load();
  }, []);

  /**
   * Função assíncrona para carregar a imagem com base no ID.
   * Atualiza o estado da imagem e o estado de carregamento.
   */
  async function load() {
    setLoading(true);
    const img = await getImage(id); // Recupera a imagem usando o ID
    setImage(img);
    setLoading(false);
  }

  return (
    <div className={styles.content_image}>
      {!loading ? (
        <>
          <p>Imagem: {image.name}</p>
          <img
            src={`data:${image.type};base64,${image.content}`}
            alt={image.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
