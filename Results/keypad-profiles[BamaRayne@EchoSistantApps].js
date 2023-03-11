
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('chimeHandler', (context, event) => {
        
                if (this.getDayOk() == true && this.getModeOk() == true && this.getTimeOk() == true) {
                    chimeKeypad.beep()
                }
            

	})

    .subscribedEventHandler('panicButtonHandler', (context, event) => {
        
                let event = event.data
                let eVal = event.value
                let eName = event.name
                let eDev = event.device
                let stamp = state.lastTime = new Date(this.now()).format('h:mm aa, dd-MMMM-yyyy', location.timeZone)
                log.info("The panic button was pressed on the ${event.displayName} at " + stamp )
                let buttonNumUsed = event.data.replaceAll('\D+', '')
                buttonNumUsed = buttonNumUsed.toInteger()
                java.lang.Integer butNum = buttonNumUsed 
                if (panicSwitches) {
                    panicSwitches.on()
                }
                if (panicFlash) {
                    this.panicFlasher()
                }
                if (panicText) {
                    this.sendPanicText(panicText)
                }
                if (panicSynthDevice) {
                    this.panicTTS(panicText)
                }
                if (panicSonosDevice) {
                    this.panicTTS(panicText)
                }
            

	})

    .subscribedEventHandler('codeEntryHandler', (context, event) => {
        
                let codeEntered = (event.value as String)
                let data = (event.data as String)
                let stamp = state.lastTime = new Date(this.now()).format('h:mm aa, dd-MMMM-yyyy', location.timeZone)
                let armMode = ''
                if (data == '0') {
                    armMode = 'off'
                } else {
                    if (data == '3') {
                        armMode = 'away'
                    } else {
                        if (data == '1') {
                            armMode = 'stay'
                        } else {
                            if (data == '2') {
                                armMode = 'stay'
                            }
                        }
                    }
                }
                if ("$codeEntered" == "$vpCode") {
                    this.pVirToggle(data, codeEntered, evt)
                    if (vpMode || vpModeD || vpRoutine || vpRoutineD ) {
                        this.vpAction(data, codeEntered, evt)
                    }
                }
                if ("$codeEntered" == "$doorCode1" || "$codeEntered" == "$doorCode2" || "$codeEntered" == "$doorCode3") {
                    if (this.getDayOk() == true && this.getModeOk() == true && this.getTimeOk() == true) {
                        this.pGarage(data, codeEntered, evt)
                    }
                }
                if ("$codeEntered" == '0000') {
                    if (this.getDayOk() == true && this.getModeOk() == true && this.getTimeOk() == true) {
                        this.deviceControl(data)
                    }
                }
                if ("$codeEntered" == "$mCode") {
                    if (this.getDayOk() == true && this.getModeOk() == true && this.getTimeOk() == true) {
                        this.momentaryDeviceHandler(data, codeEntered, evt, mOff)
                    }
                }
                if ("$codeEntered" == "$shmCode") {
                    this.pSHM(data, codeEntered, evt, armMode, armDelay)
                }
                if ("$codeEntered" == "$actionsCode" && data == '3') {
                    if (this.getDayOk() == true && this.getModeOk() == true && this.getTimeOk() == true) {
                        this.takeAction(data, codeEntered, evt)
                    }
                }
            

	})
