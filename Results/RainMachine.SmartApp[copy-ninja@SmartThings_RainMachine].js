
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('refresh', delay);

    })

    .scheduledEventHandler('refresh', (context, event) => {
        
                log.info('refresh()')
                state.polling = ['last': this.now(), 'runNow': true]
                state.data = [:]
                this.updateDeviceData()
                this.pause(1000)
                this.pollAllChild()
            

	})
