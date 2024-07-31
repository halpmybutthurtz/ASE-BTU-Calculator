const time = 3600
let lineVoltage = [230, 220, 208, 120, 115, 110, 100]
let voltageIndex = 230;
let arraySelector = 0;

let totalBtuBox = document.getElementById("total-btu25")
let totalBtuMaxBox = document.getElementById("total-btu")
let totalRmsIdleBox = document.getElementById("total-rms-idle")
let totalRmsLongTermBox = document.getElementById("total-rms-lt")
let maxPerCircuit = document.getElementById("max-values")

//Device Objects
let csDevices = [
    {
        name: cs119,
        current: [2.15, 2.25, 2.38, 4.12, 4.3, 4.5, 4.95],
        idleCurrent: [0.45, 0.47, 0.5, 0.86, 0.9, 0.96, 1.04],
        maxQuantity: [7, 6, 6, 4, 4, 4, 4],
        quantity: document.getElementById("cs119"),
        btuBox: document.getElementById("cs119-btu25"),
        btuMax: document.getElementById("cs119-btu"),
        rmsIdleBox: document.getElementById("cs119-rms-idle"),
        rmsLongTermBox: document.getElementById("cs119-rms-lt")
    },
    
    {
        name: cs118,
        current: [1.25, 1.31, 1.38, 2.4, 2.5, 2.62, 2.88],
        idleCurrent: [0.45, 0.47, 0.5, 0.86, 0.9, 0.96, 1.04],
        maxQuantity: [11, 11, 10, 8, 8, 7, 6],
        quantity: document.getElementById("cs118"),
        btuBox: document.getElementById("cs118-btu25"),
        btuMax: document.getElementById("cs118-btu"),
        rmsIdleBox: document.getElementById("cs118-rms-idle"),
        rmsLongTermBox: document.getElementById("cs118-rms-lt")
    },
    
    {
        name: cs7,
        current: [1.6, 1.68, 1.78, 3.1, 3.22, 3.36, 3.7],
        idleCurrent: [0.45, 0.47, 0.5, 0.86, 0.9, 0.96, 1.04],
        maxQuantity: [9, 8, 8, 6, 6, 5, 5],
        quantity: document.getElementById("cs7"),
        btuBox: document.getElementById("cs7-btu25"),
        btuMax: document.getElementById("cs7-btu"),
        rmsIdleBox: document.getElementById("cs7-rms-idle"),
        rmsLongTermBox: document.getElementById("cs7-rms-lt")
    },
    
    {
        name: cs10,
        current: [1.6, 1.68, 1.78, 3.1, 3.22, 3.36, 3.7],
        idleCurrent: [0.45, 0.47, 0.5, 0.86, 0.9, 0.96, 1.04],
        maxQuantity: [9, 8, 8, 6, 6, 5, 5],
        quantity: document.getElementById("cs10"),
        rmsIdleBox: document.getElementById("cs10-rms-idle"),
        btuBox: document.getElementById("cs10-btu25"),
        btuMax: document.getElementById("cs10-btu"),
        rmsIdleBox: document.getElementById("cs10-rms-idle"),
        rmsLongTermBox: document.getElementById("cs10-rms-lt")
    },
    
    {
        name: cs7p,
        current: [1.6, 1.68, 1.78, 3.1, 3.22, 3.36, 3.7],
        idleCurrent: [0.45, 0.47, 0.5, 0.86, 0.9, 0.96, 1.04],
        maxQuantity: [9, 8, 8, 6, 6, 5, 5],
        quantity: document.getElementById("cs7p"),
        btuBox: document.getElementById("cs7p-btu25"),
        btuMax: document.getElementById("cs7p-btu"),
        rmsIdleBox: document.getElementById("cs7p-rms-idle"),
        rmsLongTermBox: document.getElementById("cs7p-rms-lt")
    },
    
    {
        name: cs10p,
        current: [1.6, 1.68, 1.78, 3.1, 3.22, 3.36, 3.7],
        idleCurrent: [0.45, 0.47, 0.5, 0.86, 0.9, 0.96, 1.04],
        maxQuantity: [9, 8, 8, 6, 6, 5, 5],
        quantity: document.getElementById("cs10p"),
        btuBox: document.getElementById("cs10p-btu25"),
        btuMax: document.getElementById("cs10p-btu"),
        rmsIdleBox: document.getElementById("cs10p-rms-idle"),
        rmsLongTermBox: document.getElementById("cs10p-rms-lt")
    },
    
    {
        name: vgt,
        current: [4.35, 4.55, 4.8, 8.3, 8.69, 9.1, 10],
        idleCurrent: [0.45, 0.47, 0.5, 0.86, 0.9, 0.96, 1.04],
        maxQuantity: [3, 3, 3, 2, 2, 2, 2],
        quantity: document.getElementById("vgt"),
        btuBox: document.getElementById("vgt-btu25"),
        btuMax: document.getElementById("vgt-btu"),
        rmsIdleBox: document.getElementById("vgt-rms-idle"),
        rmsLongTermBox: document.getElementById("vgt-rms-lt")
    }]

//Voltage and Current Selector
function setVoltage(v) {
    voltageIndex = lineVoltage[v]
    arraySelector = v
    console.log(voltageIndex, arraySelector)
    altBtuH()
    getMax()
}

setVoltage(0)

//Clear Button
function clearFields() {
    for (let q = 0; q < 7; q++) {
        csDevices[q].quantity.value = 0
    }
    altBtuH()
}

//Max Per Circuit
function getMax() {
    maxPerCircuit.innerHTML = `
        <td>${csDevices[6].maxQuantity[arraySelector]}</td>
        <td>${csDevices[0].maxQuantity[arraySelector]}</td>
        <td>${csDevices[1].maxQuantity[arraySelector]}</td>
        <td>${csDevices[2].maxQuantity[arraySelector]}</td>
        <td>${csDevices[3].maxQuantity[arraySelector]}</td>
        <td>${csDevices[4].maxQuantity[arraySelector]}</td>
        <td>${csDevices[5].maxQuantity[arraySelector]}</td>
        `
}

//Calculator
function altBtuH() {
    for (let b = 0; b < 7; b++) {
        let deviceCurrent = csDevices[b].current[arraySelector]
        let deviceQuantity = csDevices[b].quantity.value
        let deviceIdle = csDevices[b].idleCurrent[arraySelector]
        let idleBox = csDevices[b].rmsIdleBox
        let longTermBox = csDevices[b].rmsLongTermBox
        let btuBox = csDevices[b].btuBox
        let btuMaxBox = csDevices[b].btuMax
    
        let watts = deviceCurrent * voltageIndex
        let energy = watts * time
        let btupH = energy / 1055
        let max = btupH * 0.25
        let btu = deviceQuantity * max
        btuBox.value = btu.toFixed(2)
        idleBox.value = (deviceIdle * deviceQuantity).toFixed(2)
        longTermBox.value = (deviceCurrent * deviceQuantity).toFixed(2)
        btuMaxBox.value = (btu * 4).toFixed(2)
        sum()
    }
}

//Totals Calculations
function sum() {
    let totalBtu = 0
    let totalBtuMax = 0
    let totalRmsIdle = 0
    let totalRmsLongTerm = 0
    for (let i = 0; i < 7; i++) {
        totalBtu += (+csDevices[i].btuBox.value)
        totalBtuMax += (+csDevices[i].btuMax.value)
        totalRmsIdle += (+csDevices[i].rmsIdleBox.value)
        totalRmsLongTerm += (+csDevices[i].rmsLongTermBox.value)
    }
    totalBtuBox.value = totalBtu.toFixed(2)
    totalBtuMaxBox.value = totalBtuMax.toFixed(2)
    totalRmsIdleBox.value = totalRmsIdle.toFixed(2)
    totalRmsLongTermBox.value = totalRmsLongTerm.toFixed(2)
}
