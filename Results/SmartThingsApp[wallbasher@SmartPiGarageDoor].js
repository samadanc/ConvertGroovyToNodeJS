
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
            section.textSetting('deviceConfigRead1').name('Read GPIO#');

        });


        page.section('Device 2', section => {
            section.textSetting('deviceName2').name('Device Name');
            section.enumSetting('deviceType2').name('Device Type');
            section.textSetting('deviceConfig2').name('GPIO# or Device Name');
            section.textSetting('deviceConfigRead2').name('Read GPIO#');

        });


        page.section('Device 3', section => {
            section.textSetting('deviceName3').name('Device Name');
            section.enumSetting('deviceType3').name('Device Type');
            section.textSetting('deviceConfig3').name('GPIO# or Device Name');
            section.textSetting('deviceConfigRead3').name('Read GPIO#');

        });


        page.section('Device 4', section => {
            section.textSetting('deviceName4').name('Device Name');
            section.enumSetting('deviceType4').name('Device Type');
            section.textSetting('deviceConfig4').name('GPIO# or Device Name');
            section.textSetting('deviceConfigRead4').name('Read GPIO#');

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


        page.section('Device 7', section => {
            section.textSetting('deviceName7').name('Device Name');
            section.enumSetting('deviceType7').name('Device Type');
            section.textSetting('deviceConfig7').name('GPIO# or Device Name');

        });


        page.section('Device 8', section => {
            section.textSetting('deviceName8').name('Device Name');
            section.enumSetting('deviceType8').name('Device Type');
            section.textSetting('deviceConfig8').name('GPIO# or Device Name');

        });


        page.section('Device 9', section => {
            section.textSetting('deviceName9').name('Device Name');
            section.enumSetting('deviceType9').name('Device Type');
            section.textSetting('deviceConfig9').name('GPIO# or Device Name');

        });


        page.section('Device 10', section => {
            section.textSetting('deviceName10').name('Device Name');
            section.enumSetting('deviceType10').name('Device Type');
            section.textSetting('deviceConfig10').name('GPIO# or Device Name');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        if (msg && msg.body) {
        if (msg.json && msg.json.GPIO) {
        log.trace('Update State Device List')
        this.getChildDevices().each({ let device ->
        log.trace('Device: ' + device.name + ', ' + device.typeName + ', ' + device.deviceNetworkId)
        if (device.typeName == 'Virtual Pi RelayToggle') {
        log.trace('readPin:' + device.deviceNetworkId.tokenize('.')[6])
        log.trace('readPinValue:' + msg.json.GPIO.find({ let x ->
        x.key == device.deviceNetworkId.tokenize('.')[6]
        }).value.value)
        if (msg.json.GPIO.find({ let x ->
        x.key == device.deviceNetworkId.tokenize('.')[6]
        }).value.value == 1) {
        device.changeSwitchState(1)
        } else {
        device.changeSwitchState(0)
        }
        }
        if (device.typeName == 'Simulated Garage Door Opener') {
        log.trace('readPin' + device.deviceNetworkId.tokenize('.')[6])
        log.trace('readPinValue' + msg.json.GPIO.find({ let x ->
        x.key == device.deviceNetworkId.tokenize('.')[6]
        }).value.value)
        if (msg.json.GPIO.find({ let x ->
        x.key == device.deviceNetworkId.tokenize('.')[6]
        }).value.value == 1) {
        device.changeDoorState('open')
        } else {
        device.changeDoorState('closed')
        }
        }
        })
        }
        }
        

	})
