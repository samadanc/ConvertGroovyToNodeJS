
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external service to control these things...', section => {
            section.deviceSetting('priceSensor').capability(['sensor']).name('');
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.priceSensor, 'sensor', 'price', 'priceHandler')

    })

    .subscribedEventHandler('priceHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.priceSensor, 'sensor', currentValue)
    
        
        context.api.devices.sendCommands(context.config.priceSensor, 'sensor', currentValue)
    
        this.handlePriceUpdate(priceValue)
        

	})
