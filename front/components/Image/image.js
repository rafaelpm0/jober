import getImage from "../../api/get_image";
import { useEffect, useState } from "react";
import styles from '../../styles/imagem/imagem.module.css'

export default function Imagem({ id }) {
  const [image, setImage] = useState('');

  useEffect(() => {
    getImage(setImage, id);
  }, []);

  return (
    <div className={styles.content_image}>
      <p>Imagem: {image.name}</p>
      <img
        src={`data:${image.type};base64,${image.content}`}
        alt={image.name}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
