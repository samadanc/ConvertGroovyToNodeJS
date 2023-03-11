
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('takeAction', delay);

    })

    .scheduledEventHandler('takeAction', (context, event) => {
        
                log.trace('takeAction>begin')
                let devices = thermostats.collect({ let dni ->
                    let d = this.getChildDevice(dni)
                    console.log("takeAction>Looping thru thermostats, found id $dni, about to poll")
                    d.poll()
                })
                log.trace('takeAction>end')
            

	})
