
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Motion Sensors', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensor(s)');

        });


        page.section('Lights', section => {
            section.deviceSetting('switches').capability(['switch']).name('Light(s)');

        });


        page.section('Door(s)', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Misc');

        });


        page.section('Not Present debounce timer [default=5 minutes]', section => {
            section.numberSetting('garageQuietThreshold').name('Time in minutes');

        });


        page.section('want to turn on mega-debugging?', section => {
            section.booleanSetting('debugMode').name('Debug Mode?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionEvtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'contactEvtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchEvtHandler')

    })

    .subscribedEventHandler('motionEvtHandler', (context, event) => {
        
        if (event.value == 'active') {
        if (debugMode) {
        console.log("Motion in the garage... ${event.device}")
        }
        this.turnOnLights()
        }
        if (event.value == 'inactive') {
        if (debugMode) {
        console.log("No longer motion in the garage... ${event.device}")
        }
        this.delayedTurnOff(60 * garageQuietThreshold )
        }
        

	})

    .subscribedEventHandler('contactEvtHandler', (context, event) => {
        
        if (event.value == 'open') {
        if (debugMode) {
        console.log("Somebody opened a door... ${event.device}")
        }
        this.turnOnLights()
        }
        if (event.value == 'closed') {
        if (debugMode) {
        console.log("Somebody closed a door... ${event.device}")
        }
        this.delayedTurnOff(30)
        }
        

	})

    .subscribedEventHandler('switchEvtHandler', (context, event) => {
        
        if (event.value == 'on') {
        if (debugMode) {
        console.log("Somebody turned on the lights... ${event.device}")
        }
        this.delayedTurnOff(60 * garageQuietThreshold )
        }
        if (event.value == 'off') {
        if (debugMode) {
        console.log("Somebody turned off the lights... ${event.device}")
        }
        this.unschedule()
        }
        

	})
