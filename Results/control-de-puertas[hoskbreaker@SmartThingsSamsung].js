
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('Puertas').capability(['contactSensor']).name('seleccione las puertas a usar');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.Puertas, 'contactSensor', 'contact', 'TimeHandler')

    })

    .subscribedEventHandler('TimeHandler', (context, event) => {
        
        this.runIn(10, DoorHandler)
        

	})
