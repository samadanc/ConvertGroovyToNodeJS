
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control Close Buttons...', section => {
            section.deviceSetting('switchesOpen').capability(['button']).name('Open Buttons');
            section.deviceSetting('switchesClose').capability(['button']).name('Close Buttons');
            section.deviceSetting('switchesPause').capability(['button']).name('Pause Buttons');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers');
            section.deviceSetting('shades').capability(['switchLevel']).name('Shades');
            section.booleanSetting('invertControl').name('Invert controls');

        });


        page.section('Timers...', section => {
            section.timeSetting('theTimeOpen').name('Time to execute Open');
            section.timeSetting('theTimeHalf').name('Time to execute 50%');
            section.timeSetting('theTimeClose').name('Time to execute Close');

        });


        page.section('Automation...', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');
            section.numberSetting('threshold').name('Temperature threshold');
            section.numberSetting('desiredTemperature').name('Desired Temperature');
            section.timeSetting('theTemperatureControlStart').name('Time to Start Automation');
            section.timeSetting('theTemperatureControlEnd').name('Time to End Automation');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'dimmersEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switchesClose, 'button', 'button', 'buttonEventClose')

        context.api.schedules.schedule('automationBeginFunction', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.switchesOpen, 'button', 'button', 'buttonEventOpen')

        context.api.schedules.schedule('handlerSchClose', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switchesPause, 'button', 'button', 'buttonEventPause')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch.setLevel', 'dimmersEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch.on', 'dimmersEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.shades, 'switchLevel', 'windowShade', 'windowShadeEvent')

        context.api.schedules.schedule('handlerSchOpen', delay);

        context.api.schedules.schedule('handlerSchHalf', delay);

        context.api.schedules.schedule('automationEndFunction', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch.off', 'dimmersEvent')

    })

    .subscribedEventHandler('buttonEventOpen', (context, event) => {
        
        console.log('Opening shades:')
        if (this.isWorking()) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', pause)
    
        } else {
        if (switchesClose == null) {
        if (this.getLevel() < 50) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', close)
    
        } else {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', open)
    
        }
        } else {
        if (event.value == 'held' && !invertControl || event.value == 'pushed' && invertControl ) {
        console.log('button was held')
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', open)
    
        } else {
        if (event.value == 'pushed' && !invertControl || event.value == 'held' && invertControl ) {
        if (this.getLevel() <= 100 && this.getLevel() > 75) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() <= 75 && this.getLevel() > 50) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() <= 50 && this.getLevel() > 25) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() <= 25 && this.getLevel() > 0) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', open)
    
        }
        }
        }
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('dimmersEvent', (context, event) => {
        
        log.info("switchSetLevelHandler Event: $level")
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', close)
    
        return null
        }
        if (event.value == 'off') {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', open)
    
        return null
        }
        let level = event.value.toFloat()
        level = level.toInteger()
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        

	})

    .subscribedEventHandler('buttonEventPause', (context, event) => {
        
        console.log("Pausing Shades: $evt")
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', pause)
    
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        this.setTemperature(event.doubleValue)
        

	})

    .subscribedEventHandler('windowShadeEvent', (context, event) => {
        
        console.log("windowShadeEvent Event: ${event.value}")
        state.isWorking = event.value == 'opening' || event.value == 'closing'
        

	})

    .subscribedEventHandler('buttonEventClose', (context, event) => {
        
        console.log('Closing Shades')
        if (this.isWorking()) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', pause)
    
        } else {
        if (event.value == 'held' && !invertControl || event.value == 'pushed' && invertControl ) {
        console.log('button was held')
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', close)
    
        } else {
        if (event.value == 'pushed' && !invertControl || event.value == 'held' && invertControl ) {
        console.log('button was pushed')
        if (this.getLevel() < 100 && this.getLevel() >= 75) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', close)
    
        } else {
        if (this.getLevel() < 75 && this.getLevel() >= 50) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() < 50 && this.getLevel() >= 25) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() < 25 && this.getLevel() >= 0) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        }
        }
        }
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('automationBeginFunction', (context, event) => {
        
        if (automationEnabled == 'true') {
        state.defaultPosition = this.getLevel()
        log.info("Storing current position to return after automation, value is ${state.defaultPosition}")
        return null
        }
        

	})

    .scheduledEventHandler('handlerSchHalf', (context, event) => {
        
        if (automationEnabled == 'true') {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        }
        

	})

    .scheduledEventHandler('handlerSchClose', (context, event) => {
        
        if (automationEnabled == 'true') {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', close)
    
        }
        

	})

    .scheduledEventHandler('automationEndFunction', (context, event) => {
        
        if (automationEnabled == 'true') {
        log.info("End of automation returning to open position, value ${state.defaultPosition}")
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        }
        

	})

    .scheduledEventHandler('handlerSchOpen', (context, event) => {
        
        if (automationEnabled == 'true') {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', open)
    
        }
        

	})
        console.log("{{interesting}}")
