
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('And this switch is OFF...', section => {
            section.deviceSetting('disable').capability(['switch']).name('Which?');

        });


        page.section('Turn on light(s)...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('You can also:', section => {
            section.booleanSetting('turnOff').name('Turn off when motion stops');
            section.numberSetting('minutes').name('Wait this many minutes to turn off after motion stops (optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.disable, 'switch', 'switch.off', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'active') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        console.log("${(switch1.label) ? switch1.label : switch1.name} turning on.")
        } else {
        if (event.value == 'inactive') {
        if (minutes) {
        this.runIn(minutes * 60, switchoff)
        } else {
        this.switchoff()
        }
        }
        }
        

	})
