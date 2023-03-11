
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handler', delay);

    })

    .scheduledEventHandler('handler', (context, event) => {
        
                console.log("handler executed at ${new Date()}")
                if (door.currentValue('door') == 'open') {
                    this.sendNotification("The $door is open.")
                }
            

	})
