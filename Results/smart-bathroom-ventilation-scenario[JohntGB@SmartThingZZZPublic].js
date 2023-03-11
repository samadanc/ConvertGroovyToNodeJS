
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('A_timeStart').name('Starting');
            section.timeSetting('A_timeEnd').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onEventA', (context, event) => {
        
        let humidityDelta = A_humidity && A_humidityDelta ? (A_humidityDelta as Integer) : 0
        let text = ''
        if (A_humidity) {
        state.humidityStartA = A_humidity.currentValue('humidity')
        state.humidityLimitA = state.humidityStartA + humidityDelta
        text = "Humidity starting value is ${state.humidityStartA}. Ventilation threshold is ${state.humidityLimitA}."
        }
        if (A_repoll) {
        console.log("Re-Polling in ${(A_repoll as int * 60)} seconds")
        this.runIn((A_repoll as int) * 60, 'rePoll')
        }
        console.log("Light turned on in ${app.label}. $text")
        if (!A_humidityDelta || A_humidityDelta == 0 && A_timeOn != 'null' && A_timeOn == 0) {
        this.turnOnA()
        }
        if (A_timeOn && A_timeOn > 0 && this.getDayOk(A_day) && !state.triggeredA && this.getTimeOk(A_timeStart, A_timeEnd)) {
        console.log("Ventilation will start in $timeOn minute(s)")
        this.runIn(timeOn * 60, 'turnOnA')
        }
        

	})

    .subscribedEventHandler('humidityHandlerA', (context, event) => {
        
        let currentHumidityA = (event.value as Integer)
        console.log("Humidity value is $currentHumidityA.")
        if (state.humidityLimitA && currentHumidityA > state.humidityLimitA) {
        this.turnOnA()
        }
        if (state.humidityStartA && currentHumidityA <= state.humidityStartA && state.A_runTime == 99) {
        this.turnOffA()
        }
        

	})

    .subscribedEventHandler('offEventA', (context, event) => {
        
        let currentHumidityA = ''
        let text = ''
        if (A_humidity) {
        currentHumidityA = A_humidity.currentValue('humidity')
        text = "Humidity value is $currentHumidityA."
        }
        console.log("Light turned off in '${app.label}'. $text")
        state.triggeredA = false
        if (state.A_runTime == 98) {
        this.turnOffA()
        }
        

	})

    .subscribedEventHandler('turnOffA', (context, event) => {
        
        console.log('Ventilation turned off.')
        A_fan?.off()
        this.unschedule()
        

	})

    .subscribedEventHandler('turnOnA', (context, event) => {
        
        if (!A_mode || A_mode.contains(location.mode) && this.getDayOk(A_day) && A_switch.currentValue('switch') == 'on' && !state.triggeredA && this.getTimeOk(A_timeStart, A_timeEnd)) {
        console.log('Ventilation turned on.')
        A_fan?.on()
        state.triggeredA = true
        if (state.A_runTime < 98) {
        console.log("Ventilation will be turned off in ${state.A_runTime} minutes.")
        this.unschedule()
        this.runIn(state.A_runTime * 60, 'turnOffA')
        }
        }
        

	})
