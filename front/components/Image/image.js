import getImage from "../../api/get_image";
import { useEffect, useState } from "react";
import styles from "../../styles/imagem/imagem.module.css";
import Loading from "../utilitarios/loading";

export default function Imagem({ id }) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {load()}
  , []);

  async function load() {
    setLoading(true);
    const img = await getImage(id);
    setImage(img)
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
