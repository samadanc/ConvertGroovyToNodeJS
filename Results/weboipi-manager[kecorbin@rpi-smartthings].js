
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Raspberry Pi Setup', section => {
            section.textSetting('piIP').name('Raspberry Pi IP');
            section.textSetting('piPort').name('Raspberry Pi Port');

        });


        page.section('Device 1', section => {
            section.textSetting('deviceName1').name('Device Name');
            section.enumSetting('deviceType1').name('Device Type');
            section.textSetting('deviceConfig1').name('GPIO# or Device Name');

        });


        page.section('Device 2', section => {
            section.textSetting('deviceName2').name('Device Name');
            section.enumSetting('deviceType2').name('Device Type');
            section.textSetting('deviceConfig2').name('GPIO# or Device Name');

        });


        page.section('Device 3', section => {
            section.textSetting('deviceName3').name('Device Name');
            section.enumSetting('deviceType3').name('Device Type');
            section.textSetting('deviceConfig3').name('GPIO# or Device Name');

        });


        page.section('Device 4', section => {
            section.textSetting('deviceName4').name('Device Name');
            section.enumSetting('deviceType4').name('Device Type');
            section.textSetting('deviceConfig4').name('GPIO# or Device Name');

        });


        page.section('Device 5', section => {
            section.textSetting('deviceName5').name('Device Name');
            section.enumSetting('deviceType5').name('Device Type');
            section.textSetting('deviceConfig5').name('GPIO# or Device Name');

        });


        page.section('Device 6', section => {
            section.textSetting('deviceName6').name('Device Name');
            section.enumSetting('deviceType6').name('Device Type');
            section.textSetting('deviceConfig6').name('GPIO# or Device Name');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        if (msg && msg.body) {
        let children = this.getChildDevices(false)
        if (msg.json) {
        msg.json.GPIO.each({ let item ->
        this.updateSensorDevice(item.key, item.value.value, children)
        })
        log.trace('Finished Getting GPIO State')
        }
        }
        

	})
