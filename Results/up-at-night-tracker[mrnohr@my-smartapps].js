
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Doors', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which doors to watch?');

        });


        page.section('When?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact.open', 'doorOpenHandler')

    })

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        console.log("In doorOpenHandler for ${event.name} = ${event.value}")
        state.openCount = state.openCount + 1
        console.log("So far door(s) have opened ${state.openCount} times")
        

	})
