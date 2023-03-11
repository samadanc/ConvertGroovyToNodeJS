
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a sensor', section => {
            section.deviceSetting('airqual').capability(['illuminanceMeasurement']).name('Air Quality Devices ');

        });


        page.section('How often do you want to send the request', section => {
            section.numberSetting('valMin').name('Value in hours or mins');
            section.enumSetting('unitSelected').name('Unit');

        });


        page.section('Select city', section => {
            section.enumSetting('citySelected').name('Cities');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.airqual, 'illuminanceMeasurement', 'refreshPushed', 'airQualityHandler')

        context.api.schedules.runEvery1Hour('handlerMethod', delay);

    })

    .subscribedEventHandler('airQualityHandler', (context, event) => {
        
        console.log('Refresh')
        this.initialize()
        

	})

    .scheduledEventHandler('handlerMethod', (context, event) => {
        
        console.log('handlerMethod1')
        if (state.timeCounter >= valMin ) {
        this.initialize()
        state.timeCounter = 1
        } else {
        state.timeCounter = state.timeCounter + 1
        }
        

	})
