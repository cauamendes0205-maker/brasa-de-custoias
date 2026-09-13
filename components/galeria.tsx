import Image from "next/image";
import { GALERIA } from "@/lib/restaurante";

export function Galeria() {
  return (
    <section id="galeria" className="seccao">
      <div className="seccao-interior">
        <h2 className="titulo-seccao">A casa por dentro</h2>

        <ul className="galeria">
          {GALERIA.map((foto, indice) => (
            <li
              key={foto.src}
              className={"galeria-item galeria-item-" + ((indice % 4) + 1)}
            >
              <figure>
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  width={800}
                  height={800}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="galeria-foto"
                />
                <figcaption>{foto.legenda}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
