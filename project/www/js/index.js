document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.getElementById('deviceready').classList.add('ready');

	getLocation();
	getCity();
}

function getLocation() {
	const cordsElement = document.getElementById('cords');
	const onSuccess = function (position) {
		cordsElement.innerHTML = '';

		const latitude = document.createElement('p');
		latitude.innerHTML = `Latitude: ${position.coords.latitude}`;

		const longitude = document.createElement('p');
		longitude.innerHTML = `Longitude: ${position.coords.longitude}`;

		cordsElement.appendChild(latitude);
		cordsElement.appendChild(longitude);
	};

	function onError(error) {
		cordsElement.innerHTML = 'code: ' + error.code + '\n' + 'message: ' + error.message + '\n';
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

async function getCity() {
	const cityElement = document.getElementById('city');
	cityElement.innerHTML = '';

	const request = await fetch('https://avancera.app/cities');
	const response = await request.json();

	const city = response[Math.floor(Math.random() * response.length)];

	const cityName = document.createElement('p');
	cityName.innerHTML = `Name: ${city.name}`;
	const cityPopulation = document.createElement('p');
	cityPopulation.innerHTML = `Population: ${city.population}`;

	cityElement.appendChild(cityName);
	cityElement.appendChild(cityPopulation);
}
