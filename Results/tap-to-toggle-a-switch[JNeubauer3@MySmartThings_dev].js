
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Double Tap this switch', section => {
            section.deviceSetting('master').capability(['switch']).name('Master Switch?');

        });


        page.section('to toggle this switch', section => {
            section.deviceSetting('slave').capability(['switch']).name('Slave Switch?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.isPhysical() && event.value == 'on' || event.value == 'off') {
        if (!(event.isStateChange())) {
        let eventTime = event.date.getTime()
        if (state.nextTime < eventTime ) {
        state.nextTime = eventTime + 5000
        } else {
        this.toggleSwitch(slave)
        state.nextTime = 0
        }
        } else {
        if (state.nextTime) {
        state.nextTime = 0
        }
        }
        }
        

	})
