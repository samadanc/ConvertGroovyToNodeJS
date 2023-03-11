
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('When this sensor vibrates...', section => {
            section.deviceSetting('contact1').capability(['accelerationSensor']).name('Where?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('For how long?', section => {
            section.numberSetting('time1').name('Number of minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'accelerationSensor', 'acceleration.active', 'initialize')

    })

    .subscribedEventHandler('initialize', (context, event) => {
        
        console.log('Turning switch ON')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        let delay = time1 * 60
        this.runIn(delay, 'turnOff')
        

	})
