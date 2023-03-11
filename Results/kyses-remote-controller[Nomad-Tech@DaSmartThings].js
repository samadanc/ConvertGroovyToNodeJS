
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('btnEvent', (context, event) => {
        
                let btnId = event.jsonData.buttonNumber
                let btnEvent = event.value
                if (btnId < 1 || btnId > this.getNumButtons() || !btnEvent) {
                    console.log("Event Error: parameters out of bounds.  Button Number: $btnId, Action: $btnEvent.")
                    return null
                }
                if (this.dedupe(btnId, btnEvent)) {
                    return null
                }
                let actions = ['actionPower', 'actionDimmer']
                this.getDevices(btnId, btnEvent).each({ let device ->
                    actions.each({ let action ->
                        this."$action"(btnId, btnEvent, device)
                    })
                })
            

	})
