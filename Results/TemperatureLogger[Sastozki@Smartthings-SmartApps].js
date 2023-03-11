
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configure', section => {
            section.textSetting('xi_apikey').name('Xively API Key');
            section.numberSetting('xi_feed').name('Xively Feed ID');
            section.textSetting('xi_chan').name('Xively Channel Name');
            section.deviceSetting('temperature1').capability(['temperatureMeasurement']).name('Which temperature');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('cronJob', delay);

    })

    .scheduledEventHandler('cronJob', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.temperature1, 'temperatureMeasurement', currentValue)
    
        this.writeChannelData(xi_feed, xi_chan, currentTemp)
        

	})
