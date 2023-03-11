
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the devices', section => {
            section.deviceSetting('contacts1').capability(['contactSensor']).name('One or more of these');
            section.deviceSetting('contacts2').capability(['contactSensor']).name('And one or more of these');

        });


        page.section('Simulated device info', section => {
            section.textSetting('deviceName').name('Name of simulated device');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contacts1, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts2, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let c1Open = contacts1?.find({
        it.currentContact == 'open'
        })
        let c2Open = contacts2?.find({
        it.currentContact == 'open'
        })
        let child = this.getChildDevices()[0]
        if (c1Open && c2Open ) {
        console.log('Set to open')
        child?.sendEvent(['name': 'contact', 'value': 'open'])
        } else {
        console.log('Set to close')
        child?.sendEvent(['name': 'contact', 'value': 'closed'])
        }
        

	})
