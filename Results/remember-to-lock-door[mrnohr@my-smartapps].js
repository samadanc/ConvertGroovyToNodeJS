
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Doors', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which doors?');

        });


        page.section('Notifications', section => {
            section.timeSetting('notificationTime').name('When to get notifications?');
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('reminderSchedule', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact.open', 'doorOpenHandler')

    })

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        console.log("State 1: $state")
        let openedDeviceId = event.device.id
        if (!(state.openDoors[ openedDeviceId ])) {
        state.openDoors[ openedDeviceId ] = event.device.label
        }
        console.log("State 2: $state")
        

	})

    .scheduledEventHandler('reminderSchedule', (context, event) => {
        
        if (state.openDoors) {
        let labelList = state.openDoors.collect({
        it.value
        })
        let message
        if (labelList.size() == 1) {
        message = "Check if ${labelList[0]} is locked"
        } else {
        if (labelList.size() == 2) {
        message = "Check if ${labelList[0]} and ${labelList[1]} are locked"
        } else {
        message = "Check if ${labelList.join(, )} are locked"
        }
        }
        console.log(message)
        this.messageMe(message)
        this.resetState()
        }
        

	})
