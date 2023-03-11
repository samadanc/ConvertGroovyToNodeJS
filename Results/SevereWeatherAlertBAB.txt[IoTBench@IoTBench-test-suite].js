
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('In addition to push notifications, send text alerts to...', section => {

        });


        page.section('Location code (optional, defaults to location coordinates)...', section => {
            section.textSetting('locationCode').name('Location Code');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkForSevereWeather', delay);

    })

    .scheduledEventHandler('checkForSevereWeather', (context, event) => {
        
        let alerts
        if (locationCode != '') {
        alerts = this.getWeatherFeature('alerts', locationCode)?.alerts
        } else {
        log.warn('Defaulting to location\'s zipcode')
        alerts = this.getWeatherFeature('alerts')?.alerts
        }
        let newKeys = alerts?.collect({
        it.type + it.date_epoch
        }) ? alerts?.collect({
        it.type + it.date_epoch
        }) : []
        console.log("Severe Weather Alert: newKeys: $newKeys")
        let oldKeys = state.alertKeys ? state.alertKeys : []
        console.log("Severe Weather Alert: oldKeys: $oldKeys")
        if (newKeys != oldKeys ) {
        state.alertKeys = newKeys
        alerts.each({ let alert ->
        if (!(oldKeys.contains(alert.type + alert.date_epoch)) && this.descriptionFilter(alert.description)) {
        let msg = "$locationCode Weather Alert! ${alert.description} from ${alert.date} until ${alert.expires}"
        this.send(msg)
        }
        })
        }
        

	})
