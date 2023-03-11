
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                if (event.value == 'on') {
                    console.log("Switch turned on, will execute action ${settings.onAction}")
                    location.helloHome?.execute(settings.onAction)
                    console.log("Will lock the folowing lock: ${settings.theLock} in ${settings.delay_seconds} seconds")
                    this.use(TimeCategory, { 
                        let currentDate = new Date()
                        let runAtTime = currentDate + settings.delay_seconds.seconds
                        console.log("Door: ${settings.theLock} will lock at: $runAtTime")
                        this.runOnce(runAtTime, lockDoor)
                    })
                    console.log("Flipping switch: ${settings.theswitch} back off")
                    theswitch.off()
                }
            

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
                console.log("Lock ${event.name} is ${event.value}.")
                if (event.value == 'locked') {
                } else {
                }
            

	})
