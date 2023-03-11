
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
                console.log('trigger turned on!')
                if (onSwitches) {
                    onSwitches.on()
                }
                if (theSwitches) {
                    if (minutes == null) {
                        let minutes = 0
                    }
                    let timeDelay = minutes * 60
                    this.runIn(timeDelay, lightsOut)
                }
                if (phrase2) {
                    if (minutes2 == null) {
                        let minutes2 = 0
                    }
                    let timeDelay2 = minutes * 60
                    this.runIn(timeDelay2, runRoutine)
                }
                let buttonLabel = settings.find({ 
                    it.key == 'buttonName'
                })
                console.log("$buttonLabel")
                let DeviceID = app.id + '/gnsh'
                console.log("did = $DeviceID")
                let myDevice = this.getChildDevice(DeviceID)
                myDevice.name = buttonLabel 
                console.log("MyD = $myDevice")
                console.log("MyD.name = ${myDevice.name}")
                myDevice.off()
                let phrase = ''
                doors.each({ let doorOpen ->
                    if (doorOpen.currentContact == 'open') {
                        console.log("${doorOpen.displayName}")
                        phrase = phrase.replaceAll(' and ', ' ')
                        if (phrase == '') {
                            phrase = 'The ' + doorOpen.displayName
                        } else {
                            phrase = phrase + ', and the ' + doorOpen.displayName
                        }
                        console.log("$phrase")
                    }
                })
                if (phrase == '') {
                    phrase = 'The house is ready for night.'
                } else {
                    phrase = 'You have left ' + phrase + 'open'
                }
                console.log("$phrase")
                TTspeaker.speak(phrase)
            

	})
