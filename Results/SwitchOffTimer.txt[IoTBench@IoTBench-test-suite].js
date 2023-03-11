
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch turns on', section => {
            section.deviceSetting('timeoutSwitch').capability(['switch']).name('Which switch?');

        });


        page.section('Turn it off in...', section => {
            section.numberSetting('timeoutMinutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.timeoutSwitch, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        state.timeoutSwitchOnTime = this.now()
        this.runIn(timeoutMinutes * 60, takeAction, ['overwrite': false])
        

	})
