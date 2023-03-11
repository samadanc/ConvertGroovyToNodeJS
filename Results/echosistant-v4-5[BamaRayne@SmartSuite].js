
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
                if (fSecFeed) {
                    let curEvtValue = event.value
                    log.info("Smart Home Monitor status changed to: $curEvtValue")
                    if (shmSynthDevice || shmSonosDevice || shmSmc ) {
                        if (event.value == 'armAway') {
                            sendAwayCommand 
                            let message = 'Attention, The alarm system is now set to armed away'
                            if (shmSynthDevice) {
                                shmSynthDevice?.speak(message)
                            }
                            if (shmSonosDevice) {
                                shmSonosDevice?.playTextAndRestore(message)
                            }
                            if (shmSmc) {
                                this.sendLocationEvent(['name': 'EchoSistantMsg', 'value': 'ESv4.5 SHM Status Announcement', 'isStateChange': true, 'descriptionText': "$message"])
                            }
                        } else {
                            if (event.value == 'stay') {
                                let message = 'Attention, The alarm system is now set to armed stay'
                                if (shmSynthDevice) {
                                    shmSynthDevice?.speak(message)
                                }
                                if (shmSonosDevice) {
                                    shmSonosDevice?.playTextAndRestore(message)
                                }
                                if (shmSmc) {
                                    this.sendLocationEvent(['name': 'EchoSistantMsg', 'value': 'ESv4.5 SHM Status Announcement', 'isStateChange': true, 'descriptionText': "$message"])
                                }
                            } else {
                                if (event.value == 'off') {
                                    let message = 'Attention, The alarm system has been disarmed'
                                    if (shmSynthDevice) {
                                        shmSynthDevice?.speak(message)
                                    }
                                    if (shmSonosDevice) {
                                        shmSonosDevice?.playTextAndRestore(message)
                                    }
                                    if (shmSmc) {
                                        this.sendLocationEvent(['name': 'EchoSistantMsg', 'value': 'ESv4.5 SHM Status Announcement', 'isStateChange': true, 'descriptionText': "$message"])
                                    }
                                }
                            }
                        }
                    }
                }
            

	})
