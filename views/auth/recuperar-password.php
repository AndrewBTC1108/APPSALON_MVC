<h1 class="nombre-pagina"> Recuperar Password </h1>
<p class="descripcion-pagina"> Coloca tu nuevo password a continuación </p>

<!-- como $alertas es un arrelgo vamos a iretar sobre cada elemento para mostrarlo en pantalla -->
<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<?php if($error) return;?>
<form class="formulario" method="POST">
    <div class="campo">
        <label for="paswword">Password</label>
        <input 
            type="password"
            id="password"
            name="password"
            placeholder="Tu Nuevo Password"
        />
    </div>
    <input type="submit" class="boton" value="Guardar tu Nuevo Password">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta?</a>
    <a href="/crear-cuenta">¿Aun no tienes una cuenta?</a>
</div>