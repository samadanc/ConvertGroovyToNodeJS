
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Raspberry Pi Setup', section => {
            section.textSetting('piIP').name('Raspberry Pi IP');
            section.textSetting('piPort').name('Raspberry Pi Port');

        });


        page.section('Garage Door Controller Setup', section => {
            section.textSetting('doorOpenCloseTriggerPin').name('GPIO Pin # for open/close button');
            section.textSetting('doorClosedSensorPin').name('GPIO Pin # for door closed sensor');
            section.textSetting('doorOpenSensorPin').name('GPIO Pin # for door open sensor');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('switchPushed', (context, event) => {
        
        console.log('Handling Switch Pushed')
        let data = this.parseJson(event.data)
        if (data.buttonPushed.equals('refresh')) {
        console.log('Refreshing the state of the door opener')
        this.executeRequest('/*', 'GET')
        this.updateGPIOState()
        } else {
        if (data.buttonPushed.equals('doorOpener')) {
        console.log('Door Opener Button Pressed')
        if (state.cycleCount == 10 || state.cycleCount == -1) {
        console.log('Door Moving')
        state.cycleCount = 0
        } else {
        console.log('Door Stopped')
        state.cycleCount = -1
        }
        let path = '/GPIO/' + doorOpenCloseTriggerPin + '/value/1'
        this.executeRequest(path, 'POST')
        this.runIn(2, updateGPIOState)
        } else {
        console.log("unrecognized button has been pushed: ${data.buttonPushed}")
        }
        }
        

	})

    .subscribedEventHandler('response', (context, event) => {
        
        console.log('Handling Response')
        let msg = this.parseLanMessage(event.description)
        if (msg && msg.json && msg.json.GPIO) {
        let sensor = this.getChildDevices().find({ let d ->
        d.deviceNetworkId.startsWith(this.getGarageDoorControllerId())
        })
        console.log("Cycle Count:  ${state.cycleCount}")
        if (sensor && state.cycleCount != -1) {
        let gpioData = msg.json.GPIO
        let doorOpenSensorPinValue = gpioData.get(doorOpenSensorPin).value
        let doorClosedSensorPinValue = gpioData.get(doorClosedSensorPin).value
        console.log("Door Open Sensor Pin Value ($doorOpenSensorPin) = $doorOpenSensorPinValue")
        console.log("Door Close Sensor Pin Value ($doorClosedSensorPin) = $doorClosedSensorPinValue")
        if (doorOpenSensorPinValue == 1 || doorClosedSensorPinValue == 1) {
        state.cycleCount = 10
        if (doorOpenSensorPinValue == 1) {
        sensor.changeSwitchState(0)
        } else {
        if (doorClosedSensorPinValue == 1) {
        sensor.changeSwitchState(1)
        }
        }
        } else {
        if (state.cycleCount < 10) {
        state.cycleCount = state.cycleCount + 1
        } else {
        state.cycleCount = 0
        sensor.changeSwitchState(-1)
        this.updateGPIOState()
        }
        }
        }
        }
        console.log('Finished Getting GPIO State')
        

	})
