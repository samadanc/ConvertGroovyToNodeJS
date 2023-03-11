
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
                    if (shmSynthDevice || shmSonosDevice || shmSmc || shmEchoDevice ) {
                        if (event.value == 'armAway') {
                            sendAwayCommand 
                            let message = 'Attention, The alarm system is now set to armed away'
                            if (echoDevice) {
                                settings.shmEchoDevice.each({ let spk ->
                                    if (svr) {
                                        java.lang.Integer eVolume = (eVolume as Integer)
                                        spk.setVolumeSpeakAndRestore(eVolume, String)
                                    } else {
                                        spk.setVolumeAndSpeak(eVolume, String)
                                    }
                                })
                            }
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
                                if (echoDevice) {
                                    settings.shmEchoDevice.each({ let spk ->
                                        if (svr) {
                                            java.lang.Integer eVolume = (eVolume as Integer)
                                            spk.setVolumeSpeakAndRestore(eVolume, String)
                                        } else {
                                            spk.setVolumeAndSpeak(eVolume, String)
                                        }
                                    })
                                }
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
                                    if (echoDevice) {
                                        settings.shmEchoDevice.each({ let spk ->
                                            if (svr) {
                                                java.lang.Integer eVolume = (eVolume as Integer)
                                                spk.setVolumeSpeakAndRestore(eVolume, String)
                                            } else {
                                                spk.setVolumeAndSpeak(eVolume, String)
                                            }
                                        })
                                    }
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
