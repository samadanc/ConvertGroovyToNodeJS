
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkPeriodically', delay);

    })

    .scheduledEventHandler('checkPeriodically', (context, event) => {
        
                this.debug('[verisure.checkPeriodically] Periodic check from timer')
                try {
                    this.updateAlarmState()
                } 
                catch (Exception e) {
                    this.error('[verisure.checkPeriodically] Error updating alarm state', e)
                } 
            

	})
