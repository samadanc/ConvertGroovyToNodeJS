
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('gameDayCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

    })

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
                if (!evt) {
                    return null
                }
                switch (event.value) {
                    case 'refresh':
                        state.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
                        break
                }
            

	})

    .scheduledEventHandler('gameDayCheck', (context, event) => {
        
                console.log('Checking for game day')
                childApps.each({ let child ->
                    if (child.childIsGameDay()) {
                        let gameDayTime = child.childGameDate()
                        console.log("Start game routine for ${child.label}, game is at ${gameDayTime.format(h:mm:ss a, location.timeZone)}")
                        child.childStartGame()
                    } else {
                        console.log("Not gameday for ${child.label}")
                    }
                })
            

	})
