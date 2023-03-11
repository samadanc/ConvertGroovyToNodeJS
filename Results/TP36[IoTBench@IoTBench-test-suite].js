
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change the Thermostat Mode by selected switches...', section => {
            section.deviceSetting('HEAT').capability(['switch']).name('This Switch will turn on/off the HEAT...');
            section.deviceSetting('COOL').capability(['switch']).name('This Switch will turn on/off the COOL...');
            section.deviceSetting('AUTO').capability(['switch']).name('This Switch will turn on/off the AUTO...');

        });


        page.section('Select Switch to change between Thermostat-Fan ON/AUTO...', section => {
            section.deviceSetting('master').capability(['switch']).name('Switch button is trigged...');

        });


        page.section('Choose thermostat(s)', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Notify me...', section => {
            section.booleanSetting('pushNotification_MODE').name('Thermostat Mode change with Push Notification');
            section.booleanSetting('pushNotification_FAN').name('Thermostat Fan change with Push Notification');

        });


        page.section(''App Name (optional, defaults to Thermostat Name)...'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.COOL, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AUTO, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.HEAT, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode.Cool', 'thermostatCHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatFanMode.fanOn', 'thermostatOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatFanMode.fanAuto', 'thermostatAutoHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode.Heat', 'thermostatHHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode.Off', 'thermostatOHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.COOL, 'switch', 'switch.on', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.HEAT, 'switch', 'switch.on', 'HswitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode.Auto', 'thermostatAHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AUTO, 'switch', 'switch.on', 'AswitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onSwitchHandler')

    })

    .subscribedEventHandler('thermostatOHandler', (context, event) => {
        
        console.log('')
        console.log('------T-OFF-----')
        log.info("ModetHandler Event Value-OFF: ${event.value}")
        log.info("ModeHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        console.log("ThermoMode-OFF: $Thermofan")
        this.Notification()
        

	})

    .subscribedEventHandler('offSwitchHandler', (context, event) => {
        
        console.log('S-OFF---------------------------------------------')
        log.info("offSwitchHandler Event Value: ${event.value}")
        log.info("offSwitchHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.master, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        if (MasterV == 'off') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatFanMode)
    
        } else {
        console.log('problem' + Thermofan )
        }
        

	})

    .subscribedEventHandler('thermostatAutoHandler', (context, event) => {
        
        console.log('')
        console.log('------T-OFF-----')
        
        context.api.devices.sendCommands(context.config.master, 'switch', off)
    
        log.info("FanHandler Event Value-Auto: ${event.value}")
        log.info("FanHandler Event Name: ${event.name}")
        this.Notification1()
        

	})

    .subscribedEventHandler('AswitchHandler', (context, event) => {
        
        console.log('')
        console.log('S-AUTO---------------------------------------------')
        log.info("switchHandler Event Value: ${event.value}")
        log.info("switchHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', currentValue)
    
        if (TMAuto == 'on') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        console.log("ThermoMode-Status: $ThermoMode")
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', currentValue)
    
        console.log(" AUTO-Mode: TM-Heat: $TMHeat2 TM-Cool: $TMCool2 TM-Auto: $TMAuto2")
        }
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log('')
        console.log('S-OFF----------------------------------------------')
        log.info("switchHandler Event Value: ${event.value}")
        log.info("switchHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', currentValue)
    
        if (TMAuto2 == 'off' && TMHeat2 == 'off' && TMCool2 == 'off') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        console.log("ThermoMode-OFF Status: $ThermoMode")
        console.log("OFF-Mode: TM-Off: $TMHeat2 TM-Cool: $TMCool2 TM-Auto: $TMAuto2")
        }
        

	})

    .subscribedEventHandler('thermostatAHandler', (context, event) => {
        
        console.log('')
        console.log('------T-AUTO----')
        log.info("ModetHandler Event Value-Auto: ${event.value}")
        log.info("ModeHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        console.log("ThermoMode-Auto: $Thermofan")
        this.Notification()
        

	})

    .subscribedEventHandler('onSwitchHandler', (context, event) => {
        
        console.log('S-ON-------------------------------------------')
        log.info("onSwitchHandler Event Value: ${event.value}")
        log.info("onSwitchHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.master, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        if (MasterV == 'on') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatFanMode)
    
        } else {
        console.log('problem' + Thermofan )
        }
        

	})

    .subscribedEventHandler('thermostatOnHandler', (context, event) => {
        
        console.log('')
        console.log('------T-ON-----')
        
        context.api.devices.sendCommands(context.config.master, 'switch', on)
    
        log.info("FanHandler Event Value-ON: ${event.value}")
        log.info("FanHandler Event Name: ${event.name}")
        this.Notification1()
        

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log('')
        console.log('S-COOL---------------------------------------------')
        log.info("switchHandler Event Value: ${event.value}")
        log.info("switchHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', currentValue)
    
        if (TMCool == 'on') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        console.log("ThermoMode-Status: $ThermoMode")
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', currentValue)
    
        console.log(" COOL-Mode: TM-Heat: $TMHeat2 TM-Cool: $TMCool2 TM-Auto: $TMAuto2")
        }
        

	})

    .subscribedEventHandler('thermostatHHandler', (context, event) => {
        
        console.log('')
        console.log('------T-HEAT----')
        log.info("ModetHandler Event Value-Heat: ${event.value}")
        log.info("ModeHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        console.log("ThermoMode-Heat: $Thermofan")
        this.Notification()
        

	})

    .subscribedEventHandler('HswitchHandler', (context, event) => {
        
        console.log('')
        console.log('S-HEAT---------------------------------------------')
        log.info("switchHandler Event Value: ${event.value}")
        log.info("switchHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', currentValue)
    
        if (TMHeat == 'on') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        console.log("ThermoMode-Status: $ThermoMode")
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        
        context.api.devices.sendCommands(context.config.HEAT, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.AUTO, 'switch', currentValue)
    
        console.log(" HEAT-Mode: TM-Heat: $TMHeat2 TM-Cool: $TMCool2 TM-Auto: $TMAuto2")
        }
        

	})

    .subscribedEventHandler('thermostatCHandler', (context, event) => {
        
        console.log('')
        console.log('------T-COOL----')
        log.info("ModetHandler Event Value-Cool: ${event.value}")
        log.info("ModeHandler Event Name: ${event.name}")
        
        context.api.devices.sendCommands(context.config.COOL, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        console.log("ThermoMode-Cool: $Thermofan")
        this.Notification()
        

	})
