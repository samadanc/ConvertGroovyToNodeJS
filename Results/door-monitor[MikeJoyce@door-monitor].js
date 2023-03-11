
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which doors?');
            section.numberSetting('doorTimeout').name('How many hours before notifying?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which people?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact.closed', 'closedEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence.not present', 'noLongerPresentEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact.open', 'openEventHandler')

    })

    .subscribedEventHandler('closedEventHandler', (context, event) => {
        
        let openDoors = this.getOpenDoors()
        if (openDoors?.empty) {
        this.unschedule(openDoorTimeoutHandler)
        state.doorTimeoutScheduled = false
        }
        

	})

    .subscribedEventHandler('openEventHandler', (context, event) => {
        
        if (this.getNumOfPeoplePresent() == 0) {
        this.sendPush("Door ${event.displayName} just opened while you are gone!")
        }
        if (!state.doorTimeoutScheduled) {
        this.runIn(state.doorTimeoutInSeconds, openDoorTimeoutHandler)
        state.doorTimeoutScheduled = true
        }
        

	})

    .subscribedEventHandler('noLongerPresentEventHandler', (context, event) => {
        
        let openDoors = this.getOpenDoors()
        if (!openDoors?.empty) {
        this.sendPush("$openDoors door(s) have been left open!!")
        }
        

	})
