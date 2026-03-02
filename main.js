const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    const start = startTime.toLowerCase().split(' ')
    const startTimeClean = start[0].split(':')

    let startH = parseFloat(startTimeClean[0])
    let startM = parseFloat(startTimeClean[1])
    let startS = parseFloat(startTimeClean[2])

    if(start[1] == 'pm' && startH != 12) {
        startH += 12
    }
    if(start[1] == 'am' && startH == 12) {
        startH = 0
    }
    
    const end = endTime.toLowerCase().split(' ')
    const endTimeClean = end[0].split(':')

    let endH = parseFloat(endTimeClean[0])
    let endM = parseFloat(endTimeClean[1])
    let endS = parseFloat(endTimeClean[2])

    if(end[1] == 'pm' && endH != 12) {
        endH += 12
    }
    if(end[1] == 'am' && endH == 12) {
        endH = 0
    }

    let seconds = endS - startS
    if(seconds < 0) {
        seconds += 60
        endM--
    }
    let minutes = endM - startM
    if(minutes < 0) {
        minutes += 60
        endH--
    }
    let hours = endH - startH
    if(hours < 0) {
        hours += 24
    }
    const secs = String(seconds).padStart(2, '0')
    const mins = String(minutes).padStart(2, '0')

    return `${hours}:${mins}:${secs}`
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    const start = startTime.toLowerCase().split(' ')
    const startTimeClean = start[0].split(':')

    let startH = parseFloat(startTimeClean[0])
    let startM = parseFloat(startTimeClean[1])
    let startS = parseFloat(startTimeClean[2])

    if(start[1] == 'pm' && startH != 12) {
        startH += 12
    }
    if(start[1] == 'am' && startH == 12) {
        startH = 0
    }
    
    const end = endTime.toLowerCase().split(' ')
    const endTimeClean = end[0].split(':')

    let endH = parseFloat(endTimeClean[0])
    let endM = parseFloat(endTimeClean[1])
    let endS = parseFloat(endTimeClean[2])

    if(end[1] == 'pm' && endH != 12) {
        endH += 12
    }
    if(end[1] == 'am' && endH == 12) {
        endH = 0
    }

    let seconds = 0
    let minutes = 0
    let hours = 0

    if(startH < 8) {
        let boundH = 8
        let boundM = 0
        let boundS = 0
        if(endH < 8) {
            boundH = endH
            boundM = endM
            boundS = endS
        }
        let s = boundS - startS
        if(s < 0) {
            s += 60
            boundM--
        }
        let m = boundM - startM
        if(m < 0) {
            m += 60
            boundH--
        }
        let h = boundH - startH

        seconds += s
        minutes += m
        hours += h
    }
    if(endH >= 22) {
        let boundH = 22
        let boundM = 0
        let boundS = 0
        if(startH >= 22) {
            boundH = startH
            boundM = startM
            boundS = startS
        }
        let s = endS - boundS
        if(s < 0) {
            s += 60
            endM--
        }
        let m = endM - boundM
        if(m < 0) {
            m += 60
            endH--
        }
        let h = endH - boundH

        seconds += s
        minutes += m
        hours += h
    }

    if(seconds < 0) {
        seconds -= 60
        endM--
    }
    if(minutes < 0) {
        minutes -= 60
        endH--
    }
    const secs = String(seconds).padStart(2, '0')
    const mins = String(minutes).padStart(2, '0')

    return `${hours}:${mins}:${secs}`
}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
