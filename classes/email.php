<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{

    //atributos
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        //asignamos en el constructor
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion()
    {
        //crear el objeto de Email
        $mail = new PHPMailer();

        //configurar SMTP
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '410c31a36bedc6';
        $mail->Password = '3bee4669506e7e';
        $mail->SMTPSecure = 'tls';

        //configurar el contenido del E-email
        //quien envia el e-mail
        $mail->setFrom('cuentas@appsalon.com');

        //quien recibe el e-mail
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');

        //mensaje
        $mail->Subject = 'Confirma tu Cuenta';

        //habilitar HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en Appsalon,
        solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta </a> </p>";
        $contenido .= "<p> Si tu no solicitaste estea cuenta, puedes ignorar el mensaje </p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        //enviamos el email
        $mail->send();
    }

    public function enviarIntrucciones()
    {
        //crear el objeto de Email
        $mail = new PHPMailer();

        //configurar SMTP
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '410c31a36bedc6';
        $mail->Password = '3bee4669506e7e';
        $mail->SMTPSecure = 'tls';

        //configurar el contenido del E-email
        //quien envia el e-mail
        $mail->setFrom('cuentas@appsalon.com');

        //quien recibe el e-mail
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');

        //mensaje
        $mail->Subject = 'Reestablece tu password';

        //habilitar HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has solicitado Reestablecer tu password,
        sigue el siguiente enlace para hacerlo.</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/recuperar?token=" . $this->token . "'>Reestablecer Password </a> </p>";
        $contenido .= "<p> Si tu no solicitaste estea cuenta, puedes ignorar el mensaje </p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        //enviamos el email
        $mail->send();
    }
}
