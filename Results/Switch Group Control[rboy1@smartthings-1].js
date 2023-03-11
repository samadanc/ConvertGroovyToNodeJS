
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches in the group?');
            section.enumSetting('actionTypes').name('What type(s) of actions will trigger the group?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let processEvent = false
        for (let t : actionTypes ) {
        if (event.physical && t == 'Physical Trigger' || !event.physical && t == 'Virtual Trigger') {
        processEvent = true
        break
        }
        }
        if (processEvent) {
        if (event.value == 'on') {
        for (let sw : switches ) {
        if (sw.currentValue('switch') == 'off') {
        sw.on()
        }
        }
        } else {
        if (event.value == 'off') {
        for (let sw : switches ) {
        if (sw.currentValue('switch') == 'on') {
        sw.off()
        }
        }
        }
        }
        }
        state.handlingEvents = false
        

	})
