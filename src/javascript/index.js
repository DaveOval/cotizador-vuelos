

const fecha_ida = document.getElementById("fecha_ida");
const fecha_regreso = document.getElementById("fecha_regreso");


document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    fecha_ida.setAttribute('min', today);
    fecha_regreso.setAttribute('min', today);
});

const btn_vuelo_redondo = document.getElementById("redondo")

btn_vuelo_redondo.addEventListener("change", function () {
    const fecha_regreso = document.getElementById("fecha_regreso");
    if( btn_vuelo_redondo.checked ) {
        fecha_regreso.type = "date";
        fecha_regreso.required = true;
        fecha_regreso.disabled = false;
    } else {
        fecha_regreso.type = "text";
        fecha_regreso.required = false;
        fecha_regreso.disabled = true;
        fecha_regreso.value = "";
    }
})


const cotizar = (e) => {
    e.preventDefault();
    console.log("cotizando...")

    const name = document.getElementById("name").value;
    const fecha_salida = document.getElementById("fecha_ida").value;
    const mail = document.getElementById("email").value;
    const fecha_regreso = document.getElementById("fecha_regreso").value;
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destination").value;
    const pasajerosElement = document.querySelector('select[name="pasengers"]')
    const selectedValue = pasajerosElement.value;
    const redondo = document.getElementById("redondo").checked

    if (!name || !fecha_salida || !mail || !destino || !selectedValue || !origen) {
        swal("Error", "Por favor, completa todos los campos", "error");
        return; 
    }

    if (redondo && !fecha_salida) {
        console.log()
        swal("Error", "Por favor, completa todos los campos", "error");
        return; 
    }
    
    // Verificar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
        swal("Error", "Formato de correo electrónico inválido", "error");
        return; 
    }

    console.log(fecha_regreso)

    const queryString = `name=${encodeURIComponent(name)}&mail=${encodeURIComponent(mail)}&destino=${encodeURIComponent(destino)}&pasajeros=${encodeURIComponent(selectedValue)}&fecha_salida=${encodeURIComponent(fecha_salida)}&fecha_regreso=${encodeURIComponent(fecha_regreso)}&redondo=${encodeURIComponent(redondo)}&origen=${encodeURIComponent(origen)}`;
    let xhr = new XMLHttpRequest();

    xhr.open("GET" , `src/php/mail.php?${queryString}` , true);

    xhr.onload = function () {
        if ( xhr.status >= 200 && xhr.status < 300 ) {
            console.log(xhr.responseText);
            swal("Cotizacion solicitada con exito!" , "Hemos recibido tu solicitud!" , "success")
                .then(() => {
                    const whatsappMessage = `
Hola, solicito una cotización con los siguientes detalles:
Nombre de agencia: ${name}
Correo: ${mail}
Origen: ${origen}
Destino: ${destino}
Fecha de salida: ${fecha_salida}
Fecha de regreso: ${fecha_regreso ? fecha_regreso : '-'}
Pasajeros: ${selectedValue}
Viaje redondo: ${redondo ? "Sí" : "No"}`;
                    const phoneNumber = "3319532857"
                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage.trim())}`;
                    window.open(whatsappURL, '_blank');
                })
        } else {
            swal("Error" , "Error al crear tu cotización" , "error");
            console.log("Hubo un error al crear la cotización")
        }
    }

    xhr.onerror = function () {
        console.log("Error de red al intentar crear la reserva")
    }

    xhr.send();


}
