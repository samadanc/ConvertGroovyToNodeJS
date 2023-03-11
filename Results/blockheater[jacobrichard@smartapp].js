
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on Which Switch', section => {
            section.deviceSetting('truck').capability(['switch']).name('');

        });


        page.section('Turn on At...', section => {
            section.timeSetting('timeon').name('When?');

        });


        page.section('Turn off At...', section => {
            section.timeSetting('timeoff').name('When?');

        });


        page.section('Set Temperature...', section => {
            section.numberSetting('temperature').name('Temp?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handleOutletOn', delay);

        context.api.schedules.schedule('handleOutletOff', delay);

    })

    .scheduledEventHandler('handleOutletOff', (context, event) => {
        
        this.sendNotificationEvent('Turning off Truck Block Heater')
        
        context.api.devices.sendCommands(context.config.truck, 'switch', off)
    
        

	})

    .scheduledEventHandler('handleOutletOn', (context, event) => {
        
        let weather = this.getWeatherFeature('conditions')
        let current_temp = weather.current_observation.temp_f
        if (current_temp < temperature ) {
        this.sendNotificationEvent('Turning on Truck Block Heater')
        
        context.api.devices.sendCommands(context.config.truck, 'switch', on)
    
        }
        

	})
