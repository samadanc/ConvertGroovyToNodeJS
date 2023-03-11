
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the Stelpro thermostats that will receive the weather... ', section => {
            section.deviceSetting('thermostats').capability(['refresh']).name('select thermostats');

        });


        page.section(''  '', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('getWeather', delay);

    })

    .scheduledEventHandler('getWeather', (context, event) => {
        
        console.log('getWeather')
        
        context.api.devices.sendCommands(context.config.thermostats, 'refresh', updateWeather)
    
        

	})
