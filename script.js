let lastTimestamp = null; // Variable global para guardar el timestamp anterior

let profit = 2000;
let results = [];
let trialCount = 0;
lastTimestamp = Date.now(); // no-inicializar con el timestamp actuallet lastTimestamp = Date.now(); // Inicializar con el timestamp actual

//const maxTrials = 100;  versión anterior
// Variable global por defecto
let maxTrials = 100;

// Función para capturar la configuración del usuario
document.getElementById("configForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener el valor del input, o usar el valor por defecto si no se define
    const userInput = document.getElementById("maxTrials").value;
    maxTrials = userInput ? parseInt(userInput) : 100;

    console.log("Configuración guardada: maxTrials =", maxTrials);
    // Aquí puedes continuar con la lógica del juego usando maxTrials
});

// Define fixed outcomes for each deck of 60 cards
const deckA = [100, 100, -50, 100, -200, 100, -100, 100, -150, -250, 100, -250, 100, -150, -100, 100, -200, -50, 100, 100, 100, -200, 100, -250, 100, -100, -150, -50, 100, 100, -250, -100, -150, 100, 100, 100, -50, -200, 100, 100, 100, 100, -50, 100, -200, 100, -100, 100, -150, -250, 100, -250, 100, -150, -100, 100, -200, -50, 100, 100]; // Continue the sequence for 60 cards
const deckB = [100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100]; // Continue the sequence for 60 cards
const deckC = [50, 50, 0, 50, 0, 50, 0, 50, 0, 0, 50, 25, -25, 50, 50, 50, 25, -25, 50, 0, 50, 50, 50, 0, 25, 0, 50, 50, -25, 0, 50, 50, 50, 25, 25, 50, -25, 50, 0, -25, 50, 50, 0, 50, 0, 50, 0, 50, 0, 0, 50, 25, -25, 50, 50, 50, 25, -25, 50, 0]; // Continue the sequence for 60 cards
const deckD = [50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200]; // Continue the sequence for 60 cards
//Based on "Characterization of the decision-making deficit of patients with ventromedial prefrontal cortex lesions"
//const deckA = [100, 100, -150, 100, -300, 100, -200, 100, -250, -350, 100, -350, 100, -250, -200, 100, -300, -150, 100, 100, 100, -300, 100, -350, 100, -200, -250, -150, 100, 100, -350, -200, -250, 100, 100, 100, -150, -300, 100, 100]; // Continue the sequence for 40 cards
//const deckB = [0, 0, 100, 0, 100, 0, 100, 100, -125, 100, 0, 0, 100, -125, 100, 0, 0, 100, 100, 100, -125, 100, 0, 0, 100, 0, 100, 0, 100, 100, 0, -125, 100, 0, 100, 0, 100, 0, 100, 100]; // Continue the sequence for 40 cards
//const deckC = [50, 50, -50, 50, -50, 50, -50, 50, -50, -50, 50, -25, -75, 50, 50, 50, -25, -75, 50, -50, 50, 50, 50, -50, -25, -50, 50, 50, -75, -50, 50, 50, 50, -25, -25, 50, -75, 50, -50, -75]; // Continue the sequence for 40 cards
//const deckD = [0, 50, 0, 50, 50, 0, 0, 50, 50, -250, 0, 0, 50, 50, 0, 50, 50, 50, 0, -250, 50, 0, 50, 50, 0, 0, 0, 50, -250, 50, 50, 0, 50, 0, -250, 0, 50, 50, 0, 50]; // Continue the sequence for 40 cards

function drawCard(deckName) {
    const currentTimestamp = Date.now(); // Capturamos el timestamp actual
    const responseTime = lastTimestamp ? currentTimestamp - lastTimestamp : 0; // Calculamos el tiempo de respuesta (TR)
    lastTimestamp = currentTimestamp; // Actualizamos el timestamp anterior
    
    
    if (trialCount >= maxTrials) {
        alert("Maximum trials reached!");
        return;
    }

    let result;
    switch(deckName) {
        case 'A':
            result = deckA.pop();
            break;
        case 'B':
            result = deckB.pop();
            break;
        case 'C':
            result = deckC.pop();
            break;
        case 'D':
            result = deckD.pop();
            break;
    }
    
    if (typeof result === "undefined") {
        alert(`!La baraja ${deckName} está vacía!`);
        return;
    }
    else{
        //document.getElementById('immediateResult').innerText = result >= 0 ? `You earned $${result}` : `You lost $${Math.abs(result)}`;
        let resultSpan = document.getElementById('resultValue');
        if (result >= 0) {
            resultSpan.innerText = `Ganado €${result}`;
            resultSpan.className = 'gain';  // Apply green color
        } else {
            resultSpan.innerText = `Perdido €${Math.abs(result)}`;
            resultSpan.className = 'loss';  // Apply red color
        }
    }

    profit += result;
    trialCount++;
    results.push({deck: deckName, result:result, profit:profit,timestamp:currentTimestamp,TR: responseTime});
    document.getElementById('profit').innerText = profit;

    if (trialCount === maxTrials) {
        computeNetScores();
    }
}


function computeNetScores() {
    let netScores = [];
    let freqScores = []; // Nuevo array para freqscore
    let averageTRs = [];
    let totalTR = 0;
    let totalTRCount = 0;
    let totalNetScore = 0;
    let totalFreqScore = 0; // Variable para freqscore total

    for (let i = 0; i < maxTrials; i += 20) {
        let block = results.slice(i, i + 20);
        let netScore = 0;
        let freqScore = 0; // Inicializamos el freqscore del bloque
        let blockTRSum = 0;
        let blockCount = block.length;

        block.forEach(record => {
            if (['C', 'D'].includes(record.deck)) netScore++; // Ventajoso
            if (['A', 'B'].includes(record.deck)) netScore--; // Desventajoso

            if (['D', 'B'].includes(record.deck)) freqScore++; // Parte positiva del freqscore
            if (['A', 'C'].includes(record.deck)) freqScore--; // Parte negativa del freqscore

            blockTRSum += record.TR;
        });

        totalNetScore += netScore;
        totalFreqScore += freqScore; // Incrementamos el freqscore total
        totalTR += blockTRSum;
        totalTRCount += blockCount;

        netScores.push(netScore);
        freqScores.push(freqScore); // Guardamos freqscore en el array
        averageTRs.push(blockCount > 0 ? blockTRSum / blockCount : 0);
    }

    const averageTRTotal = totalTRCount > 0 ? totalTR / totalTRCount : 0;

    displayNetScores(netScores, freqScores, averageTRs, totalNetScore, totalFreqScore, averageTRTotal);
    return { netScores, freqScores, averageTRs, totalNetScore, totalFreqScore, averageTRTotal };
}


function displayNetScores(netScores, freqScores, averageTRs, totalNetScore, totalFreqScore, averageTRTotal) {
    let message = "Net Scores for each block:\n";
    netScores.forEach((score, index) => {
        message += `Block ${index + 1}: Net Score = ${score}, Freq Score = ${freqScores[index]}, Avg TR = ${averageTRs[index].toFixed(2)} ms\n`;
    });
    message += `\nTotal Net Score: ${totalNetScore}\n`;
    message += `Total Gain Loss Freq Score: ${totalFreqScore}\n`; // Mostramos freqscore total
    message += `Average TR (Total): ${averageTRTotal.toFixed(2)} ms\n`;
    message += `Beneficio final: €${profit}`;

    setTimeout(() => alert(message), 100);
}

function downloadCSV() {
    var userId = generateStringRandomly();
    let csvContent = "data:text/csv;charset=utf-8,";
    const { netScores, freqScores, averageTRs, totalNetScore, totalFreqScore, averageTRTotal } = computeNetScores();

    csvContent += "Deck,Result,Total Profit,Timestamp,TR (ms)\n";
    results.forEach(record => {
        csvContent += record.deck + "," + record.result + "," + record.profit + "," +
                      new Date(record.timestamp).toISOString() + "," + record.TR + "\n";
    });

    csvContent += "\n\n";

    csvContent += "Block,Net Score,Freq Score,Avg TR (ms)\n";
    for (let j = 0; j < netScores.length; j++) {
        csvContent += `Block ${j + 1},${netScores[j]},${freqScores[j]},${averageTRs[j].toFixed(2)}\n`;
    }

    csvContent += "\nPuntuación Neta Total," + totalNetScore + "\n";
    csvContent += "Puntuación Frecuencia Total," + totalFreqScore + "\n"; // Añadimos freqscore total
    csvContent += "TR (Total)," + averageTRTotal.toFixed(2) + " ms\n";
    csvContent += "Beneficio Final (€)," + profit + "\n";

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "igt_results" + userId + ".csv");
    document.body.appendChild(link);
    link.click();
}
function generateStringRandomly() {
    var l = 6;
    // 生成する文字列に含める文字セット
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var r = "_";
    for (var i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)];
    }
    return r;
}

