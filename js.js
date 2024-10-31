// Inicializa el turno
let turnoJugador = "A"; // Cambia a "B" después del primer turno
//Variables para los contadores
let victoriasA = 0;
let victoriasB = 0;
// Función para inicializar el mensaje de turno
function inicializarTurno() {
    const turnoDiv = document.getElementById("turnoJugador");
    turnoDiv.innerHTML = 'Turno del jugador <img src="img/o.jpg" width="20px" height="20px">';
}
function allowDrop(e) {
    e.preventDefault();
}
// Llama a la función para inicializar el turno
inicializarTurno();
// Guardar el ID de la ficha cuando comienza a arrastrarse
function drag(e) {
    let fichaId = e.target.id;

    // Restringir el movimiento si no es el turno del jugador correcto
    if ((turnoJugador === "A" && fichaId.startsWith("fichaA")) || 
        (turnoJugador === "B" && fichaId.startsWith("fichaB"))) {
        e.dataTransfer.setData('text/plain', fichaId);
    } else {
        e.preventDefault();
    }
}
// Mover la ficha al soltarla en una celda vacía
function drop(e) {
    e.preventDefault();

    const fichaId = e.dataTransfer.getData('text/plain');
    const ficha = document.getElementById(fichaId);

    // Aseguramos que el target sea una casilla y que no contenga ningún elemento
    if (e.target.classList.contains("casilla") && e.target.children.length === 0) {
        // Mueve la ficha arrastrada a la casilla seleccionada
        e.target.appendChild(ficha);

        // Cambia el turno al otro jugador
        turnoJugador = turnoJugador === "A" ? "B" : "A";

        // Actualiza el mensaje de turno en pantalla con la imagen correspondiente
        const turnoDiv = document.getElementById("turnoJugador");
        turnoDiv.innerHTML = `Turno del jugador <img src="img/${turnoJugador === "A" ? "o.jpg" : "x.jpg"}" width="20px" height="20px">`;

        // Comprobar si hay un ganador después de hacer un movimiento
        comprobar();
    } else {
        alert("Esta casilla ya tiene una ficha o no es una casilla válida.");
    }
}

function comprobar() {
    let casillas = document.getElementsByClassName("casilla");
    let combinaciones = [
        [0, 1, 2], // Fila superior
        [3, 4, 5], // Fila central
        [6, 7, 8], // Fila inferior
        [0, 3, 6], // Columna izquierda
        [1, 4, 7], // Columna central
        [2, 5, 8], // Columna derecha
        [0, 4, 8], // Diagonal de izquierda a derecha
        [2, 4, 6]  // Diagonal de derecha a izquierda
    ];

    // Iterar a través de las combinaciones ganadoras
    for (let i = 0; i < combinaciones.length; i++) {
        let [pos1, pos2, pos3] = combinaciones[i];

        let ficha1 = casillas[pos1].children[0] ? casillas[pos1].children[0].src : null;
        let ficha2 = casillas[pos2].children[0] ? casillas[pos2].children[0].src : null;
        let ficha3 = casillas[pos3].children[0] ? casillas[pos3].children[0].src : null;

        // Comprobar si todas las fichas en la combinación son iguales
        if (ficha1 && ficha1 === ficha2 && ficha1 === ficha3) {
            ganar(ficha1);
            return; // Terminar la función si hay un ganador
        }
    }
}
//comprobar que jugador ha ganado según el src (la imagen) alamcenada en ficha1
function ganar(ficha1) {
    let ganador = ficha1.includes("o.jpg") ? "Jugador A" : "Jugador B";
    alert(`${ganador} HA GANADO!!!!!!!!!!!`);
    // Actualiza el marcador
    if (ganador === "Jugador A") {
        victoriasA++;
    } else {
        victoriasB++;
    }
    actualizarMarcador(); // Actualiza el marcador en pantalla
    resetjuego();
}
function resetjuego(){
    const jugadorA = document.getElementById("jugadorA");
    const jugadorB = document.getElementById("jugadorB");

    // Mueve todas las fichas de nuevo a sus áreas de jugadores
    for (let i = 1; i <= 3; i++) {
        jugadorA.appendChild(document.getElementById(`fichaA${i}`));
        jugadorB.appendChild(document.getElementById(`fichaB${i}`));
    }

    // Limpia las casillas del tablero eliminando cualquier ficha en ellas
    const casillas = document.getElementsByClassName("casilla");
    for (let casilla of casillas) {
        // Elimina todos los elementos hijos (fichas) de la casilla
        while (casilla.firstChild) {
            casilla.removeChild(casilla.firstChild);
        }
    }

    // Restablece el turno al Jugador A y actualiza el mensaje en pantalla
    turnoJugador = "A";
    inicializarTurno();
}

function actualizarMarcador() {
    document.getElementById("victoriasA").innerText = victoriasA;
    document.getElementById("victoriasB").innerText = victoriasB;
}
function comenzar(){
     // Reinicia los contadores de victorias a cero al cargar la página
     victoriasA = 0;
     victoriasB = 0;
     inicializarTurno();
     actualizarMarcador(); // Inicializa los contadores en pantalla
}

// Llama a la función para inicializar el turno y el marcador cuando se carga la página
window.onload = () => {
   comenzar();
};