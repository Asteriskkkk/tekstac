const weatherData = {
    Sydney: 28,
    London: 15,
    Mumbai: 32,
    Delhi: 35
};

function fetchWeather(city) {
    return new Promise((resolve, reject) => {
        if (!city) {
            reject(new Error("City name is missing"));
        } else if (!(city in weatherData)) {
            reject(new Error("City not found"));
        } else {
            resolve(weatherData[city]);
        }
    });
}

async function getWeather(city) {
    try {
        const temperature = await fetchWeather(city);
        console.log(`Temperature in ${city} is ${temperature}°C`);
    } catch (error) {
        console.log(`Failed to fetch weather: ${error.message}`);
    } finally {
        console.log("Weather check completed");
    }
}

module.exports = getWeather;