
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Switch to monitor', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.Off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.On', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("Received on from $theSwitch")
        if (location.mode != 'Sleeping') {
        this.setLocationMode('Sleeping')
        } else {
        console.log('Already Sleeping - ignoring')
        }
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log("Received off from $theSwitch")
        

	})
