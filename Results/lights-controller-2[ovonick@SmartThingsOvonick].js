
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Events that trigger lights on', section => {
            section.deviceSetting('switchesInput').capability(['switch']).name('Switch Devices');
            section.deviceSetting('motionsInput').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('doorSensorsInput').capability(['contactSensor']).name('Door Sensors');

        });


        page.section('Lights that are being controlled', section => {
            section.deviceSetting('switchesControlled').capability(['switch']).name('Switch Devices');
            section.deviceSetting('dimmersControlled').capability(['switchLevel']).name('Dimmers Devices');

        });


        page.section('Parameters', section => {
            section.booleanSetting('isTimeRestricted').name('React on motion/door open only between Sunset and Sunrise?');
            section.numberSetting('sunriseSunsetOffset').name('Sunrise/Sunset Offset');
            section.enumSetting('motionActiveAction').name('When motion detected do the following');
            section.numberSetting('turnOffIntervalPhysicalEvent').name('Minutes to turn off after pressing on a switch');
            section.numberSetting('turnOffIntervalSensorEvent').name('Minutes to turn off after motion/door open');
            section.numberSetting('dimmToLevel').name('Dimmers level 30 seconds before turning off');
            section.booleanSetting('isKeepOnWhileDoorIsOpen').name('Keep on while door is open?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorSensorsInput, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switchesInput, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionsInput, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switchesInput, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        this.logEvent(event)
        if (!event.physical) {
        return null
        }
        atomicState.turnOnAfter = this.now() + 10 * 1000
        atomicState.turnOffAfter = 0
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        this.logEvent(event)
        if (!event.physical) {
        return null
        }
        this.scheduleTurnOff(turnOffIntervalPhysicalEvent)
        

	})

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        this.logEvent(event)
        if ('Maintain lights on'.equals(motionActiveAction)) {
        this.maintainOn()
        } else {
        this.turnOn()
        }
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        this.logEvent(event)
        this.turnOn()
        

	})
