
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What multisensor monitors your door...', section => {
            section.deviceSetting('multisensor').capability(['contactSensor']).name('Which?');

        });


        page.section('Switch that controls your door...', section => {
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which?');

        });


        page.section('Who should I monitor arriving...', section => {
            section.deviceSetting('arrivalPeople').capability(['presenceSensor']).name('Who?');

        });


        page.section('Who should I monitor departing...', section => {
            section.deviceSetting('departurePeople').capability(['presenceSensor']).name('Who?');

        });


        page.section('What time would you like to close...', section => {
            section.timeSetting('timeClose').name('Time of Day');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('closeDoor', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.multisensor, 'contactSensor', 'contact', 'accelerationHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.arrivalPeople, 'presenceSensor', 'presence.present', 'presence')

        await context.api.subscriptions.subscribeToDevices(context.config.departurePeople, 'presenceSensor', 'presence.not present', 'notPresent')

    })

    .subscribedEventHandler('notPresent', (context, event) => {
        
        console.log("Presence ${event.value}")
        console.log(" Value of isOpen = ${state.Open}")
        if (event.value == 'not present' && state.Open == 'open') {
        console.log('Closing Door')
        this.sendPush("Your ${(doorSwitch.label) ? doorSwitch.label : doorSwitch.name} was closed")
        
        context.api.devices.sendCommands(context.config.doorSwitch, 'momentary', push)
    
        }
        

	})

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        console.log("accelerationHandler ${event.value}")
        state.Open = event.value
        console.log("Value of isOpen= ${state.Open}")
        

	})

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("Presence ${event.value}")
        console.log("Value of ${state.Open}")
        if (event.value == 'present' && state.Open == 'closed') {
        console.log('Opening Door')
        this.sendPush("Your ${(doorSwitch.label) ? doorSwitch.label : doorSwitch.name} was opened")
        
        context.api.devices.sendCommands(context.config.doorSwitch, 'momentary', push)
    
        }
        

	})

    .scheduledEventHandler('closeDoor', (context, event) => {
        
        console.log("Closing Door(s) Value of ${state.Open}")
        if (state.Open == 'open') {
        console.log('Closing Door')
        this.sendPush("Your ${(doorSwitch.label) ? doorSwitch.label : doorSwitch.name} was closed")
        
        context.api.devices.sendCommands(context.config.doorSwitch, 'momentary', push)
    
        } else {
        console.log('Door is not Open')
        }
        

	})
