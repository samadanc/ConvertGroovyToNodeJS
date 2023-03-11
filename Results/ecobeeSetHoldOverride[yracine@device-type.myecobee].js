
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('Override any holds at this ecobee thermostat with a new ecobee\'s hold override', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('MyEcobee Thermostat');

        });


        page.section('Hold until the next transition at the ecobee schedule [default=false]', section => {
            section.booleanSetting('nextTransitionFlag').name('Until the next Transition?');

        });


        page.section('Or Number of hours for the new hold override [default=no HoldHours]', section => {
            section.numberSetting('givenNbHr').name('Number of hours for the hold override');

        });


        page.section('Or End date for the new Hold override [default=no datetime hold]', section => {
            section.textSetting('givenEndDate').name('End Date, [format = YYYY-MM-DD], ex. 2019-01-01');
            section.textSetting('givenEndTime').name('End time,[HH:MM 24HR] ex. 23:05:00');

        });


        page.section('Or get start/end dates from lock Manager API URL, current user is assumed to be in the first 10 slots [format: https://graph.api.smartthings.com/api/smartapps/installations/ID/api?access_token=ACCESS_TOKEN]', section => {
            section.textSetting('APIUrl').name('lock Manager API URL?');

        });


        page.section('What do I use for the Master on/off switch to enable/disable smartapp processing? [optional]', section => {
            section.deviceSetting('powerSwitch').capability(['switch']).name('');

        });


        page.section('Set for specific ST location mode(s) [default=all]', section => {
            section.enumSetting('selectedModes').name('');

        });


        page.section('', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.booleanSetting('detailedNotif').name('Detailed Logging & Notifications?');
            section.enumSetting('logFilter').name('log filtering [Level 1=ERROR only,2=<Level 1+WARNING>,3=<2+INFO>,4=<3+DEBUG>,5=<4+TRACE>]?');

        });


        page.section('Enable Amazon Echo/Ask Alexa Notifications for events logging (optional)', section => {
            section.booleanSetting('askAlexaFlag').name('Ask Alexa verbal Notifications [default=false]?');
            section.enumSetting('listOfMQs').name('List of the Ask Alexa Message Queues (default=Primary)');
            section.numberSetting('AskAlexaExpiresInDays').name('Ask Alexa\');

        });


        page.section('Logging', section => {
            section.booleanSetting('detailedNotif').name('Detailed Logging?');
            section.enumSetting('logFilter').name('log filtering [Level 1=ERROR only,2=<Level 1+WARNING>,3=<2+INFO>,4=<3+DEBUG>,5=<4+TRACE>]?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'thermostat', 'programScheduleName', 'checkOverrideHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'thermostat', 'coolingSetpoint', 'coolingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powerSwitch, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powerSwitch, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('checkOverrideHandler', (context, event) => {
        
        this.traceEvent(settings.logFilter, "checkOverrideHandler>evt=${event.value}", settings.detailedNotif)
        let heatSP = ecobee.currentHeatingSetpoint
        let coolSP = ecobee.currentCoolingSetpoint
        String currentMode = ecobee.currentThermostatMode
        if (event.value.contains('hold')) {
        if (currentMode in ['cool', 'auto', 'off']) {
        this.save_new_cool_baseline_value(coolSP)
        this.traceEvent(settings.logFilter, "checkOverrideHandler>new cooling baseline=$coolSP, manual hold set", settings.detailedNotif, this.get_LOG_INFO())
        }
        if (currentMode in ['heat', 'auto', 'off']) {
        this.save_new_heat_baseline_value(heatSP)
        this.traceEvent(settings.logFilter, "checkOverrideHandler>new heating baseline=$heatSP, manual hold set", settings.detailedNotif, this.get_LOG_INFO())
        }
        this.takeAction()
        }
        if (event.value.contains('_auto')) {
        if (currentMode in ['cool', 'auto', 'off'] && state?.scheduleCoolSetpoint != coolSP ) {
        this.save_new_cool_baseline_value(coolSP)
        this.traceEvent(settings.logFilter, "checkOverrideHandler>new cooling baseline=$coolSP, climateRef= ${event.value} set", settings.detailedNotif, this.get_LOG_INFO())
        }
        if (currentMode in ['heat', 'auto', 'off'] && state?.scheduleHeatSetpoint != heatSP ) {
        this.save_new_heat_baseline_value(heatSP)
        this.traceEvent(settings.logFilter, "checkOverrideHandler>new heating baseline=$heatSP, climateRef= ${event.value} set", settings.detailedNotif, this.get_LOG_INFO())
        }
        }
        

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
        this.traceEvent(settings.logFilter, "onHandler>${event.name}: ${event.value}", settings.detailedNotif)
        this.takeAction()
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        this.traceEvent(settings.logFilter, "offHandler>${event.name}: ${event.value}", settings.detailedNotif)
        this.takeAction()
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        this.traceEvent(settings.logFilter, "coolingSetpointHandler>cooling Setpoint now: ${event.value}", settings.detailedNotif)
        

	})

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        this.traceEvent(settings.logFilter, "heatingSetpointHandler>heating Setpoint now: ${event.value}", settings.detailedNotif)
        

	})
