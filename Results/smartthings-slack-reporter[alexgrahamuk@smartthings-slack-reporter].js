
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('itOpened', (context, event) => {
        
                console.log(state.users)
                this.updateCodes()
                console.log(state.users)
            

	})
