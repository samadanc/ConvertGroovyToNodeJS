
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Select motion detectors');

        });


        page.section('Or, turn on when one of these contacts opened', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Select Contacts');

        });


        page.section('And off after no more triggers after...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select Lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchChange')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contactHandler: ${event.name}: ${event.value}")
        if (event.value == 'open') {
        if (state.myState == 'ready') {
        console.log('Turning on lights by contact opening')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        state.inactiveAt = null
        state.myState = 'activating'
        }
        } else {
        if (event.value == 'closed') {
        if (!state.inactiveAt && state.myState == 'active' || state.myState == 'activating') {
        this.setActiveAndSchedule()
        }
        }
        }
        console.log('state: ' + state.myState)
        

	})

    .subscribedEventHandler('switchChange', (context, event) => {
        
        console.log("SwitchChange: ${event.name}: ${event.value}")
        if (event.value == 'on') {
        if (state.myState == 'activating') {
        state.myState = 'active'
        } else {
        if (state.myState != 'active') {
        state.myState = 'already on'
        }
        }
        } else {
        if (state.myState == 'active' || state.myState == 'activating') {
        this.unschedule()
        }
        state.myState = 'ready'
        }
        console.log('state: ' + state.myState)
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("motionHandler: ${event.name}: ${event.value}")
        if (event.value == 'active') {
        if (state.myState == 'ready' || state.myState == 'active' || state.myState == 'activating') {
        console.log('turning on lights')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        state.inactiveAt = null
        state.myState = 'activating'
        }
        } else {
        if (event.value == 'inactive') {
        if (!state.inactiveAt && state.myState == 'active' || state.myState == 'activating') {
        this.setActiveAndSchedule()
        }
        }
        }
        console.log('state: ' + state.myState)
        

	})
