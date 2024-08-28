import getImage from "../../api/get_image";
import { useEffect, useState } from "react";

export default function Imagem({ id }) {
  const [image, setImage] = useState('');

  useEffect(() => {
    console.log(id)
    getImage(setImage, id);
  }, []);

  return (
    <div className="component_image">
      <p>Imagem selecionada: {image.name}</p>
      <img
        src={`data:${image.type};base64,${image.content}`}
        alt={image.name}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
