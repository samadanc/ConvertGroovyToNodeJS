
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnOffHandler', delay);

        context.api.schedules.schedule('turnOnHandler', delay);

    })

    .scheduledEventHandler('turnOnHandler', (context, event) => {
        
                switch ( action ) {
                    case 'level':
                        lights.each({ 
                            if (it.hasCommand('setLevel')) {
                                console.log("Not So Smart Lighting: ${it.displayName} setLevel($level)")
                                it.setLevel((level as Integer))
                            }
                            it.on()
                        })
                        break
                    case 'on':
                        console.log('on()')
                        lights.on()
                        break
                    case 'color':
                        this.setColor()
                        break
                }
            

	})

    .scheduledEventHandler('turnOffHandler', (context, event) => {
        
                lights.off()
            

	})
