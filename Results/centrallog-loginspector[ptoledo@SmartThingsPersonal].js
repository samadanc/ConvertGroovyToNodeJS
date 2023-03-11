
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set the "CentralLog - Device', section => {
            section.deviceSetting('theCentralLog').capability(['notification']).name('Pick your CentralLog device');

        });


        page.section('Set the "CentralLog - BulbGroup Device', section => {
            section.deviceSetting('theBulbGroupDevice').capability(['switch']).name('Pick your BulbGroup device');

        });


        page.section('Set the Sensors to watch', section => {
            section.deviceSetting('theSensors').capability(['motionSensor']).name('Pick your Motion Sensor devices');

        });


        page.section('Set the communication channel', section => {
            section.numberSetting('theChannel').name('Set your channel for communication with the CentralLog');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theCentralLog, 'notification', 'notification.deviceNotification', 'logHandler')

    })

    .subscribedEventHandler('logHandler', (context, event) => {
        
        if (this.parseJson(event.data).type == 'active' && theBulbGroupDevice.currentSettingController == 'Inspector') {
        this.internalAction(['theOff': false])
        }
        

	})
