
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('pollChildrenHandler', delay);

        context.api.schedules.schedule('checkBulbConnectionStatus', delay);

    })

    .scheduledEventHandler('pollChildrenHandler', (context, event) => {
        
                this.debug('Poll Children')
                this.getChildDevices().each({ 
                    it.poll()
                })
            

	})

    .scheduledEventHandler('checkBulbConnectionStatus', (context, event) => {
        
                this.debug('Check checkBulbConnectionStatus')
                let foundError = false
                let bulbWithErrors = []
                let dateLastError = null
                let today = new Date()
                if (state.lastError != 0) {
                    dateLastError = new Date(((long) state.lastError))
                }
                this.discoverBulbs()
                this.getBulbs().each({ let id, let it ->
                    if (!it.connected) {
                        foundError = true
                        bulbWithErrors << it.label
                    }
                })
                if (foundError) {
                    if (state.lastError == null || dateLastError.format('MM/dd') != today.format('MM/dd')) {
                        state.lastError = this.now()
                        this.debug('Send Notification')
                        try {
                            this.sendNotification('Following LIFX Bulb (' + bulbWithErrors.join(',') + ') are disconnected, please reboot them')
                        } 
                        catch (Exception e) {
                        } 
                    } else {
                        this.debug('Notification already sent today')
                    }
                } else {
                    state.lastError = 0
                }
            

	})
