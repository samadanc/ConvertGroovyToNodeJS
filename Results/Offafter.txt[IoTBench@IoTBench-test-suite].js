
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When it is turned on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn it off after...', section => {
            section.numberSetting('max_on_time').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("onHandler called evt: ${event.value}")
        if (event.value == 'on') {
        console.log('scheduling turnOffHandler')
        this.runIn(max_on_time * 60, turnOffHandler)
        } else {
        console.log('unscheduling turnOffHandler')
        this.unschedule(turnOffHandler)
        }
        

	})
