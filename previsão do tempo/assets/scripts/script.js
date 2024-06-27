document.querySelector('#search').addEventListener('submit', async(event)=>{event.preventDefault();
    const cityNome = document.querySelector('#iname').value;
    if(!cityNome){
        return showaAlert('Selecione uma cidade');
    }
    console.log(cityNome)
    const apikey = `657ecf97e3491a1db007e3797ab7ec80`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityNome)}&appid=${apikey}&units=metric&lang=pt_br`;
    const results = await fetch(apiUrl);
    const json = await results.json();
    if (json.cod === 200) {
        showinfo({
            city: json.name,
            country: json.sys.country,
            temp:json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            iconTemp: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidade: json.main.humidity,

        });
    }else{
        showaAlert('Não achei sua cidade querido(a)');

    }


});

function showinfo(json) {
    showaAlert('');
    document.querySelector('#alert').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')} <sup>C°</sup> `;

    document.querySelector('#tep_description').innerHTML = `${json.description}`;



    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.',',')} <sup>C°</sup> `;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.',',')} <sup>C°</sup> `;
    document.querySelector('#humidade').innerHTML = `${json.humidade}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km h`;

    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.iconTemp}@2x.png`);

}

function showaAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}