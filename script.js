const planetSizeSlider = document.getElementById('planetSize');
const distanceSlider = document.getElementById('distanceFromStar');
const atmosphereSlider = document.getElementById('atmosphere');
const habitabilityButton = document.getElementById('checkHabitability');
const planetSizeValue = document.getElementById('planetSizeValue');
const distanceValue = document.getElementById('distanceValue');
const atmosphereValue = document.getElementById('atmosphereValue');
const resultDiv = document.getElementById('result');
const planetCanvas = document.getElementById('planetCanvas');
const starCanvas = document.getElementById('starCanvas');
const ctxPlanet = planetCanvas.getContext('2d');
const ctxStar = starCanvas.getContext('2d');
const distanceText = document.getElementById('distanceText');

// Update display values
planetSizeSlider.oninput = () => {
    planetSizeValue.textContent = planetSizeSlider.value;
    drawPlanet();
};
distanceSlider.oninput = () => {
    distanceValue.textContent = distanceSlider.value;
    distanceText.textContent = distanceSlider.value <= 10 ? distanceSlider.value + " AU" : (distanceSlider.value / 5).toFixed(2) + " LY";
    drawStar();
};
atmosphereSlider.oninput = () => {
    atmosphereValue.textContent = atmosphereSlider.value;
    drawPlanet();
};

// Draw the planet based on size and atmosphere thickness
function drawPlanet() {
    const planetRadius = planetSizeSlider.value / 150;
    const atmosphereThickness = atmosphereSlider.value / 50;

    ctxPlanet.clearRect(0, 0, planetCanvas.width, planetCanvas.height);

    // Draw atmosphere
    ctxPlanet.beginPath();
    ctxPlanet.arc(125, 125, planetRadius + atmosphereThickness * 10, 0, Math.PI * 2);
    ctxPlanet.fillStyle = "rgb(230, 201, 173)"; // Light blue atmosphere
    ctxPlanet.fill();

    // Draw planet
    ctxPlanet.beginPath();
    ctxPlanet.arc(125, 125, planetRadius, 0, Math.PI * 2);
    ctxPlanet.fillStyle = "#42a5f5";
    ctxPlanet.fill();
    ctxPlanet.stroke();
}

// Draw the star based on distance
function drawStar() {
    const distance = distanceSlider.value;
    const starRadius = Math.max(100 / distance, 10);

    ctxStar.clearRect(0, 0, starCanvas.width, starCanvas.height);

    ctxStar.beginPath();
    ctxStar.arc(75, 75, starRadius, 0, Math.PI * 2);
    ctxStar.fillStyle = "#ffd700";
    ctxStar.shadowBlur = 20;
    ctxStar.shadowColor = "#ffd700";
    ctxStar.fill();
    ctxStar.closePath();
}

// Check Habitability Function
function checkHabitability() {
    const planetSize = parseInt(planetSizeSlider.value);
    const distanceFromStar = parseFloat(distanceSlider.value);
    const atmosphereThickness = parseInt(atmosphereSlider.value);

    // Simple habitability criteria
    let habitable = true;
    let message = "Congratulations! Your planet is habitable. 🌍";

    // Criteria for habitability
    if (planetSize < 4000 || planetSize > 8000) {
        habitable = false;
        message = "The planet is not within the habitable size range (4000 - 8000 km).";
    } else if (distanceFromStar < 0.8 || distanceFromStar > 1.5) {
        habitable = false;
        message = "The planet is too close or too far from the star (distance must be between 0.8 - 1.5 AU).";
    } else if (atmosphereThickness < 30 || atmosphereThickness > 80) {
        habitable = false;
        message = "The atmosphere thickness is not suitable (must be between 30% - 80%).";
    }

    // Show the result
    resultDiv.textContent = message;
    resultDiv.style.color = habitable ? "green" : "red";
}

// Event listener for habitability check
habitabilityButton.addEventListener('click', checkHabitability);

// Initial draw of the planet and star
drawPlanet();
drawStar();
