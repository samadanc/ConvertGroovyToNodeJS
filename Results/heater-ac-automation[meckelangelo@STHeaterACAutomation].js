
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the outlet(s)...', section => {
            section.deviceSetting('outlet').capability(['switch']).name('Outlet');

        });


        page.section('What is plugged into the outlet?', section => {
            section.enumSetting('outletMode').name('Device');

        });


        page.section('Choose a temperature sensor...', section => {
            section.deviceSetting('temperatureSensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('(Optional) Turn the outlet on/off when this contact sensor is opened/closed...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Sensor');

        });


        page.section('Should the outlet turn on or off (or do nothing) when the contact sensor is opened? Choose \'Nothing\' if no contact sensor selected.', section => {
            section.enumSetting('opened').name('Opened');

        });


        page.section('Should the outlet turn on or off (or do nothing) when the contact sensor is closed? Choose \'Nothing\' if no contact sensor selected.', section => {
            section.enumSetting('closed').name('Closed');

        });


        page.section('Turn the outlet on when motion has been detected by this sensor (and the temperature exceeds the comfort temperature, entered below)...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Sensor');

        });


        page.section('Turn the outlet off when there has been no motion for this number of minutes...', section => {
            section.numberSetting('minutes').name('Minutes');

        });


        page.section('Set the COMFORT temperature (this temperature will be maintained when there is activity AND the home is in one of the modes in \'Set for specific mode(s)\' below.)...', section => {
            section.numberSetting('setComfTemp').name('Degrees Fahrenheit');

        });


        page.section('Set the VACANT temperature (this temperature will be maintained regardless of activity, BUT the home must be in one of the modes in \'Set for specific mode(s)\' below.)...', section => {
            section.numberSetting('setVacTemp').name('Degrees Fahrenheit');

        });


        page.section('Regardless of activity, maintain the COMFORT temperature in these modes... (WARNING: You must also select this mode in \'Set for specific mode(s)\' - otherwise it will not function properly.)', section => {

        });


        page.section(''Name and modes... WARNING: It is strongly advised not to select \'Away\' when choosing modes!'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        this.unschedule()
        if
        console.log('EVENT: Motion stopped...')
        this.runIn(minutes * 60, checkMotion, ['event': 'motionStopped'])
        }
        

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log('EVENT: Mode changed...')
        if 
        this.checkTemperature(false)
        } else {
        this.checkMotion('mode')
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.temperatureSensor, 'temperatureMeasurement', latestValue)
    
        console.log('EVENT: Temperature changed...')
        if (outletMode == 'Heater' && currentTemp >= setComfTemp || outletMode == 'AC' && currentTemp <= setComfTemp ) {
        console.log('Checking temperature... Switch must be turned off (if it is not already).')
        this.turnOff()
        } else {
        this.checkMotion('temperature')
        }
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if
        console.log('EVENT: Contact opened...')
        } else {
        if
        console.log('EVENT: Contact closed...')
        }
        }
        if (['On', 'Off'].contains(opened) || ['On', 'Off'].contains(closed)) {
        this.checkContact('contact')
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if
        if (state.nextMotionCheck == 0 || this.now() > state.nextMotionCheck) {
        console.log('EVENT: Motion started... Checking temperature.')
        state.nextMotionCheck = this.now() + minutes * 60 * 1000
        this.checkTemperature(true)
        } else {
        console.log("EVENT: Motion started... Checked temperature within past $minutes minutes, skipping this time.")
        }
        }
        

	})
