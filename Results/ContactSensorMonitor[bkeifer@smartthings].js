
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
                log.trace('contactOpenHandler')
                state.contacts[event.displayName] = false
                state.alerts['contact'] = true
                this.flashToOn('Red')
                console.log(state)
            

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
                log.trace('contactClosedHandler')
                state.contacts[event.displayName] = true
                console.log(state.contacts)
                this.checkDoors()
                this.flash('Green')
                console.log('continuing')
                this.updateHues()
            

	})
