
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Watch this switch...', section => {
            section.deviceSetting('dimmerSwitch').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitch, 'switchLevel', 'level', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitch, 'switchLevel', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("name: ${event.name}")
        console.log("physical: ${event.isPhysical()}")
        console.log("value: ${event.value}")
        if (event.isPhysical()) {
        switch (event.name) {
        case 'level':
        state.previousLevel = event.value.toInteger()
        break
        case 'switch':
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.dimmerSwitch, 'switchLevel', setLevel)
    
        }
        break
        }
        }
        

	})
