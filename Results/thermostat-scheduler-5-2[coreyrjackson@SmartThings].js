
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... 10/28/2015 8:24 PM ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Monday thru Friday Schedule', section => {
            section.timeSetting('time1').name('Wake Time of Day');
            section.numberSetting('tempSetpoint1').name('Wake Heat Temp Degrees Fahrenheit?');
            section.timeSetting('time2').name('Leave Time of Day');
            section.numberSetting('tempSetpoint2').name('Leave Heat Temp Degrees Fahrenheit?');
            section.timeSetting('time3').name('Return Time of Day');
            section.numberSetting('tempSetpoint3').name('Return Heat Degrees Fahrenheit?');
            section.timeSetting('time4').name('Sleep Time of Day');
            section.numberSetting('tempSetpoint4').name('Sleep Heat Degrees Fahrenheit?');

        });


        page.section('Saturday and Sunday Schedule', section => {
            section.timeSetting('time11').name('Wake Time of Day');
            section.numberSetting('tempSetpoint11').name('Wake Heat Temp Degrees Fahrenheit?');
            section.timeSetting('time21').name('Leave Time of Day');
            section.numberSetting('tempSetpoint21').name('Leave Heat Temp Degrees Fahrenheit?');
            section.timeSetting('time31').name('Return Time of Day');
            section.numberSetting('tempSetpoint31').name('Return Heat Degrees Fahrenheit?');
            section.timeSetting('time41').name('Sleep Time of Day');
            section.numberSetting('tempSetpoint41').name('Sleep Heat Degrees Fahrenheit?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostat', 'thermostatHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint3', 'HeatingSetpoint3Handler')

        context.api.schedules.schedule('changetemp31', delay);

        context.api.schedules.schedule('changetemp4', delay);

        context.api.schedules.schedule('changetemp21', delay);

        context.api.schedules.schedule('changetemp3', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint2', 'HeatingSetpoint2Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint1', 'HeatingSetpoint1Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint21', 'HeatingSetpoint21Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint41', 'HeatingSetpoint41Handler')

        context.api.schedules.schedule('initialize', delay);

        context.api.schedules.schedule('changetemp1', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint31', 'HeatingSetpoint31Handler')

        context.api.schedules.schedule('changetemp2', delay);

        context.api.schedules.schedule('changetemp41', delay);

        context.api.schedules.schedule('changetemp11', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint4', 'HeatingSetpoint4Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'tempSetpoint11', 'HeatingSetpoint11Handler')

    })
