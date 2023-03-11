
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Config', section => {
            section.deviceSetting('dimmer').capability(['switchLevel']).name('');
            section.numberSetting('defaultlevel').name('Default brightness');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmer, 'switchLevel', 'switch.on', 'dimHandler')

    })

    .subscribedEventHandler('dimHandler', (context, event) => {
        
        log.trace("${dimmer.displayName} was turned on...")
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', currentValue)
    
        
        context.api.devices.sendCommands(context.config.defaultlevel, 'number', toInteger)
    
        if (crntDimmerLevel == dimmerDefault ) {
        return null
        }
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', setLevel)
    
        

	})
