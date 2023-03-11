
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master switch', section => {
            section.deviceSetting('master').capability(['switch']).name('Select');
            section.enumSetting('tapCount').name('Presses to activate');

        });


        page.section('Redundant ON presses set', section => {
            section.deviceSetting('onSlavesToOn').capability(['switch']).name('Switches to ON');
            section.deviceSetting('onSlavesToOff').capability(['switch']).name('Switches to OFF');
            section.deviceSetting('onToggle').capability(['switch']).name('Switches to Toggle');

        });


        page.section('Redundant OFF presses set', section => {
            section.deviceSetting('offSlavesToOn').capability(['switch']).name('Switches to ON');
            section.deviceSetting('offSlavesToOff').capability(['switch']).name('Switches to OFF');
            section.deviceSetting('offToggle').capability(['switch']).name('Switches to Toggle');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.isPhysical()) {
        java.lang.Boolean isStateChange = event.isStateChange()
        java.lang.Boolean isSingleTap = tapCount == 'Single'
        console.log("Master Switch Changed State: $isStateChange")
        if (isSingleTap) {
        if (!isStateChange) {
        this.switchAction()
        }
        } else {
        let currentTime = this.now()
        let lastTime = state.pressTime
        if (isStateChange) {
        state.pressTime = currentTime
        } else {
        if (!lastTime || lastTime == 0) {
        state.pressTime = currentTime
        } else {
        if (currentTime - lastTime > 2000) {
        console.log('Double Tap timeout, restarting detection')
        state.pressTime = currentTime
        } else {
        this.switchAction()
        }
        }
        }
        }
        }
        

	})
