<?php

namespace Controllers;

use Model\Servicio;
use Model\Cita;
use Model\CitaServicio;

class APIController
{
    public static function index()
    {
        //buscamos con el metodo herado de active record y nos retornara un objeto en array
        $servicios = Servicio::all();
        //convertir un arreglo en json
        echo json_encode($servicios);
    }

    public static function guardar()
    {
        //Almacena la Cita y devuleve el ID
        //todo lo que se mande por cita va a crear un objeto
        $cita = new Cita($_POST);
        //Guardamos en la base de datos
        $resultado = $cita->guardar();

        $id = $resultado['id'];

        //Almacena los servicios con el id de la cita
        $idServicios = explode(",", $_POST['servicios']);
        foreach ($idServicios as $idServicio) {
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            //instanciamos el objeto citaServicios
            $citaServicio = new CitaServicio($args);
            //guardamos en la BD
            $citaServicio->guardar();
        }
        //nos retorna el resultado para poder verlo en json
        echo json_encode(['resultado' => $resultado]);
    }

    public static function eliminar()
    {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            //leemos el id
            $id = $_POST['id'];
            //llamamos el metodo para la clase Cita
            $cita = Cita::find($id);
            //eliminamos con el metodo eliminar
            $cita->eliminar();
            //Para que nos redireccione hacia la misma pagina
            header('Location:' . $_SERVER['HTTP_REFERER']);
        }
    }
}
