
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bridge Setup', section => {
            section.textSetting('IP').name('BlueBolt API Bridge IP');
            section.textSetting('port').name('BlueBolt API Bridge Port');

        });


        page.section('Outlet 1', section => {
            section.textSetting('deviceName1').name('Device Name');

        });


        page.section('Outlet 2', section => {
            section.textSetting('deviceName2').name('Device Name');

        });


        page.section('Outlet 3', section => {
            section.textSetting('deviceName3').name('Device Name');

        });


        page.section('Outlet 4', section => {
            section.textSetting('deviceName4').name('Device Name');

        });


        page.section('Outlet 5', section => {
            section.textSetting('deviceName5').name('Device Name');

        });


        page.section('Outlet 6', section => {
            section.textSetting('deviceName6').name('Device Name');

        });


        page.section('Outlet 7', section => {
            section.textSetting('deviceName7').name('Device Name');

        });


        page.section('Outlet 8', section => {
            section.textSetting('deviceName8').name('Device Name');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        if (msg.status == 200) {
        msg.json.each({ let item ->
        let dev = this.getChildDevice("${settings.IP}:${settings.port}:${item.key}")
        let outletId = item.key
        let outletState = item.value
        console.log(outletId)
        console.log(outletState)
        })
        log.trace('Finished Processing Response')
        }
        

	})
