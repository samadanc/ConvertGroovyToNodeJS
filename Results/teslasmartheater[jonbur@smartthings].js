
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('HVACswitch').capability(['switch']).name('Select the Tesla HVAC switch');
            section.deviceSetting('presencesensor').capability(['presenceSensor']).name('Select the presence sensor');
            section.deviceSetting('temperaturesensor').capability(['temperatureMeasurement']).name('Select the temperature sensor');
            section.timeSetting('targettime').name('Time to execute every (week) day');
            section.numberSetting('minimumtemperature').name('Enter minimum temperature');
            section.enumSetting('days').name('Select Days of the Week');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('eventHandler', delay);

    })

    .scheduledEventHandler('eventHandler', (context, event) => {
        
        console.log('event handler')
        
        context.api.devices.sendCommands(context.config.temperaturesensor, 'temperatureMeasurement', log)
    
        
        context.api.devices.sendCommands(context.config.presencesensor, 'presenceSensor', log)
    
        let df = new java.text.SimpleDateFormat('EEEE')
        df.setTimeZone(location.timeZone)
        let day = df.format(new Date())
        
        context.api.devices.sendCommands(context.config.days, 'enum', contains)
    
        if (dayCheck) {
        console.log('Today is one of the target days')
        if
        console.log('Temperature less than minimum')
        if
        console.log('Car is present')
        console.log('Turn on the HVAC')
        
        context.api.devices.sendCommands(context.config.HVACswitch, 'switch', on)
    
        } else {
        console.log('Car not present')
        }
        } else {
        console.log('Temperature more than minimum')
        }
        } else {
        console.log('Today is not one of the target days. Nothing to do.')
        }
        

	})
