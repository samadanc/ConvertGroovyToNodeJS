
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onSwitchOff', (context, event) => {
        
                console.log('canary device turned off')
                let allOff = true
                canaryDevices.each({ let device ->
                    if (device.currentValue('switch') == 'on') {
                        allOff = false
                    }
                })
                if (allOff) {
                    console.log('all canary devices off, resetting scene count')
                    state.lastScene = 0
                }
            

	})

    .subscribedEventHandler('onPush', (context, event) => {
        
                console.log('button pushed')
                if (event.jsonData.buttonNumber.toInteger() != state.whichButton.toInteger()) {
                    console.log("other button pushed.  get out of here expected ${state.whichButton} got ${event.jsonData.buttonNumber}")
                    state.lastScene = 0
                    return null
                }
                state.lastScene = state.lastScene + 1
                if (!(state.activeScenes["${state.lastScene}"])) {
                    state.lastScene = 1
                }
                console.log("activating scene ${state.lastScene} with id ${state.activeScenes[${state.lastScene}]}")
                this.setScene(state.activeScenes["${state.lastScene}"])
            

	})
