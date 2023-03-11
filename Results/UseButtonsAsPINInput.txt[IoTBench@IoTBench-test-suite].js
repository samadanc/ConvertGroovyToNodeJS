
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                let allOK = true
                if (allOK) {
                    let value = event.value
                    let slurper = new JsonSlurper()
                    let dataMap = slurper.parseText(event.data)
                    let buttonNumber = dataMap.buttonNumber
                    this.myDebug("buttonEvent Device: [${buttonDevice.name}], Name: [${event.name}], Value: [${event.value}], Data: [${event.data}], ButtonNumber: [${dataMap.buttonNumber}]")
                    if (value == 'pushed' || value[(0..5)] == 'button') {
                        state.inputDigitsList << buttonNumber.toString()
                        if (state.inputDigitsList.size > state.pinLength) {
                            state.inputDigitsList.remove(state.inputDigitsList.size - state.pinLength - 1)
                        }
                        this.myDebug("Current inputDigitsList: ${state.inputDigitsList}")
                        if (state.inputDigitsList.equals(state.pinSeqList)) {
                            this.myDebug("PIN Match Detected; found [${state.pinSeqList}]. Clearing input digits buffer.")
                            this.myTrace('PIN Match Detected. Clearing input digits buffer.')
                            state.inputDigitsList.clear()
                            this.executeHandlers()
                        } else {
                            this.myDebug("No PIN match yet: inputDigitsList is $inputDigitsList; looking for ${state.pinSeqList}")
                            this.myTrace('No PIN match yet.')
                        }
                    }
                }
            

	})
