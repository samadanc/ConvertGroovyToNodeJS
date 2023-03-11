
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Door Sensor:', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('');

        });


        page.section('Which switch should we use to enable/disable the alarm?:', section => {
            section.deviceSetting('killSwitch').capability(['switch']).name('');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorSensor, 'contactSensor', 'contact.open', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if (event.value == 'open' && killSwitch.latestValue == 'on') {
        this.notify('JAILBREAK IN PROGRESS!')
        }
        

	})
