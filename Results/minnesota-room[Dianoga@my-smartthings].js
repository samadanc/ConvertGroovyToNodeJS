
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Minnesota Room', section => {
            section.deviceSetting('roomTemp').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('roomHeaters').capability(['switch']).name('Heater');
            section.deviceSetting('roomContactSensors').capability(['contactSensor']).name('Doors and Windows');
            section.numberSetting('roomMinTemp').name('Minimum Temperature');
            section.numberSetting('roomOccupiedTemp').name('Occupied Temperature');

        });


        page.section('House', section => {
            section.deviceSetting('houseTemp').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('houseDoor').capability(['contactSensor']).name('Interior Door');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.houseTemp, 'temperatureMeasurement', 'temperature', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.houseDoor, 'contactSensor', 'contact', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.roomTemp, 'temperatureMeasurement', 'temperature', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.roomContactSensors, 'contactSensor', 'contact', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        let currentRoomTemp = settings.roomTemp.currentTemperature
        let currentHouseTemp = settings.houseTemp.currentTemperature
        console.log("Room: $currentRoomTemp, House: $currentHouseTemp")
        console.log("Interior Door: ${settings.houseDoor.currentContact}, Room Doors: ${settings.roomContactSensors?.currentContact}")
        if (currentRoomTemp > currentHouseTemp || settings.roomContactSensors?.currentContact.contains('open')) {
        settings.roomHeaters?.off()
        return null
        }
        if (settings.houseDoor.currentContact == 'open') {
        if (currentRoomTemp < settings.roomOccupiedTemp) {
        settings.roomHeaters?.on()
        } else {
        settings.roomHeaters?.off()
        }
        } else {
        if (currentRoomTemp < settings.roomMinTemp) {
        settings.roomHeaters?.on()
        } else {
        settings.roomHeaters?.off()
        }
        }
        

	})
