
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('When this door opens...');
            section.deviceSetting('switches').capability(['switch']).name('Turn on this/these Fibaro Controller(s)...');
            section.enumSetting('switchAction').name('And run this action (optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.closed', 'contactclosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.closed', 'contactClosedHandler')

    })

    .subscribedEventHandler('contactclosedHandler', (context, event) => {
        
        log.trace("Turning off Controllers: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        if (switchAction) {
        switches."$switchAction"()
        } else {
        let cnt = this.counterHandler()
        log.trace("Turning on Controllers $switches with: ${state.actionList.get(cnt)}")
        switches."${state.actionList.get(cnt)}"()
        }
        

	})
