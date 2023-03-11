
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('summaryHandler', (context, event) => {
        
                let summaryMsg = ''
                if (!summaryMode || summaryMode.contains(location.mode)) {
                    if (childApps.size()) {
                        childApps.each({ let child ->
                            if (settings."${child.id}") {
                                summaryMsg += "The alarm named ${child.label}, set ${child.getAlarmMethod()}, is enabled. "
                            }
                            if (!settings."${child.id}" && summaryDisabled ) {
                                summaryMsg += " The alarm named ${child.label}, set ${child.getAlarmMethod()}, is disabled. "
                            }
                        })
                    } else {
                        summaryMsg = 'There are no alarms currently scheduled.'
                    }
                    summaryMsg = childApps.size() && summaryMsg ? "The following is a summary of the alarm settings. $summaryMsg" : 'There are no alarms currently enabled to summarize.'
                    console.log("Summary message = $summaryMsg")
                    let summarySound = this.textToSpeech(summaryMsg, true)
                    if (summaryVolume) {
                        summarySpeaker.setLevel(summaryVolume)
                    }
                    summarySpeaker.playTrack(summarySound.uri)
                }
            

	})
