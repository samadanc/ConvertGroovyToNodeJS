
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('X-10 Switches, Modules and Relays', section => {
            section.textSetting('deviceName').name('Device Name');
            section.enumSetting('deviceType').name('Device Type RF/PL');
            section.enumSetting('deviceHouseCode').name('X-10 House Code');
            section.enumSetting('deviceUnitCode').name('X-10 Unit Code');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'X10RemoteEvent-${state.deviceString}', 'X10RemoteEventHandler')

    })

    .subscribedEventHandler('X10RemoteEventHandler', (context, event) => {
        
        console.log("X10RemoteEventHandler Event: ${event.stringValue}")
        let data = this.parseJson(event.data)
        this.setDeviceStatus(data.deviceString, data.status)
        

	})
