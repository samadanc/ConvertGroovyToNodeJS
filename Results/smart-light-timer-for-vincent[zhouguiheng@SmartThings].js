
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Select motion detectors');
            section.numberSetting('motionMinutes').name('Minutes to turn off after motion stops');

        });


        page.section('Or, turn on when one of these contacts opened', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Select Contacts');

        });


        page.section('Minutes to turn off after no more triggers', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Delay turning off if the light is manually switched off and switched back on in 3 seconds', section => {
            section.numberSetting('minutes2').name('Minutes?');

        });


        page.section('Turn on/off light...', section => {
            section.deviceSetting('myswitch').capability(['switch']).name('Select Light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'switch', 'switchChange')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contactHandler: ${event.name}: ${event.value}")
        if (event.value == 'open') {
        this.turnOn(minutes1)
        }
        

	})

    .subscribedEventHandler('switchChange', (context, event) => {
        
        console.log("SwitchChange from ${event.source}: ${event.name}: ${event.value}")
        if (event.value == 'on') {
        if (!state.byMe) {
        if (this.sinceLastManualOff() < 3) {
        console.log("Extended timeout by $minutes2 minutes")
        state.extendedMinutes = minutes2
        }
        this.scheduleTurnOff(minutes1)
        }
        } else {
        if (event.value == 'off') {
        state.extendedMinutes = 0
        if (!state.byMe) {
        state.lastManualOff = this.now()
        }
        }
        }
        state.byMe = false
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("motionHandler: ${event.name}: ${event.value}")
        if (event.value == 'active') {
        this.turnOn(minutes1)
        } else {
        if (event.value == 'inactive') {
        this.scheduleTurnOff(motionMinutes)
        }
        }
        

	})
