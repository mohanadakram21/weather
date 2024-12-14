

var searchinput = document.querySelector('#input')
var searchbtn = document.querySelector('#button')



async function weather(city) {
  var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6bed176b6a17406c842135007241112&q=${city}&days=3`);
  var data = await res.json();
  console.log(data);
  displaysite(data.forecast.forecastday , data.location.name , data.location.country)
}


searchinput.addEventListener('input',function(){
  weather(searchinput.value)

})

searchbtn.addEventListener('click',function(){
  weather(searchinput.value)
})


function displaysite(arr , countryName) {
  var cartoonaa = "";

  for (var i = 0; i < 3; i++) {
    const day = arr[i];
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    


       const isSecondOrThird = (i === 1 || i === 2);

       if (isSecondOrThird) {
        cartoonaa += `
                <div class="wdata2 text-center col-12 col-md-4 " id="datase">
                           <div class="namedata">  
                         <h3>${dayName}</h3>
           </div>
           <img src="https:${day.day.condition.icon}" class="text-center" alt="" srcset="">
                           <h3 class="fs-1 text-center text-light">${day.day.avgtemp_c}</h3>
                           <h4 class="fs-5 text-center text-light">${day.day.mintemp_c}</h4>
                           <h2 class="fs-4 text-primary">${day.day.condition.text} </h2>
                       </div>

           `;
       } else {
    cartoonaa += `      
            <div class="wdata  col-sm-12 col-md-4 col-lg-4 ">
                          <div>
                           <div class="namedata d-flex justify-content-between ">
                               <h3 class="mx-3">${dayName}</h3>
                               <h3 class="mx-3">${day.date}</h3>
                           </div>
                          </div>
           <div class="container">
               <h2 class="fs-4">${countryName}</h2>
                              <h2 class="fs-4 ">${day.day.condition.text}</h2>
               <h3 class="fs-1 text-center text-light">${day.day.avgtemp_c}°C</h3>
               <img src="https:${day.day.condition.icon}" alt="" srcset="">
                              <h2 class="fs-4 text-primary">clear</h2>
              <div class="detailsdataw d-flex">
               <h4><img src="icon-umberella.png" alt="" srcset=""> ${day.day.daily_chance_of_rain}%</h4>
               <h4><img src="icon-wind.png" alt="" srcset=""> ${day.day.maxwind_kph}km/h</h4>
               <h4><img src="icon-compass.png" alt="" srcset=""> ${day.day.condition.wind_dir}</h4>
           
           </div>
                          
                          </div>
                       </div>
                    
   
    
          `;
  }
  }
  
  document.getElementById("weatherdata").innerHTML = cartoonaa;
}


function getUserLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          async function (position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              try {
                  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=73cedcc1e160449c9ef214022241212&q=${lat},${lon}&days=3`);
                  const result = await response.json();

                  console.log(result);

                  displaysite(result.forecast.forecastday, result.location.name);
              } catch (error) {
                  console.error("Error fetching weather data for user's location:", error);
              }
          },
          function (error) {
              console.error("Error getting location:", error);
              alert("Unable to fetch location. Please search manually.");
          }
      );
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}


getUserLocation();