let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Representa el tablero
let turnoJugador = "A"; // Inicialmente turno del jugador A
// Contador de victorias
let victoriasA = localStorage.getItem("victoriasA") ? parseInt(localStorage.getItem("victoriasA")) : 0;
let victoriasB = localStorage.getItem("victoriasB") ? parseInt(localStorage.getItem("victoriasB")) : 0;

// Actualizar el mensaje del turno
function inicializarTurno() {
  const turnoDiv = document.getElementById("turnoJugador");
  turnoDiv.innerHTML = `Turno del jugador <img src="imagenes/o.jpg" width="20px" height="20px">`;
}

// Comprobar si alguien ha ganado
function comprobarGanador() {
  // Si el turno es A devolvemos A sino B
  // turnoJugador por defecto a A
  const currentPlayer = turnoJugador === "A" ? "A" : "B";

  // Comprobar filas
  if (
    (gameBoard[0] === currentPlayer && gameBoard[1] === currentPlayer && gameBoard[2] === currentPlayer) ||
    (gameBoard[3] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[5] === currentPlayer) ||
    (gameBoard[6] === currentPlayer && gameBoard[7] === currentPlayer && gameBoard[8] === currentPlayer)
  ) {
    actualizarVictorias(currentPlayer);
    return true;
  }

  // Comprobar columnas
  if (
    (gameBoard[0] === currentPlayer && gameBoard[3] === currentPlayer && gameBoard[6] === currentPlayer) ||
    (gameBoard[1] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[7] === currentPlayer) ||
    (gameBoard[2] === currentPlayer && gameBoard[5] === currentPlayer && gameBoard[8] === currentPlayer)
  ) {
    actualizarVictorias(currentPlayer);
    return true;
  }

  // Comprobar diagonales
  if (
    (gameBoard[0] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[8] === currentPlayer) ||
    (gameBoard[2] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[6] === currentPlayer)
  ) {
    actualizarVictorias(currentPlayer);
    return true;
  }

  return false;
}

// Actualizar el contador de victorias en el HTML al cargar la página
document.getElementById("victoriasA").textContent = "Victorias: " + victoriasA;
document.getElementById("victoriasB").textContent = "Victorias: " + victoriasB;

// Función para actualizar el contador de victorias y mostrarlo en el HTML
function actualizarVictorias(jugador) {
  if (jugador === "A") {
    // Incrementamos las victorias y actualizamos en localStorage
    victoriasA++;
    localStorage.setItem("victoriasA", victoriasA);
    document.getElementById("victoriasA").textContent = "Victorias: " + victoriasA;
  } else {
    // Incrementamos las victorias y actualizamos en localStorage
    victoriasB++;
    localStorage.setItem("victoriasB", victoriasB);
    document.getElementById("victoriasB").textContent = "Victorias: " + victoriasB;
  }
}

// Permitimos drop
function allowDrop(event) {
  event.preventDefault();
}

// Guardar el ID de la ficha cuando comienza a arrastrarse
function drag(event) {
  // Obtenemos el id de la ficha que hemos cogido
  const fichaId = event.target.id;

  // Combrobamos que el turno de jugador y la ficha escogida sean correctas
  if ((turnoJugador === "A" && fichaId.startsWith("fichaA")) ||
    (turnoJugador === "B" && fichaId.startsWith("fichaB"))) {
    event.dataTransfer.setData("text", fichaId);
  } else {
    // Si no es el tuno del jugador correcto cancelamos el movimiento
    event.preventDefault();
  }
}

// Mover la ficha al soltarla en una celda vacía
function drop(event) {
  event.preventDefault();

  // Obtenemos el id de la ficha que estamos soltando
  const fichaId = event.dataTransfer.getData("text");
  const ficha = document.getElementById(fichaId);

  // Obtenemos el índice de la celda en la que se intenta colocar la ficha
  const cellIndex = Array.from(document.querySelectorAll('#tablero .casilla')).indexOf(event.target);

  // Verificamos si la celda en el array gameBoard está vacía
  if (gameBoard[cellIndex] === "") {
    // Si la celda está vacía, añadimos la ficha
    event.target.appendChild(ficha);
    gameBoard[cellIndex] = turnoJugador;

    // Comprobamos si alguien ha ganado
    if (comprobarGanador()) {
      alert(`¡El jugador ${turnoJugador} ha ganado!`);

      // Reiniciamos el array gameBoard y el tablero visual
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      document.querySelectorAll('#tablero .casilla').forEach(casilla => casilla.innerHTML = '');

    } else {
      // Si no hay ganador, cambiamos de turno
      turnoJugador = turnoJugador === "A" ? "B" : "A";
      const turnoDiv = document.getElementById("turnoJugador");
      turnoDiv.innerHTML = `Turno del jugador <img src="imagenes/${turnoJugador === "A" ? "o.jpg" : "x.jpg"}" width="20px" height="20px">`;
    }
  } else {
    // Si la celda ya está ocupada, mostramos un mensaje
    alert("Esta casilla ya tiene una ficha, elige otra casilla.");
  }
}



// Por defecto tiene el turno el jugador A
window.onload = inicializarTurno;
