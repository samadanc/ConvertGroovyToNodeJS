
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the switch that controls the garage door.', section => {
            section.deviceSetting('garage_door').capability(['switch']).name('Choose the garage door switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.garage_door, 'switch', 'switch', 'switchChangeHandler')

    })

    .subscribedEventHandler('switchChangeHandler', (context, event) => {
        
        if (event.value.toString() == 'on') {
        this.runIn(3, toggleSwitch, ['overwrite': false])
        }
        

	})
