
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presenseAdultHandler', (context, event) => {
        
                console.log("presenceAdultHandler ${event.name}: ${event.value}, ${event.displayName}")
                if (event.value == 'not present') {
                    console.log('Adult left')
                    let messages = "Adult left (${event.displayName})"
                    let presenceValue = adultToWatch.find({ 
                        it.currentPresence == 'present'
                    })
                    if (presenceValue) {
                        console.log('Still Adult at home - nothing to do')
                        messages = messages + '\nStill Adult at home - nothing to do'
                    } else {
                        console.log('Every adult as left - Do Goodbye!')
                        messages = messages + '\nEvery adult as left - Do Goodbye!'
                        if (!(this.visitorAtHome())) {
                            this.doGoodbyeAction()
                        } else {
                            messages = messages + 'Visitor at home do nothing!'
                        }
                    }
                    this.sendNotificationToContacts(messages, recipients)
                } else {
                    console.log('Adult arrive')
                    this.doHelloAction("Adult arrive (${event.displayName})")
                }
            

	})

    .subscribedEventHandler('presenseChildHandler', (context, event) => {
        
                console.log("presenceChildHandler ${event.name}: ${event.value}, ${event.displayName}")
                if (event.value == 'not present') {
                    console.log('Child left')
                    let messages = "Child left (${event.displayName})"
                    if (this.notAway()) {
                        let presenceValue = adultToWatch.find({ 
                            it.currentPresence == 'present'
                        })
                        if (presenceValue) {
                            console.log('Still adult at home - nothing to do')
                            messages = messages + '\nStill adult at home - nothing to do'
                        } else {
                            console.log('No more adult at home - Do Goodbye!')
                            messages = messages + '\nNo more adult at home - Do Goodbye!'
                            if (!(this.visitorAtHome())) {
                                messages = messages + 'Normaly do the Goodbye Action'
                            } else {
                                messages = messages + 'Visitor at home do nothing!'
                            }
                        }
                    } else {
                        console.log('Already in Away mode - nothing to do')
                        messages = messages + '\nAlready in Away mode - nothing to do'
                    }
                    this.sendNotificationToContacts(messages, recipients)
                } else {
                    console.log('Someone arrive')
                    this.sendNotificationToContacts('Normaly do the Hello Action', recipients)
                }
            

	})
