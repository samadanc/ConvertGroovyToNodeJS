
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the front door is open...', section => {
            section.deviceSetting('frontDoor').capability(['lock']).name('Which?');

        });


        page.section('For too long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.frontDoor, 'lock', 'lock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.frontDoor, 'lock', currentValue)
    
        let isNotScheduled = false
        if (doorState == 'unlocked') {
        isNotScheduled = state.status != 'scheduled'
        }
        if (doorState == 'locked') {
        this.clearSmsHistory()
        this.clearStatus()
        }
        if (isNotScheduled) {
        this.runIn(maxOpenTime * 60, takeAction, ['overwrite': false])
        state.status = 'scheduled'
        }
        

	})
