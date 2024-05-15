

const fecha_ida = document.getElementById("fecha_ida");
const fecha_regreso = document.getElementById("fecha_regreso");

const calender_container = document.getElementById("calender")

function handleCalender() {
    if ( calender_container.style.display === "flex" ) {
        calender_container.style.display = "none";
    } else {
        calender_container.style.display = "flex";
    }
}

fecha_ida.addEventListener("click", e =>handleCalender() );
fecha_regreso.addEventListener("click", e =>handleCalender() );


let calenderRange = document.querySelector("#calender-range")

const yesterday = new Date();
yesterday.setDate(yesterday.getDate());
const formattedYesterday = yesterday.toISOString().split('T')[0];
calenderRange.setAttribute("min", formattedYesterday);
let arrive;
let leave;


const initialDateHTML = document.querySelector("#fecha_ida")
const endDateHTML = document.querySelector("#fecha_regreso")

calenderRange.addEventListener("change", (e) => {
    const dates = e.target.value
    const datesArray = dates.split("/")
    const initialDate = datesArray[0];
    const endDate = datesArray[1];
    arrive = initialDate;
    leave = endDate;

    initialDateHTML.value = initialDate;
    endDateHTML.value = endDate;
})

const cotizar = (e) => {
    e.preventDefault();
    console.log("cotizando...")

    const name = document.getElementById("name").value;
    const fecha_salida = document.getElementById("fecha_ida").value;
    const mail = document.getElementById("email").value;
    const fecha_regreso = document.getElementById("fecha_regreso").value;
    const destino = document.getElementById("destination").value;
    const pasajerosElement = document.querySelector('select[name="pasengers"]')
    const selectedValue = pasajerosElement.value;

    if (!name || !fecha_salida || !mail || !fecha_regreso || !destino || !selectedValue) {
        swal("Error", "Por favor, completa todos los campos", "error");
        return; 
    }
    
    // Verificar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
        swal("Error", "Formato de correo electrónico inválido", "error");
        return; 
    }

    const queryString = `name=${encodeURIComponent(name)}&mail=${encodeURIComponent(mail)}&destino=${encodeURIComponent(destino)}&pasajeros=${encodeURIComponent(selectedValue)}&fecha_salida=${encodeURIComponent(fecha_salida)}&fecha_regreso=${encodeURIComponent(fecha_regreso)}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET" , `src/php/mail.php?${queryString}` , true);

    xhr.onload = function () {
        if ( xhr.status >= 200 && xhr.status < 300 ) {
            console.log(xhr.responseText);
            swal("Cotizacion solicitada con exito!" , "Hemos recibido tu solicitud!" , "success");
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
