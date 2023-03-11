
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


        page.section(''About'', section => {

        });


        page.section('Controlled Devices', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Select thermostat to be controlled');
            section.deviceSetting('switches').capability(['switch']).name('Select switch or outlet to be controlled');
            section.numberSetting('interval').name('Set time between circulation cycles (in minutes)');
            section.numberSetting('length').name('Set of length of circulation cycle (in minutes)');

        });


        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Temperature Sensor used to establish minimum run temperature');

        });


        page.section('Operation', section => {
            section.numberSetting('runTemp').name('Choose a temperature to set the minimum run temperature for circulate.');
            section.numberSetting('swTemp').name('Choose a temperature to set the minimum run temperature for switch or outlet.');
            section.deviceSetting('onoff').capability(['switch']).name('Select switch to control operation.  Typically a virtual switch created in the IDE');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.onoff, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.onoff, 'switch', 'switch.off', 'offHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        this.DEBUG(event.value)
        this.LOG('Running Switch On Event')
        this.scheduler()
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        this.DEBUG(event.value)
        this.LOG('Running Switch Off Event')
        this.unschedule()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', fanAuto)
    
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        

	})

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        this.DEBUG("eventHandler: ${event.value}: $evt, $settings")
        if (event.value == 'idle') {
        this.LOG('idle - running scheduler()')
        this.scheduler()
        }
        if (event.value == 'heating' || event.value == 'cooling') {
        this.LOG('not idle - running unschedule()')
        this.unschedule()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', fanAuto)
    
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        }
        

	})
