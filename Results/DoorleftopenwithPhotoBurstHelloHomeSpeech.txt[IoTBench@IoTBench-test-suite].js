
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onContactChange', (context, event) => {
        
                console.log('onContactChange')
                if (event.value == 'open') {
                    state.count = 0
                    state.maxrepeat = 10
                    this.runIn(numMinutes * 60, onContactLeftOpenHandler)
                } else {
                    this.unschedule(onContactLeftOpenHandler)
                    if (runHHAction && state.count > 0 && !(settings.hhactionOnAlertClear == null)) {
                        location.helloHome.execute(settings.hhactionOnAlertClear)
                    }
                    state.count = 0
                }
            

	})
