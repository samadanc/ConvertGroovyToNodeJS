
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Door to monitor:', section => {
            section.deviceSetting('thedoor').capability(['garageDoorControl']).name('Door?');

        });


        page.section('Close when door has been open for:', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thedoor, 'garageDoorControl', 'door.open', 'doorOpenedHandler')

    })

    .subscribedEventHandler('doorOpenedHandler', (context, event) => {
        
        console.log("doorOpenedHandler called: $evt")
        this.runIn(minutes * 60 + 10, checkDoor)
        

	})
