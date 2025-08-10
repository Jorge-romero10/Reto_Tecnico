//Array para la lista de visitantes
let Visitantes = [];
//Boolean para las personas que no han salido
let VisitantesNoHanSalido = false;

const guardar = document.querySelector('button');
const formulario = document.getElementById('form-visitantes');

//Evento cuando se hace click al boton guardar
guardar.addEventListener('click', e =>{
    //evita que la pagina se recargue cuando se hace click
    e.preventDefault();
    //condicional para que los campos se han obligatorios
    if(!nombre.value || !documento.value || !motivo.value){
        alert("Llenar todos los campos");
        return;
    }
    //agregar visitas
    Visitantes.push({
        nombre: nombre.value,
        documento: documento.value,
        motivo: motivo.value,
        entrada: new Date().toLocaleString(),
        salida: null
    })
    //Datos guardardos en el navegador
    localStorage.setItem('Visitantes', JSON.stringify(Visitantes));
    renderizarTabla();
    formulario.reset();
})

//Visualizar datos en la tabla
function renderizarTabla(){
    //iniciar los datos enn ceros
    visitas.innerHTML = '';
    Visitantes.filter(element => !VisitantesNoHanSalido || !element.salida)
    .forEach((element, index) =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${element.nombre}</td>
        <td>${element.documento}</td>
        <td>${element.motivo}</td>
        <td>${element.entrada}</td>
        <td>${element.salida ? element.salida: ""}</td>
        <td>${element.salida ? "Salida registrada": `<button type="button" class="btn btn-danger m-3" onclick = "registroSalida(${index})">Registrar salida</button>`}</td>
        `;
        //datos se agregen a la fila
        visitas.appendChild(fila);
    })
}

//Funcion para la hora de salida
function registroSalida(index){
    Visitantes[index].salida = new Date().toLocaleString();
    localStorage.setItem('visitantes', JSON.stringify(Visitantes));
    renderizarTabla();
}

//funcion para el filtro 
function personasAdentro(){
    VisitantesNoHanSalido = !VisitantesNoHanSalido;
    renderizarTabla();
}

renderizarTabla();