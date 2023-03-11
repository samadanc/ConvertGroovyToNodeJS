
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door is open...', section => {
            section.deviceSetting('GarageDoor').capability(['garageDoorControl']).name('Which?');

        });


        page.section('For too long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.GarageDoor, 'garageDoorControl', 'door', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.GarageDoor, 'garageDoorControl', currentValue)
    
        let isNotScheduled = false
        if (doorState == 'open') {
        isNotScheduled = state.status != 'scheduled'
        }
        if (doorState == 'closed') {
        this.clearSmsHistory()
        this.clearStatus()
        }
        if (isNotScheduled) {
        this.runIn(maxOpenTime * 60, takeAction, ['overwrite': false])
        state.status = 'scheduled'
        }
        

	})
