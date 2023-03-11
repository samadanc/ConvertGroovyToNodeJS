
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature sensor:', section => {
            section.deviceSetting('thermometer').capability(['temperatureMeasurement']).name('');

        });


        page.section('Use this switch:', section => {
            section.deviceSetting('myswitch').capability(['switch']).name('');

        });


        page.section('Turn on switch when temperature rises above:', section => {

        });


        page.section('Turn off switch when temperature drops below:', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermometer, 'temperatureMeasurement', 'temperature', 'onTemperatureChanged')

    })

    .subscribedEventHandler('onTemperatureChanged', (context, event) => {
        
        if (event.doubleValue < floorTemperature && myswitch.currentSwitch != 'off') {
        log.info('Turning switch off')
        
        context.api.devices.sendCommands(context.config.myswitch, 'switch', off)
    
        }
        if (event.doubleValue > ceilingTemperature && myswitch.currentSwitch != 'on') {
        log.info('Turning switch on')
        
        context.api.devices.sendCommands(context.config.myswitch, 'switch', on)
    
        }
        

	})
