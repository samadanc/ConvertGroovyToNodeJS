
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose RTSes to monitor... ', section => {

        });


        page.section('Choose Radiator Thermostats to monitor', section => {

        });


        page.section('Choose Battery % Warning Threshold', section => {
            section.numberSetting('batteryPercent').name('Battery %');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.vact, 'device.wiserRadiatorThermostat', 'valveCalibrationStatus', 'valveStatusUpdate')

    })

    .subscribedEventHandler('valveStatusUpdate', (context, event) => {
        
        if (event.value.contains('Error')) {
        this.sendPush("${event.getDevice().displayName}: ${event.value}")
        }
        

	})

    .subscribedEventHandler('batteryUpdate', (context, event) => {
        
        if (event.value <= batteryPercent ) {
        this.sendPush("${event.getDevice().displayName} battery low: ${event.value}%")
        }
        

	})
