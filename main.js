let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Representa el tablero
let turnoJugador = "A"; // Inicialmente turno del jugador A
let victoriasA = 0; // Contadores de victorias
let victoriasB = 0;

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

// Función para actualizar el contador de victorias y mostrarlo en el HTML
function actualizarVictorias(jugador) {
  if (jugador === "A") {
    // Incrementamos las victorias
    victoriasA++;
    // Modificamos el contador en el HTML
    document.getElementById("victoriasA").textContent = "Victorias" + victoriasA;
  } else {
    victoriasB++;
    document.getElementById("victoriasB").textContent = "Victorias" + victoriasB;
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

  // Obtenemos el id de la celda donde hemos soltado la ficha
  const fichaId = event.dataTransfer.getData("text");
  const ficha = document.getElementById(fichaId);

  // Si no contiene nada  añadimos la ficha
  if (!event.target.hasChildNodes()) {
    event.target.appendChild(ficha);

    // Convertimos los elementos obtenidos a un array, event.target 
    // representa con que celda a interactuado el usuario.
    const cellIndex = Array.from(document.querySelectorAll('#tablero .casilla')).indexOf(event.target);
    gameBoard[cellIndex] = turnoJugador;

    // Si alguien gana reiniciamos el tablero y el turno
    if (comprobarGanador()) {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
    } else {
      // Si nadie ha ganado intercambiamos el turno 
      turnoJugador = turnoJugador === "A" ? "B" : "A";
      const turnoDiv = document.getElementById("turnoJugador");
      turnoDiv.innerHTML = `Turno del jugador <img src="imagenes/${turnoJugador === "A" ? "o.jpg" : "x.jpg"}" width="20px" height="20px">`;
    }
  }
}
// Por defecto tiene el turno el jugador A
window.onload = inicializarTurno;
