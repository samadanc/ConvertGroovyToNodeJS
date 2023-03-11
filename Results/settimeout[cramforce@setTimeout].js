
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control switch', section => {
            section.deviceSetting('controlSwitch').capability(['switch']).name('Control switch (optional)');

        });


        page.section('Debounce on motion', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion sensors (optional)');

        });


        page.section('Debounce on door open', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact sensors (optional)');

        });


        page.section('And off after minutes...', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'stateChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'stateChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.controlSwitch, 'switch', 'switch', 'controlChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'stateChanged')

    })

    .subscribedEventHandler('stateChanged', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'on') {
        log.info("Switches turned on: ${event.description}")
        this.maybeDebounce()
        return null
        }
        if (event.value == 'off') {
        log.info("Switches turned off: ${event.description}")
        state.ignoreNext = true
        return null
        }
        if (event.value == 'active') {
        log.info("Motion active: ${event.description}")
        this.maybeDebounce()
        return null
        }
        if (event.value == 'open') {
        log.info("Door open: ${event.description}")
        this.maybeDebounce()
        return null
        }
        

	})

    .subscribedEventHandler('controlChanged', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'on') {
        log.info("Control turned on: ${event.description}")
        this.maybeDebounce()
        return null
        }
        if (event.value == 'off') {
        log.info("Control turned off: ${event.description}")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        return null
        }
        

	})
