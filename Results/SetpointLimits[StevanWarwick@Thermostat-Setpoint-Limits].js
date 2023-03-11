
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which thermostat would you like to set limits on?', section => {
            section.deviceSetting('thermostatDevices').capability(['thermostat']).name('Select thermostat to set limits on');

        });


        page.section('Set the cooling and heating limits', section => {
            section.numberSetting('coolingLimit').name('Cooling Limit');
            section.numberSetting('heatingLimit').name('Heating Limit');

        });


        page.section('Send these messages when cooling and heating limits are exceeded (optional, sends standard status message if not specified)', section => {
            section.textSetting('coolingLimitMessageText').name('Cooling Limit Message Text');
            section.textSetting('heatingLimitMessageText').name('Heating Limit Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevices, 'thermostat', 'heatingSetpoint', 'onHeatingSetpointChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevices, 'thermostat', 'coolingSetpoint', 'onCoolingSetpointChanged')

        context.api.schedules.runEvery5Minutes('ensureSetpointLimits', delay);

    })

    .subscribedEventHandler('onCoolingSetpointChanged', (context, event) => {
        
        console.log("Cooling point changed on ${event.device.displayName} to ${event.value} and cooling limit is $coolingLimit.")
        if
        console.log("Cooling limit exceeded on ${event.device.displayName}. Cooling set point will be set to $coolingLimit.")
        event.device.setCoolingSetpoint
        this.sendNotification(evt)
        }
        

	})

    .subscribedEventHandler('onHeatingSetpointChanged', (context, event) => {
        
        console.log("Heating point changed on ${event.device.displayName} to ${event.value} and heating limit is $heatingLimit.")
        if
        console.log("Heating limit exceeded on ${event.device.displayName}. Heating set point will be set to $heatingLimit.")
        event.device.setHeatingSetpoint
        this.sendNotification(evt)
        }
        

	})

    .scheduledEventHandler('ensureSetpointLimits', (context, event) => {
        
        console.log('Checking set point limits')
        for (let thermostat : thermostatDevices ) {
        if (thermostat.currentCoolingSetpoint != null) {
        this.ensureCoolingSetpointLimit(thermostat, thermostat.currentCoolingSetpoint.toInteger())
        } else {
        console.log("Current cooling set point is not available for ${thermostat.displayName}")
        }
        if (thermostat.currentHeatingSetpoint != null) {
        this.ensureHeatingSetpointLimit(thermostat, thermostat.currentHeatingSetpoint.toInteger())
        } else {
        console.log("Current heating set point is not available for ${thermostat.displayName}")
        }
        }
        

	})
