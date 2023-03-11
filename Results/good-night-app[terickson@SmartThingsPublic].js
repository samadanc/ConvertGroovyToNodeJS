
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('And turn off all of these switches', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('');

        });


        page.section('And close these garage doors', section => {
            section.deviceSetting('offGDoors').capability(['garageDoorControl']).name('');

        });


        page.section('And lock All these locks', section => {
            section.deviceSetting('offLocks').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'button.push', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log(offSwitches)
        console.log(offLocks)
        console.log(offGDoors)
        offSwitches*.off()
        offLocks*.lock()
        offGDoors*.close()
        

	})
