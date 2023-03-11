
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these people arrive...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Using this light sensor.', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

        });


        page.section('When it\'s below this LUX level...', section => {
            section.enumSetting('lux').name('LUX?');

        });


        page.section('For this amount of time...', section => {
            section.enumSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.presence1, 'presenceSensor', currentValue)
    
        console.log(current)
        let presenceValue = presence1.find({
        it.currentPresence == 'present'
        })
        if (presenceValue && this.enabled()) {
        
        context.api.devices.sendCommands(context.config.minutes, 'enum', toInteger)
    
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        this.runIn(s, sOff)
        }
        

	})
