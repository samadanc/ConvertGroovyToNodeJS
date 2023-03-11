
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these dimmers...', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('');
            section.numberSetting('dimmerDayLevel').name('Dimmer Day Level?');
            section.numberSetting('dimmerNightLevel').name('Dimmer Night Level?');
            section.timeSetting('dayBegin').name('Day Begin?');
            section.timeSetting('dayEnd').name('Day End?');

        });


        page.section('Turning on when there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        console.log('setting dimmer level')
        this.setAllDimmers()
        state.lastStatus = 'on'
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        }
        

	})

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        console.log('Checking status')
        if (state.motionStopTime && state.lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        dimmers?.setLevel(0)
        state.lastStatus = 'off'
        }
        }
        

	})
