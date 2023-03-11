
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature with local sensor (optional, uses Weather Underground if not specified)', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature drops below...', section => {
            section.numberSetting('temperature1').name('Temperature?');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipcode').name('Zip Code');

        });


        page.section('Turn on Pool Pump', section => {

        });


        page.section('Switch number', section => {
            section.numberSetting('instance').name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkTemp', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let tooCold = temperature1
        let mySwitch = settings.switch1
        if (event.doubleValue <= tooCold ) {
        console.log("Temperature dropped below $tooCold:  activating $mySwitch")
        
        context.api.devices.sendCommands(context.config.switch1, 'device.poolswitch', on)
    
        } else {
        console.log("Temperature above $tooCold:  deactivating $mySwitch")
        
        context.api.devices.sendCommands(context.config.switch1, 'device.poolswitch', off)
    
        }
        

	})

    .scheduledEventHandler('checkTemp', (context, event) => {
        
        let conditions
        if (this.locationIsDefined()) {
        if (this.zipcodeIsValid()) {
        conditions = this.getWeatherFeature('conditions', zipcode)
        console.log("Current Temperature ${conditions.current_observation.temp_f}")
        } else {
        log.warn('Pool Frezze Protection: Invalid zipcode entered, defaulting to location\'s zipcode')
        conditions = this.getWeatherFeature('conditions')
        console.log("Current Temperature ${conditions.current_observation.temp_f}")
        }
        if (conditions.current_observation.temp_f <= temperature1 ) {
        console.log("Temperature dropped below $temperature1:  activating ${settings.switch1}")
        
        context.api.devices.sendCommands(context.config.switch1, 'device.poolswitch', on)
    
        } else {
        console.log("Temperature above $temperature1:  deactivating ${settings.switch1}")
        
        context.api.devices.sendCommands(context.config.switch1, 'device.poolswitch', off)
    
        }
        } else {
        log.warn('Pool Frezze Protection: Location is not defined')
        }
        

	})
