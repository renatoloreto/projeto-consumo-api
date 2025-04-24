document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'https://api.nationalize.io/'; 
    const FLAG_URL = 'https://flagcdn.com/w320/'; 

    const searchInput = document.getElementById('search-input');
    const countryList = document.getElementById('country-list');

    searchInput.addEventListener('input', function () {
        const name = searchInput.value.trim();

        if (name.length > 0) {
            fetch(`${API_URL}?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    displayCountries(data.country);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            countryList.innerHTML = '';
        }
    });

    function displayCountries(countries) {
        countryList.innerHTML = '';

        countries.forEach(country => {
            const listItem = document.createElement('li');
            const countryCode = country.country_id.toLowerCase();
            const countryFlag = `${FLAG_URL}${countryCode}.png`;

            listItem.innerHTML = `
                <img src="${countryFlag}" alt="${country.country_id} flag" class="flag">
                <div>
                    <h3>${country.country_id}</h3>
                    <p>Probabilidade: ${(country.probability * 100).toFixed(2)}%</p>
                </div>
            `;

            countryList.appendChild(listItem);
        });
    }
});
