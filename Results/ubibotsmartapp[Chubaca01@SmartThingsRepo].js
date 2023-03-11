
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a sensor', section => {
            section.deviceSetting('temp').capability(['temperatureMeasurement']).name('Ubibot temperature Devices ');

        });


        page.section('How often do you want to send the request', section => {
            section.numberSetting('valMin').name('Value in hours or mins');
            section.enumSetting('unitSelected').name('Unit');

        });


        page.section('Select unit for temperature', section => {
            section.enumSetting('degreeSelected').name('Degree');

        });


        page.section('Enter your Ubibot channel ID & API key', section => {
            section.textSetting('channelId').name('channel ID');
            section.textSetting('accountKey').name('Account Key');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('handlerMethod', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.temp, 'temperatureMeasurement', 'refreshPushed', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log('Refresh')
        this.updateParameters()
        

	})

    .scheduledEventHandler('handlerMethod', (context, event) => {
        
        console.log('handlerMethod1')
        if (state.timeCounter >= valMin ) {
        this.updateParameters()
        state.timeCounter = 1
        } else {
        state.timeCounter = state.timeCounter + 1
        }
        

	})
