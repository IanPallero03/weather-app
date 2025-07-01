// Elementos del DOM
const titleLogo = document.querySelector(".title");
const bodyElem = document.querySelector("body");
const cityInput = document.querySelector("#get-city");

const cityName = document.querySelector(".city-name");
const cityTemp = document.querySelector(".weather-deg");
const cityCond = document.querySelector(".weather-condition");
const cityHumidity = document.querySelector(".humidity");
const todayDate = document.querySelector(".date");



// Configuración de la API
const apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "7631c3536e7cfd65f3963ac097e4444c",
};

// Cambiar fondo aleatorio al cargar y color del título según el fondo
window.addEventListener("load", () => {
    const randNum = Math.ceil(Math.random() * 5);
    bodyElem.style.backgroundImage = `url('images/bg${randNum}.webp')`;
    if (randNum === 3 || randNum === 4 || randNum === 5) {
        titleLogo.style.color = "white";
    }

    // Cargar clima de Nueva York por defecto al inicio
    cityInput.value = "new york";
    obtenerClima();
    cityInput.value = "";

    mostrarHistorial();

});

// Permitir búsqueda con Enter
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        obtenerClima();
    }
});

// Función para obtener clima desde la API
function obtenerClima() {
    const ciudad = cityInput.value.trim();
    if (ciudad === "") {
        alert("Por favor, ingresa una ciudad.");
        return;
    }

    fetch(`${apiData.url}${ciudad}&appid=${apiData.key}&lang=es&units=metric`)
    .then((res) => {
        if (!res.ok) {
            throw new Error("Ciudad no encontrada");
        }
        return res.json();
    })
    .then((data) => {
        guardarEnHistorial(ciudad);
        actualizarDOM(data);
    })

}

// Función para actualizar el DOM con los datos del clima
function actualizarDOM(data) {
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
    cityTemp.innerHTML = `${Math.round(data.main.temp)}°C`;
    cityCond.innerHTML = data.weather[0].description;
    cityHumidity.innerHTML = `Humedad: ${data.main.humidity}%`;
    todayDate.innerHTML = obtenerFecha();

    cambiarFondoSegunClima(data.weather[0].main);
}

function cambiarFondoSegunClima(clima) {
    let fondo = "images/clear.jpg"; // fondo por defecto

    switch(clima) {
        case "Clouds":
            fondo = "images/clouds.webp";
            break;
        case "Rain":
            fondo = "images/rain.webp";
            break;
        case "Snow":
            fondo = "images/snow.webp";
            break;
        case "Thunderstorm":
            fondo = "images/thunderstorm.webp";
            break;
        case "Drizzle":
            fondo = "images/drizzle.webp";
            break;
        case "Mist":
        case "Fog":
            fondo = "images/mist.webp";
            break;
        case "Clear":
            fondo = "images/clear.webp";
            break;
        default:
            fondo = "images/clear.webp";
    }

    bodyElem.style.backgroundImage = `url('${fondo}')`;
}


// Meses en español
const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Función para obtener la fecha en formato legible en español
function obtenerFecha() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `${dia} de ${mes} de ${año}`;
}

/* seccion HISTORIAL*/

function guardarEnHistorial(ciudad) {
    let historial = JSON.parse(localStorage.getItem("historialClima")) || [];
    
    // Evitar duplicados
    historial = historial.filter(item => item.toLowerCase() !== ciudad.toLowerCase());

    historial.unshift(ciudad);

    if (historial.length > 5) {
        historial.pop();
    }

    localStorage.setItem("historialClima", JSON.stringify(historial));
    mostrarHistorial();
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historialClima")) || [];
    const historyList = document.getElementById("history-list");

    historyList.innerHTML = "";

    historial.forEach(ciudad => {
        const li = document.createElement("li");
        li.textContent = ciudad;
        li.addEventListener("click", () => {
            cityInput.value = ciudad;
            obtenerClima();
        });
        historyList.appendChild(li);
    });
}

/* seccion animado*/

			const animados = document.querySelectorAll('.animado');
		  
			function mostrarAnimados() {
			  animados.forEach(el => {
				const top = el.getBoundingClientRect().top;
				const alturaPantalla = window.innerHeight;
		  
				if (top < alturaPantalla - 100) {
				  el.classList.add('visible');
				}
			  });
			}
		  
			window.addEventListener('scroll', mostrarAnimados);
			window.addEventListener('load', mostrarAnimados); // por si ya están en pantalla
		 


