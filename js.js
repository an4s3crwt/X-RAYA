// Inicializa el turno nprincipal
let turnoJugador = "A"; // Cambia a "B" después del primer turno

//Variables para los contadores de los dos jugadores
let victoriasA = 0; 
let victoriasB = 0;



/*
 Esta función coloca el mensaje  del turno inicial en pantalla, indicando 
 que el turno comienza con el Jugador A. Muestra la imagen correspondiente 
 (o.jpg para el jugador A)
*/
function inicializarTurno() {
    const turnoDiv = document.getElementById("turnoJugador");
    turnoDiv.innerHTML = 'Turno del jugador <img src="img/o.jpg" width="20px" height="20px">';//actualiza el contendiod con el turno del jugador a
}


//función apra que los elementos sean arrastrables
function allowDrop(e) {
    e.preventDefault();//evitar el comportamiento x defecto del navegador 
}


// Llama a la función para inicializar el turno
inicializarTurno();




/*

 La función drag permite arrastrar
  una ficha solo si pertenece al jugador actual. D
  e lo contrario, previene el movimiento.
*/
// Guardar el ID de la ficha cuando comienza a arrastrarse
function drag(e) {
    let fichaId = e.target.id; //guarda el id de la ficha que esta siendo arrastrada
    let ficha = document.getElementById(fichaId);

    // Verificar con el if/else si la ficha arrastrada es del jugador que tienen el turno
    if ((turnoJugador === "A" && ficha.parentElement.id === "jugadorA" )|| //que el id de la ficha tenga el nombre fichaA
        (turnoJugador === "B" && ficha.parentElement.id === "jugadorB")) { //que el id de la ficha tenga el nombre fichaB


            //si es el truno que toca, almacena el id de la ficha que se ha elegido en dataTransfer
        e.dataTransfer.setData('text/plain', fichaId);
    } else {
        //si no es su turno, previene el arrastre
        e.preventDefault(); 
    }
}



// Función que mueve la ficha al soltarla en una celda vacía
function drop(e) {
    e.preventDefault();

    let fichaId = e.dataTransfer.getData('text/plain'); //obtiene el id de la ficha arrastrada
    let ficha = document.getElementById(fichaId);//obtiene la ficha arrastrada por el id del html

    // Asegurar que el área donde se suelta la ficha es una casilla y está vacía, es decir que sea igual a 0
    if (e.target.classList.contains("casilla") && e.target.children.length === 0) {
        e.target.appendChild(ficha);// Mueve la ficha arrastrada a la casilla seleccionada

        
        turnoJugador = turnoJugador === "A" ? "B" : "A";//aquí se cambia el turno del jugador cada vez que se hace drop de un elemento

        // Actualiza el mensaje de turno en pantalla con la imagen que toca según el jugador
        let turnoDiv = document.getElementById("turnoJugador");
        turnoDiv.innerHTML = `Turno del jugador <img src="img/${turnoJugador === "A" ? "o.jpg" : "x.jpg"}" width="20px" height="20px">`;

        // llamar a la función que comprueba si hay un ganador después de hacer cada movimiento
        comprobar();
    } else {
        mostrarMensaje("Esta casilla está ocupada.", 2000);
    }
}



//Función que comprueba si hay ganador según las casillas en las que estan las imagenes/ fichas
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

    // Iterar a través de las combinaciones ganadoras, array
    for (let i = 0; i < combinaciones.length; i++) {
        let [pos1, pos2, pos3] = combinaciones[i]; //para asignar cada posición

        
        /*
        OBTENER LAS FICHAS EN SUS POSICIONES    
        la variable casillas es una colección de todas las casillas del tablero(divs vacíos con o sin ficha)
        
        */
        let ficha1 = null;
        if (casillas[pos1].children[0]) { //representa la casilla en la posición pos1, verifica si existe una ficha (children[0] se refiere al elemento dentro de la casilla)
            ficha1 = casillas[pos1].children[0].src; //si hay una ficha en la casilla de la posicion1, guardará su src(la imagen que representa la ficha, sea X o O)

        }

        let ficha2 = null;
        if (casillas[pos2].children[0]) {
            ficha2 = casillas[pos2].children[0].src;
        }

        let ficha3 = null;
        if (casillas[pos3].children[0]) {
            ficha3 = casillas[pos3].children[0].src;
        }

        // Comprobar si todas las fichas en la combinación son iguales
        if (ficha1 && ficha1 === ficha2 && ficha1 === ficha3) {
            ganar(ficha1);//si coinciden que son iguales llamar a la funcion ganar para mostrar el mensaje
            return; // Terminar la función si hay un ganador
        }
    }
}
//comprobar que jugador ha ganado según el src (la imagen) alamcenada en ficha1
function ganar(ficha1) {
    let ganador = ficha1.includes("o.jpg") ? "Jugador A" : "Jugador B";
    mostrarMensaje(`${ganador} HA GANADO!!!!!!!!!!!`,1000);
    // Actualiza el marcador según el ganador
    if (ganador === "Jugador A") {
        victoriasA++;
    } else {
        victoriasB++;
    }
    actualizarMarcador(); // llamar a la función que  actualizay muestra el marcador en pantalla
    resetjuego();//llmar a la función que restablece el tablero para vaciar las casillas
}




function resetjuego() {
    // obtenener las áreas de los jugadores donde se colocan las fichas al inicio
    let jugadorA = document.getElementById("jugadorA"); // selecciona el área inicial del Jugador A
    let jugadorB = document.getElementById("jugadorB"); //selecciona el área inicial del jugadorB

    // Mueve cada ficha del Jugador A y del Jugador B de vuelta a su área inicial
    for (let i = 1; i <= 3; i++) {
        // Obtener cada ficha del jugador A y moverla al área de jugador A
        let fichaA = document.getElementById(`fichaA${i}`);
        jugadorA.appendChild(fichaA);

        // Obtener cada ficha del jugador B y moverla al área de jugador B
        let fichaB = document.getElementById(`fichaB${i}`);
        jugadorB.appendChild(fichaB);
    }

    // Limpia las casillas del tablero eliminando cualquier ficha en ellas
    const casillas = document.getElementsByClassName("casilla");

    // Usamos un bucle for para recorrer todas las casillas
    for (let i = 0; i < casillas.length; i++) {
        let casilla = casillas[i]; // Accedemos a cada casilla

        // Borramos cualquier ficha dentro de la casilla repitiendo hasta que esté vacía
        while (casilla.firstChild) {
            casilla.removeChild(casilla.firstChild); // Removemos la ficha
        }
    }

    // Restablece el turno al Jugador A
    turnoJugador = "A";

    // Llama a la función para actualizar el mensaje en pantalla
    inicializarTurno();
}

function actualizarMarcador() {
    document.getElementById("victoriasA").innerText = victoriasA;//mostrar las victorias del jugadora
    document.getElementById("victoriasB").innerText = victoriasB;//mostrar el número de victorias del jugador b
}


// Función que inicializa los contadores de victorias y el turno al cargar la página
function comenzar(){
     // Reinicia los contadores de victorias de cada jugador a  cero al cargar la página
     victoriasA = 0;
     victoriasB = 0;
     inicializarTurno();//mustra el turno inicial
     actualizarMarcador(); // Inicializa los contadores en pantalla
}


// Muestra un mensaje en una nueva ventana y la cierra después de la duración especificada
function mostrarMensaje(texto, duracion){
    let ventanaMensaje = window.open("", "_blank","width=300, height=100");
    ventanaMensaje.document.write(`<p>${texto}</p>`);
    setTimeout(() =>{
        ventanaMensaje.close();
    },duracion);//pasarle la duración que queramos
}


// Llama a la función para inicializar el turno y el marcador cuando se reccarga la página
window.onload = () => {
   comenzar();
};