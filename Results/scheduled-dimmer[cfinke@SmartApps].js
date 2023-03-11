
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setDefaultLevelScheduled', delay);

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
                console.log('The switch has been turned off.')
                state.lastOff = new Date()
            

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
                console.log('The switch has been turned on.')
                this.setDefaultLevel()
            

	})

    .scheduledEventHandler('setDefaultLevelScheduled', (context, event) => {
        
                console.log('Scheduled event is being run.')
                if (theSwitch.currentSwitch == 'on') {
                    console.log('The switch is on, so we\'re setting its level.')
                    this.setDefaultLevel()
                } else {
                    console.log('The switch is off, so we\'re not doing anything.')
                }
            

	})
