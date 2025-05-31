const playBtn = document.getElementById("playBtn");
const replayBtn = document.getElementById("replayBtn");
const song = document.getElementById("song");
const text = document.querySelector(".text");
const textContainer = document.querySelector(".text-container");
const contador = document.getElementById('contador');

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
  "Gracias por mostrarme tus bandas y cancioness favoritas",
  "Gracias por ser tan dulce y tener tanta paciencia conmigo.",
  "Te amo 💖",
];

const messages1 = [''];

const ahora = new Date(); // fecha actual
const cumple = new Date('2024-06-15'); // fecha específica (ISO recomendado)
const desdeNumeros = new Date(2024, 5, 15); // año, mes (0-indexado), día → 15 de junio de 2024

function currentTime(){
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  
  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;
  
  let time = hh + ":" + mm + ":" + ss;
  
  return date;
  
}

function diferenciaCompleta() {
  const fechaInicio = new Date('2024-12-02T02:30:00');
  const fechaActual = new Date();

  let inicio = new Date(fechaInicio);
  let fin = new Date(fechaActual);

  if (fin < inicio) [inicio, fin] = [fin, inicio]; // asegurar orden

  let años = fin.getFullYear() - inicio.getFullYear();
  let meses = fin.getMonth() - inicio.getMonth();
  let días = fin.getDate() - inicio.getDate();
  let horas = fin.getHours() - inicio.getHours();
  let minutos = fin.getMinutes() - inicio.getMinutes();
  let segundos = fin.getSeconds() - inicio.getSeconds();

  // Ajustes hacia atrás si algo es negativo
  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    días--;
  }
  if (días < 0) {
    const mesAnterior = new Date(fin.getFullYear(), fin.getMonth(), 0);
    días += mesAnterior.getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    años--;
  }

  let time = `Meses: ${meses}, Días: ${días}, Horas: ${horas}, Minutos: ${minutos}, Segundos: ${segundos}`;

  let contador = document.querySelector(`#contador`);
  contador.innerHTML = time;

  let title = document.querySelector('#title');
  title.innerHTML = "Tiempo Juntos";

  return { años, meses, días, horas, minutos, segundos };
}

function showMessage(index) {
  if (index >= messages.length) {
    setInterval(diferenciaCompleta, 1000);
    setTimeout(() => {
      replayBtn.style.display = "inherit";
    },2000);
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
  replayBtn.style.display = "none";


  setTimeout(() => {
    playBtn.style.display = "none";

    song.play();

    // Muestra el texto con fade y animación
    textContainer.style.display = "inline-block";
    text.style.opacity = 1;
    showMessage(0);
    text.style.animation = "cursor .4s step-end infinite alternate";
  }, 1500);
}

playBtn.addEventListener("click", play);

replayBtn.addEventListener("click", play);

