
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineHandler')

    })

    .subscribedEventHandler('routineHandler', (context, event) => {
        
                if (event.name == 'routineExecuted' && event.displayName == monitor_routine ) {
                    console.log('triggering a delay routine execute')
                    let now = new Date()
                    let runTime = new Date(now.getTime() + theexitdelay * 1000)
                    this.runOnce(runTime, executeRoutine)
                    if (theTTS) {
                        theTTS.speak('@|ALARM=CHIME')
                        theTTS.speak(theMsg, ['delay': 1800])
                        theTTS.speak('@|ALARM=CHIME', ['delay': 8000])
                    }
                    if (theSpeakers) {
                        theSpeakers.playTextAndResume(theMsg, theVolume)
                    }
                }
            

	})
