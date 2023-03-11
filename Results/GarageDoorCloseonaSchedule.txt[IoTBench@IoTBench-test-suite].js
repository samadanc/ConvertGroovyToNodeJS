
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose your Garage Door Sensor...', section => {
            section.deviceSetting('garageDoorStatus').capability(['contactSensor']).name('Where?');

        });


        page.section('Select Garage Door Opener to Control...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('If Open, Close My Garage Door at...', section => {
            section.timeSetting('time1').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace('scheduledCheck')
        let currentState = garageDoorStatus.contactState
        if (currentState?.value == 'open') {
        console.log('Garage Door was open - Closing.')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        console.log('Garage Door was not open. No Action.')
        }
        

	})
