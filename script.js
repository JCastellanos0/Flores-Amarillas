// Variables globales
let audioContext;
let audioElement;
let isPlaying = false;

// Iniciar la experiencia
document.getElementById("btn-start").addEventListener("click", () => {
  const intro = document.getElementById("intro");
  const content = document.getElementById("content");
  
  intro.classList.add("hidden");
  content.classList.remove("hidden");
  
  // Reproducir la canción desde el segundo 47 hasta el minuto 3:33
  playSongSegment(47, 3 * 60 + 33);
  
  startExperience();
});

// Función para reproducir segmento específico de la canción
function playSongSegment(startSecond, endSecond) {
  audioElement = document.getElementById("song");
  
  // Establecer el punto de inicio (47 segundos)
  audioElement.currentTime = startSecond;
  
  // Reproducir la canción
  audioElement.play();
  isPlaying = true;
  
  // Detener la canción al llegar al tiempo especificado (3:33)
  audioElement.ontimeupdate = function() {
    if (audioElement.currentTime >= endSecond) {
      audioElement.pause();
      isPlaying = false;
      audioElement.ontimeupdate = null; // Eliminar el event listener
    }
  };
  
  // Manejar errores de reproducción
  audioElement.onerror = function() {
    console.error("Error al cargar el audio. Asegúrate de que el archivo 'flores.mp3' existe.");
    // Crear un tono de respaldo si la canción no está disponible
    createFallbackAudio();
  };
}

// Crear audio de respaldo si la canción no está disponible
function createFallbackAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 106000); // Detener después de 106 segundos (3:33 - 0:47)
    
  } catch (e) {
    console.error("El audio no está soportado en este navegador:", e);
  }
}

// Crear pétalos cayendo
function crearPetales() {
  const petalsContainer = document.getElementById("petals");
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const petal = document.createElement("div");
      petal.classList.add("petal");
      
      // Posición aleatoria
      petal.style.left = Math.random() * window.innerWidth + "px";
      
      // Tamaño aleatorio
      const size = Math.random() * 12 + 8;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.5}px`;
      
      // Duración aleatoria de animación
      petal.style.animationDuration = (Math.random() * 5 + 5) + "s";
      
      // Opacidad aleatoria
      petal.style.opacity = Math.random() * 0.5 + 0.3;
      
      petalsContainer.appendChild(petal);
      
      // Eliminar después de la animación
      setTimeout(() => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
        }
      }, 10000);
    }, i * 300);
  }
}

// Mostrar flores con animación (menos flores para que quepa en pantalla)
function mostrarFlores() {
  const flowersContainer = document.getElementById("flowers");
  const flowerCount = 6; // Reducido a 6 flores para que quepa en pantalla
  
  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = "🌻";
    flower.style.animationDelay = `${i * 0.2}s`;
    flowersContainer.appendChild(flower);
  }
}

// Mostrar mensaje con efecto de escritura (más corto)
function mostrarMensaje() {
  const mensajes = [
    "Feliz 21 de septiembre 💛",
    "Te regalo estas flores amarillas",
    "porque iluminas mi vida como el sol",
    "Eres especial y única,",
    "y te aprecio más de lo que las palabras pueden expresar.",
    "Con cariño..."
  ];
  
  const p = document.getElementById("message");
  let messageIndex = 0;
  let charIndex = 0;
  
  function typeWriter() {
    if (messageIndex < mensajes.length) {
      if (charIndex < mensajes[messageIndex].length) {
        p.innerHTML += mensajes[messageIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 70);
      } else {
        p.innerHTML += "<br>";
        messageIndex++;
        charIndex = 0;
        setTimeout(typeWriter, 400);
      }
    }
  }
  
  typeWriter();
}

// Iniciar toda la experiencia
function startExperience() {
  // Crear pétalos
  crearPetales();
  
  // Mostrar flores
  mostrarFlores();
  
  // Mostrar mensaje después de un breve delay
  setTimeout(mostrarMensaje, 1500);
  
  // Continuar creando pétalos periódicamente
  setInterval(crearPetales, 8000);
}

// Pausar la canción si el usuario cambia de pestaña
document.addEventListener('visibilitychange', function() {
  if (audioElement && isPlaying) {
    if (document.hidden) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }
});

// Crear elementos decorativos para la primera pantalla
function createIntroEffects() {
  createFloatingHearts();
  createConfetti();
}

// Crear corazones flotantes
function createFloatingHearts() {
  const heartsContainer = document.createElement('div');
  heartsContainer.classList.add('floating-hearts');
  document.querySelector('.container').appendChild(heartsContainer);
  
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.innerHTML = '💛';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${i * 0.8}s`;
      heartsContainer.appendChild(heart);
    }, i * 800);
  }
}

// Crear efecto de confeti
function createConfetti() {
  const introElement = document.querySelector('.intro');
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    confetti.style.animationDuration = `${3 + Math.random() * 3}s`;
    
    // Colores aleatorios
    const colors = [
      'linear-gradient(45deg, #ffeb3b, #ffc107)',
      'linear-gradient(45deg, #ff9800, #ff5722)',
      'linear-gradient(45deg, #4caf50, #8bc34a)',
      'linear-gradient(45deg, #2196f3, #03a9f4)'
    ];
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    introElement.appendChild(confetti);
  }
}

// Inicializar efectos cuando la página cargue
window.addEventListener('DOMContentLoaded', () => {
  createIntroEffects();
});