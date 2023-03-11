
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device that activates the TV', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('ESP8266 Settings', section => {
            section.textSetting('ipAddr').name('IP Address');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'powerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'powerHandler')

    })

    .subscribedEventHandler('powerHandler', (context, event) => {
        
        let powerPath = '/msg?code=E0E040BF:SAMSUNG:32&pulse=3&pass=' + password + '&simple=1'
        let switchPath = '/msg?code=FF50AF:NEC:32&pulse=1&pass=' + password + '&simple=1'
        let headers = [:]
        headers.put('HOST', ipAddr + ':80')
        headers.put('Content-Type', 'application/x-www-form-urlencoded')
        let method = 'GET'
        this.sendHubCommand(new physicalgraph.device.HubAction(['method': method , 'path': powerPath , 'body': command , 'headers': headers ]))
        this.sendHubCommand(new physicalgraph.device.HubAction(['method': method , 'path': switchPath , 'body': command , 'headers': headers ]))
        console.log('Sent power command.')
        

	})
