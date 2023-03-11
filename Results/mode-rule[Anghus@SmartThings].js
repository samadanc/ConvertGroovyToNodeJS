
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presenceEvent', (context, event) => {
        
                this.trace("presenceEvent(${event.value}

	})

    .subscribedEventHandler('motionEvent', (context, event) => {
        
                this.trace("motionEvent(${event.value}

	})

    .subscribedEventHandler('switchEvent', (context, event) => {
        
                this.trace("switchEvent(${event.value}

	})
