<?php
require_once('../PHPMailer/class.phpmailer.php');


// Vars
$name = $_GET["name"];
$email = $_GET["mail"];
$origen = $_GET["origen"];
$destino = $_GET["destino"];
$pasajeros = $_GET["pasajeros"];
$fecha_salida = $_GET["fecha_salida"];
$fecha_regreso = isset($_GET["fecha_regreso"]) ? $_GET["fecha_regreso"] : "";

$redondo = isset($_GET["redondo"]) && $_GET["redondo"] === "true";

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$nombreHotel = "Cotizacion";
$imagenEncabezado = "../assets/img/d5aec425-e4c4-4c46-a5a9-9f2269ae9de1.jpeg";
$imagenID = $mail->AddEmbeddedImage($imagenEncabezado, 'd5aec425-e4c4-4c46-a5a9-9f2269ae9de1', "d5aec425-e4c4-4c46-a5a9-9f2269ae9de1.jpeg");
$correo="gerenciareservaciones@learntoflyoperadora.com.mx";

try {
    //Server settings                   //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'orware.factura@gmail.com';                   //SMTP username
    $mail->Password   = 'wmtitpzizsqnnwcr';                               //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->CharSet = 'UTF-8';                                   //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('orware.factura@gmail.com', $nombreHotel);
    $mail->addAddress($correo, $nombreHotel);

    //Attachments
    /*$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');  */  //Optional name

   
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->CharSet = "UTF-8";
    $mail->Encoding = "base64";
    $mail->Subject = ('Cotización');
    $mail->Body = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Cotización</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1, h2, p {
                    margin: 0;
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #ccc;
                }
                .content {
                    padding: 20px 0;
                }
                .reservation-details {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 15px;
                    margin-bottom: 20px;
                }
                .footer {
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #ccc;
                }
                .logo {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:d5aec425-e4c4-4c46-a5a9-9f2269ae9de1" alt="Logo" class="logo">
                    <h1>Cotización</h1>
                </div>
                <div class="content">
                    <p>Estimado/a</p>
                    <p>Solicitud de una cotización para las siguientes fechas:</p>
                    <div class="reservation-details">
                        <p><strong>Nombre:</strong> '.$name.'</p>
                        <p><strong>Email:</strong> '.$email.'</p>
                        <p><strong>Origen:</strong> '.$origen.'</p>
                        <p><strong>Destino formato (IATA):</strong> '.$destino.'</p>
                        <p><strong>Pasajeros:</strong> '.$pasajeros .'</p>
                        <p><strong>Fecha de salida:</strong> '.$fecha_salida.'</p>
                        '.($fecha_regreso ? "<p><strong>Fecha de regreso:</strong>  $fecha_regreso </p>" : "").'
                        '.($redondo ? "<p><strong>Viaje redondo:</strong> Si</p>" : "").'
                    </div>
                    <!-- <p>Por favor, no dudes en ponerte en contacto con nosotros si necesitas realizar alguna modificación o tienes alguna pregunta sobre la reserva.</p> -->
                    <!-- <p>Esperamos con ansias tu llegada y te deseamos una estancia agradable en nuestro hotel.</p> -->
                </div>
                <div class="footer">
                    <p>Atentamente</p>
                    <img src="cid:d5aec425-e4c4-4c46-a5a9-9f2269ae9de1" alt="Logo" class="logo">
                </div>
            </div>
        </body>
        </html>
    ';
    $mail->AltBody = 'Cotización';

    $mail->send();
    echo 'Messagehasbeensent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>
