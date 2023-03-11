
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on these lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');

        });


        page.section('only when these devices are not present', section => {
            section.deviceSetting('presenceDevices').capability(['presenceSensor']).name('Presence Devices');
            section.numberSetting('falseAlarmThreshold').name('Delay (1 minute minimum)');

        });


        page.section('between these times', section => {
            section.enumSetting('fromTime').name('From');
            section.numberSetting('fromTimeDelay').name('+ minutes');
            section.enumSetting('toTime').name('To');
            section.numberSetting('toTimeDelay').name('+ minutes');
            section.booleanSetting('pushNotifications').name('Enable Push Notifications');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceDevices, 'presenceSensor', 'presence', 'presenceEventHandler')

        context.api.schedules.schedule('lightsOnDelay', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'lightsOffDelay')

        context.api.schedules.schedule('lightsOffDelay', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'lightsOffDelay')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'lightsOnDelay')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'lightsOnDelay')

    })

    .subscribedEventHandler('presenceEventHandler', (context, event) => {
        
        console.log('Presence Event Fired')
        if (event.value == 'not present') {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        console.log('starting sequence')
        this.runIn(this.findFalseAlarmThreshold() * 60, 'smartTurnLightsOn', ['overwrite': false])
        }
        } else {
        console.log('Someone arrived')
        this.runIn(this.findFalseAlarmThreshold() * 60, 'lightsOff', ['overwrite': false])
        }
        

	})

    .subscribedEventHandler('lightsOnDelay', (context, event) => {
        
        let currentFromDelay = this.findFromTimeDelay()
        console.log("Turning lights on in $currentFromDelay minutes")
        this.runIn(currentFromDelay * 60, 'smartTurnLightsOn', ['overwrite': false])
        

	})

    .subscribedEventHandler('lightsOffDelay', (context, event) => {
        
        let currentToDelay = this.findToTimeDelay()
        console.log("Turning lights off in $currentToDelay minutes")
        this.runIn(currentToDelay * 60, 'lightsOff', ['overwrite': false])
        

	})

    .scheduledEventHandler('lightsOnDelay', (context, event) => {
        
        let currentFromDelay = this.findFromTimeDelay()
        console.log("Turning lights on in $currentFromDelay minutes")
        this.runIn(currentFromDelay * 60, 'smartTurnLightsOn', ['overwrite': false])
        

	})

    .scheduledEventHandler('lightsOffDelay', (context, event) => {
        
        let currentToDelay = this.findToTimeDelay()
        console.log("Turning lights off in $currentToDelay minutes")
        this.runIn(currentToDelay * 60, 'lightsOff', ['overwrite': false])
        

	})
