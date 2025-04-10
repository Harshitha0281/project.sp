let map;  // To hold the map instance
let marker;  // To hold the marker

function navigateArea() {
    const input = document.getElementById('areaInput').value;
    const resultDiv = document.getElementById('result');

    if (input) {
        const coordinates = input.split(',');
        if (coordinates.length === 2) {
            const lat = parseFloat(coordinates[0].trim());
            const lon = parseFloat(coordinates[1].trim());

            if (!isNaN(lat) && !isNaN(lon)) {
                resultDiv.innerHTML = `Navigating to coordinates: <br>Latitude: ${lat}, Longitude: ${lon}`;

                // Initialize map if not already initialized
                if (!map) {
                    map = L.map('map').setView([lat, lon], 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);
                }

                // Update map view to new coordinates
                map.setView(new L.LatLng(lat, lon), 13);

                // Add or update marker
                if (marker) {
                    marker.setLatLng([lat, lon]);
                } else {
                    marker = L.marker([lat, lon]).addTo(map);
                }
            } else {
                resultDiv.innerHTML = 'Invalid coordinates. Please enter valid latitude and longitude.';
            }
        } else {
            resultDiv.innerHTML = 'Please enter both latitude and longitude, separated by a comma.';
        }
    } else {
        resultDiv.innerHTML = 'Please enter area coordinates.';
    }
}
