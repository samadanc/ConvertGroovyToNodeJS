
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn off these lights light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('When they\'ve been on for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Between...', section => {
            section.timeSetting('begin1').name('beginning?');
            section.timeSetting('end1').name('ending?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchesHandler')

    })

    .subscribedEventHandler('switchesHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let data = this.parseJson(event.data)
        console.log("event data: $data")
        if (event.value == 'on') {
        console.log('switch turned on!')
        } else {
        if (event.value == 'off') {
        console.log('switch turned off!')
        }
        }
        

	})
