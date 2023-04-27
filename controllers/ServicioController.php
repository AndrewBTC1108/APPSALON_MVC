<?php

namespace Controllers;

use Model\Servicio;
use MVC\Router;

class ServicioController
{
    public static function index(Router $router)
    {
        //iniciamos la session
        session_start();
        isAdmin();

        $servicios = Servicio::all();

        $router->render('servicios/index', [
            'nombre' => $_SESSION['nombre'],
            'servicios' => $servicios
        ]);
    }

    public static function crear(Router $router)
    {
        //iniciamos la session
        session_start();
        isAdmin();

        //objeto plano sin instanciar
        $servicio = new Servicio;
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            //este metodo lo que hace es que el objeto que ya tenemos en memoria lo va a sincronizar
            //con los datos del POST, en lugar de crear otro objeto lo asigna al objeto existente
            $servicio->sincronizar($_POST);

            //validamos
            $alertas = $servicio->validar();

            if(empty($alertas)) {
                //lo guardamos en la base de datos
                $servicio->guardar();

                //redireccionamos
                header('Location: /servicios');
            }
        }

        $router->render('servicios/crear', [
            'nombre' => $_SESSION['nombre'],
            'servicio' => $servicio,
            'alertas' => $alertas
        ]);
    }

    public static function actualizar(Router $router)
    {
        //iniciamos la session
        session_start();
        isAdmin();

        if(!is_numeric($_GET['id'])) return;
        //objeto plano sin instanciar
        $servicio = Servicio::find($_GET['id']);
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $servicio->sincronizar($_POST);

            //validacion
            $alertas = $servicio->validar();

            if(empty($alertas)) {
                //guardamos en la base de datos
                $servicio->guardar();
                //redireccionamos
                header('Location: /servicios');
            }
        }

        $router->render('servicios/actualizar', [
            'nombre' => $_SESSION['nombre'],
            'servicio' => $servicio,
            'alertas' => $alertas
        ]);
    }

    public static function eliminar()
    {
        //iniciamos la session
        session_start();
        isAdmin();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];
            $servicio = Servicio::find($id);
            $servicio->eliminar();

            //redireccionamos 
            header('Location: /servicios');
        }
    }
}
