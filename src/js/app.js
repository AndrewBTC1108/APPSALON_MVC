let paso = 1;
const pasoInical = 1;
const pasoFinal = 3;

//objeto en el que se colocaran los datos del servicio
const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion();//muestra y oculta las secciones
    tabs(); //Cambia la seccion cuando se precionen los tabs
    botonesPaginador(); //agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();

    consultarAPI(); //consultad la AP en el backend de PHP

    idCliente();

    nombreCliente(); //Añade el nombre del cliente al objeto de cita

    seleccionarFecha(); //añade la fecha de la cita en el objeto

    seleccionarHora(); //añade la hora de la cita al objeto

    mostrarResumen(); //muestra el resumen de la cita
}

function mostrarSeccion() {

    //ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    //comprobacion, va a tomar la variable seccionAnterior que tenga la clase mostrar y si la tiene se la quitara para luego darsela a la otra seleccion
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    //Seleccionar la seccion id con el paso...
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    //agrega la clase de mostrar
    seccion.classList.add('mostrar');

    //quita la clase de 'actual' al tab anterior
    const tabAnterior = document.querySelector('.actual');

    //comprobacion, va a tomar la variable tabAnterior que tenga la clase actual y si la tiene se la quitara para luego darsela a la otra seleccion
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }
    //Resalta el tab actual..
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    //querySelectorAll te retorna todas la coincidencias 
    const botones = document.querySelectorAll('.tabs button');;

    //para ir iterando en cada uno de los botones
    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            //para escpecificar a que le damos click
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            //cuando ocurre un evento la vuelo a mandar a llamar
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        //mandamos a llmar la funcion
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {

        if (paso <= pasoInical) return;

        //restar a paso de 1 en 1
        paso--;

        //cuando ocurre un evento la vuelo a mandar a llamar
        botonesPaginador();
    });
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;

        //sumar a paso de 1 en 1
        paso++;
        botonesPaginador();
    });

}

//API
async function consultarAPI() {
    //try catch va a aprevenir que la aplicacion deje de funcinar por algun error
    try {
        //url a consultar donde estan los datos
        const url = 'http://localhost:3000/api/servicios';
        //asignamos la url con los datos a fecht()
        const resultado = await fetch(url);
        //converitmos el resultado a json();
        const servicios = await resultado.json();
        //mostramos los datos con la funcion mostrar servicios
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        /*
        //Destructurin te extrae el valor de los servicios tomandos en la funcion y al mismo tiempo crea la variable 
        todo en una sola linea
        */
        const { id, nombre, precio } = servicio;
        const nombreServicio = document.createElement('p');
        //añadimos la clase
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('p');
        //añadimos la clase
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        //Vamos a crear un contenedor div que va a contener cada uno de los servicios
        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        //creamos un atributo personalisado
        servicioDiv.dataset.idServicio = id;
        /*
        evento de click, al dar click a un servicio este llamara una funcion
        seleccionarServicio que tendra como parametro el servicio 
        */
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio);
        }

        //añadir al hthml
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        //mostramos en pantalla, primero seleccionameos el id #servicios de index.php
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    //destructuring, al servicio elejido de extraemos el id
    const { id } = servicio;

    //extraemos el arreglo de servicios del objeto de citas
    const { servicios } = cita;

    //agregar apariencia a un servicio seleccionado(Identificar el elemento al que se le da click)
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //Como ya extrajimos con destructurin el arreglo de servicios, comprobar si un servicio ya fue agregado
    //agregado.id es lo que esta en memoria y id es lo que se le dio click
    if (servicios.some(agregado => agregado.id === id)) {
        //si nos retorna como True es que ya esta agregado y  lo eliminarmos
        cita.servicios = servicios.filter(agregado => agregado.id !== id);

        //eliminamos una clase de seleccionado
        divServicio.classList.remove('seleccionado');
    } else {
        //si nos retorna un False es que es nuevo y lo agregamos
        //tomo una copia de los servicios y le agrego un nuevo servicio
        //spread operator reescribe en servicios una copia nueva mas el nuevo registro
        //guaramos en el arreglo de servicios del objeto cita
        cita.servicios = [...servicios, servicio];

        //agregamos una clase de seleccionado
        divServicio.classList.add('seleccionado');
    }
    console.log(cita);
}

function idCliente() {
    //insertamos el id del cliente en el objeto de citas
    cita.id = document.querySelector('#id').value;
}

function nombreCliente() {
    //insertamos el nombre del cliente en el objeto de cita
    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
    //seleccionamos el id de fecha
    const inputFecha = document.querySelector('#fecha');

    //inputFecha le añadimos un evento
    inputFecha.addEventListener('input', function (e) {
        //gracias a (e) se puede tener acceso a un metodo que va a prevenir
        //si alguien presiona sabado o domingo este no se agregue al objeto
        //e.target.value para ver el contenido que se a asignado, lo guardamos en Date()
        //y con getUTCDay() nos dara el dia en el que estamos pero en un numero
        //0 = domingo 1, 2, 3, 4, 5 hasta 6 = sabado 
        const dia = new Date(e.target.value).getUTCDay();
        /*
        //validar para que un usuario no pueda agregar una fecha
         el sabado o solamente el domingo
        */
        //en un array que esta incluido el dia 0 = Domingo y 6 = Sabado
        //validamos si lo que esta en la varibale dia coincide con el arreglo
        //.includes() es un array method que comprueba si un elemento existe en el arreglo
        if ([6, 0].includes(dia)) {
            //va agregar un string vacio para que no se muestre la fecha en pnatalla
            e.target.value = '';
            //llamamos la funcion
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
        } else {
            //Agregamos la fecha al objeto
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    //sleccionamos el elemento de fecha
    const inputHora = document.querySelector('#hora');
    //inputHora le añadimos un evento
    inputHora.addEventListener('input', function (e) {

        const horaCita = e.target.value;
        //metodo .split nos retornara en un array un string que este dividio
        const hora = horaCita.split(':')[0];

        //validamos
        if (hora < 10 || hora > 18) {
            //va agregar un string vacio para que no se muestre la fecha en pantalla
            e.target.value = '';
            //llamamos la funcion
            mostrarAlerta('Hora no permitida', 'error', '.formulario');
        } else {
            //Agregamos la hora al objeto
            cita.hora = e.target.value;
            console.log(cita);
        }
    });
}

//la funcion va a tomar un mensaje y un tipo de alerta
//parametros de elemento que es la ubicacion en donde va a ir la alerta
//desaparece es por default true lo que significa que en otras funciones
//que no se ponga false esta va a estar por defecto true
function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    //Prevenimos que se cree mas de una alerta si ya hay una disponible
    const alertaPrevia = document.querySelector('.alerta');
    //validmaos si ya hay una alerta la eliminamos para que se puede generar otra
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    //creamos un elemento para la alerta
    const alerta = document.createElement('DIV');
    //insertamos el mensaje a la varibale alerta con el elemento 'DIV'
    alerta.textContent = mensaje;
    //añadimos una clase de estilo para la alerta
    alerta.classList.add('alerta');
    //insertamos el tipo de alerta si es de 'exito' o 'error'
    alerta.classList.add(tipo);

    //Mostramos en pantalla en formulario
    const referencia = document.querySelector(elemento);
    //agregamos la alerta
    referencia.appendChild(alerta);

    //opcional para que la alerta desaparezca despues de cierto tiempo
    //va a desaparecer despues de 3 segundos
    //valida el parametro desapaece si es true siginica que el setTimeout
    //se va  aejecutar exitosamente
    if (desaparece) {
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function mostrarResumen() {
    //seleccionamos la clase
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar el contenido de Resumen, lo que hace es limpiar la alerta del resumen si ya hay una cita asignada
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    //validamos con el metodo Object.values(cita).includes(''), significa 
    //que el objeto en el que hemos iterado tiene algun campo vacio
    //validamos que en el objeto de cita haya algun servicio con .length
    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);

        return;
    }

    //formatear el div de  Resumen
    //aplicamos Destructurin a cita
    const { nombre, fecha, hora, servicios } = cita;

    //heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de servicios';
    //lo agregamos al html
    resumen.appendChild(headingServicios);

    //como servicios es un arrelgo vamos a iterar en esa arreglo el cual nos
    //retornara cada servicio que haya en ese arreglo
    servicios.forEach(servicio => {
        //aplicamos Destructuring a la instancia de servicios servicio
        const { id, precio, nombre } = servicio;
        //cada servicio lo colocamos en un div
        const contenedorServicio = document.createElement('DIV');
        //agregamos una clase a contenedor servicio
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        //innerHTML es cuando vamos a crear html personalizado
        precioServicio.innerHTML = `<span>Precio</span> $${precio}`;

        //agregamos a contenedor servicio
        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        //agregamos a resumen el contenedor servicio que ya trae el texto y precio del servicio
        resumen.appendChild(contenedorServicio);
    });

    //heading para Cita en Resumen
    const headingCitas = document.createElement('H3');
    headingCitas.textContent = 'Resumen de Cita';
    //lo agregamos al html
    resumen.appendChild(headingCitas);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;
    /****************************************************************************************/
    //Formatear la Fecha en español
    //Instanciamos la Fecha en un objeto Date()
    const fechaObj = new Date(fecha);
    //utilizamos un metodo del objeto Date():
    //separamos mes, dia y year para luego ponerlos en Date.UTC(); por separado
    //cada que se instancie Date() hay un desface de un dia
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    //con el objetivo de tener esto en un objeto y poder usar metodos de Date()
    const fechaUTC = new Date(Date.UTC(year, mes, dia));

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const fechaFormateada = fechaUTC.toLocaleDateString('es-CO', opciones);
    console.log(cita);
    /*************************************************************************************/

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    //Boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    //Añadimos un vento al boton de Reservar
    botonReservar.onclick = reservarCita;

    //insertamos en el html
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}

async function reservarCita() {
    //Destructuring
    const { nombre, fecha, hora, servicios, id } = cita;
    //Usamos async await por que desde que se conecte al servidor y realice la peticion
    //y nos retorne una respuesta no sabemos cuanto tiempo tardara, y bloqueamos 
    //la ejecucion del codigo usando await
    //aqui creamos la peticion que tenemos que enviar a nuestra API
    //Usaremos FormData(), viene en el navegador y se accede a el 
    //con new FormData()

    //con .map las coincidencias las va a ir colocando en la variable idServicios
    //lo que va hacer es que nos va a dar todos los id de algun servicio que se haya tomado
    const idServicios = servicios.map(servicio => servicio.id);
    // console.log(idServicios);

    //con FormData vamos a pasar los datos solicitados, al servidor
    const datos = new FormData();
    datos.append('usuarioid', id);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('servicios', idServicios);

    try {
        //Peticion hacia la api
        //Cuando enviamos una peticion de tipo POST es obligatorio un objeto de 
        //configuracion
        const url = 'http://localhost:3000/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();
        console.log(resultado.resultado);

        if (resultado.resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Cita Creada',
                text: 'Tu cita fue creada correctamente',
                button: 'OK'
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            });
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al guardar la cita',
        })
    }
    //spread operator
    // console.log([...datos]);
}