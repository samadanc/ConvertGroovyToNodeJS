
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Página de instalación', section => {
            section.deviceSetting('sensores').capability(['motionSensor']).name('');
            section.deviceSetting('interruptor').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        log.debut('Sale el Sol')
        this.sendPush('Ha salido el Sol')
        
        context.api.devices.sendCommands(context.config.interruptor, 'switch', off)
    
        this.unsubscribe(sensores)
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log('Se pone el Sol')
        this.sendPush('Se ha puesto el Sol')
        this.subscribe(sensores, 'motion', encenderluces)
        

	})
