
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('spsRefreshScheduler', delay);

    })

    .scheduledEventHandler('spsRefreshScheduler', (context, event) => {
        
                this.debug('Running scheduler - Revogi Smart Power Strip')
                let spsBridge = this.getChildDevices()?.find({ 
                    it.name == 'Revogi Smart Power Strip'
                })
                if (spsBridge) {
                    spsBridge.refresh()
                }
            

	})
