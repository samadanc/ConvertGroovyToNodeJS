
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices and enter parameters', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch Devices');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('illuminanceDevice').capability(['illuminanceMeasurement']).name('Illuminance Device');
            section.numberSetting('minutes').name('Minutes to turn off');
            section.numberSetting('illuminance').name('Illuminance');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("${app.label}, switchOnHandler, event: ${event.value}, event.physical: ${event.physical}")
        if (!event.physical) {
        return null
        }
        if (motions) {
        state.isMotionActive = true
        } else {
        state.isMotionActive = false
        }
        this.requestToTurnOff()
        

	})

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log("${app.label}, motionActiveHandler")
        state.isMotionActive = true
        if (illuminanceDevice) {
        
        context.api.devices.sendCommands(context.config.illuminanceDevice, 'illuminanceMeasurement', currentValue)
    
        console.log("${app.label}, current illuminance: $currentIlluminance")
        if (currentIlluminance <= illuminance ) {
        this.switchesOn()
        }
        } else {
        this.switchesOn()
        }
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        console.log("${app.label}, motionInactiveHandler")
        state.isMotionActive = false
        this.requestToTurnOff()
        

	})
