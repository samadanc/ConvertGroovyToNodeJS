
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When movement is detected...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Which Door?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Between this time at night:', section => {
            section.timeSetting('timeOfDay1').name('Time?');

        });


        page.section('And this time in the morning:', section => {
            section.timeSetting('timeOfDay2').name('Time?');

        });


        page.section('Turn off after this many minutes', section => {
            section.numberSetting('minutesLater').name('Delay');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        let startTime = this.timeToday(timeOfDay1)
        let endTime = this.timeToday(timeOfDay2)
        if (this.now() < startTime.time && this.now() > endTime.time) {
        } else {
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        let delay = minutesLater * 60
        this.runIn(delay, lightsoff)
        console.log('turning lights off aftet delay')
        }
        

	})
