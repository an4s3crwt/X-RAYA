function allowDrope(e){
    e.preventDefault();
}

//Función drag para poder arrastrar las fichas
function drag(e){
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e){
    e.preventDefault();
    let fichaId = e.dataTransfer.getData("text"); //recoger el data de la ficha draggeada
    let ficha = document.getElementById(fichaId);

    //comprobar si es el turno del jugador que toca

    //comprobar si la casilla ya tiene ficha

    //colocal la ficha en la casilla en la que se droppea
    if(e.target.appendChild(fecha));
    comprobar();
    //llamar a la fucnión que cambia de turno
}




function comprobar(){
    let casillas = document.getElementsByClassName("casilla");//array
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

    /*en cada iteración , se obtiene una de las combinacipnes de tre sposiciones ganadoras
    y asigna cada una de las posiciones a las variables pos1, pos2, pos3
    
    por ejemplo, en la primera iteración [pos1,pos2,pos3] será [0,1,2] las de la primera fila*/
    for(let i = 0; i<combinaciones;i++){
        let [pos1,pos2,pos3] = combinaciones[i];


        /*
        OBTENER LAS FICHAS EN SUS POSICIONES    
        la variable casillas es una colección de todas las casillas del tablero(divs vacíos con o sin ficha)
        
        */

        let ficha1 = null;
        if(casillas[pos1].children[0]){ //representa la casilla en la posición pos1, verifica si existe una ficha (children[0] se refiere al elemento dentro de la casilla)
            ficha1 = casillas[pos1].children[0].src; //si hay una ficha en la casilla de la posicion1, guardará su src(la imagen que representa la ficha, sea X o O)

        }

        let ficha2 = null;
        if(casillas[pos2].children[0]){
            ficha2 = casillas[pos2].children[0].src;
        }

        let ficha3 = null;
        if(casillas[pos3].children[0]){
            ficha3 = casillas[pos3].children[0].src;
        }

//comporbar que coincidan los src de las fichas para ver si hay combinacion ganadora
if (ficha1 && ficha1 === ficha2 && ficha1 === ficha3) {
    ganar(ficha1);
   
}



    }


    
}


//comprobar que jugador ha ganado según el src (la imagen) alamcenada en ficha1
function ganar(ficha1){
    let ganador = ficha1.includes("o.jpg") ? "Jugador A" : "Jugador B";
    alert(`${ganador} HA GANADO!!!!!!!!!!!`);

}

















function comproobar(){
    let casillas = [];

    let elements = document.querySelectorAll(".casilla");
    for(let i =0; i< elements.length;i++){
        //comprobar si hay una ficha en la casilla 
        if(elements[i].innerHTML){ //contenidos de la casilla
            elements[i] = elements[i].innerHTML; //guardar el contenido ene l acasilla del html

        }else{
            casillas[i] = '';
        }
    }

        let combinacionesGanadoras = [
            [0, 1, 2],//1 fila
            [3, 4, 5], //2 fila
            [6, 7, 8],//3 fila
            [0, 3, 6], //1 columna
            [1, 4, 7],//2 columna
            [2, 5, 8], //3 columna
            [0, 4, 8],//diagonal derecha
            [2, 4, 6]//diagonal  izquierda
        ];
    
        //recorrer el array de combinaciones ganadoras
        for(let i = 0; i< combinacionesGanadoras.length;i++){
            //obtener los indices de las combinaciones actuales
            let a = combinacionesGanadoras[i][0]; //comprueba el primera columna de las combinaciones
            let b = combinacionesGanadoras[i][1]; //comprueba la segunda columna del las combinaciones de la segunda fila 
            let c = combinacionesGanadoras[i][2];// comprueba la tercera columna de las combinaciones // comprueba la tercera columna de las combinaciones

            //verificamos si las tres casillas tienen el mismo valor(es decir, si es ganador)
            if(casillas[a] !== '' && casillas[a] === casillas[b] && casillas[a] === casillas[c]){
                return true;
            }else{
                return false;
            }

        }


        document.querySelectorAll("img").forEach(img =>{
            document.getElementById("img", dragStart);
        });
        doy
}

