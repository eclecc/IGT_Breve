let lastTimestamp = null; // Variable global para guardar el timestamp anterior
let profit = 1000;
let results = [];
let trialCount = 0;
lastTimestamp = Date.now(); // no-inicializar con el timestamp actuallet lastTimestamp = Date.now(); // Inicializar con el timestamp actual

//const maxTrials = 100;  versión anterior
// Variable global por defecto
let maxTrials = 20;

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
//const deckB = [100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100]; // Continue the sequence for 60 cards
const deckC = [50, 50, 0, 50, 0, 50, 0, 50, 0, 0, 50, 25, -25, 50, 50, 50, 25, -25, 50, 0, 50, 50, 50, 0, 25, 0, 50, 50, -25, 0, 50, 50, 50, 25, 25, 50, -25, 50, 0, -25, 50, 50, 0, 50, 0, 50, 0, 50, 0, 0, 50, 25, -25, 50, 50, 50, 25, -25, 50, 0]; // Continue the sequence for 60 cards
//const deckD = [50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200]; // Continue the sequence for 60 cards

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
        case 'C':
            result = deckC.pop();
            break;
    }
    
    if (typeof result === "undefined") {
        alert(`¡La baraja ${deckName} está vacía!`);
        return;
    } else {
        // Calculamos valores desglosados
        const ganado = result >= 0 ? result : 0;
        const perdido = result < 0 ? Math.abs(result) : 0;

        // Mostramos los resultados desglosados
        let resultSpan = document.getElementById('resultValue');
        let audio = new Audio(); // Crear un objeto de audio

        if (ganado > 0) {
            // Ganancia
            resultSpan.innerHTML = `<span class="gain">Has ganado: €${ganado}</span>`;
            resultSpan.style.color = 'green'; // Cambiar color a verde
            audio.src = 'success.wav'; // Archivo de sonido para ganancia
            audio.play(); // Reproducir sonido
        } else if (perdido > 0) {
            // Pérdida
            resultSpan.innerHTML = `<span class="loss">Has perdido: €${perdido}</span>`;
            resultSpan.style.color = 'red'; // Cambiar color a rojo
            audio.src = 'fail.wav'; // Archivo de sonido para pérdida
            audio.play(); // Reproducir sonido
        }
    }

    profit += result;
    trialCount++;
    results.push({ deck: deckName, result: result, profit: profit, timestamp: currentTimestamp, TR: responseTime });
    document.getElementById('profit').innerText = profit;

    if (trialCount === maxTrials) {
        computeNetScores();
    }
}

function calcularTRperdidasGananciasPorBloques(tipo) {
    if (results.length === 0) {
        console.warn("No hay datos en los resultados. No se puede calcular TRperdidas/TRganancias.");
        return { total: 0, bloques: [0, 0] };
    }

    let totalResponseTime = 0, totalCount = 0;
    let bloques = [{ responseTime: 0, count: 0 }, { responseTime: 0, count: 0 }];

    results.forEach((record, index) => {
        const siguienteTR = index < results.length - 1 ? results[index + 1].TR : 0;

        if ((tipo === "perdidas" && record.result < 0) || (tipo === "ganancias" && record.result > 0)) {
            totalResponseTime += siguienteTR;
            totalCount++;

            // Clasificar en bloques 1+2 (primera mitad) o 3+4 (segunda mitad)
            const bloqueIndex = index < maxTrials / 2 ? 0 : 1;
            bloques[bloqueIndex].responseTime += siguienteTR;
            bloques[bloqueIndex].count++;
        }
    });

    return {
        total: totalCount > 0 ? totalResponseTime / totalCount : 0,
        bloques: bloques.map(b => b.count > 0 ? b.responseTime / b.count : 0),
    };
}

function computeNetScores() {
    let netScores = [];
    let averageTRs = [];
    let totalTR = 0;
    let totalTRCount = 0;
    let totalNetScore = 0;

    // Variables para los subtotales
    let ultimos15NetScore = 0;
    let ultimos15TR = 0;
    let ultimos15Count = 0;

    let ultimos10NetScore = 0;
    let ultimos10TR = 0;
    let ultimos10Count = 0;

    for (let i = 0; i < maxTrials; i += 5) {
        let block = results.slice(i, i + 5);
        let netScore = 0;
        let blockTRSum = 0;
        let blockCount = block.length;

        block.forEach(record => {
            if (['C'].includes(record.deck)) netScore++; // Ventajoso
            if (['A'].includes(record.deck)) netScore--; // Desventajoso

            blockTRSum += record.TR;
        });

        totalNetScore += netScore;
        totalTR += blockTRSum;
        totalTRCount += blockCount;

        netScores.push(netScore);
        averageTRs.push(blockCount > 0 ? blockTRSum / blockCount : 0);

  // Acumular subtotales para "últimos 15" y "últimos 10"
        if (i > 5 && i <= 20) { // Bloques 2+3+4 (6 a 20índices 20 a 79)
            ultimos15NetScore += netScore;
            ultimos15TR += blockTRSum;
            ultimos15Count += blockCount;
        }
        if (i > 10 && i <= 20) { // Bloques 3+4 (índices 11 a 20)
            ultimos10NetScore += netScore;
            ultimos10TR += blockTRSum;
            ultimos10Count += blockCount;
        }

        
    }

    const averageTRTotal = totalTRCount > 0 ? totalTR / totalTRCount : 0;
    const ultimos15AverageTR = ultimos15Count > 0 ? ultimos15TR / ultimos15Count : 0;
    const ultimos10AverageTR = ultimos10Count > 0 ? ultimos10TR / ultimos10Count : 0;
    // Calcular TRperdidas y TRganancias (total y por bloques)
    const TRperdidas = calcularTRperdidasGananciasPorBloques("perdidas");
    const TRganancias = calcularTRperdidasGananciasPorBloques("ganancias");
    
    displayNetScores(netScores, averageTRs, totalNetScore, averageTRTotal, ultimos15NetScore, ultimos15AverageTR, ultimos10NetScore, ultimos10AverageTR, TRperdidas,TRganancias);
    return { netScores, averageTRs, totalNetScore, averageTRTotal, ultimos15NetScore, ultimos15AverageTR, ultimos10NetScore, ultimos10AverageTR, TRperdidas,TRganancias };
   
}


function displayNetScores(netScores, averageTRs, totalNetScore, averageTRTotal, ultimos15NetScore, ultimos15AverageTR, ultimos10NetScore, ultimos10AverageTR, TRperdidas,TRganancias) {
    let message = "Net Scores for each block:\n";
    netScores.forEach((score, index) => {
        message += `Block ${index + 1}: Net Score = ${score}, Avg TR = ${averageTRs[index].toFixed(2)} ms\n`;
    });
    message += `\nSubtotal (últimos 15): Net Score = ${ultimos15NetScore}, Avg TR = ${ultimos15AverageTR.toFixed(2)} ms\n`;
    message += `Subtotal (últimos 10): Net Score = ${ultimos10NetScore}, Avg TR = ${ultimos10AverageTR.toFixed(2)} ms\n`;
    message += `\nTotal Net Score: ${totalNetScore}\n`;
    message += `Average TR (Total): ${averageTRTotal.toFixed(2)} ms\n`;
    message += `Beneficio final: €${profit}`;
     // Mostrar TRperdidas
    message += "\n"; // Añade un salto de línea para un párrafo vacío
    message += `TRperdidas:\n  Total: ${TRperdidas.total.toFixed(2)} ms\n  Bloques 1+2: ${TRperdidas.bloques[0].toFixed(2)} ms\n  Bloques 3+4: ${TRperdidas.bloques[1].toFixed(2)} ms\n`;

    // Mostrar TRganancias
    message += `TRganancias:\n  Total: ${TRganancias.total.toFixed(2)} ms\n  Bloques 1+2: ${TRganancias.bloques[0].toFixed(2)} ms\n  Bloques 3+4: ${TRganancias.bloques[1].toFixed(2)} ms\n`;
    setTimeout(() => alert(message), 100);
}

function downloadCSV() {
    var userId = generateStringRandomly();
    let csvContent = "data:text/csv;charset=utf-8,";

    // Llama a computeNetScores para obtener todos los datos necesarios
    const { TRperdidas, TRganancias } = computeNetScores();
    const { netScores, averageTRs, totalNetScore, averageTRTotal, ultimos15NetScore, ultimos15AverageTR, ultimos10NetScore, ultimos10AverageTR } = computeNetScores();

    // Agregar encabezados y datos de resultados
    csvContent += "Deck,Result,Total Profit,Timestamp,TR (ms)\n";
    results.forEach(record => {
        csvContent += record.deck + "," + record.result + "," + record.profit + "," +
                      new Date(record.timestamp).toISOString() + "," + record.TR + "\n";
    });

    // Espacios entre secciones
    csvContent += "\n\n";

    // Agregar datos de bloques
    csvContent += "Block,Net Score,Avg TR (ms)\n";
    for (let j = 0; j < netScores.length; j++) {
        csvContent += `Block ${j + 1},${netScores[j]},${averageTRs[j].toFixed(2)}\n`;
    }

    // Agregar totales y subtotales
    csvContent += "\nPuntuación Neta Total," + totalNetScore + "\n";
    csvContent += "TR (Total)," + averageTRTotal.toFixed(2) + " ms\n";
    csvContent += "Beneficio Final (€)," + profit + "\n";
    csvContent += "\nSubtotal (últimos 15)," + ultimos15NetScore + "," + ultimos15AverageTR.toFixed(2) + " ms\n";
    csvContent += "Subtotal (últimos 10)," + ultimos10NetScore + "," + ultimos10AverageTR.toFixed(2) + " ms\n";
    
    // Espacios entre secciones
    csvContent += "\n\n";

    // Agregar TR pérdidas y ganancias
    csvContent += "Índice,Total,Bloques 1+2,Bloques 3+4\n";
    csvContent += `TRperdidas,${TRperdidas.total.toFixed(2)},${TRperdidas.bloques[0].toFixed(2)},${TRperdidas.bloques[1].toFixed(2)}\n`;
    csvContent += `TRganancias,${TRganancias.total.toFixed(2)},${TRganancias.bloques[0].toFixed(2)},${TRganancias.bloques[1].toFixed(2)}\n`;
    // Codificar y descargar el archivo
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
