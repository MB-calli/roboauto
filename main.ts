function Linkskurve () {
    motors.dualMotorPower(Motor.AB, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.A, 90)
    Dreh = 0
    I = 0
    Ialt = 0
    while (Dreh < 36) {
        I = pins.digitalReadPin(DigitalPin.C10)
        if (I != Ialt) {
            Ialt = I
            Dreh += 1
            basic.pause(10)
        }
    }
    motors.dualMotorPower(Motor.A, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.A, SpeedA)
    motors.dualMotorPower(Motor.B, SpeedB)
}
function Rechtskurve () {
    motors.dualMotorPower(Motor.AB, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.B, 90)
    Dreh = 0
    I = 0
    Ialt = 0
    while (Dreh < 36) {
        I = pins.digitalReadPin(DigitalPin.C11)
        if (I != Ialt) {
            Ialt = I
            Dreh += 1
            basic.pause(10)
        }
    }
    motors.dualMotorPower(Motor.B, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.A, SpeedA)
    motors.dualMotorPower(Motor.B, SpeedB)
}
function Kreis2 () {
    motors.dualMotorPower(Motor.AB, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.A, 90)
    Dreh = 0
    I = 0
    Ialt = 0
    while (Dreh < 154) {
        I = pins.digitalReadPin(DigitalPin.C10)
        if (I != Ialt) {
            Ialt = I
            Dreh += 1
            basic.pause(10)
        }
    }
    motors.dualMotorPower(Motor.A, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.A, SpeedA)
    motors.dualMotorPower(Motor.B, SpeedB)
}
function Umdrehen () {
    motors.dualMotorPower(Motor.AB, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.B, 90)
    Dreh = 0
    I = 0
    Ialt = 0
    while (Dreh < 72) {
        I = pins.digitalReadPin(DigitalPin.C11)
        if (I != Ialt) {
            Ialt = I
            Dreh += 1
            basic.pause(10)
        }
    }
    motors.dualMotorPower(Motor.B, 0)
    basic.pause(200)
    motors.dualMotorPower(Motor.A, SpeedA)
    motors.dualMotorPower(Motor.B, SpeedB)
}
let ZeitB = 0
let tB = 0
let ZeitA = 0
let tA = 0
let ID2 = 0
let ID = 0
let Ialt = 0
let I = 0
let Dreh = 0
let SpeedB = 0
let SpeedA = 0
let ID1 = 0
basic.clearScreen()
let Flag2 = 0
let Flag = 0
MFRC522.Init(
DigitalPin.C9,
DigitalPin.C8,
DigitalPin.C7,
DigitalPin.C6
)
motors.dualMotorPower(Motor.AB, 0)
while (Flag == 0) {
    ID1 = MFRC522.testID()
    ID1 = parseFloat(convertToText(ID1).substr(convertToText(ID1).length - 1, 1))
    if (ID1 == 3) {
        Flag = 1
    }
}
basic.setLedColor(0xff0000)
basic.pause(1000)
basic.setLedColor(0xffff00)
basic.pause(1000)
basic.setLedColor(0x00ff00)
let Licht = 0
let max = 90
let min = 60
let Zeit = min
SpeedA = 95
SpeedB = 95
motors.dualMotorPower(Motor.A, SpeedA)
motors.dualMotorPower(Motor.B, SpeedB)
pins.setPull(DigitalPin.C10, PinPullMode.PullUp)
pins.setPull(DigitalPin.C11, PinPullMode.PullUp)
Flag2 = 1
basic.forever(function () {
    ID = MFRC522.testID()
    if (ID > 10) {
        ID = parseFloat(convertToText(ID).substr(convertToText(ID).length - 1, 1))
        if (ID == 2 || ID == 5) {
            Flag2 = 0
            Linkskurve()
            Flag2 = 1
        } else if (ID == 4 || ID == 7) {
            Flag2 = 0
            Rechtskurve()
            Flag2 = 1
        } else if (ID == 6) {
            Flag2 = 0
            Umdrehen()
            Flag2 = 1
        } else if (ID == 0) {
            Flag2 = 0
            Kreis2()
            Flag2 = 1
        } else if (ID == 1) {
            if (Zeit == max) {
                Zeit = min
                SpeedA = 95
                SpeedB = 95
                basic.pause(500)
            } else {
                Zeit = max
                SpeedA = 80
                SpeedB = 80
                basic.pause(500)
            }
        } else if (ID == 8) {
            if (Licht == 0) {
                Licht = 1
                pins.digitalWritePin(DigitalPin.P0, 1)
                basic.pause(500)
            } else {
                Licht = 0
                pins.digitalWritePin(DigitalPin.P0, 0)
                basic.pause(500)
            }
        } else if (ID == 9) {
            Flag2 = 0
            Licht = 0
            pins.digitalWritePin(DigitalPin.P0, 0)
            basic.setLedColor(0xff0000)
            motors.dualMotorPower(Motor.A, 0)
            motors.dualMotorPower(Motor.B, 0)
            Flag = 0
            while (Flag == 0) {
                ID2 = MFRC522.testID()
                ID2 = parseFloat(convertToText(ID2).substr(convertToText(ID2).length - 1, 1))
                if (ID2 == 3) {
                    Flag = 1
                }
            }
            basic.setLedColor(0xff0000)
            basic.pause(1000)
            basic.setLedColor(0xffff00)
            basic.pause(1000)
            basic.setLedColor(0x00ff00)
            Flag2 = 1
            motors.dualMotorPower(Motor.A, SpeedA)
            motors.dualMotorPower(Motor.B, SpeedB)
        }
    }
})
basic.forever(function () {
    if (Flag2 == 1) {
        if (pins.digitalReadPin(DigitalPin.C10) == 0) {
            while (pins.digitalReadPin(DigitalPin.C10) == 0) {
                control.waitMicros(4)
            }
            if (pins.digitalReadPin(DigitalPin.C10) == 1) {
                tA = control.millis()
                while (pins.digitalReadPin(DigitalPin.C10) == 1) {
                    control.waitMicros(4)
                }
                if (pins.digitalReadPin(DigitalPin.C10) == 0) {
                    while (pins.digitalReadPin(DigitalPin.C10) == 0) {
                        control.waitMicros(4)
                    }
                    if (pins.digitalReadPin(DigitalPin.C10) == 1) {
                        ZeitA = control.millis() - tA
                        if (ZeitA < Zeit) {
                            SpeedA += -2
                        } else {
                            if (SpeedA < 100) {
                                SpeedA += 2
                            }
                        }
                        motors.dualMotorPower(Motor.A, SpeedA)
                    }
                }
            }
        }
        if (pins.digitalReadPin(DigitalPin.C11) == 0) {
            while (pins.digitalReadPin(DigitalPin.C11) == 0) {
                control.waitMicros(4)
            }
            if (pins.digitalReadPin(DigitalPin.C11) == 1) {
                tB = control.millis()
                while (pins.digitalReadPin(DigitalPin.C11) == 1) {
                    control.waitMicros(4)
                }
                if (pins.digitalReadPin(DigitalPin.C11) == 0) {
                    while (pins.digitalReadPin(DigitalPin.C11) == 0) {
                        control.waitMicros(4)
                    }
                    if (pins.digitalReadPin(DigitalPin.C11) == 1) {
                        ZeitB = control.millis() - tB
                        if (ZeitB < Zeit) {
                            SpeedB += -2
                        } else {
                            if (SpeedA < 100) {
                                SpeedB += 2
                            }
                        }
                        motors.dualMotorPower(Motor.B, SpeedB)
                    }
                }
            }
        }
    }
})
