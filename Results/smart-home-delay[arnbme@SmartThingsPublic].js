
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Smart Home Delay Parameters', section => {
            section.deviceSetting('thecontact').capability(['contactSensor']).name('One or more Monitored Contact Sensors, do not monitor in Smarthome');
            section.deviceSetting('thesimcontact').capability(['contactSensor']).name('Simulated Contact Sensor, monitored by SmartHome');
            section.numberSetting('thedelay').name('Alarm delay time in seconds from 10 to 60');
            section.deviceSetting('thekeypad').capability(['button']).name('Zero or more Optional Keypads: sounds entry delay tone ');
            section.deviceSetting('thesiren').capability(['alarm']).name('Zero or more Optional Sirens to Beep');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thecontact, 'contactSensor', 'contact.open', 'doorOpensHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
        console.log("alarmStatusHandler caught alarm status change: ${event.value}")
        if (event.value == 'off') {
        this.unschedule(soundalarm)
        }
        

	})

    .subscribedEventHandler('doorOpensHandler', (context, event) => {
        
        let alarm = location.currentState('alarmSystemStatus')
        let alarmstatus = alarm?.value
        let lastupdt = alarm?.date.time
        console.log("doorOpensHandler called: ${event.value} $alarmstatus $lastupdt")
        if (alarmstatus == 'stay' || alarmstatus == 'away') {
        if (settings.thekeypad) {
        
        context.api.devices.sendCommands(context.config.thekeypad, 'button', setEntryDelay)
    
        }
        if (settings.thesiren) {
        
        context.api.devices.sendCommands(context.config.thesiren, 'alarm', beep)
    
        }
        let now = new Date()
        let runTime = new Date(now.getTime() + thedelay * 1000)
        this.runOnce(runTime, soundalarm, ['data': ['lastupdt': lastupdt ], 'overwrite': false])
        }
        

	})
