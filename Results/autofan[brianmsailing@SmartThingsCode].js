
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set the ecobee thermostat(s)', section => {
            section.deviceSetting('tStat').capability(['thermostat']).name('Main Thermostat');
            section.deviceSetting('tempSensor1').capability(['temperatureMeasurement']).name('Thermostat temperature sensor:');
            section.deviceSetting('tempSensor2').capability(['temperatureMeasurement']).name('Thermostat temperature sensor:');
            section.deviceSetting('tempSensor3').capability(['temperatureMeasurement']).name('Thermostat temperature sensor:');
            section.deviceSetting('tempSensor4').capability(['temperatureMeasurement']).name('Thermostat temperature sensor:');
            section.deviceSetting('tempSensor5').capability(['temperatureMeasurement']).name('Thermostat temperature sensor:');
            section.deviceSetting('tempSensor6').capability(['temperatureMeasurement']).name('Thermostat temperature sensor:');
            section.deviceSetting('TempSpan').capability(['switchLevel']).name('Temp Span Output to Virtual Switch');
            section.deviceSetting('button').capability(['switch']).name('Which switch?');
            section.timeSetting('starttime').name('Start time');
            section.timeSetting('endtime').name('End time');
            section.booleanSetting('initializestate').name('initializestate');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('swon', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor1, 'temperatureMeasurement', 'temperature', 'main')

        context.api.schedules.schedule('swoff', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'device.myEcobeeDevice', 'climateList', 'climateListHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'switch', 'switch.on', 'buttonHandler')

    })

    .subscribedEventHandler('main', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.tStat, 'thermostat', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tStat, 'thermostat', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tStat, 'thermostat', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tStat, 'thermostat', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tStat, 'thermostat', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tempSensor1, 'temperatureMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tempSensor2, 'temperatureMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tempSensor3, 'temperatureMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tempSensor4, 'temperatureMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tempSensor5, 'temperatureMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.tempSensor6, 'temperatureMeasurement', currentValue)
    
        let temp = [ tempSensor1 , tempSensor2 , tempSensor3 , tempSensor4 , tempSensor5 , tempSensor6 ]
        let max = temp.max()
        let min = temp.min()
        
        context.api.devices.sendCommands(context.config.TempSpan, 'switchLevel', setLevel)
    
        log.info("Temp Span ${(max - min).round(3)}, max $max, min$min")
        if (state.on == true) {
        if (mainMode == 'heat') {
        if (min + 3.0 < mainHSP || max - min > 3.0) {
        console.log("Zone temp min $min < 3.0 from main heat set point $mainHSP or temp span ${(max - min).round(3)} >3.0 fan on")
        if (state.fanon == false) {
        this.setClimateon()
        }
        if (state.fanon == true) {
        console.log('nothing to do fan on')
        }
        } else {
        console.log("Zone temp min $min > 3.0 from main heat set point $mainHSP or temp span ${(max - min).round(3)} <3.0 fan off")
        if (state.fanon == true) {
        this.setClimateoff()
        }
        if (state.fanon == false) {
        console.log('nothing to do fan off')
        }
        }
        }
        } else {
        console.log('state off')
        }
        

	})

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        console.log('basement zone mode')
        this.setClimateBasement()
        this.runIn(60 * 60, setClimateoff)
        

	})

    .subscribedEventHandler('climateListHandler', (context, event) => {
        
        console.log("thermostat's Climates List: ${event.value}, $settings")
        

	})

    .scheduledEventHandler('swon', (context, event) => {
        
        state.on = true
        

	})

    .scheduledEventHandler('swoff', (context, event) => {
        
        this.setClimateoff()
        state.on = false
        

	})
