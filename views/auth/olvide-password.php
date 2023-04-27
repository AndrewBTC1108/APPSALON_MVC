<h1 class="nombre-pagina">Olvide Password</h1>
<p class="descripcion-pagina">Reestablece tu password escribiendo tu email a continuación</p>

<!-- como $alertas es un arrelgo vamos a iretar sobre cada elemento para mostrarlo en pantalla -->
<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
    <label for="email">E-mail</label>
    <input 
        type="email" 
        id="email"
        name="email"
        placeholder="Tu E-mail"
    />
    </div>

    <input type="submit" class="boton" value="Enivar Intrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta?</a>
    <a href="/crear-cuenta">¿Aun no tienes una cuenta?</a>
</div>