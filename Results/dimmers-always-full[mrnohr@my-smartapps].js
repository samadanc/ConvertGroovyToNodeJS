
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Dimmer Switch(es)', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switchLevel', 'switch', 'onOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switchLevel', 'level', 'levelHandler')

    })

    .subscribedEventHandler('onOffHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'on') {
        console.log('Event was \'on\', going to set the level to 99')
        this.setSwitchToFull(evt)
        }
        

	})

    .subscribedEventHandler('levelHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value != '99') {
        console.log('Trying to adjust the level, resetting to 99')
        this.setSwitchToFull(evt)
        }
        

	})
