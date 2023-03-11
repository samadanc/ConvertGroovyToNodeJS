
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('startTakeOut', (context, event) => {
        
                if (!(this.getTimeOk()) || !(this.getModeOk())) {
                    return null
                }
                if (lock && lock.value != 'unlocked') {
                    return null
                }
                if (virtualSwitch) {
                    let child = this.getChildDevice('TakeOutDog')
                    child.updateDeviceStatus(1)
                }
                if (notifyTrigger) {
                    if (!notifyMsg) {
                        notifyMsg = 'Taking the dog out'
                    }
                    this.sendPush("$notifyMsg started")
                }
                state.closeCount = 0
                if (lightsEnabled) {
                    lightsEnabled?.on()
                }
                if (delay) {
                    this.runIn(60 * delay.toInteger(), endTakeOut)
                }
                if (settings.homePhrasesEnabled) {
                    location.helloHome.execute(settings.homePhrasesEnabled)
                }
                if (contact) {
                    this.subscribe(contact, 'contact.closed', doorClosed)
                }
                if (modeEnabled) {
                    this.setLocationMode(modeEnabled)
                }
            

	})
