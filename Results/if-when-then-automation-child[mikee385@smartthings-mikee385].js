
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        context.api.schedules.schedule('timeHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeHandler')

    })

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
                try {
                    console.log('Received sunrise time event')
                    let triggers = this.readTriggers()
                    for (let trigger : triggers ) {
                        if (trigger.type == triggerType_AtSunrise ) {
                            this.scheduleSunrise(event.value, trigger.offset)
                        }
                    }
                } 
                catch (let e) {
                    this.sendPush("Error in 'sunriseTimeHandler' for ${app.label}: $e")
                    throw e 
                } 
            

	})

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
                try {
                    console.log('Received sunset time event')
                    let triggers = this.readTriggers()
                    for (let trigger : triggers ) {
                        if (trigger.type == triggerType_AtSunset ) {
                            this.scheduleSunset(event.value, trigger.offset)
                        }
                    }
                } 
                catch (let e) {
                    this.sendPush("Error in 'sunsetTimeHandler' for ${app.label}: $e")
                    throw e 
                } 
            

	})

    .subscribedEventHandler('deviceHandler', (context, event) => {
        
                try {
                    console.log("Received device event: ${event.device}.${event.name} is ${event.value} at ${event.date}")
                    let result = false
                    let triggers = this.readTriggers()
                    for (let trigger : triggers ) {
                        if (trigger.type == triggerType_DeviceChanges ) {
                            for (let triggerDevice : trigger.device) {
                                if (triggerDevice.id == event.device.id && trigger.attributeName == event.name) {
                                    console.log("Checking trigger: $trigger with $triggerDevice")
                                    if (this.checkDeviceStatus(triggerDevice, trigger.attributeName, trigger.comparison, trigger.value, event.value)) {
                                        result = true
                                        break
                                    }
                                }
                            }
                        }
                    }
                    if (result) {
                        console.log('Triggers satisfied')
                        result = this.checkConditions()
                        if (result) {
                            console.log('Conditions satisfied')
                            this.performActions()
                        } else {
                            console.log('Conditions not satisfied')
                        }
                    } else {
                        console.log('Triggers not satisfied')
                    }
                } 
                catch (let e) {
                    this.sendPush("Error in 'deviceHandler' for ${app.label}: $e")
                    throw e 
                } 
            

	})

    .subscribedEventHandler('modeHandler', (context, event) => {
        
                try {
                    console.log("Received mode event: ${event.descriptionText} at ${event.date}")
                    let result = false
                    let triggers = this.readTriggers()
                    for (let trigger : triggers ) {
                        if (trigger.type == triggerType_ModeChanges ) {
                            console.log("Checking trigger: $trigger")
                            if (this.checkMode(trigger.mode, event.value)) {
                                result = true
                                break
                            }
                        }
                    }
                    if (result) {
                        console.log('Triggers satisfied')
                        result = this.checkConditions()
                        if (result) {
                            console.log('Conditions satisfied')
                            this.performActions()
                        } else {
                            console.log('Conditions not satisfied')
                        }
                    } else {
                        console.log('Triggers not satisfied')
                    }
                } 
                catch (let e) {
                    this.sendPush("Error in 'modeHandler' for ${app.label}: $e")
                    throw e 
                } 
            

	})

    .subscribedEventHandler('routineHandler', (context, event) => {
        
                try {
                    console.log("Received routine event: ${event.displayName} at ${event.date}")
                    let result = false
                    let triggers = this.readTriggers()
                    for (let trigger : triggers ) {
                        if (trigger.type == triggerType_RoutineExectutes ) {
                            console.log("Checking trigger: $trigger")
                            if (this.checkRoutine(trigger.routine, event.displayName)) {
                                result = true
                                break
                            }
                        }
                    }
                    if (result) {
                        console.log('Triggers satisfied')
                        result = this.checkConditions()
                        if (result) {
                            console.log('Conditions satisfied')
                            this.performActions()
                        } else {
                            console.log('Conditions not satisfied')
                        }
                    } else {
                        console.log('Triggers not satisfied')
                    }
                } 
                catch (let e) {
                    this.sendPush("Error in 'routineHandler' for ${app.label}: $e")
                    throw e 
                } 
            

	})

    .scheduledEventHandler('timeHandler', (context, event) => {
        
                try {
                    console.log('Received time event')
                    let result = this.checkConditions()
                    if (result) {
                        console.log('Conditions satisfied')
                        this.performActions()
                    } else {
                        console.log('Conditions not satisfied')
                    }
                } 
                catch (let e) {
                    this.sendPush("Error in 'timeHandler' for ${app.label}: $e")
                    throw e 
                } 
            

	})
