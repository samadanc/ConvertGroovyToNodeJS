
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Issue notifications with a Smart Room Controller', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');
            section.enumSetting('color').name('What color?');
            section.enumSetting('speed').name('What flash pattern?');

        });


        page.section('In addition to push notifications, send text alerts to...', section => {

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipcode').name('Zip Code');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkForSevereWeather', delay);

    })

    .scheduledEventHandler('checkForSevereWeather', (context, event) => {
        
        let alerts
        if (this.locationIsDefined()) {
        if (this.zipcodeIsValid()) {
        alerts = this.getWeatherFeature('alerts', zipcode)?.alerts
        } else {
        log.warn('Severe Weather Alert: Invalid zipcode entered, defaulting to location\'s zipcode')
        alerts = this.getWeatherFeature('alerts')?.alerts
        }
        } else {
        log.warn('Severe Weather Alert: Location is not defined')
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
        if (!(oldKeys.contains(alert.type + alert.date_epoch))) {
        let msg = "Weather Alert! ${alert.description} from ${alert.date} until ${alert.expires}"
        this.send(msg)
        }
        })
        }
        

	})
