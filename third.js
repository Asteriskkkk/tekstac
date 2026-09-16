const weatherData = {
    sydney: 28,
    london: 15,
    mumbai: 32,
    delhi: 35
};

function fetchWeather(city) {
    return new Promise((resolve, reject) => {
        if (!city || city.trim() === "") {
            reject(new Error("City name is missing"));
            return;
        }

        const cityName = city.trim().toLowerCase();

        if (!(cityName in weatherData)) {
            reject(new Error("City not found"));
            return;
        }

        resolve(weatherData[cityName]);
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