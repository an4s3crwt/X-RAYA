/*
    Variables globales
*/
let turnoJugador = "A"; // indica a quién le toca el turno, inicializado en "A" para el Jugador A.

//contadores de victorias para cada jugador, que empiezan en 0.
let victoriasA = 0; 
let victoriasB = 0;



/*
Función inicializarTurno(). Actualiza el mensaje de turno en la pantalla para indicar que el Jugador A empieza.

 Esta función coloca el mensaje  del turno inicial en pantalla, indicando 
 que el turno comienza con el Jugador A. Muestra la imagen correspondiente 
 (o.jpg para el jugador A)
*/
function inicializarTurno() {
    let turnoDiv = document.getElementById("turnoJugador"); //obtiene el elemento HTML donde se muestra el turno (turnoJugador).
    turnoDiv.innerHTML = 'Turno del jugador <img src="img/o.jpg" width="20px" height="20px">';//cambia el contenido para mostrar el mensaje y la imagen del turno del Jugador A.
}

/*
Función allowDrop(e). Permite que una ficha se sueltye en una casilla
*/
function allowDrop(e) {
    e.preventDefault();//evitar el comportamiento x defecto del navegador 
}


// Llama a la función para inicializar el turno
inicializarTurno();




/*
Función drag(). Gestionar el arrasyre de las fichas.
 La función drag permite arrastrar
  una ficha solo si pertenece al jugador actual. D
  e lo contrario, previene el movimiento.
*/
// Guardar el ID de la ficha cuando comienza a arrastrarse
function drag(e) {
    let fichaId = e.target.id; //guarda el id de la ficha que esta siendo arrastrada
    let ficha = document.getElementById(fichaId);

    /*
    comprueba si la ficha pertenece
    al jugador que tiene el turno; si es así, guarda el id para su traslado. 
    Si no, previene el arrastre.
    */
    if ((turnoJugador === "A" && ficha.parentElement.id === "jugadorA" )|| //que el id de la ficha tenga el nombre fichaA
        (turnoJugador === "B" && ficha.parentElement.id === "jugadorB")) { //que el id de la ficha tenga el nombre fichaB


            //si es el truno que toca, almacena el id de la ficha que se ha elegido en dataTransfer
        e.dataTransfer.setData('text/plain', fichaId);
    } else {
        //si no es su turno, previene el arrastre
        e.preventDefault(); 
    }
}


/*
Función drop(). Suelta l aficha en la casilla seleccionada si está vacía.
*/

// Función que mueve la ficha al soltarla en una celda vacía
function drop(e) {
    e.preventDefault();

    let fichaId = e.dataTransfer.getData('text/plain'); //obtiene el id de la ficha arrastrada
    let ficha = document.getElementById(fichaId);//obtiene la ficha arrastrada por el id del html

    // Verfiica que el área donde se suelta la ficha es una casilla y está vacía, es decir que sea igual a 0
    if (e.target.classList.contains("casilla") && e.target.children.length === 0) {
        e.target.appendChild(ficha);// Mueve la ficha arrastrada a la casilla seleccionada

        
        turnoJugador = turnoJugador === "A" ? "B" : "A";//aquí se cambia el turno del jugador cada vez que se hace drop de un elemento

        // Actualiza el mensaje de turno en pantalla con la imagen que toca según el jugador
        let turnoDiv = document.getElementById("turnoJugador");
        turnoDiv.innerHTML = `Turno del jugador <img src="img/${turnoJugador === "A" ? "o.jpg" : "x.jpg"}" width="20px" height="20px">`;

        // llamar a la función que comprueba si hay un ganador después de hacer cada movimiento
        comprobar();
    } else {
        mostrarMensaje("Esta casilla está ocupada.", 2000);//mostrar mensaje de error por 2 segundos
    }
}


/*
Función comprobar(). Verifica si hay una combinación ganadora
*/
//Función que comprueba si hay ganador según las casillas en las que estan las imagenes/ fichas
function comprobar() {
    let casillas = document.getElementsByClassName("casilla");//obtener todas las casillas por su nombre de clase del html
    let combinaciones = [//definir las combinaciones ganadoras
        [0, 1, 2], // Fila superior
        [3, 4, 5], // Fila central
        [6, 7, 8], // Fila inferior
        [0, 3, 6], // Columna izquierda
        [1, 4, 7], // Columna central
        [2, 5, 8], // Columna derecha
        [0, 4, 8], // Diagonal de izquierda a derecha
        [2, 4, 6]  // Diagonal de derecha a izquierda
    ];

    // recorrer las combinaciones ,, array
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

        // Comprobar si todas las fichas en la combinación son iguales, si encuentra una combinación ganadora
        if (ficha1 && ficha1 === ficha2 && ficha1 === ficha3) {
            ganar(ficha1);//si coinciden que son iguales llamar a la funcion ganar para mostrar el mensaje
            return; // terminar la función si hay un ganador
        }
    }
}


/*
Función ganar(ficha1). Declara gandor y actualiza el marcador de los div.
Muestra mensaje de victoria, incrementa el contador del ganador y actualiza el contador de este
*/
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


/*
Función resetJuego(). Reinicia el juego al estado inicil con las casillas vacías y las imagenes en su osicón inicial
*/

function resetjuego() {
    // Selecciona el área inicial del Jugador A, donde se colocan sus fichas
    let areaJugadorA = document.getElementById("jugadorA");

    // Selecciona el área inicial del Jugador B, donde se colocan sus fichas
    let areaJugadorB = document.getElementById("jugadorB");

    // Bucle para mover las fichas de los jugadores de vuelta a sus áreas iniciales
    for (let i = 1; i <= 3; i++) {
        // Selecciona cada ficha individual del Jugador A
        let fichaJugadorA = document.getElementById(`fichaA${i}`);
        
        // Mueve la ficha del Jugador A a su área inicial (areaJugadorA)
        areaJugadorA.appendChild(fichaJugadorA);

        // Selecciona cada ficha individual del Jugador B
        let fichaJugadorB = document.getElementById(`fichaB${i}`);
        
        // Mueve la ficha del Jugador B a su área inicial (areaJugadorB)
        areaJugadorB.appendChild(fichaJugadorB);
    }

    // Selecciona todas las casillas del tablero donde se colocan las fichas
    const todasLasCasillas = document.getElementsByClassName("casilla");

    // Recorre cada casilla del tablero
    for (let i = 0; i < todasLasCasillas.length; i++) {
        // Accede a cada casilla individualmente
        let casillaActual = todasLasCasillas[i];

        // Elimina todas las fichas dentro de la casilla actual si tiene alguna
        while (casillaActual.firstChild) {
            casillaActual.removeChild(casillaActual.firstChild); // Borra la ficha de la casilla
        }
    }

    // Restablece el turno al Jugador A, ya que empieza siempre después de reiniciar el juego
    turnoJugador = "A";

    // Actualiza el mensaje en pantalla para indicar el turno del Jugador A
    inicializarTurno();
}


/*
Función actualizarMarcador(). Muestra el marcador en el html
*/
function actualizarMarcador() {
    document.getElementById("victoriasA").innerText = victoriasA;//mostrar las victorias del jugadora
    document.getElementById("victoriasB").innerText = victoriasB;//mostrar el número de victorias del jugador b
}


/*
Función comenzar(). inicializa los contadores de victorias y el turno al cargar la partida
*/

function comenzar(){
     // Reinicia los contadores de victorias de cada jugador a  cero al cargar la página
     victoriasA = 0;//reiniciar a 0
     victoriasB = 0;//reiniciar a 0
     inicializarTurno();//mustra el turno inicial
     actualizarMarcador(); // Inicializa los contadores en pantalla
}


/*
Función mostyrarMensaje().
Abre una ventana para mostrar un mensaje y la cierra automáticamente después de una duración específica.
*/
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
   comenzar();//llama a comenzar() cuando la página se carga, inicializando el juego desde cero.
};