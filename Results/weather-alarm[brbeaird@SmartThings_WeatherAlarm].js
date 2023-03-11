
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('getCurrentAlerts', delay);

    })

    .scheduledEventHandler('getCurrentAlerts', (context, event) => {
        
                console.log('Checking for current alerts...')
                let alerts = this.getTwcAlerts("${location.latitude},${location.longitude}")
                console.log(alerts)
                if (alerts) {
                    alerts.each({ let alert ->
                        if (alert.eventDescription == 'Tornado Watch') {
                            if (this.soundAlarm('tornadoWatch')) {
                                location.helloHome?.execute(settings.ontornadoWatch)
                            }
                        }
                        if (alert.eventDescription == 'Tornado Warning') {
                            if (this.soundAlarm('tornadoWarning')) {
                                location.helloHome?.execute(settings.ontornadoWarning)
                            }
                        }
                        if (alert.eventDescription == 'Thunderstorm Watch') {
                            if (this.soundAlarm('tStormWatch')) {
                                location.helloHome?.execute(settings.ontStormWatch)
                            }
                        }
                        if (alert.eventDescription == 'Thunderstorm Warning') {
                            if (this.soundAlarm('tStormWatch')) {
                                location.helloHome?.execute(settings.ontStormWarning)
                            }
                        }
                    })
                } else {
                    log.info('No current alerts')
                    state.tornadoWatch = 'INACTIVE'
                    state.tornadoWarning = 'INACTIVE'
                    state.tStormWatch = 'INACTIVE'
                    state.tStormWarning = 'INACTIVE'
                }
            

	})
