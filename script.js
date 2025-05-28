const playBtn = document.getElementById("playBtn");
const song = document.getElementById("song");
const text = document.querySelector(".text");
const textContainer = document.querySelector(".text-container"); 

const messages = [
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
    "Gracias por tantas conversaciones bonitas que hemos compartido.",
    "Gracias por todas esas noches en las que escuchábamos música y todas eran tus canciones <3",
    "Gracias por mostrarme tus bandas favoritas, tus canciones favoritas.",
    "Gracias por ser tan dulce y tener tanta paciencia conmigo.",
    "Te amo 💖",
  ];
  

function showMessage(index) {
  if (index >= messages.length) return;
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

playBtn.addEventListener("click", () => {
  playBtn.style.opacity = 0;

  setTimeout(() => {
    playBtn.style.display = "none";

    // Reproduce la canción (descomenta si quieres)
    song.play();

    // Muestra el texto con fade y animación
    textContainer.style.display = "inline-block";
    text.style.opacity = 1;
    showMessage(0);
    text.style.animation = "cursor .4s step-end infinite alternate";
  }, 1500);
});
