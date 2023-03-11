
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Faucets?', section => {
            section.deviceSetting('faucet').capability(['accelerationSensor']).name('Which faucet?');

        });


        page.section('Who to text', section => {

        });


        page.section('How often do you want grandma to check in?', section => {
            section.numberSetting('minutes').name('Delay in minutes before we notify you');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.faucet, 'accelerationSensor', 'acceleration.active', 'faucetActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.faucet, 'accelerationSensor', 'acceleration.inactive', 'faucetInactiveHandler')

    })

    .subscribedEventHandler('faucetInactiveHandler', (context, event) => {
        
        log.trace('#faucetClosedHandler#')
        
        context.api.devices.sendCommands(context.config.minutes, 'number', toInteger)
    
        console.log("waiting...$inputSeconds")
        this.runIn(inputSeconds, alertMe)
        

	})

    .subscribedEventHandler('faucetActiveHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.minutes, 'number', toInteger)
    
        let deltaSeconds = inputSeconds
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.faucet, 'accelerationSensor', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        console.log("Recent Events ${recentEvents.value}")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'active'
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone1 within the last $minutes minute")
        } else {
        this.sendSms(phone, 'Grandma opened faucet')
        state.lastOpened.date = this.now()
        console.log("Grandma Opened Faucet: ${state.lastOpened}")
        }
        

	})
