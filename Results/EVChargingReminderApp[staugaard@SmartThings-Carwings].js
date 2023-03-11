
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the car arrives', section => {
            section.deviceSetting('carPresence').capability(['presenceSensor']).name('');

        });


        page.section('Check the battery', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.carPresence, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (this.present()) {
        console.log('Checking battery in 5 minuttes')
        this.runIn(5 * 60, 'checkBattery')
        } else {
        console.log('The car left')
        state.leftAt = new Date().time
        }
        

	})
