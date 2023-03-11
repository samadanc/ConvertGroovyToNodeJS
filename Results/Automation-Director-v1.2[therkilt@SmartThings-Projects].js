
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('DoSleepNotSleeping', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Sleep.size(); i++) {
                        if (event.deviceId == Sleep[ i ].id) {
                            Changed = Sleep[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SleepNotSleeping${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SleepNotSleeping${event.deviceId}]}")
                        for (let i = 0; i < settings["SleepNotSleeping${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SleepNotSleeping${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoButtonPushed', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let buttonNumber = this.parseJson(event.data)?.buttonNumber
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Button.size(); i++) {
                        if (event.deviceId == Button[ i ].id) {
                            Changed = Button[ i ]
                            Number = i 
                        }
                    }
                    if (settings["${event.deviceId}Button$buttonNumberPush"]) {
                        for (let i = 0; i < settings["${event.deviceId}Button$buttonNumberPush"].size(); i++) {
                            SelectionArray[ i ] = settings["${event.deviceId}Button$buttonNumberPush"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoMotionInactive', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Motion.size(); i++) {
                        if (event.deviceId == Motion[ i ].id) {
                            Changed = Motion[ i ]
                            Number = i 
                        }
                    }
                    if (settings["MotionInactive${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[MotionInactive${event.deviceId}]}")
                        for (let i = 0; i < settings["MotionInactive${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["MotionInactive${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoButtonHeld', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let buttonNumber = this.parseJson(event.data)?.buttonNumber
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Button.size(); i++) {
                        if (event.deviceId == Button[ i ].id) {
                            Changed = Button[ i ]
                            Number = i 
                        }
                    }
                    if (settings["$NumberButton$buttonNumberHold"]) {
                        for (let i = 0; i < settings["${event.deviceId}Button$buttonNumberHold"].size(); i++) {
                            SelectionArray[ i ] = settings["${event.deviceId}Button$buttonNumberHold"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoCODetectorDetected', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < CODetector.size(); i++) {
                        if (event.deviceId == CODetector[ i ].id) {
                            Changed = CODetector[ i ]
                            Number = i 
                        }
                    }
                    if (settings["CODetectorDetected${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[CODetectorDetected${event.deviceId}]}")
                        for (let i = 0; i < settings["CODetectorDetected${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["CODetectorDetected${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoWaterWet', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Water.size(); i++) {
                        if (event.deviceId == Water[ i ].id) {
                            Changed = Water[ i ]
                            Number = i 
                        }
                    }
                    if (settings["WaterWet${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[WaterWet${event.deviceId}]}")
                        for (let i = 0; i < settings["WaterWet${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["WaterWet${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoPowerMeter', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < PowerMeter.size(); i++) {
                        if (event.deviceId == PowerMeter[ i ].id) {
                            Changed = PowerMeter[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('power')) as Integer)
                    if (settings["PowerMeterHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["PowerMeterHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["PowerMeterHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["PowerMeterHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["PowerMeterLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["PowerMeterLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["PowerMeterLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["PowerMeterLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllPowerMeterHighActions) {
                        java.lang.Integer HighSetting = (AllPowerMeterHighThreshold as Integer)
                        if (CurrentTemp > HighSetting ) {
                            for (let i = 0; i < AllPowerMeterHighActions.size(); i++) {
                                SelectionArray[ i ] = AllPowerMeterHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllPowerMeterLowActions) {
                        java.lang.Integer LowSetting = (AllPowerMeterLowThreshold as Integer)
                        if (CurrentTemp < LowSetting ) {
                            for (let i = 0; i < AllPowerMeterLowActions.size(); i++) {
                                SelectionArray[ i ] = AllPowerMeterLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoVoltage', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Voltage.size(); i++) {
                        if (event.deviceId == Voltage[ i ].id) {
                            Changed = Voltage[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('voltage')) as Integer)
                    if (settings["VoltageHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["VoltageHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["VoltageHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["VoltageHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["VoltageLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["VoltageLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["VoltageLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["VoltageLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllVoltageHighActions) {
                        java.lang.Integer HighSetting = (AllVoltageHighThreshold as Integer)
                        if (CurrentTemp > HighSetting ) {
                            for (let i = 0; i < AllVoltageHighActions.size(); i++) {
                                SelectionArray[ i ] = AllVoltageHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllVoltageLowActions) {
                        java.lang.Integer LowSetting = (AllVoltageLowThreshold as Integer)
                        if (CurrentTemp < LowSetting ) {
                            for (let i = 0; i < AllVoltageLowActions.size(); i++) {
                                SelectionArray[ i ] = AllVoltageLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DosoundPressureLevel', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < soundPressureLevel.size(); i++) {
                        if (event.deviceId == soundPressureLevel[ i ].id) {
                            Changed = soundPressureLevel[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('soundPressureLevel')) as Integer)
                    if (settings["soundPressureLevelHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["soundPressureLevelHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["soundPressureLevelHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["soundPressureLevelHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["soundPressureLevelLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["soundPressureLevelLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["soundPressureLevelLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["soundPressureLevelLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllsoundPressureLevelHighActions) {
                        java.lang.Integer HighSetting = (AllsoundPressureLevelHighThreshold as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < AllsoundPressureLevelHighActions.size(); i++) {
                                SelectionArray[ i ] = AllsoundPressureLevelHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllsoundPressureLevelLowActions) {
                        java.lang.Integer LowSetting = (AllsoundPressureLevelLowThreshold as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < AllsoundPressureLevelLowActions.size(); i++) {
                                SelectionArray[ i ] = AllsoundPressureLevelLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoAccelerationActive', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Acceleration.size(); i++) {
                        if (event.deviceId == Acceleration[ i ].id) {
                            Changed = Acceleration[ i ]
                            Number = i 
                        }
                    }
                    if (settings["AccelerationActive${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[AccelerationActive${event.deviceId}]}")
                        for (let i = 0; i < settings["AccelerationActive${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["AccelerationActive${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSmokeClear', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Smoke.size(); i++) {
                        if (event.deviceId == Smoke[ i ].id) {
                            Changed = Smoke[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SmokeClear${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SmokeClear${event.deviceId}]}")
                        for (let i = 0; i < settings["SmokeClear${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SmokeClear${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoStepGoal', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Step.size(); i++) {
                        if (event.deviceId == Step[ i ].id) {
                            Changed = Step[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('goal')) as Integer)
                    if (settings["StepGoalActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["StepGoal${event.deviceId}"]) as Integer)
                        if (Currentstate >= HighSetting ) {
                            for (let i = 0; i < settings["StepGoalActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["StepGoalActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllStepGoalActions) {
                        java.lang.Integer HighSetting = (AllStepGoalThreshold as Integer)
                        if (Currentstate >= HighSetting ) {
                            for (let i = 0; i < AllStepGoalActions.size(); i++) {
                                SelectionArray[ i ] = AllStepGoalActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoTamperDetected', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Tamper.size(); i++) {
                        if (event.deviceId == Tamper[ i ].id) {
                            Changed = Tamper[ i ]
                            Number = i 
                        }
                    }
                    if (settings["TamperDetected${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[TamperDetected${event.deviceId}]}")
                        for (let i = 0; i < settings["TamperDetected${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["TamperDetected${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoPowerSourceDC', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < PowerSource.size(); i++) {
                        if (event.deviceId == PowerSource[ i ].id) {
                            Changed = PowerSource[ i ]
                            Number = i 
                        }
                    }
                    if (settings["PowerSourceDC${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[PowerSourceDC${event.deviceId}]}")
                        for (let i = 0; i < settings["PowerSourceDC${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["PowerSourceDC${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoShadeOpen', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Shade.size(); i++) {
                        if (event.deviceId == Shade[ i ].id) {
                            Changed = Shade[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ShadeOpen${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ShadeOpen${event.deviceId}]}")
                        for (let i = 0; i < settings["ShadeOpen${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ShadeOpen${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoShadeUnknown', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Shade.size(); i++) {
                        if (event.deviceId == Shade[ i ].id) {
                            Changed = Shade[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ShadeUnknown${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ShadeUnknown${event.deviceId}]}")
                        for (let i = 0; i < settings["ShadeUnknown${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ShadeUnknown${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSmokeDetected', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Smoke.size(); i++) {
                        if (event.deviceId == Smoke[ i ].id) {
                            Changed = Smoke[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SmokeDetected${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SmokeDetected${event.deviceId}]}")
                        for (let i = 0; i < settings["SmokeDetected${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SmokeDetected${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoBattery', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Battery.size(); i++) {
                        if (event.deviceId == Battery[ i ].id) {
                            Changed = Battery[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('battery')) as Integer)
                    if (settings["BatteryLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["BatteryLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            if (SendBatteryPush) {
                                this.sendPush("$Changed battery level is $Currentstate which is below the threshold you have set")
                            }
                            if (SendBatterySMSPhone != null) {
                                if (SendBatterySMSPhone.indexOf(';') > 1) {
                                    let SendBatterySMSPhone = SendBatterySMSPhone.split(';')
                                    for (let i = 0; i < SendBatterySMSPhone.size(); i++) {
                                        console.log("Sending an SMS to ${SendBatterySMSPhone[i]}")
                                        this.sendSms(((SendBatterySMSPhone[ i ]) as String), SMSMessage ? SMSMessage : 'Siren & Strobe activated')
                                    }
                                } else {
                                    console.log("Sending an SMS to $SendBatterySMSPhone")
                                    this.sendSms((SendBatterySMSPhone as String), "$Changed battery level is $Currentstate which is below the threshold you have set")
                                }
                            }
                            for (let i = 0; i < settings["BatteryLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["BatteryLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllBatteryLowActions) {
                        java.lang.Integer LowSetting = (AllBatteryLowThreshold as Integer)
                        if (Currentstate < LowSetting ) {
                            if (SendBatteryPush) {
                                this.sendPush("$Changed battery level is $Currentstate which is below the threshold you have set")
                            }
                            if (SendBatterySMSPhone != null) {
                                if (SendBatterySMSPhone.indexOf(';') > 1) {
                                    let SendBatterySMSPhone = SendBatterySMSPhone.split(';')
                                    for (let i = 0; i < SendBatterySMSPhone.size(); i++) {
                                        console.log("Sending an SMS to ${SendBatterySMSPhone[i]}")
                                        this.sendSms(((SendBatterySMSPhone[ i ]) as String), SMSMessage ? SMSMessage : 'Siren & Strobe activated')
                                    }
                                } else {
                                    console.log("Sending an SMS to $SendBatterySMSPhone")
                                    this.sendSms((SendBatterySMSPhone as String), "$Changed battery level is $Currentstate which is below the threshold you have set")
                                }
                            }
                            for (let i = 0; i < AllBatteryLowActions.size(); i++) {
                                SelectionArray[ i ] = AllBatteryLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoPowerSourceUnknown', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < PowerSource.size(); i++) {
                        if (event.deviceId == PowerSource[ i ].id) {
                            Changed = PowerSource[ i ]
                            Number = i 
                        }
                    }
                    if (settings["PowerSourceUnknown${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[PowerSourceUnknown${event.deviceId}]}")
                        for (let i = 0; i < settings["PowerSourceUnknown${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["PowerSourceUnknown${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoShockDetected', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Shock.size(); i++) {
                        if (event.deviceId == Shock[ i ].id) {
                            Changed = Shock[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ShockDetected${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ShockDetected${event.deviceId}]}")
                        for (let i = 0; i < settings["ShockDetected${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ShockDetected${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoCODetectorClear', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < CODetector.size(); i++) {
                        if (event.deviceId == CODetector[ i ].id) {
                            Changed = CODetector[ i ]
                            Number = i 
                        }
                    }
                    if (settings["CODetectorClear${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[CODetectorClear${event.deviceId}]}")
                        for (let i = 0; i < settings["CODetectorClear${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["CODetectorClear${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSoundDetected', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Sound.size(); i++) {
                        if (event.deviceId == Sound[ i ].id) {
                            Changed = Sound[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SoundDetected${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SoundDetected${event.deviceId}]}")
                        for (let i = 0; i < settings["SoundDetected${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SoundDetected${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoBeaconNotPresent', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Beacon.size(); i++) {
                        if (event.deviceId == Beacon[ i ].id) {
                            Changed = Beacon[ i ]
                            Number = i 
                        }
                    }
                    if (settings["BeaconNotPresent${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[BeaconNotPresent${event.deviceId}]}")
                        for (let i = 0; i < settings["BeaconNotPresent${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["BeaconNotPresent${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                    if (settings['BeaconAllAway']) {
                        java.lang.Boolean AllAway = true
                        Beacon.each({ 
                            if (it.currentValue('presence') == 'present') {
                                AllAway = false
                            }
                        })
                        if (AllAway) {
                            console.log("Device that triggered the event: ${Changed.displayName} | Number = $Number | Actions = $BeaconAllAway")
                            for (let i = 0; i < BeaconAllAway.size(); i++) {
                                SelectionArray[ i ] = BeaconAllAway[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoDoorOpen', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Door.size(); i++) {
                        if (event.deviceId == Door[ i ].id) {
                            Changed = Door[ i ]
                            Number = i 
                        }
                    }
                    if (settings["DoorOpen${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[DoorOpen${event.deviceId}]}")
                        for (let i = 0; i < settings["DoorOpen${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["DoorOpen${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoEnergyMeter', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < EnergyMeter.size(); i++) {
                        if (event.deviceId == EnergyMeter[ i ].id) {
                            Changed = EnergyMeter[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('energy')) as Integer)
                    if (settings["EnergyMeterHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["EnergyMeterHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["EnergyMeterHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["EnergyMeterHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["EnergyMeterLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["EnergyMeterLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["EnergyMeterLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["EnergyMeterLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllEnergyMeterHighActions) {
                        java.lang.Integer HighSetting = (AllEnergyMeterHighThreshold as Integer)
                        if (CurrentTemp > HighSetting ) {
                            for (let i = 0; i < AllEnergyMeterHighActions.size(); i++) {
                                SelectionArray[ i ] = AllEnergyMeterHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllEnergyMeterLowActions) {
                        java.lang.Integer LowSetting = (AllEnergyMeterLowThreshold as Integer)
                        if (CurrentTemp < LowSetting ) {
                            for (let i = 0; i < AllEnergyMeterLowActions.size(); i++) {
                                SelectionArray[ i ] = AllEnergyMeterLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoCO2Measurement', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < CO2Measurement.size(); i++) {
                        if (event.deviceId == CO2Measurement[ i ].id) {
                            Changed = CO2Measurement[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('carbonDioxide')) as Integer)
                    if (settings["CO2MeasurementHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["CO2MeasurementHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["CO2MeasurementHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["CO2MeasurementHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllCO2MeasurementHighActions) {
                        java.lang.Integer HighSetting = (AllCO2MeasurementHighThreshold as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < AllCO2MeasurementHighActions.size(); i++) {
                                SelectionArray[ i ] = AllCO2MeasurementHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoBeaconPresent', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Beacon.size(); i++) {
                        if (event.deviceId == Beacon[ i ].id) {
                            Changed = Beacon[ i ]
                            Number = i 
                        }
                    }
                    if (settings["BeaconPresent${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[BeaconPresent${event.deviceId}]}")
                        for (let i = 0; i < settings["BeaconPresent${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["BeaconPresent${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoPowerSourceMains', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < PowerSource.size(); i++) {
                        if (event.deviceId == PowerSource[ i ].id) {
                            Changed = PowerSource[ i ]
                            Number = i 
                        }
                    }
                    if (settings["PowerSourceMains${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[PowerSourceMains${event.deviceId}]}")
                        for (let i = 0; i < settings["PowerSourceMains${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["PowerSourceMains${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoShockClear', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Shock.size(); i++) {
                        if (event.deviceId == Shock[ i ].id) {
                            Changed = Shock[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ShockClear${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ShockClear${event.deviceId}]}")
                        for (let i = 0; i < settings["ShockClear${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ShockClear${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoContactOpen', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Contact.size(); i++) {
                        if (event.deviceId == Contact[ i ].id) {
                            Changed = Contact[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ContactOpen${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} | Number = $Number | Actions = ${settings[ContactOpen${event.deviceId}]}")
                        for (let i = 0; i < settings["ContactOpen${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ContactOpen${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DophMeasurement', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < phMeasurement.size(); i++) {
                        if (event.deviceId == phMeasurement[ i ].id) {
                            Changed = phMeasurement[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('phMeasurement')) as Integer)
                    if (settings["phMeasurementHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["phMeasurementHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["phMeasurementHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["phMeasurementHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["phMeasurementLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["phMeasurementLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["phMeasurementLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["phMeasurementLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllphMeasurementHighActions) {
                        java.lang.Integer HighSetting = (AllphMeasurementHighThreshold as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < AllphMeasurementHighActions.size(); i++) {
                                SelectionArray[ i ] = AllphMeasurementHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllphMeasurementLowActions) {
                        java.lang.Integer LowSetting = (AllphMeasurementLowThreshold as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < AllphMeasurementLowActions.size(); i++) {
                                SelectionArray[ i ] = AllphMeasurementLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSmokeTested', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Smoke.size(); i++) {
                        if (event.deviceId == Smoke[ i ].id) {
                            Changed = Smoke[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SmokeTested${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SmokeTested${event.deviceId}]}")
                        for (let i = 0; i < settings["SmokeTested${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SmokeTested${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoValveClosed', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Valve.size(); i++) {
                        if (event.deviceId == Valve[ i ].id) {
                            Changed = Valve[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ValveClosed${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ValveClosed${event.deviceId}]}")
                        for (let i = 0; i < settings["ValveClosed${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ValveClosed${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoShadeClosed', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Shade.size(); i++) {
                        if (event.deviceId == Shade[ i ].id) {
                            Changed = Shade[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ShadeClosed${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ShadeClosed${event.deviceId}]}")
                        for (let i = 0; i < settings["ShadeClosed${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ShadeClosed${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoShadePartiallyOpen', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Shade.size(); i++) {
                        if (event.deviceId == Shade[ i ].id) {
                            Changed = Shade[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ShadePartiallyOpen${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ShadePartiallyOpen${event.deviceId}]}")
                        for (let i = 0; i < settings["ShadePartiallyOpen${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ShadePartiallyOpen${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoTouched', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Touch.size(); i++) {
                        if (event.deviceId == Touch[ i ].id) {
                            Changed = Touch[ i ]
                            Number = i 
                        }
                    }
                    if (settings["Touched${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[Touched${event.deviceId}]}")
                        for (let i = 0; i < settings["Touched${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["Touched${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoDoorUnknown', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Door.size(); i++) {
                        if (event.deviceId == Door[ i ].id) {
                            Changed = Door[ i ]
                            Number = i 
                        }
                    }
                    if (settings["DoorUnknown${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[DoorUnknown${event.deviceId}]}")
                        for (let i = 0; i < settings["DoorUnknown${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["DoorUnknown${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSwitchOn', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Switch.size(); i++) {
                        if (event.deviceId == Switch[ i ].id) {
                            Changed = Switch[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SwitchOn${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SwitchOn${event.deviceId}]}")
                        for (let i = 0; i < settings["SwitchOn${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SwitchOn${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoStep', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Step.size(); i++) {
                        if (event.deviceId == Step[ i ].id) {
                            Changed = Step[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('steps')) as Integer)
                    if (settings["StepHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["StepHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["StepHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["StepHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["StepLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["StepLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["StepLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["StepLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllStepHighActions) {
                        java.lang.Integer HighSetting = (AllStepHighThreshold as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < AllStepHighActions.size(); i++) {
                                SelectionArray[ i ] = AllStepHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllStepLowActions) {
                        java.lang.Integer LowSetting = (AllStepLowThreshold as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < AllStepLowActions.size(); i++) {
                                SelectionArray[ i ] = AllStepLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoUltravioletIndex', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < UltravioletIndex.size(); i++) {
                        if (event.deviceId == UltravioletIndex[ i ].id) {
                            Changed = UltravioletIndex[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('ultravioletIndex')) as Integer)
                    if (settings["UltravioletIndexHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["UltravioletIndexHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["UltravioletIndexHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["UltravioletIndexHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["UltravioletIndexLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["UltravioletIndexLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["UltravioletIndexLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["UltravioletIndexLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllUltravioletIndexHighActions) {
                        java.lang.Integer HighSetting = (AllUltravioletIndexHighThreshold as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < AllUltravioletIndexHighActions.size(); i++) {
                                SelectionArray[ i ] = AllUltravioletIndexHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllUltravioletIndexLowActions) {
                        java.lang.Integer LowSetting = (AllUltravioletIndexLowThreshold as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < AllUltravioletIndexLowActions.size(); i++) {
                                SelectionArray[ i ] = AllUltravioletIndexLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoHumidity', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Humidity.size(); i++) {
                        if (event.deviceId == Humidity[ i ].id) {
                            Changed = Humidity[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('humidity')) as Integer)
                    if (settings["HumidityHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["HumidityHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["HumidityHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["HumidityHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["HumidityLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["HumidityLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["HumidityLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["HumidityLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllHumidityHighActions) {
                        java.lang.Integer HighSetting = (AllHumidityHighThreshold as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < AllHumidityHighActions.size(); i++) {
                                SelectionArray[ i ] = AllHumidityHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllHumidityLowActions) {
                        java.lang.Integer LowSetting = (AllHumidityLowThreshold as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < AllHumidityLowActions.size(); i++) {
                                SelectionArray[ i ] = AllHumidityLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSleepSleeping', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Sleep.size(); i++) {
                        if (event.deviceId == Sleep[ i ].id) {
                            Changed = Sleep[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SleepSleeping${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SleepSleeping${event.deviceId}]}")
                        for (let i = 0; i < settings["SleepSleeping${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SleepSleeping${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoAccelerationInactive', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Acceleration.size(); i++) {
                        if (event.deviceId == Acceleration[ i ].id) {
                            Changed = Acceleration[ i ]
                            Number = i 
                        }
                    }
                    if (settings["AccelerationInactive${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[AccelerationInactive${event.deviceId}]}")
                        for (let i = 0; i < settings["AccelerationInactive${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["AccelerationInactive${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoPresenceNotPresent', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Presence.size(); i++) {
                        if (event.deviceId == Presence[ i ].id) {
                            Changed = Presence[ i ]
                            Number = i 
                        }
                    }
                    if (settings["PresenceNotPresent${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} | Number = $Number | Actions = ${settings[PresenceNotPresent${event.deviceId}]}")
                        for (let i = 0; i < settings["PresenceNotPresent${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["PresenceNotPresent${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                    if (settings['PresenceAllAway']) {
                        java.lang.Boolean AllAway = true
                        Presence.each({ 
                            if (it.currentValue('presence') == 'present') {
                                AllAway = false
                            }
                        })
                        if (AllAway) {
                            console.log("Device that triggered the event: ${Changed.displayName} | Number = $Number | Actions = $PresenceAllAway")
                            for (let i = 0; i < PresenceAllAway.size(); i++) {
                                SelectionArray[ i ] = PresenceAllAway[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoTemperature', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Temperature.size(); i++) {
                        if (event.deviceId == Temperature[ i ].id) {
                            Changed = Temperature[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer CurrentTemp = ((Changed.currentValue('temperature')) as Integer)
                    if (settings["HighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["HighThreshold${event.deviceId}"]) as Integer)
                        if (CurrentTemp > HighSetting ) {
                            for (let i = 0; i < settings["HighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["HighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["LowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["LowThreshold${event.deviceId}"]) as Integer)
                        if (CurrentTemp < LowSetting ) {
                            for (let i = 0; i < settings["LowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["LowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllHighActions) {
                        java.lang.Integer HighSetting = (AllHighThreshold as Integer)
                        if (CurrentTemp > HighSetting ) {
                            for (let i = 0; i < AllHighActions.size(); i++) {
                                SelectionArray[ i ] = AllHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllLowActions) {
                        java.lang.Integer LowSetting = (AllLowThreshold as Integer)
                        if (CurrentTemp < LowSetting ) {
                            for (let i = 0; i < AllLowActions.size(); i++) {
                                SelectionArray[ i ] = AllLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoValveOpen', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Valve.size(); i++) {
                        if (event.deviceId == Valve[ i ].id) {
                            Changed = Valve[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ValveOpen${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ValveOpen${event.deviceId}]}")
                        for (let i = 0; i < settings["ValveOpen${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ValveOpen${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoIlluminance', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Illuminance.size(); i++) {
                        if (event.deviceId == Illuminance[ i ].id) {
                            Changed = Illuminance[ i ]
                            Number = i 
                        }
                    }
                    java.lang.Integer Currentstate = ((Changed.currentValue('illuminance')) as Integer)
                    if (settings["IlluminanceHighActions${event.deviceId}"]) {
                        java.lang.Integer HighSetting = ((settings["IlluminanceHighThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < settings["IlluminanceHighActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["IlluminanceHighActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (settings["IlluminanceLowActions${event.deviceId}"]) {
                        java.lang.Integer LowSetting = ((settings["IlluminanceLowThreshold${event.deviceId}"]) as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < settings["IlluminanceLowActions${event.deviceId}"].size(); i++) {
                                SelectionArray[ i ] = settings["IlluminanceLowActions${event.deviceId}"][ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllIlluminanceHighActions) {
                        java.lang.Integer HighSetting = (AllIlluminanceHighThreshold as Integer)
                        if (Currentstate > HighSetting ) {
                            for (let i = 0; i < AllIlluminanceHighActions.size(); i++) {
                                SelectionArray[ i ] = AllIlluminanceHighActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                    if (AllIlluminanceLowActions) {
                        java.lang.Integer LowSetting = (AllIlluminanceLowThreshold as Integer)
                        if (Currentstate < LowSetting ) {
                            for (let i = 0; i < AllIlluminanceLowActions.size(); i++) {
                                SelectionArray[ i ] = AllIlluminanceLowActions[ i ].tokenize(':')
                                console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                                this.SwitchSelection(SelectionArray[ i ])
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoMotionActive', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Motion.size(); i++) {
                        if (event.deviceId == Motion[ i ].id) {
                            Changed = Motion[ i ]
                            Number = i 
                        }
                    }
                    if (settings["MotionActive${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[MotionActive${event.deviceId}]}")
                        for (let i = 0; i < settings["MotionActive${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["MotionActive${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSoundNotDetected', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Sound.size(); i++) {
                        if (event.deviceId == Sound[ i ].id) {
                            Changed = Sound[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SoundNotDetected${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SoundNotDetected${event.deviceId}]}")
                        for (let i = 0; i < settings["SoundNotDetected${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SoundNotDetected${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoPresencePresent', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Presence.size(); i++) {
                        if (event.deviceId == Presence[ i ].id) {
                            Changed = Presence[ i ]
                            Number = i 
                        }
                    }
                    if (settings["PresencePresent${event.deviceId}"]) {
                        console.log("Found the device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[PresencePresent${event.deviceId}]}")
                        for (let i = 0; i < settings["PresencePresent${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["PresencePresent${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoPowerSourceBattery', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < PowerSource.size(); i++) {
                        if (event.deviceId == PowerSource[ i ].id) {
                            Changed = PowerSource[ i ]
                            Number = i 
                        }
                    }
                    if (settings["PowerSourceBattery${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[PowerSourceBattery${event.deviceId}]}")
                        for (let i = 0; i < settings["PowerSourceBattery${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["PowerSourceBattery${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoSwitchOff', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Switch.size(); i++) {
                        if (event.deviceId == Switch[ i ].id) {
                            Changed = Switch[ i ]
                            Number = i 
                        }
                    }
                    if (settings["SwitchOff${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[SwitchOff${event.deviceId}]}")
                        for (let i = 0; i < settings["SwitchOff${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["SwitchOff${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoDoorClosed', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Door.size(); i++) {
                        if (event.deviceId == Door[ i ].id) {
                            Changed = Door[ i ]
                            Number = i 
                        }
                    }
                    if (settings["DoorClosed${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[DoorClosed${event.deviceId}]}")
                        for (let i = 0; i < settings["DoorClosed${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["DoorClosed${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoCODetectorTested', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < CODetector.size(); i++) {
                        if (event.deviceId == CODetector[ i ].id) {
                            Changed = CODetector[ i ]
                            Number = i 
                        }
                    }
                    if (settings["CODetectorTested${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[CODetectorTested${event.deviceId}]}")
                        for (let i = 0; i < settings["CODetectorTested${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["CODetectorTested${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoTamperClear', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Tamper.size(); i++) {
                        if (event.deviceId == Tamper[ i ].id) {
                            Changed = Tamper[ i ]
                            Number = i 
                        }
                    }
                    if (settings["TamperClear${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[TamperClear${event.deviceId}]}")
                        for (let i = 0; i < settings["TamperClear${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["TamperClear${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoContactClosed', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Contact.size(); i++) {
                        if (event.deviceId == Contact[ i ].id) {
                            Changed = Contact[ i ]
                            Number = i 
                        }
                    }
                    if (settings["ContactClosed${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[ContactClosed${event.deviceId}]}")
                        for (let i = 0; i < settings["ContactClosed${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["ContactClosed${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('DoWaterDry', (context, event) => {
        
                if (allOk && this.CurrentIlluminance() && this.CurrentContact() && this.CurrentSwitch() && this.CurrentAcceleration() && this.CurrentMotion() && this.CurrentTamper() && this.CurrentShock() && this.CurrentSleep() && this.CurrentSound() && this.CurrentWater() && this.CurrentBeacon() && this.CurrentPresence() && this.CurrentCODetector() && this.CurrentSmoke() && this.CurrentPowerSource() && this.CurrentDoor() && this.CurrentValve() && this.CurrentShade() && this.CurrentTemperature() && this.CurrentPowerMeter() && this.CurrentVoltage() && this.CurrentEnergyMeter() && this.CurrentCO2Measurement() && this.CurrentHumidity() && this.CurrentUltravioletIndex() && this.CurrentphMeasurement() && this.CurrentsoundPressureLevel()) {
                    let Changed 
                    let Number 
                    let SelectionArray = [][[]]
                    for (let i = 0; i < Water.size(); i++) {
                        if (event.deviceId == Water[ i ].id) {
                            Changed = Water[ i ]
                            Number = i 
                        }
                    }
                    if (settings["WaterDry${event.deviceId}"]) {
                        console.log("Device that triggered the event: ${Changed.displayName} Number = $Number | Actions = ${settings[WaterDry${event.deviceId}]}")
                        for (let i = 0; i < settings["WaterDry${event.deviceId}"].size(); i++) {
                            SelectionArray[ i ] = settings["WaterDry${event.deviceId}"][ i ].tokenize(':')
                            console.log("DeviceType = ${SelectionArray[i][0]},Device = ${SelectionArray[i][1]},Action = ${SelectionArray[i][2]}")
                            this.SwitchSelection(SelectionArray[ i ])
                        }
                    }
                }
            

	})
