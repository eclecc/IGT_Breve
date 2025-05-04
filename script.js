let maxTrials = 20; // Valor por defecto actualizado

// Define fixed outcomes for each deck of 60 cards
const deckA = [100, 100, -50, 100, -200, 100, -100, 100, -150, -250, ...];
const deckC = [50, 50, 0, 50, 0, 50, 0, 50, 0, 0, 50, 25, -25, 50, ...];

function drawCard(deckName) {
    const currentTimestamp = Date.now();
    const responseTime = lastTimestamp ? currentTimestamp - lastTimestamp : 0;
    lastTimestamp = currentTimestamp;

    if (trialCount >= maxTrials) {
        alert("Maximum trials reached!");
        return;
    }

    let result;
    switch (deckName) {
        case 'A':
            result = deckA.pop();
            break;
        case 'C':
            result = deckC.pop();
            break;
        default:
            alert(`!La baraja ${deckName} no es válida!`);
            return;
    }

    if (typeof result === "undefined") {
        alert(`!La baraja ${deckName} está vacía!`);
        return;
    }

    profit += result;
    trialCount++;
    results.push({ deck: deckName, result, profit, timestamp: currentTimestamp, TR: responseTime });
    document.getElementById('profit').innerText = profit;

    if (trialCount === maxTrials) {
        computeNetScores();
    }
}

function computeNetScores() {
    let netScores = [];
    let averageTRs = [];
    let totalTR = 0;
    let totalTRCount = 0;
    let totalNetScore = 0;

    for (let i = 0; i < maxTrials; i += 20) {
        let block = results.slice(i, i + 20);
        let netScore = 0;
        let blockTRSum = 0;
        let blockCount = block.length;

        block.forEach(record => {
            if (record.deck === 'C') netScore++;
            if (record.deck === 'A') netScore--;

            blockTRSum += record.TR;
        });

        totalNetScore += netScore;
        totalTR += blockTRSum;
        totalTRCount += blockCount;

        netScores.push(netScore);
        averageTRs.push(blockCount > 0 ? blockTRSum / blockCount : 0);
    }

    const averageTRTotal = totalTRCount > 0 ? totalTR / totalTRCount : 0;

    displayNetScores(netScores, averageTRs, totalNetScore, averageTRTotal);
    return { netScores, averageTRs, totalNetScore, averageTRTotal };
}

function displayNetScores(netScores, averageTRs, totalNetScore, averageTRTotal) {
    let message = "Net Scores for each block:\n";
    netScores.forEach((score, index) => {
        message += `Block ${index + 1}: Net Score = ${score}, Avg TR = ${averageTRs[index].toFixed(2)} ms\n`;
    });
    message += `\nTotal Net Score: ${totalNetScore}\n`;
    message += `Average TR (Total): ${averageTRTotal.toFixed(2)} ms\n`;
    message += `Beneficio final: €${profit}`;

    setTimeout(() => alert(message), 100);
}

function downloadCSV() {
    var userId = generateStringRandomly();
    let csvContent = "data:text/csv;charset=utf-8,";
    const { netScores, averageTRs, totalNetScore, averageTRTotal } = computeNetScores();

    csvContent += "Deck,Result,Total Profit,Timestamp,TR (ms)\n";
    results.forEach(record => {
        csvContent += record.deck + "," + record.result + "," + record.profit + "," +
                      new Date(record.timestamp).toISOString() + "," + record.TR + "\n";
    });

    csvContent += "\n\n";
    csvContent += "Block,Net Score,Avg TR (ms)\n";
    for (let j = 0; j < netScores.length; j++) {
        csvContent += `Block ${j + 1},${netScores[j]},${averageTRs[j].toFixed(2)}\n`;
    }

    csvContent += "\nPuntuación Neta Total," + totalNetScore + "\n";
    csvContent += "TR (Total)," + averageTRTotal.toFixed(2) + " ms\n";
    csvContent += "Beneficio Final (€)," + profit + "\n";

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "igt_results" + userId + ".csv");
    document.body.appendChild(link);
    link.click();
}
