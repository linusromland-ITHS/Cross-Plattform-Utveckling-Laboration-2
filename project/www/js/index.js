document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
	document.getElementById('deviceready').classList.add('ready');

	const onSuccess = function (position) {
		document.getElementById('cords').innerHTML = 'Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude;
	};

	function onError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	async function getProjects() {
		const request = await fetch('https://avancera.app/cities');
		const response = await request.json();

		response.forEach((city) => {
			const cityElement = document.createElement('li');
			// BR is very good for styling (dont give me IG)
			cityElement.innerHTML = `Name: ${city.name}<br />Population: ${city.population}`;
			document.getElementById('cities').appendChild(cityElement);
		});
	}

	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	getProjects();
}
