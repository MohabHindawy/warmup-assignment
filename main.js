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
    const duration = shiftDuration.split(':')

    let durationH = parseFloat(duration[0])
    let durationM = parseFloat(duration[1])
    let durationS = parseFloat(duration[2])

    const idle = idleTime.split(':')

    let idleH = parseFloat(idle[0])
    let idleM = parseFloat(idle[1])
    let idleS = parseFloat(idle[2])

    let seconds = durationS - idleS
    if(seconds < 0) {
        seconds += 60
        durationM--
    }

    let minutes = durationM - idleM
    if(minutes < 0) {
        minutes += 60
        durationH--
    }

    let hours = durationH - idleH
    if(hours < 0) {
        hours += 24
    }

    const secs = String(seconds).padStart(2, '0')
    const mins = String(minutes).padStart(2, '0')

    return `${hours}:${mins}:${secs}`
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    const duration = activeTime.split(':')
    const dateClean = date.split('-')

    if(dateClean[0] == "2025" && dateClean[1] == "04" && (parseInt(dateClean[2]) >= 10 && parseInt(dateClean[2]) <= 30)) {
        return parseInt(duration[0]) >= 6
    }
    if(parseInt(duration[0]) > 8) return true
    return parseInt(duration[0]) == 8 && parseInt(duration[1]) >= 24
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    const content = fs.readFileSync(textFile, 'utf8').split('\n')
    let lastSeenIndex = -1
    for(let i = 0; i < content.length; i++) {
        const line = content[i].trim()
        
        if(line == "") continue;

        const cols = line.split(',')
        const id = cols[0].trim()
        const date = cols[2].trim()

        if(shiftObj.driverID.trim() == id && shiftObj.date.trim() == date) return {}

        if(shiftObj.driverID.trim() == id) lastSeenIndex = i
    }
    const shiftDuration = getShiftDuration(shiftObj.startTime, shiftObj.endTime)
    const idleTime = getIdleTime(shiftObj.startTime, shiftObj.endTime)
    const activeTime = getActiveTime(shiftDuration, idleTime)
    const isQuotaMet = metQuota(shiftObj.date, activeTime)

    
    const newLine = `${shiftObj.driverID},${shiftObj.driverName},${shiftObj.date},${shiftObj.startTime},${shiftObj.endTime},${shiftDuration},${idleTime},${activeTime},${isQuotaMet},false`
    if(lastSeenIndex == -1) {
        content.push(newLine)
    }
    else {
        content.splice(lastSeenIndex + 1, 0, newLine)
    }

    fs.writeFileSync(textFile, content.join('\n'), 'utf8')

    return {
        driverID: shiftObj.driverID,
        driverName: shiftObj.driverName,
        date: shiftObj.date,
        startTime: shiftObj.startTime,
        endTime: shiftObj.endTime,
        shiftDuration: shiftDuration,
        idleTime: idleTime,
        activeTime: activeTime,
        metQuota: isQuotaMet,
        hasBonus: false
    }
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
    const content = fs.readFileSync(textFile, 'utf8').split('\n')
    for(let i = 0; i < content.length; i++) {
        const line = content[i].trim()
        
        if(line == "") continue;

        const cols = line.split(',')
        const id = cols[0].trim()
        const dateVal = cols[2].trim()

        if(driverID == id && dateVal == date) {
            const newLine = `${id},${cols[1].trim()},${dateVal},${cols[3].trim()},${cols[4].trim()},${cols[5].trim()},${cols[6].trim()},${cols[7].trim()},${cols[8].trim()},${newValue}`
            content[i] = newLine
            fs.writeFileSync(textFile, content.join('\n'), 'utf8')
            return
        }
    }
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    const content = fs.readFileSync(textFile, 'utf8').split('\n')
    let count = 0
    let found = false
    for(let i = 0; i < content.length; i++) {
        const line = content[i].trim()
        
        if(line == "") continue;

        const cols = line.split(',')
        const id = cols[0].trim()
        const monthVal = parseInt(cols[2].trim().split('-')[1])
        const hasBonus = cols[9].trim()

        if(driverID == id) {
            found = true
            if(parseInt(month) == monthVal && hasBonus.toLowerCase() == "true") count++
        }
    }
    return found ? count : -1
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
