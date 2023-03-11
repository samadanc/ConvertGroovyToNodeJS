
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'onSunset')

        context.api.schedules.schedule('onCustomOne', delay);

        context.api.schedules.schedule('onCustomTwo', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'onSunrise')

    })

    .subscribedEventHandler('onSunrise', (context, event) => {
        
                this.onDaypartChange('sunrise')
            

	})

    .subscribedEventHandler('onPresence', (context, event) => {
        
                console.log('Presence event...')
                console.log(event.name + ' | ' + event.value)
                let newPresence 
                if (event.value == 'not present') {
                    if (this.everyoneIsAway()) {
                        newPresence = 'away'
                    } else {
                        newPresence = 'home'
                    }
                } else {
                    if (event.value == 'present') {
                        newPresence = 'home'
                    }
                }
                if (newPresence != state.presence) {
                    console.log("Presence changed from ${state.presence} to $newPresence")
                    state.presence = newPresence 
                    this.updatePhrase()
                }
            

	})

    .subscribedEventHandler('onSunset', (context, event) => {
        
                this.onDaypartChange('sunset')
            

	})

    .scheduledEventHandler('onCustomTwo', (context, event) => {
        
                this.onDaypartChange('customTwo')
            

	})

    .scheduledEventHandler('onCustomOne', (context, event) => {
        
                this.onDaypartChange('customOne')
            

	})
