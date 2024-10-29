const casillas = document.getElementsByClassName("casilla");
const fichas = document.getElementsByClassName("ficha");
Array.from(casillas).forEach(casilla => {
    casilla.addEventListener('dragover', dragOver);
    casilla.addEventListener('drop', drop);
});
Array.from(fichas).forEach(ficha =>{
    ficha.addEventListener('dragstart',dragStart);
});

function dragStart(e){
    e.dataTransfer.setData('text/plain',e.target.id);
}
function dragOver(e){
    e.preventDefault();
}
function drop(e){
    e.preventDefault();
    const draggableId = e.dataTransfer.getData('text/plain');
    let draggable = document.getElementById(draggableId);

    if (!e.target.hasChildNodes()) {
        e.target.appendChild(draggable);
    } else {
        alert("Esta casilla ya tiene una ficha.");
    }
}
