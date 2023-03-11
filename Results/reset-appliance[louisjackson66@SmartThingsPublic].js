
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('handlerMethod', delay);

        context.api.schedules.schedule('handlerMethod', delay);

        context.api.schedules.runEvery1Hour('handlerMethod', delay);

        context.api.schedules.runEvery3Hours('handlerMethod', delay);

        context.api.schedules.runEvery15Minutes('handlerMethod', delay);

    })

    .scheduledEventHandler('handlerMethod', (context, event) => {
        
                log.trace("(0E) - ${app.label} - $settings")
                for (let SwitchDeviceOff : switch1 ) {
                    log.info("(0F) - Turning OFF ${SwitchDeviceOff.label}")
                    SwitchDeviceOff.off()
                }
                this.runIn(seconds1, turnOnSwitch)
            

	})
