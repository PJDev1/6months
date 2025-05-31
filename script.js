// === 1) PRELOAD: crea un array de Image para p1.jpg… p18.jpg ===
const precargadas = [];
for (let i = 1; i <= 4; i++) {
  const img = new Image();
  img.src = `images/p${i}.jpg`;
  img.alt = "Nosotros";
  img.className = "photo";

  precargadas.push(img);
}

const playBtn = document.getElementById("playBtn");
const replayBtn = document.getElementById("replayBtn");
const song = document.getElementById("song");
const text = document.querySelector(".text");
const textContainer = document.querySelector(".text-container");
const btnContainer = document.querySelector(".btn__container");
const photoFrame = document.getElementById("photo-frame");

let messages1 = [
  "Hace casi 9 meses...",
  "Empecé a hablarte sin tener idea de todo lo que vendría después.",
  "Jamás imaginé que ese día marcaría el inicio de algo tan especial.",
  "¿Recuerdas aquella noche en la que me dijiste que el destino nos tenía aquí por algo?",
  "Cada día estoy más convencido de que tenías razón.",
  "Es increíble pensar que...",
  "Compartimos varias clases juntos,",
  "y aun así nunca coincidimos.",
  "Estoy justo debajo de ti en la foto de generación,",
  "y aún así nunca nos vimos.",
  "Tuvieron que pasar muchas cosas para que finalmente nos conociéramos.",
  "Lo que hemos compartido hablando no lo cambiaría por nada.",
  "Cada canción tuya terminó siendo parte de mi historia.",
  "Conocer tu música fue como asomarme a tu mundo. <3",
  "Tener a alguien tan comprensivo como tú ha sido un regalo.",
  "Te amo 💖",
];

function numeroAleatorio1a18() {
  return Math.floor(Math.random() * 4) + 1;
}

// Inserta la <img> usando la precarga en vez de crear la ruta al vuelo
function generarImagenAleatoria() {
  const numero = numeroAleatorio1a18();
  // En lugar de crear un <img> y luego asignar src,
  // podemos clonar del array precargado para garantizar que está listo.
  const imagen = precargadas[numero - 1].cloneNode(); 
  // cloneNode() copia todos los atributos (src, width, height, etc.)

  // Limpia y agrega
  photoFrame.innerHTML = "";
  photoFrame.appendChild(imagen);
}

let messages = [""];

messages = messages1;

function showMessage(index) {
  if (index >= messages.length) {
    // Cuando ya no hay más índices, GENERO LA IMAGEN y luego muestro foto+btn
    generarImagenAleatoria();
    setTimeout(() => {
      // 1) Ensayo: ocultar cualquier resto de clases de animación
      btnContainer.classList.remove("fade-in");
      btnContainer.classList.add("none"); // lo dejamos oculto
      photoFrame.classList.remove("fade-in");
      replayBtn.classList.remove("fade-in", "none");

      // 2) Ahora quitamos “none” y aplicamos “fade-in” para que aparezcan de nuevo
      btnContainer.classList.remove("none");
      btnContainer.classList.add("fade-in");

      // El photoFrame ya no tenía .none (estaba dentro de btnContainer), 
      // sólo nos aseguramos de aplicar la animación
      photoFrame.classList.add("fade-in");

      // Mostrar el botón de “Volver a reproducir”
      replayBtn.classList.remove("none");
      replayBtn.classList.add("fade-in");
    }, 2000);
    return;
  }

  const message = messages[index];
  text.textContent = "";
  text.style.opacity = 1;

  let charIndex = 0;

  const typingInterval = setInterval(() => {
    if (charIndex < message.length) {
      text.textContent += message.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typingInterval);
      setTimeout(() => {
        text.style.opacity = 0;
        setTimeout(() => {
          showMessage(index + 1);
        }, 1000);
      }, 2000);
    }
  }, 100);
}

function play() {
  playBtn.style.opacity = 0;

  setTimeout(() => {
    playBtn.style.display = "none";
    song.currentTime = 0;
    song.play();

    // Muestra el texto con fade y animación
    textContainer.style.display = "inline-block";
    text.style.opacity = 1;
    showMessage(0);
    text.style.animation = "cursor .4s step-end infinite alternate";
  }, 1500);
}

function replay() {
  // 1) Limpiar el photoFrame (ocultar la foto)
  photoFrame.innerHTML = "";

  // 2) Ocultar TODO el bloque btnContainer y botón
  btnContainer.classList.add("none");
  btnContainer.classList.remove("fade-in");
  replayBtn.classList.add("none");
  replayBtn.classList.remove("fade-in");

  // 3) Ocultar el texto (si aún sigue visible)
  textContainer.style.display = "none";
  text.style.opacity = 0;
  text.style.animation = ""; // quita la animación de cursor si quedó

  // 4) Reiniciar audio y reproducir
  song.currentTime = 0;
  song.play();

  // 5) Volver a iniciar la “secuencia de texto → foto+btn”
  setTimeout(() => {
    textContainer.style.display = "inline-block";
    text.style.animation = "cursor .4s step-end infinite alternate";
    showMessage(0);
  }, 1500);
}


playBtn.addEventListener("click", play);

replayBtn.addEventListener("click", replay);
