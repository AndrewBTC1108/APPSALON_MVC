<?php

namespace Model;

class CitaServicio extends ActiveRecord
{
    protected static $tabla = 'citasservicios';
    //esto es una relacion de muchos a muchos
    protected static $columnasDB = ['id', 'citaId', 'servicioId'];

    //Atributos
    public $id;
    public $citaId;
    public $servicioId;

    public function __construct( $args = [] )
    {
        $this->id = $args['id'] ?? null;
        $this->citaId = $args['citaId'] ?? '';
        $this->servicioId= $args['servicioId'] ?? '';
    }
}
