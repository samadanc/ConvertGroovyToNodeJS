
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Program', section => {
            section.textSetting('name').name('Program Name');
            section.booleanSetting('enabled').name('Active');

        });


        page.section('When to run', section => {
            section.enumSetting('weekdays').name('Set Days of Week');
            section.enumSetting('hours').name('Select Times of Day');

        });


        page.section('Threshold Settings', section => {
            section.enumSetting('timeInterval').name('Select Measurement Interval');
            section.deviceSetting('meter').capability(['powerMeter']).name('Select Power Meter to Trigger throttling on (\');
            section.deviceSetting('circuits').capability(['powerMeter']).name('Circuits to send alerts on');

        });


        page.section('Controlled Appliances', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Select your Thermostat');
            section.deviceSetting('switches').capability(['switch']).name('Select your Load Controllers');

        });


        page.section('Send Push Notification?', section => {
            section.booleanSetting('sendPush').name('Send Push Notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'checkEnergyMonitor')

    })

    .subscribedEventHandler('checkEnergyMonitor', (context, event) => {
        
        let mf = new java.text.SimpleDateFormat('m')
        let minute = Integer.parseInt(mf.format(new Date())) % Integer.parseInt(timeInterval)
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentState)
    
        state.readings[ minute ] = Float.parseFloat(power)
        

	})
