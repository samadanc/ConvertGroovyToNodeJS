
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('pollingTask', delay);

    })

    .scheduledEventHandler('pollingTask', (context, event) => {
        
                console.log('Polling')
                let devices = this.getChildDevices()
                devices.each({ 
                    it.poll()
                    let leftDoor = it.latestState('leftDoor')
                    let rightDoor = it.latestState('rightDoor')
                    let leftValue = leftDoor.value
                    let rightValue = rightDoor.value
                    if (leftValue != 'closed') {
                        let deltaMillis = 1000 * 60 * 30
                        let timeAgo = new Date(this.now() - deltaMillis )
                        let openTooLong = leftDoor.dateCreated.toSystemDate() < timeAgo 
                        if (openTooLong) {
                            this.sendTextMessage()
                        }
                    } else {
                        if (rightValue != 'closed') {
                            let deltaMillis = 1000 * 60 * 30
                            let timeAgo = new Date(this.now() - deltaMillis )
                            let openTooLong = rightValue.dateCreated.toSystemDate() < timeAgo 
                            if (openTooLong) {
                                this.sendTextMessage()
                            }
                        } else {
                            state.sentMessage = null
                        }
                    }
                })
            

	})
