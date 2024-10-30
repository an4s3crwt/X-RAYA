let turnoJugador = "A"; // Inicialmente turno del jugador A (jugador "O")

// Función para inicializar el mensaje de turno
function inicializarTurno() {
    const turnoDiv = document.getElementById("turnoJugador");
    turnoDiv.innerHTML = `Turno del jugador <img src="imagenes/o.jpg" width="20px" height="20px">`;
}

// Permitir el drop
function allowDrop(event) {
    event.preventDefault();
}

// Guardar el ID de la ficha cuando comienza a arrastrarse
function drag(event) {
    const fichaId = event.target.id;

    // Restringir el movimiento si no es el turno del jugador correcto
    if ((turnoJugador === "A" && fichaId.startsWith("fichaA")) || 
        (turnoJugador === "B" && fichaId.startsWith("fichaB"))) {
        event.dataTransfer.setData("text", fichaId);
    } else {
        event.preventDefault();
    }
}

// Mover la ficha al soltarla en una celda vacía
function drop(event) {
    event.preventDefault();

    const fichaId = event.dataTransfer.getData("text");
    const ficha = document.getElementById(fichaId);

    // Verificar si la celda destino ya tiene una ficha
    if (!event.target.hasChildNodes()) {
        // Mover la ficha arrastrada a la nueva celda
        event.target.appendChild(ficha);

        // Cambiar el turno al otro jugador
        turnoJugador = turnoJugador === "A" ? "B" : "A";
        
        // Actualizar el mensaje de turno en pantalla con la imagen correspondiente
        const turnoDiv = document.getElementById("turnoJugador");
        turnoDiv.innerHTML = `Turno del jugador <img src="imagenes/${turnoJugador === "A" ? "o.jpg" : "x.jpg"}" width="20px" height="20px">`;
    }
}

// Llamar a la función para inicializar el turno cuando se cargue la página
window.onload = inicializarTurno;
