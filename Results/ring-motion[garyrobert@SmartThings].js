
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('disableMotion', (context, event) => {
        
                this.getAccessToken()
                this.disableZone()
                this.sendNotifications('Motion Zone 1 Disabled')
            

	})

    .subscribedEventHandler('enableMotion', (context, event) => {
        
                this.getAccessToken()
                this.enableZone()
                this.sendNotifications('Motion Zone 1 Enabled')
            

	})
