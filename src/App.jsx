import { useState, useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Carousel from "react-bootstrap/Carousel";
import { DropdownItem } from "react-bootstrap";
import Process from "./assets/Imagenes/Process.gif";
import "./App.css";

function App() {
  const type = ["sfw", "nsfw"];
  const cat1 = [
    "waifu",
    "neko",
    "shinobu",
    "megumin",
    "bully",
    "cuddle",
    "cry",
    "hug",
    "awoo",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe",
  ];
  const cat2 = ["waifu", "neko", "trap", "blowjob"];
  let ready = null;
  const api = (tipo, categoria) => {
    fetch(`https://api.waifu.pics/${tipo}/${categoria}`)
      .then((e) => e.json())
      .then((r) => setImage(r.url))
      .catch(console.log("Datos no recibido"));
  };
  const api2 = (tipo, categoria) => {
    fetch(`https://api.waifu.pics/many/${tipo}/${categoria}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        setMany(data.files); // array de URLs de imágenes
      })
      .catch(console.log("Datos no recibido"));
  };
  const [Type, setType] = useState(null);
  const [Categoria, setCategoria] = useState(null);
  const [Image, setImage] = useState(Process);
  const [Cantidad, setCantidad] = useState(null);
  const [Many, setMany] = useState([Process]);
  useEffect(() => {
    setType(null);
    setCategoria(null);
  }, [Cantidad, Image, Many]);
  if (Type && Categoria) {
    ready = (
      <div id="Botones">
        <input
          type="button"
          value="Unique Image"
          onClick={() => {
            api(Type, Categoria);
            setCantidad("one");
          }}
        />
        <input
          type="button"
          value="Several Images"
          onClick={() => {
            api2(Type, Categoria);
            setCantidad("varios");
          }}
        />
      </div>
    );
  }
  return (
    <>
      <div id="Body">
        <h1 id="Title">Generador de Imagenes</h1>
        <nav id="contenedor">
          <DropdownButton
            id="dropdown-item-button"
            title="Tipo de Imagen"
            onSelect={(eventKey) => {
              console.log("valor de type :", eventKey);
              setType(eventKey);
            }}
          >
            {type.map((e, i) => {
              return (
                <DropdownItem key={i} eventKey={e}>
                  {e.charAt(0).toUpperCase() + e.slice(1)}
                </DropdownItem>
              );
            })}
          </DropdownButton>
          {Type === "sfw" && (
            <DropdownButton
              id="dropdown-item-button"
              className="custom-dropdown-menu"
              title="Categoria Sfw"
              onSelect={(eventKey) => {
                console.log("Categoria a usar", eventKey);
                setCategoria(eventKey);
              }}
            >
              {cat1.map((e, i) => {
                return (
                  <DropdownItem key={i} eventKey={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </DropdownItem>
                );
              })}
            </DropdownButton>
          )}
          {Type === "nsfw" && (
            <DropdownButton
              id="dropdown-item-button"
              title="Categoria Nsfw"
              onSelect={(eventKey) => {
                console.log("Categoria a usar", eventKey);
                setCategoria(eventKey);
              }}
            >
              {cat2.map((e, i) => {
                return (
                  <DropdownItem key={i} eventKey={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </DropdownItem>
                );
              })}
            </DropdownButton>
          )}
        </nav>
        {ready}
        {Cantidad === "one" && (
          <div id="conteiner">
            <img src={Image} alt="imagen" />
          </div>
        )}
        {Cantidad === "varios" && (
          <Carousel>
            {Many.map((e, key) => {
              return (
                <Carousel.Item key={key}>
                  <img className="d-block w-100" src={e} alt="asd" />
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default App;
