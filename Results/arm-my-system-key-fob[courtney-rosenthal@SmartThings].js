
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
                let currentButtonNumber = null
                try {
                    let data = event.jsonData
                    currentButtonNumber = (event.jsonData.buttonNumber as String)
                } 
                catch (let e) {
                    log.warn("caught exception getting event data as json: $e")
                } 
                console.log("buttonHandler: buttonDevice = $buttonDevice, currentButtonNumber = $currentButtonNumber")
                let actions = [:]
                if (armButtonNumber && armButtonAction ) {
                    actions[ armButtonNumber ] = armButtonAction 
                }
                if (disarmButtonNumber && disarmButtonAction ) {
                    actions[ disarmButtonNumber ] = disarmButtonAction 
                }
                if (homeButtonNumber && homeButtonAction ) {
                    actions[ homeButtonNumber ] = homeButtonAction 
                }
                if (!(actions[ currentButtonNumber ])) {
                    console.log("buttonHandler: no action assigned to button $currentButtonNumber")
                    return null
                }
                let runAction = actions[ currentButtonNumber ]
                console.log("buttonHandler: runAction = $runAction")
                this.sendNotificationEvent("Button $currentButtonNumber on $buttonDevice was pressed, so I'm running $runAction")
                location.helloHome?.execute(runAction)
                if (feedbackSwitch) {
                    let currState = feedbackSwitch.currentValue('switch')
                    console.log("buttonHandler: feedbackSwitch = $feedbackSwitch, currState = $currState")
                    switch ( currState ) {
                        case 'on':
                            feedbackSwitch.off()
                            feedbackSwitch.on()
                            break
                        case 'off':
                            feedbackSwitch.on()
                            feedbackSwitch.off()
                            break
                        default: 
                        log.warning("buttonHandler: bad state "$currState" for switch "$feedbackSwitch"")
                    }
                }
            

	})
