let profit = 1000; // Beneficio inicial
let trialCount = 0; // Contador de intentos
const maxTrials = 20; // Número máximo de intentos
const deckA = [100, -50, 200, -100]; // Baraja A (ejemplo de valores)
const deckC = [50, -20, 150, -80]; // Baraja C (ejemplo de valores)
let lastTimestamp = null; // Última marca de tiempo
const results = []; // Resultados de cada intento

function drawCard(deckName) {
    const currentTimestamp = Date.now(); // Capturamos el timestamp actual
    const responseTime = lastTimestamp ? currentTimestamp - lastTimestamp : 0; // Calculamos el tiempo de respuesta (TR)
    lastTimestamp = currentTimestamp; // Actualizamos el timestamp anterior

    if (trialCount >= maxTrials) {
        alert("¡Has alcanzado el número máximo de intentos!");
        return;
    }

    let result;
    switch (deckName) {
        case 'A':
            result = deckA.length ? deckA.pop() : undefined;
            break;
        case 'C':
            result = deckC.length ? deckC.pop() : undefined;
            break;
        default:
            alert(`Baraja no reconocida: ${deckName}`);
            return;
    }

    if (typeof result === "undefined") {
        alert(`¡La baraja ${deckName} está vac

