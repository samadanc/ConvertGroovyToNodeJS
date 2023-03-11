
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Turn on this dimmer switch...', section => {
            section.deviceSetting('MultilevelSwitch').capability(['switchLevel']).name('Which?');

        });


        page.section('How Bright?', section => {
            section.numberSetting('number').name('Percentage, 0-99');

        });


        page.section('Only dim between this time at night:', section => {
            section.timeSetting('timeOfDay1').name('Start Time?');

        });


        page.section('and this time in the morning:', section => {
            section.timeSetting('timeOfDay2').name('End Time?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.MultilevelSwitch, 'switchLevel', 'switch.on', 'switchOn')

        await context.api.subscriptions.subscribeToDevices(context.config.MultilevelSwitch, 'switchLevel', 'switch.off', 'switchOff')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('switchOn', (context, event) => {
        
        console.log('Switch on, state = 1')
        state.switch = 1
        

	})

    .subscribedEventHandler('switchOff', (context, event) => {
        
        console.log('Switch off, state = 0')
        state.switch = 0
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        
        context.api.devices.sendCommands(context.config.MultilevelSwitch, 'switchLevel', refresh)
    
        console.log('Seeing motion...')
        let startTime = this.timeToday(timeOfDay1)
        let endTime = this.timeToday(timeOfDay2)
        if (this.now() < startTime.time && this.now() > endTime.time) {
        console.log('Outside of time range, doing nothing.')
        } else {
        log.trace('We\'re inside the time range.')
        if (state.switch == 0) {
        console.log('Light is off, let\'s go dimming!')
        this.unschedule(reset)
        settings.MultilevelSwitch.setLevel
        let timeDelay = minutes1 * 60
        this.runIn(timeDelay, reset)
        } else {
        console.log('Light is on... I\'m not touching it.')
        }
        }
        }
        

	})
