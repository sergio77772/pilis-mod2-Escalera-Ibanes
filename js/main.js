const api = {
    key: 'c22503ff6addca6ba18379d7accbff5e',
    url: `https://api.openweathermap.org/data/2.5/weather`,
    lat: '-24.18221',
    lon: '-65.330775' ,
    flag: `<img data-v-49496dbe="" data-v-68963a64="" src="https://openweathermap.org/images/flags/ar.png" class="flag">`
  }
  
  /* Formulario */
  let navbar = document.querySelector(".navbar");
  
  document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
  };
  
  window.onscroll = () => {
    navbar.classList.remove("active");
  };
  
  window.onload = function () {
    search();
  }
  
  /* metodo post */
  
  function onClick(event) {
    search();
    event.preventDefault();
  
    const mensaje = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      send: document.getElementById("send").value,
    };
    console.log(mensaje);
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(mensaje),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        Swal.fire(
          "Mensaje enviado",
          "Gracias por tu comentario " + mensaje.name,
          "success"
        );
        cleanForm();
        /* redirectUrl(); */
      })
  
      .catch((err) => console.log(err));
  }
  function cleanForm() {
    let formulario = document.getElementById("formulario");
    formulario.reset();
  }
  function redirectUrl() {
    window.location.href = "https://google.com";
  }
  
  let boton = document.getElementById("send");
  boton.addEventListener("click", onClick);
  
  
  /* Clima */
  
  const card = document.getElementById('card');
  const city = document.getElementById('city');
  const date = document.getElementById('date');
  const tempImg = document.getElementById('temp-img');
  const temp = document.getElementById('temp');
  const weather = document.getElementById('weather');
  const range = document.getElementById('range');
  const iconElement = document.querySelector('.weather-icon');
  
  async function search() {
    try {
      //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-24.18221&lon=-65.330775&appid=c22503ff6addca6ba18379d7accbff5e&lang=es`);
      const response = await fetch(`${api.url}?lat=${api.lat}&lon=${api.lon}&exclude={part}&appid=${api.key}&lang=es`);    
      const data = await response.json();
      console.log(data)
      drawWeather(data);
      card.style.display = 'block';
      city.innerHTML = `${data.name}, ${data.sys.country}, ${api.flag}`;
      date.innerHTML = (new Date()).toLocaleDateString();
      temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
      weather.innerHTML = data.weather[0].description;
      range.innerHTML = `Min: ${toCelsius(data.main.temp_min)}°C / Max: ${toCelsius(data.main.temp_max)}°C`;
      updateImages(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }
  
  function drawWeather(d) {
    document.getElementById('icon').src = `http://openweathermap.org/img/w/${d.weather[0].icon}.png`;
  }

  