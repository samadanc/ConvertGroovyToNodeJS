
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device that activates the TV', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'powerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'powerHandler')

    })

    .subscribedEventHandler('powerHandler', (context, event) => {
        
        let path = '/macros/Cable'
        let headers = [:]
        headers.put('HOST', 'PUT.YOUR.HOST.HERE:AND_PORT')
        headers.put('Content-Type', 'application/x-www-form-urlencoded')
        let method = 'POST'
        this.sendHubCommand(new physicalgraph.device.HubAction(['method': method , 'path': path , 'body': command , 'headers': headers ]))
        

	})
