
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Create Device to monitor list', section => {
            section.deviceSetting('devices').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switchLevel', 'switch.setLevel', 'levelEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switchLevel', 'switch.off', 'switchEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switchLevel', 'setLevel', 'levelEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switchLevel', 'switch', 'levelEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switchLevel', 'switch.on', 'switchEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switchLevel', 'level', 'levelEventHandler')

    })

    .subscribedEventHandler('switchEventHandler', (context, event) => {
        
        console.log("switch change $evt")
        

	})

    .subscribedEventHandler('levelEventHandler', (context, event) => {
        
        console.log("Level change $evt")
        

	})
