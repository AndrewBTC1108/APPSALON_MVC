document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    buscarPorFecha();
}

function buscarPorFecha() {
    const fechaInput = document.querySelector('#fecha');
    //añadimos un evento a fecha
    fechaInput.addEventListener('input', function(e) {
        const fechaSeleccionada = e.target.value;
        console.log(fechaSeleccionada);

        //con ayuda de GET va a mostrar en el url de la pagina la fecha seleccionada 
        //luego con php ayudamos a mostrar las citas de esa fecha
        window.location = `?fecha=${fechaSeleccionada}`;
    });
}