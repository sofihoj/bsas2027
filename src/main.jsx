import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";

const places = [
  {
    id: 1,
    name: "Congreso de la Nación",
    category: "Instituciones",
    address: "Av. Entre Ríos 50",
    coords: [-34.6097, -58.3927],
    desc: "El monumental Palacio del Congreso reúne las cámaras del Poder Legislativo nacional. El recorrido permite conocer salones, recintos y detalles de su arquitectura e historia parlamentaria.",
    hours: "Lun–vie: 11, 13, 15 y 17 h (español). Duración: 60–90 min.",
    price: "Gratis · Inscripción individual previa",
    status: "Disponibilidad a confirmar",
    link: "https://www.hcdn.gob.ar/secgralpres/dcultura/visitas-guiadas/",
    image:
      "https://thumbs.dreamstime.com/b/congreso-nacional-buenos-aires-argentina-28275705.jpg",
  },
  {
    id: 2,
    name: "Legislatura porteña",
    category: "Instituciones",
    address: "Perú 160",
    coords: [-34.6087, -58.3735],
    desc: "Recorrido por el Palacio Legislativo de la Ciudad: recinto de sesiones, Biblioteca Esteban Echeverría y salones protocolares, sujeto a disponibilidad.",
    hours:
      "Visita general: aprox. 1 h. Reservas online; recorridas culturales lunes y martes.",
    price: "Gratis · Reserva online",
    status: "Disponibilidad a confirmar",
    link: "https://visitas.legislatura.gob.ar/",
    image:
      "https://media.ambito.com/p/87a5c427f5d41b3f4f74e68d8b69e79a/adjuntos/239/imagenes/037/241/0037241651/legislatura13jpg.jpg",
  },
  {
    id: 3,
    name: "Teatro Colón",
    category: "Arquitectura",
    address: "Cerrito 618",
    coords: [-34.6011, -58.3833],
    desc: "Uno de los grandes teatros líricos del mundo. El tour recorre espacios emblemáticos, como el Foyer, la Galería de Bustos y el Salón Dorado, sujeto a disponibilidad.",
    hours:
      "Visitas guiadas todos los días. Salidas cada 15 minutos. Lunes a domingos de 10 a 16:45.",
    price: "Residentes argentinos (con DNI): $18.000",
    status: "",
    link: "https://teatrocolon.org.ar/visitas-guiadas/",
    image:
      "https://www.civitatis.com/f/argentina/buenos-aires/guia/teatro-colon-m.jpg",
  },
  {
    id: 4,
    name: "Palacio Libertad (ex CCK)",
    category: "Cultura",
    address: "Sarmiento 151",
    coords: [-34.6038, -58.3689],
    desc: "El antiguo Palacio de Correos es hoy un centro cultural de gran escala. Explorar sus salas, espacios, cúpula y arquitectura es parte de la experiencia; la agenda también ofrece visitas y actividades.",
    hours: "Miércoles a domingos, 14 a 20 h.",
    price:
      "Actividad gratuita. Hay opción de reservar visitas guiadas y espectáculos (https://palaciolibertad.gob.ar/agenda/).",
    status: "Agenda variable",
    link: "https://palaciolibertad.gob.ar/",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe9zjxq-9OIRV9SI401TD1-3mMdVxalt0jcGvlvMzExe78F-Loo5--F5ck&s=10",
  },
  {
    id: 5,
    name: "Cabildo",
    category: "Museos",
    address: "Bolívar 65",
    coords: [-34.6084, -58.3731],
    desc: "Museo histórico en uno de los edificios centrales de la Revolución de Mayo. Exhibiciones y visitas que reconstruyen la historia colonial y revolucionaria.",
    hours:
      "Mié–dom, 10:30–18 h. Guiadas: mié–vie 15:30; sáb, dom y feriados 11, 12:30 y 15:30 h.",
    price: "Gratis · Visitas sin reserva",
    status: "",
    link: "https://cabildonacional.cultura.gob.ar/info/visitas-al-cabildo-de-buenos-aires/",
    image:
      "https://www.argentina.gob.ar/sites/default/files/cabildo-panoramica-1500x610.jpg",
  },
  {
    id: 6,
    name: "Casa Rosada",
    category: "Instituciones",
    address: "Balcarce 50",
    coords: [-34.6082, -58.3702],
    desc: "Mientras que las visitas interiores al palacio gubernamental para el público general se encuentran suspendidas, como alternativa abierta y gratuita, se puede recorrer el Museo Casa Rosada (ubicado detrás del edificio)",
    hours: "Miércoles, jueves, viernes, sábados y domingos: de 11 a 17:30 h.",
    price: "Gratis",
    status: "",
    link: "https://www.argentina.gob.ar/secretariageneral/museo-casa-rosada/agenda",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU109FtM2uCbvee8pnVzX5bDMMp2beSxYAkdZVwV8wuwkQgneFuV0r41g&s=10",
  },
  {
    id: 7,
    name: "Antiguo recinto del Congreso Nacional",
    category: "Historia",
    address: "Balcarce 139",
    coords: [-34.6093, -58.3708],
    desc: " Fue la primera sede del Congreso de la Nación Argentina en Buenos Aires, inaugurada en 1864 por el presidente Bartolomé Mitre y utilizada hasta 1905, cuando las sesiones pasaron al actual Palacio del Congreso.",
    hours: "Martes y Jueves 15 y 17 h.",
    price:
      "Gratis. No requiere reserva previa; puedes acercarte directamente unos minutos antes de cualquiera de los turnos fijos.",
    status: "",
    link: "https://www.argentina.gob.ar/pais/patrimonio/antiguo-congreso",
    image:
      "https://www.argentina.gob.ar/sites/default/files/recinto_sesiones_antiguo_congreso_nacional.jpg",
  },
  {
    id: 8,
    name: "Biblioteca Nacional de Maestros",
    category: "Bibliotecas",
    address: "Pizzurno 953",
    coords: [-34.5987, -58.3912],
    desc: "Biblioteca patrimonial alojada en el Palacio Sarmiento. Es lindo edificio para entrar y conocerlo, pero también ofrecen visitas guiadas.",
    hours: "Biblioteca: lun–vie 9–20 h; sáb 9–17 h.",
    price: "Gratis",
    status: "",
    link: "https://bnm.educacion.gob.ar/servicios/visitas-guiadas/",
    image:
      "https://bnm.educacion.gob.ar/wp-content/uploads/2021/03/BNM-sala.jpg",
  },
  {
    id: 9,
    name: "Centro Naval — sede central",
    category: "Arquitectura",
    address: "Florida 801",
    coords: [-34.5972, -58.3758],
    desc: "Edificio monumental de estilo academicista, sede de una institución naval histórica. Hay un restaurante en el 6to piso en el que se puede desayunar o almorzar",
    hours:
      "Desayunos: Lun-vie, de 9:30 a 11:00. Almuerzos: Lun-vie, de 12:00 a 15:30",
    price: "",
    status: "",
    link: "https://www.centronaval.org.ar/web-cn/actividades/restaurante.html",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/ef/48/f8/centro-naval.jpg?w=1200&h=-1&s=1",
  },
  {
    id: 10,
    name: "Museo Nacional de Arte Decorativo",
    category: "Museos",
    address: "Av. del Libertador 1902",
    coords: [-34.5837, -58.3971],
    desc: "El Palacio Errázuriz Alvear alberga colecciones de arte decorativo, mobiliario y objetos históricos. La visita permite recorrer interiores palaciegos y exposiciones. En su interior hay un bar Croque Madame abierto todos los días desde las 10am",
    hours:
      "Mié–dom, 13–19 h (último ingreso 18:30). Visitas guiadas públicas a las 16 h.",
    price: "Gratis · Sin reserva previa",
    status: "Bar Croque Madame",
    link: "https://museoartedecorativo.cultura.gob.ar/info/visitas/",
    image: "https://www.cultura.gob.ar/media/uploads/mdad.jpg",
  },
  {
    id: 11,
    name: "Palacio de Aguas Corrientes",
    category: "Arquitectura",
    address: "Riobamba 750",
    coords: [-34.6005476, -58.3945724],
    desc: "Una fachada exuberante construida para alojar depósitos de agua. Su museo y las visitas especiales permiten conocer la historia de la infraestructura sanitaria y el edificio.",
    hours: "Lunes, miércoles y viernes 11 hs | Martes y jueves 15 hs",
    price: "$3.400 - Miércoles gratuito",
    status: "",
    link: "https://aysa.com.ar/Museo/inicio",
    image:
      "https://turismo.buenosaires.gob.ar/sites/turismo/files/palaciodelasaguascorrientes-fachada1500x610.jpg",
  },
  {
    id: 12,
    name: "Palacio Paz / Círculo Militar",
    category: "Palacios",
    address: "Av. Santa Fe 750",
    coords: [-34.5957, -58.3784],
    desc: "Residencia palaciega de principios del siglo XX, con salones, escalinatas y decoración de inspiración francesa. En su interior hay un bar Croque Madame abierto todos los días desde las 9am",
    hours:
      "Visitas sujetas a programación y disponibilidad. Se coordina con reservaspalaciopaz@gmail.com",
    price: "Gratis",
    status: "Bar Croque Madame",
    link: "https://circulomilitar.org.ar/cultura/agenda",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/e9/a5/d8/hall-general-san-martin.jpg?w=900&h=500&s=1",
  },
  {
    id: 13,
    name: "Palacio Barolo",
    category: "Palacios",
    address: "Av. de Mayo 1370",
    coords: [-34.6092, -58.3855],
    desc: "Edificio inspirado en la Divina Comedia. Los recorridos exploran su simbolismo, arquitectura y espacios elevados con vistas panorámicas de la ciudad.",
    hours:
      "Visitas guiadas con diferentes horarios y formatos. Se requiere reserva previa.",
    price: "A partir de $43.000",
    status: "Vista panorámica",
    link: "https://palaciobarolotours.com.ar/",
    image: "https://media.timeout.com/images/106150633/image.webp",
  },
  {
    id: 14,
    name: "Subida al Obelisco",
    category: "Miradores",
    address: "Av. 9 de Julio y Corrientes",
    coords: [-34.6037, -58.3816],
    desc: "Ascenso al interior del Obelisco para contemplar la ciudad desde sus ventanas panorámicas.",
    hours: "De 9 a 23:30, todos los días. Turnos con reserva. ",
    price: "$22.500",
    status: "Vista panorámica",
    link: "https://miradorobelisco.com.ar/",
    image:
      "https://media.ambito.com/p/ad400a76f24d89cd9d083ce891a60a3d/adjuntos/239/imagenes/042/833/0042833622/obelisco.jpg",
  },
  {
    id: 15,
    name: "Ateneo Grand Splendid",
    category: "Cultura",
    address: "Av. Santa Fe 1860",
    coords: [-34.5975, -58.3934],
    desc: "Librería instalada en el antiguo teatro Grand Splendid. Conserva escenario, palcos, cúpula pintada y la atmósfera teatral del edificio.",
    hours: "Todos los días de 9 a 21.",
    price: "Gratis",
    status: "Acceso libre",
    link: "https://turismo.buenosaires.gob.ar/es/otros-establecimientos/el-ateneo-grand-splendid",
    image:
      "https://www.lanacion.com.ar/resizer/v2/pudo-haberse-transformado-en-un-garaje-o-en-un-J4LE3HYF5JGS7C7DP6KMJW5SGM.jpg?auth=7dd432757c5132709b1e11e04f3425d2bcead0323f9805fadede121eba6071ef&width=768&quality=70&smart=false",
  },
  {
    id: 16,
    name: "Barrio Chino",
    category: "Barrios",
    address: "Arribeños y Juramento, Belgrano",
    coords: [-34.5585, -58.4545],
    desc: "Paseo por el área comercial y cultural de Belgrano, con tiendas, gastronomía, arcos, mercados y espacios públicos. Ideal para recorrer a pie y sin itinerario fijo.",
    hours: "Locales con horarios particulares; paseo público.",
    price: "Gratis",
    status: "Paseo libre",
    link: "https://turismo.buenosaires.gob.ar/",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1f-BQ6AARbwE7CGvyqit8VHgpYqvH1cxzkkBNiWf4Z6T2U0OVY9QXUNjS&s=10",
  },
  {
    id: 17,
    name: "Barrio de La Boca",
    category: "Barrios",
    address: "Caminito y Av. Pedro de Mendoza, La Boca",
    coords: [-34.6395, -58.3635],
    desc: "Recorrido por uno de los barrios más emblemáticos de Buenos Aires. Sus calles coloridas, los conventillos, Caminito, Vuelta de Rocha y su identidad ligada al tango, la inmigración italiana y el arte popular. También podés recorrer los alrededores de La Bombonera.",
    hours: "Se recomienda recorrer durante el día.",
    price: "Gratis",
    status: "Paseo libre",
    link: "https://turismo.buenosaires.gob.ar/",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDY4WOKPLGL8h-_z0vV9vJ5SwsX5Fskbywvx5FRzsn7yQrhtSoEYNEoEZ&s=10",
  },
  {
    id: 18,
    name: "Cementerio de la Recoleta",
    category: "Museos y lugares históricos",
    address: "Junín 1760, Recoleta, Buenos Aires",
    coords: [-34.5883, -58.3931],
    desc: "Uno de los cementerios más famosos de América Latina, reconocido por sus imponentes mausoleos, esculturas y arquitectura funeraria. Allí descansan figuras destacadas de la historia argentina, entre ellas Eva Perón. Un recorrido por sus calles permite descubrir historias, símbolos y obras de arte.",
    hours: "9 a 17.",
    price:
      "El cementerio ofrece recorridos guiados gratuitos en español saliendo cada una hora desde el acceso principal: lunes a viernes de 10 a 16 horas; sábados, domingos y feriados de 9 a 16 horas",
    status: "Visita turística",
    link: "https://buenosaires.gob.ar/gcaba_historico/visitas-turisticas-al-cementerio-de-la-recoleta",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1c/7c/bb/recoleta-cemetery.jpg?w=900&h=500&s=1",
  },
  {
    id: 19,
    name: "Floralis Genérica",
    category: "Parques y espacios públicos",
    address: "Av. Pres. Figueroa Alcorta 2301, Recoleta",
    coords: [-34.5831, -58.3931],
    desc: "Escultura metálica de una enorme flor ubicada en la Plaza de las Naciones Unidas. Sus pétalos se abren y cierran según un mecanismo que originalmente acompañaba el ciclo del día y la noche. Es uno de los íconos modernos de Buenos Aires.",
    hours: "Espacio público de acceso libre.",
    price: "Gratis",
    status: "Paseo libre",
    link: "https://turismo.buenosaires.gob.ar/",
    image:
      "https://turismo.buenosaires.gob.ar/sites/turismo/files/floralis-verano-gente-sol-26-1500x610.jpg",
  },
  {
    id: 20,
    name: "Parque de la Memoria",
    category: "Parques y espacios públicos",
    address: "Av. Costanera Rafael Obligado 6745, Núñez",
    coords: [-34.5458, -58.4495],
    desc: "Espacio público dedicado a la memoria de las víctimas del terrorismo de Estado en Argentina. Su recorrido incluye el Monumento a las Víctimas del Terrorismo de Estado, con los nombres de las personas desaparecidas y asesinadas, además de esculturas y un entorno junto al Río de la Plata.",
    hours: "Todos los días de 10 a 18.",
    price: "Gratis",
    status: "Paseo libre",
    link: "https://parquedelamemoria.org.ar/",
    image:
      "https://parquedelamemoria.org.ar/wp-content/uploads/2020/04/1_Parque_Responsive_18.jpg",
  },
  {
    id: 21,
    name: "Plaza Seca de AMIA",
    category: "Lugares históricos y de memoria",
    address: "Pasteur 633, Balvanera, Buenos Aires",
    coords: [-34.601806, -58.399444],
    desc: "Espacio abierto y memorial ubicado en el acceso principal de la sede de AMIA. Fue concebido como lugar de memoria tras el atentado del 18 de julio de 1994. Un sitio para recordar a las víctimas y reflexionar sobre uno de los hechos más dolorosos de la historia argentina reciente.",
    hours: "Espacio exterior.",
    price: "Gratis",
    status: "Espacio de memoria",
    link: "https://www.amia.org.ar/2024/01/25/visitas-guiadas-al-edificio-de-amia-una-experiencia-memorable/",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIHr9yybRi6hxLEaET4QhtMq6h4UjeNvK9BDtGUQd1UFz-LLaRD_-6-ac&s=10",
  },
  {
    id: 22,
    name: "Torre Monumental (Torre de los Ingleses)",
    category: "Miradores",
    address: "Av. Dr. José María Ramos Mejía 1315, Retiro, Buenos Aires",
    coords: [-34.5927, -58.3747],
    desc: "Monumento histórico ubicado frente a la Plaza Fuerza Aérea Argentina, en el barrio de Retiro. Fue inaugurado en 1916 como obsequio de la comunidad británica por el centenario de la Revolución de Mayo. Su arquitectura combina elementos neorrenacentistas y detalles vinculados a la tradición británica. Se puede visitar su interior y subir al mirador para disfrutar de las vistas de la ciudad.",
    hours: "Lun a Vie de 10 a 17hs. Sáb, dom y feriados de 10 a 18hs.",
    price: "$2000",
    status: "Vista panorámica",
    link: "https://turismo.buenosaires.gob.ar/",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUVcMIuxb7WNXLRY92dQt_tFPQJn-0HQiFgl1Qosnm_X3wYjV2usJQ6__x&s=10",
  },
  {
    id: 23,
    name: "Mercado de San Telmo",
    category: "Mercados y paseos",
    address: "Carlos Calvo 495, San Telmo, Buenos Aires",
    coords: [-34.6207, -58.3732],
    desc: "Mercado histórico inaugurado en 1897, con una estructura de hierro de estilo industrial que conserva gran parte de su arquitectura original. En su interior conviven puestos de antigüedades, productos frescos, objetos curiosos y una variada oferta gastronómica. Ideal para recorrer, comer algo y descubrir el ambiente tradicional de San Telmo.",
    hours: "Todos los días de 9 a 21",
    price: "Entrada gratuita",
    status: "Paseo libre",
    link: "https://turismo.buenosaires.gob.ar/",
    image:
      "https://www.civitatis.com/f/argentina/buenos-aires/tour-mercado-san-telmo-589x392.jpg",
  },
  {
    id: 24,
    name: "Mirador de la Galería Güemes",
    category: "Miradores",
    address: "Florida 165 / San Martín 170, Microcentro, Buenos Aires",
    coords: [-34.6077, -58.3745],
    desc: "Mirador ubicado en el piso 14 de la histórica Galería Güemes, inaugurada en 1915. Ofrece una vista panorámica de 360° del centro porteño, sus cúpulas, el Río de la Plata y, en días despejados, la costa uruguaya. Se accede por los ascensores de la Torre Mitre y luego por una escalera.",
    hours:
      "Lunes a viernes: ingresos a las 11:00, 12:00, 14:00 y 15:30. Cerrado sábados, domingos, feriados y días de lluvia.",
    price: "$10.000 ARS",
    status: "Vista panorámica",
    link: "https://www.galeriaguemes.com.ar/mirador.html",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_Lj7R7DahLWxEKUKGy1vRWaMqJr0p22H9OfvQDsatsQ6Sy1NN52W98iG&s=10",
  },
];
const categories = ["Todas", ...new Set(places.map((p) => p.category))];

const redIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FlyToSelected({ place }) {
  const map = useMap();
  React.useEffect(() => {
    if (place) map.flyTo(place.coords, 15, { duration: 0.6 });
  }, [place, map]);
  return null;
}
function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("cards");
  const filtered = useMemo(
    () =>
      places.filter(
        (p) =>
          (category === "Todas" || p.category === category) &&
          `${p.name} ${p.desc} ${p.address}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, category],
  );
  const focusPlace = (p) => {
    setSelected(p);
    setView("map");
    document
      .querySelector(".map-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">GUÍA URBANA · BUENOS AIRES · 2027</p>
          <h1>
            Una ciudad.
            <br />
            <em>Mil puertas.</em>
          </h1>
          <p className="intro">
            Edificios históricos, visitas institucionales, palacios, museos y
            rincones para descubrir Buenos Aires desde adentro.
          </p>
          <div className="hero-meta">
            <span>{places.length} lugares seleccionados</span>
            <span>·</span>
            <span>Guía práctica</span>
          </div>
          <a className="hero-cta" href="#explorar">
            Explorar la guía ↓
          </a>
        </div>
        <div className="hero-image" />
      </header>
      <main id="explorar">
        <section className="map-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORAR</p>
              <h2>Todos los lugares, en el mapa</h2>
            </div>
            <p className="muted">Seleccioná un marcador para ver su ficha.</p>
          </div>
          <MapContainer
            center={[-34.6037, -58.39]}
            zoom={12}
            scrollWheelZoom
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selected && <FlyToSelected place={selected} />}
            {places.map((p) => (
              <Marker key={p.id} position={p.coords} icon={redIcon}>
                <Popup>
                  <strong>{p.name}</strong>
                  <br />
                  {p.address}
                  <br />
                  <a href={`#place-${p.id}`}>Ver ficha ↓</a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>
        <section className="list-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LA LISTA</p>
              <h2>Elegí tu próxima visita</h2>
            </div>
            <p className="muted">Horarios y costos: revisar antes de ir.</p>
          </div>
          <div className="filters">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar lugares…"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <span className="count">{filtered.length} lugares</span>
          </div>
          <div className="cards">
            {filtered.map((p) => (
              <article
                id={`place-${p.id}`}
                key={p.id}
                className={`place-card ${selected?.id === p.id ? "selected" : ""}`}
              >
                <div
                  className="photo"
                  style={{ backgroundImage: `url('${p.image}')` }}
                >
                  <span className="tag">{p.category}</span>
                </div>
                <div className="card-content">
                  <h3>{p.name}</h3>
                  <p className="address">⌖ {p.address}</p>
                  <p className="description">{p.desc}</p>
                  <div className="details">
                    <div>
                      <span className="detail-label">HORARIOS</span>
                      <p>{p.hours}</p>
                    </div>
                    <div>
                      <span className="detail-label">PRECIO / ACCESO</span>
                      <p>{p.price}</p>
                    </div>
                  </div>
                  <span
                    className={`status ${p.status.includes("suspend") ? "warn" : ""}`}
                  >
                    {p.status}
                  </span>
                  <div className="card-actions">
                    <a
                      className="link"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Fuente oficial ↗
                    </a>
                    <button onClick={() => focusPlace(p)}>Ver en mapa ↗</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p>No encontramos lugares con esa búsqueda.</p>
          )}
        </section>
        <section className="notes">
          <h3>Antes de salir</h3>
          <p>
            Esta guía es una recopilación independiente. Los precios, horarios,
            cupos y circuitos pueden cambiar, y algunas instituciones suspenden
            las visitas por actividad oficial. En las fichas se distingue la
            información consultada de aquello que aún debe confirmarse. Verificá
            siempre en el enlace oficial antes de organizar tu visita.
          </p>
          <p className="updated">
            Revisión de fuentes: noviembre de 2026 · Valores en pesos argentinos.
          </p>
        </section>
        <footer>
          <p>BA · GUÍA DE VISITAS</p>
          <small>Hecho por Sofi con ❤︎ para sus tíos Marta y Benja.</small>
        </footer>
      </main>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
