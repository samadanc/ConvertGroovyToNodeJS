
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Input', section => {

        });


        page.section('', section => {
            section.booleanSetting('forward_events').name('Forward');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanEventHandler')

    })

    .subscribedEventHandler('lanEventHandler', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        if (msg.header?.contains('HA ST Link/1.0') && msg.header?.startsWith('POST ')) {
        let data = msg.json
        switch (msg.headers.Action) {
        case 'register':
        state.host = data.host
        state.path = data.path
        state.forward_path = data.forward_path
        this.register()
        break
        case 'command':
        let cmd = data.command
        device = this.getDevices()[data.device_id]
        if (data.args == null) {
        device?."$cmd"()
        } else {
        device?."$cmd"(data.args)
        }
        break
        case 'unregister':
        this.unsubscribe('handleEvt')
        state.host = null
        state.path = null
        state.forward_path = null
        break
        }
        }
        

	})
