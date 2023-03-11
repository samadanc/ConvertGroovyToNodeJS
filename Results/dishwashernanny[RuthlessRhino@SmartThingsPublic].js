
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Dishwasher temperature sensor', section => {
            section.deviceSetting('dishTemp').capability(['temperatureMeasurement']).name('Which?');

        });


        page.section('Running temperature threshold F', section => {
            section.enumSetting('runningThreshold').name('Degrees');

        });


        page.section('Complete temperature threshold F (must be less than running...', section => {
            section.enumSetting('doneThreshold').name('Degrees');
            section.deviceSetting('dishContact').capability(['contactSensor']).name('Which?');
            section.deviceSetting('indicator').capability(['switch']).name('Which?');

        });


        page.section('Dishwasher door contact', section => {
            section.deviceSetting('dishContact').capability(['contactSensor']).name('Which?');

        });


        page.section('Indicator switch panel', section => {
            section.deviceSetting('indicator').capability(['switch']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dishTemp, 'temperatureMeasurement', 'temperature', 'tempHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dishContact, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.indicator, 'switch', 'switch', 'indicatorHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let m = state.map
        log.info("contact:${event.value} map:$m")
        if 
        
        context.api.devices.sendCommands(context.config.indicator, 'switch', strobe)
    
        }
        

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
        let m = state.map
        log.info("temp:${event.integerValue} map:$m")
        if
        if (!m.done && m.manReset && m.tempReset) {
        m.running = true
        }
        } else {
        if
        if (m.running) {
        m.done = true
        m.tempReset = true
        m.running = false
        
        context.api.devices.sendCommands(context.config.indicator, 'switch', flash)
    
        
        context.api.devices.sendCommands(context.config.indicator, 'switch', on)
    
        }
        } else {
        }
        }
        if (m.running) {
        
        context.api.devices.sendCommands(context.config.indicator, 'switch', flash)
    
        }
        

	})

    .subscribedEventHandler('indicatorHandler', (context, event) => {
        
        let m = state.map
        log.info("indicator:${event.value} map:$m")
        if (event.value == 'off') {
        m.manReset = true
        m.done = false
        m.tempReset = true
        m.running = false
        }
        

	})
