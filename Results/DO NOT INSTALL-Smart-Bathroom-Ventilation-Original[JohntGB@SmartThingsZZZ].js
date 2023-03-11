
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('A_timeStart').name('Starting');
            section.timeSetting('A_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('B_timeStart').name('Starting');
            section.timeSetting('B_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('C_timeStart').name('Starting');
            section.timeSetting('C_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('D_timeStart').name('Starting');
            section.timeSetting('D_timeEnd').name('Ending');

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('humidityHandlerC', (context, event) => {
        
        let currentHumidityC = (event.value as Integer)
        console.log("Humidity value is $currentHumidityC in '$ScenarioNameC'.")
        if (state.humidityLimitC && currentHumidityC > state.humidityLimitC) {
        this.turnOnC()
        }
        if (state.humidityStartC && currentHumidityC <= state.humidityStartC && state.C_runTime == 99) {
        this.turnOffC()
        }
        

	})

    .subscribedEventHandler('offEventB', (context, event) => {
        
        let currentHumidityB = ''
        let text = ''
        if (B_humidity) {
        currentHumidityB = B_humidity.currentValue('humidity')
        text = "Humidity value is $currentHumidityB."
        }
        console.log("Light turned off in '$ScenarioNameB'. $text")
        state.triggeredB = false
        if (state.B_runTime == 98) {
        this.turnOffB()
        }
        

	})

    .subscribedEventHandler('turnOnA', (context, event) => {
        
        if (!A_mode || A_mode.contains(location.mode) && this.getDayOk(A_day) && A_switch.currentValue('switch') == 'on' && !state.triggeredA && this.getTimeOk(A_timeStart, A_timeEnd)) {
        console.log("Ventilation turned on in '$ScenarioNameA'.")
        A_fan?.on()
        state.triggeredA = true
        if (state.A_runTime < 98) {
        console.log("Ventilation will be turned off in ${state.A_runTime} minutes in '$ScenarioNameA'.")
        this.unschedule(turnOnA)
        this.runIn(state.A_runTime * 60, 'turnOffA')
        }
        }
        

	})

    .subscribedEventHandler('turnOffC', (context, event) => {
        
        console.log("Ventilation turned off in '$ScenarioNameC'.")
        C_fan?.off()
        this.unschedule(turnOffC)
        

	})

    .subscribedEventHandler('humidityHandlerA', (context, event) => {
        
        let currentHumidityA = (event.value as Integer)
        console.log("Humidity value is $currentHumidityA in '$ScenarioNameA'.")
        if (state.humidityLimitA && currentHumidityA > state.humidityLimitA) {
        this.turnOnA()
        }
        if (state.humidityStartA && currentHumidityA <= state.humidityStartA && state.A_runTime == 99) {
        this.turnOffA()
        }
        

	})

    .subscribedEventHandler('turnOnB', (context, event) => {
        
        if (!B_mode || B_mode.contains(location.mode) && this.getDayOk(B_day) && B_switch.currentValue('switch') == 'on' && !state.triggeredB && this.getTimeOk(B_timeStart, B_timeEnd)) {
        console.log("Ventilation turned on in '$ScenarioNameB'.")
        B_fan?.on()
        state.triggeredB = true
        if (state.B_runTime < 98) {
        console.log("Ventilation will be turned off in ${state.B_runTime} minutes in '$ScenarioNameB'.")
        this.unschedule(turnOnB)
        this.runIn(state.B_runTime * 60, 'turnOffB')
        }
        }
        

	})

    .subscribedEventHandler('turnOffD', (context, event) => {
        
        console.log("Ventilation turned off in '$ScenarioNameD'.")
        D_fan?.off()
        this.unschedule(turnOffD)
        

	})

    .subscribedEventHandler('turnOnC', (context, event) => {
        
        if (!C_mode || C_mode.contains(location.mode) && this.getDayOk(C_day) && C_switch.currentValue('switch') == 'on' && !state.triggeredC && this.getTimeOk(C_timeStart, C_timeEnd)) {
        console.log("Ventilation turned on in '$ScenarioNameC'.")
        C_fan?.on()
        state.triggeredC = true
        if (state.C_runTime < 98) {
        console.log("Ventilation will be turned off in ${state.C_runTime} minutes in '$ScenarioNameC'.")
        this.unschedule(turnOnC)
        this.runIn(state.C_runTime * 60, 'turnOffC')
        }
        }
        

	})

    .subscribedEventHandler('turnOnD', (context, event) => {
        
        if (!D_mode || D_mode.contains(location.mode) && this.getDayOk(D_day) && D_switch.currentValue('switch') == 'on' && !state.triggeredD && this.getTimeOk(D_timeStart, D_timeEnd)) {
        console.log("Ventilation turned on in '$ScenarioNameD'.")
        D_fan?.on()
        state.triggeredD = true
        if (state.D_runTime < 98) {
        console.log("Ventilation will be turned off in ${state.D_runTime} minutes in '$ScenarioNameD'.")
        this.unschedule(turnOnD)
        this.runIn(state.A_runTime * 60, 'turnOffD')
        }
        }
        

	})

    .subscribedEventHandler('onEventC', (context, event) => {
        
        let humidityDelta = C_humidity && C_humidityDelta ? (C_humidityDelta as Integer) : 0
        let text = ''
        if (C_humidity) {
        state.humidityStartC = C_humidity.currentValue('humidity')
        state.humidityLimitC = state.humidityStartC + humidityDelta
        text = "Humidity starting value is ${state.humidityStartC} in '$ScenarioNameC'. Ventilation threshold is ${state.humidityLimitC}."
        }
        console.log("Light turned on in $ScenarioNameC. $text")
        if (!C_humidityDelta || C_humidityDelta == 0 && C_timeOn != 'null' && C_timeOn == 0) {
        this.turnOnC()
        }
        if (C_timeOn && C_timeOn > 0 && this.getDayOk(C_day) && !state.triggeredC && this.getTimeOk(C_timeStart, C_timeEnd)) {
        let timeOn = (C_timeOn as Integer)
        console.log("Ventilation in '$ScenarioNameC' will start in $timeOn minute(s)")
        this.runIn(timeOn * 60, 'turnOnC')
        }
        

	})

    .subscribedEventHandler('onEventD', (context, event) => {
        
        let humidityDelta = D_humidity && D_humidityDelta ? (D_humidityDelta as Integer) : 0
        let text = ''
        if (D_humidity) {
        state.humidityStartD = D_humidity.currentValue('humidity')
        state.humidityLimitD = state.humidityStartA + humidityDelta
        text = "Humidity starting value is ${state.humidityStartD} in '$ScenarioNameD'. Ventilation threshold is ${state.humidityLimitD}."
        }
        console.log("Light turned on in $ScenarioNameD. $text")
        if (!D_humidityDelta || D_humidityDelta == 0 && D_timeOn != 'null' && D_timeOn == 0) {
        this.turnOnD()
        }
        if (D_timeOn && D_timeOn > 0 && this.getDayOk(D_day) && !state.triggeredD && this.getTimeOk(D_timeStart, D_timeEnd)) {
        let timeOn = (D_timeOn as Integer)
        console.log("Ventilation in '$ScenarioNameD' will start in $timeOn minute(s)")
        this.runIn(timeOn * 60, 'turnOnD')
        }
        

	})

    .subscribedEventHandler('offEventD', (context, event) => {
        
        let currentHumidityD = ''
        let text = ''
        if (D_humidity) {
        currentHumidityA = D_humidity.currentValue('humidity')
        text = "Humidity value is $currentHumidityD."
        }
        console.log("Light turned off in '$ScenarioNameD'. $text")
        state.triggeredD = false
        if (state.D_runTime == 98) {
        this.turnOffD()
        }
        

	})

    .subscribedEventHandler('onEventB', (context, event) => {
        
        let humidityDelta = B_humidity && B_humidityDelta ? (B_humidityDelta as Integer) : 0
        let text = ''
        if (B_humidity) {
        state.humidityStartB = B_humidity.currentValue('humidity')
        state.humidityLimitB = state.humidityStartB + humidityDelta
        text = "Humidity starting value is ${state.humidityStartB} in '$ScenarioNameB'. Ventilation threshold is ${state.humidityLimitB}."
        }
        console.log("Light turned on in $ScenarioNameB. $text")
        if (!B_humidityDelta || B_humidityDelta == 0 && B_timeOn != 'null' && B_timeOn == 0) {
        this.turnOnB()
        }
        if (B_timeOn && B_timeOn > 0 && this.getDayOk(B_day) && !state.triggeredB && this.getTimeOk(B_timeStart, B_timeEnd)) {
        let timeOn = (B_timeOn as Integer)
        console.log("Ventilation in '$ScenarioNameB' will start in $timeOn minute(s)")
        this.runIn(timeOn * 60, 'turnOnB')
        }
        

	})

    .subscribedEventHandler('offEventC', (context, event) => {
        
        let currentHumidityC = ''
        let text = ''
        if (C_humidity) {
        currentHumidityC = C_humidity.currentValue('humidity')
        text = "Humidity value is $currentHumidityC."
        }
        console.log("Light turned off in '$ScenarioNameC'. $text")
        state.triggeredC = false
        if (state.C_runTime == 98) {
        this.turnOffC()
        }
        

	})

    .subscribedEventHandler('humidityHandlerB', (context, event) => {
        
        let currentHumidityB = (event.value as Integer)
        console.log("Humidity value is $currentHumidityB in '$ScenarioNameB'.")
        if (state.humidityLimitB && currentHumidityB > state.humidityLimitB) {
        this.turnOnB()
        }
        if (state.humidityStartB && currentHumidityB <= state.humidityStartB && state.B_runTime == 99) {
        this.turnOffB()
        }
        

	})

    .subscribedEventHandler('offEventA', (context, event) => {
        
        let currentHumidityA = ''
        let text = ''
        if (A_humidity) {
        currentHumidityA = A_humidity.currentValue('humidity')
        text = "Humidity value is $currentHumidityA."
        }
        console.log("Light turned off in '$ScenarioNameA'. $text")
        state.triggeredA = false
        if (state.A_runTime == 98) {
        this.turnOffA()
        }
        

	})

    .subscribedEventHandler('turnOffA', (context, event) => {
        
        console.log("Ventilation turned off in '$ScenarioNameA'.")
        A_fan?.off()
        this.unschedule(turnOffA)
        

	})

    .subscribedEventHandler('turnOffB', (context, event) => {
        
        console.log("Ventilation turned off in '$ScenarioNameB'.")
        B_fan?.off()
        this.unschedule(turnOffB)
        

	})

    .subscribedEventHandler('humidityHandlerD', (context, event) => {
        
        let currentHumidityD = (event.value as Integer)
        console.log("Humidity value is $currentHumidityd in '$ScenarioNameD'.")
        if (state.humidityLimitD && currentHumidityD > state.humidityLimitD) {
        this.turnOnD()
        }
        if (state.humidityStartD && currentHumidityD <= state.humidityStartd && state.d_runTime == 99) {
        this.turnOffD()
        }
        

	})

    .subscribedEventHandler('onEventA', (context, event) => {
        
        let humidityDelta = A_humidity && A_humidityDelta ? (A_humidityDelta as Integer) : 0
        let text = ''
        if (A_humidity) {
        state.humidityStartA = A_humidity.currentValue('humidity')
        state.humidityLimitA = state.humidityStartA + humidityDelta
        text = "Humidity starting value is ${state.humidityStartA} in '$ScenarioNameA'. Ventilation threshold is ${state.humidityLimitA}."
        }
        console.log("Light turned on in $ScenarioNameA. $text")
        if (!A_humidityDelta || A_humidityDelta == 0 && A_timeOn != 'null' && A_timeOn == 0) {
        this.turnOnA()
        }
        if (A_timeOn && A_timeOn > 0 && this.getDayOk(A_day) && !state.triggeredA && this.getTimeOk(A_timeStart, A_timeEnd)) {
        let timeOn = (A_timeOn as Integer)
        console.log("Ventilation in '$ScenarioNameA' will start in $timeOn minute(s)")
        this.runIn(timeOn * 60, 'turnOnA')
        }
        

	})
