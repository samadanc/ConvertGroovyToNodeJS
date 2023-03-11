
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About Open-Dash'', section => {

        });


        page.section('Send Notifications?', section => {

        });


        page.section('Enable Logging', section => {
            section.booleanSetting('logging').name('Enable Logging for debugging');

        });


        page.section('Allow Endpoint to Control These Things by Their Capabilities (You only need to choose one capability to get access to full device, however, selecting all capabilities will not create duplicate devices...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config., '', debug)
    
        if (!state.updates) {
        state.updates = []
        }
        
        context.api.devices.sendCommands(context.config., '', eventJson)
    
        shm.id = 'shm'
        state.updates << shm
        

	})

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config., '', debug)
    
        if (state.webhook) {
        this.logField(evt, {
        
        context.api.devices.sendCommands(context.config., '', toString)
    
        })
        }
        
        context.api.devices.sendCommands(context.config., '', eventJson)
    
        if (!state.updates) {
        state.updates = []
        }
        let x = state.updates.findAll({
        js.id == it.id
        })
        if (x) {
        for (let i : x ) {
        state.updates.remove
        }
        }
        state.updates << js
        

	})
