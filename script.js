const apiKey = "3a37989a16ac4b26a7df2fff99c470ef"; // ← Replace with your OpenWeather API key

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const result = document.getElementById('result');
const chips = document.querySelectorAll('.chip');

async function fetchWeather(city){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  result.innerHTML = `<div class="placeholder"><p>Loading weather for <strong>${city}</strong>…</p></div>`;
  try{
    const res = await fetch(url);
    if(!res.ok){ throw new Error('City not found'); }
    const data = await res.json();
    renderWeather(data);
  }catch(err){
    result.innerHTML = `<div class="placeholder" style="color:#b00020"><p>❌ ${err.message}</p><small class="hint">Make sure spelling is correct or try "city, country"</small></div>`;
  }
}

function renderWeather(data){
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const city = `${data.name}, ${data.sys.country}`;
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const humidity = data.main.humidity;
  const wind = Math.round(data.wind.speed);
  result.innerHTML = `
    <div class="weather-row">
      <img src="${icon}" alt="icon" />
      <div class="weather-info">
        <div class="city">${city}</div>
        <div class="temp">${temp}°C</div>
        <div class="desc">${desc}</div>
        <div style="margin-top:8px;font-size:13px;color:#6b7280">Humidity: ${humidity}% • Wind: ${wind} m/s</div>
      </div>
    </div>
  `;
}

searchBtn.addEventListener('click', ()=>{
  const city = cityInput.value.trim();
  if(city) fetchWeather(city);
});
cityInput.addEventListener('keypress', (e)=>{ if(e.key==='Enter'){ searchBtn.click(); } });
chips.forEach(c=>c.addEventListener('click', ()=>{ cityInput.value = c.textContent; fetchWeather(c.textContent); }));
