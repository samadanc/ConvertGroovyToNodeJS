
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which sensor can tell if the door is closed?', section => {
            section.deviceSetting('closeSensor').capability(['contactSensor']).name('Garage Door Close Sensor');

        });


        page.section('Which virtual garage door to use?', section => {
            section.deviceSetting('virtualDoor').capability(['doorControl']).name('Virtual Garage Door');

        });


        page.section('Check if door opened/closed correctly?', section => {
            section.numberSetting('checkAfter').name('Operation Check Delay?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendMsg').name('Send notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.closeSensor, 'contactSensor', 'contact', 'closeSensorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDoor, 'doorControl', 'door', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        state.door = event.value
        console.log("doorHandler() operation=${state.door}")
        if (event.value == 'opening') {
        state.doorAction = event.value
        state.doorActionAt = event.date
        if (checkAfter) {
        this.runIn(checkAfter, checkStatus)
        }
        } else {
        if (event.value == 'closing') {
        state.doorAction = event.value
        state.doorActionAt = event.date
        if (checkAfter) {
        this.runIn(checkAfter, checkStatus)
        }
        }
        }
        

	})

    .subscribedEventHandler('openSensorHandler', (context, event) => {
        
        state.door = event.value
        console.log("openSensorHandler() ${event.value}")
        

	})

    .subscribedEventHandler('closeSensorHandler', (context, event) => {
        
        this.syncVirtual()
        

	})
