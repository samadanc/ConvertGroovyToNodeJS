
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bridge Setup', section => {
            section.textSetting('IP').name('Caseta API Bridge IP');
            section.textSetting('port').name('Caseta API Bridge Port');

        });


        page.section('Device 1', section => {
            section.textSetting('deviceName1').name('Device Name');
            section.enumSetting('deviceType1').name('Device Type');
            section.textSetting('deviceConfig1').name('Device ID');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        console.log('response(evt)')
        console.log(msg)
        if (msg && msg.body) {
        let children = this.getChildDevices(false)
        if (msg.json) {
        msg.json.devices.each({ let item ->
        this.updateShadeDevice(item.key, item.value.value, children)
        })
        log.trace('Finished Getting Caseta State')
        }
        }
        

	})
