
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.enumSetting('physicalSensorType').name('Which sensor type is the physical device?');
            section.enumSetting('virtualSensorType').name('Which sensor type is the virtual device?');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('physicalSensorEventHandler', (context, event) => {
        
        console.log("Handled event ${event.name} with value ${event.value} from physical device ${event.displayName}")
        console.log('unscheduling action')
        this.unschedule(invokeAction)
        console.log('unscheduled action')
        if (physicalSensors."$logicalOperation"({ let sensor ->
        sensor.currentValue(event.name) == physicalSensorAction
        })) {
        console.log('Scheduling action')
        this.runIn(delay, invokeAction)
        }
        

	})

    .subscribedEventHandler('virtualSensorEventHandler', (context, event) => {
        
        console.log("Handled event ${event.name} with value ${event.value} from virtual device ${event.displayName} ")
        

	})
