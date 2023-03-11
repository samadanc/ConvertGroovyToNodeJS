
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger Devices', section => {
            section.deviceSetting('switchOn').capability(['switch']).name('Devices?');

        });


        page.section('Action Devices', section => {
            section.deviceSetting('fanLevel1').capability(['switchLevel']).name('Fan?');
            section.deviceSetting('wakeupLights').capability(['switchLevel']).name('Wakeup Lights');

        });


        page.section('Preferences', section => {
            section.numberSetting('minutesToWait').name('Delay fan for how many minutes');
            section.numberSetting('stepDuration').name('Seconds delay between light increases');
            section.timeSetting('sleepTime').name('When to go to sleep');
            section.timeSetting('wakeTimeEarly').name('When to wake up early');
            section.timeSetting('wakeTime').name('When to wake up normal');
            section.timeSetting('weekendWakeTime').name('When to wake up on weekends');
            section.enumSetting('sleepTimer').name('Sleep timer duration?');
            section.enumSetting('earlyWakeUpDays').name('Early Wake Up Days?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('SleepTimeHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.switchOn, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        if (this.IsNight()) {
        if (sleepTimer != null) {
        
        context.api.devices.sendCommands(context.config.sleepTimer, 'enum', toInteger)
    
        
        context.api.devices.sendCommands(context.config.sleepTimer, 'enum', log)
    
        this.runIn(delay, ShutStuffOff)
        }
        if (minutesToWait > 0) {
        this.TurnFanDown()
        console.log("switchOffHandler: Cranking up fan $fanLevel1 in $minutesToWait minutes")
        }
        let fanDelay = minutesToWait * 60
        this.runIn(fanDelay, SleepTimeHandler)
        } else {
        console.log('switchOnHandler: Not night time.')
        }
        

	})

    .scheduledEventHandler('SleepTimeHandler', (context, event) => {
        
        this.TurnFanUp()
        
        context.api.devices.sendCommands(context.config.wakeupLights, 'switchLevel', setLevel)
    
        

	})
