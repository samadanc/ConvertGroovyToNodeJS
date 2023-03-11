
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bathroom Devices', section => {
            section.deviceSetting('HumiditySensor').capability(['relativeHumidityMeasurement']).name('Humidity Sensor:');
            section.deviceSetting('FanSwitch').capability(['switch']).name('Fan Location:');

        });


        page.section('Fan Activation', section => {
            section.numberSetting('HumidityIncreaseRate').name('Humidity Increase Rate :');
            section.numberSetting('HumidityThreshold').name('Humidity Threshold (%):');

        });


        page.section('Fan Deactivation', section => {
            section.numberSetting('HumidityDropTimeout').name('Turn off how long after humidity begins to drop (minutes):');

        });


        page.section('Manual Activation', section => {
            section.enumSetting('ManualControlMode').name('Off After Manual-On?');
            section.numberSetting('ManualOffMinutes').name('Auto Turn Off Time (minutes)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.HumiditySensor, 'relativeHumidityMeasurement', 'humidity', 'HumidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.FanSwitch, 'switch', 'switch', 'FanSwitchHandler')

    })

    .subscribedEventHandler('HumidityHandler', (context, event) => {
        
        log.info('running humidity check')
        state.humpres = this.IsHumidityPresent(evt, HumidityIncreaseRate, HumidityThreshold, state.humpres)
        log.info("found humidity = ${state.humpres}")
        if
        state.AutomaticallyTurnedOn = true
        state.AutomaticallyTurnedOnAt = this.now()
        console.log('Fan On')
        
        context.api.devices.sendCommands(context.config.FanSwitch, 'switch', on)
    
        } else {
        if (!state.humpres && state.AutomaticallyTurnedOn || ManualControlMode == 'By Humidity') {
        if
        if (HumidityDropTimeout == 0) {
        console.log('Fan Off')
        
        context.api.devices.sendCommands(context.config.FanSwitch, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.HumidityDropTimeout, 'number', runIn)
    
        }
        }
        state.AutomaticallyTurnedOn = false
        }
        }
        

	})

    .subscribedEventHandler('FanSwitchHandler', (context, event) => {
        
        switch (event.value) {
        case 'on':
        if (event.isPhysical()) {
        if (!state.AutomaticallyTurnedOn && ManualControlMode == 'After Set Time' && ManualOffMinutes ) {
        if (ManualOffMinutes == 0) {
        console.log('Fan Off')
        
        context.api.devices.sendCommands(context.config.FanSwitch, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.ManualOffMinutes, 'number', runIn)
    
        }
        }
        state.AutomaticallyTurnedOn = false
        }
        break
        case 'off':
        state.AutomaticallyTurnedOn = false
        break
        }
        

	})
