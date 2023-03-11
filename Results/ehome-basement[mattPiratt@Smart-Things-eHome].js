
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('eHome pyServer Setup', section => {
            section.textSetting('pyServerIP').name('pyServer address');
            section.textSetting('pyServerPort').name('pyServer Port');
            section.textSetting('pyServerPass').name('pyServer API Key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'responseHandler')

    })

    .subscribedEventHandler('responseHandler', (context, event) => {
        
        try {
        let msg = this.parseLanMessage(event.description)
        console.log("responseHandler/msg:$msg")
        if (msg.json?.radiatorsPump) {
        if (msg.json) {
        let children = this.getChildDevices(false)
        msg.json.each({ let item ->
        if (relaysConfig[item.key]) {
        this.updateRelayDevice(item.key, item.value, children)
        } else {
        if (thermometerConfig[item.key]) {
        this.updateThermometerDevice(item.key, item.value, children)
        } else {
        if (item.key == 'stoveCoalLvl' || item.key == 'stoveTemp') {
        this.updateStoveDevice(item.key, item.value, children)
        }
        }
        }
        })
        }
        }
        }
        catch (NullPointerException e) {
        console.log('responseHandler(): There is an ERROR in responseHandler()!: ')
        console.log(msg)
        }
        

	})
