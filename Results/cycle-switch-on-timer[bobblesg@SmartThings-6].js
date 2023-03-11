
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('Which switch to enable/disable App', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Which days to run', section => {
            section.enumSetting('days').name('Select Days of the Week');

        });


        page.section('Which switch to cycle...', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('How long to stay on', section => {
            section.numberSetting('ondelay').name('Minutes');

        });


        page.section('How long to stay off', section => {
            section.numberSetting('offdelay').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switch1Handler')

    })

    .subscribedEventHandler('switch1Handler', (context, event) => {
        
        state.currS1 = event.value
        log.trace(" $switch1 is ${state.currS1}")
        if (state.currS1 != 'off') {
        this.runswitchOnNow()
        }
        if (state.currS1 != 'on') {
        this.switchOff()
        }
        

	})
