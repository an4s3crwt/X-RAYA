function comprobar(){
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
}

document.querySelectorAll('img').forEach(img =>{
    img.addEventListener('dragstart', drag);
});

    document.querySelectorAll('img').forEach(img =>{
        img.addEventListener('dragstart', drag);
    });


    function drag(){

    }

