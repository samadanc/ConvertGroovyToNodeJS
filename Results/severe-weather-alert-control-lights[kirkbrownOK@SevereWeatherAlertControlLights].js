
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('In addition to push notifications, send text alerts to...', section => {

        });


        page.section('Turn on these lights for Tornado Alerts', section => {
            section.deviceSetting('watchLights').capability(['switch']).name('Tornado Watch Lights');
            section.deviceSetting('warningLights').capability(['switch']).name('Tornado Warning Lights');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipcode').name('Zip Code');

        });


        page.section('Update on this switch', section => {
            section.deviceSetting('updateSwitch').capability(['switch']).name('Swith that causes update');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.updateSwitch, 'switch', 'switch.on', 'checkForSevereWeather')

    })

    .subscribedEventHandler('checkForSevereWeather', (context, event) => {
        
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
        console.log("alerts: $alerts")
        if (alerts == []) {
        state.tornadoWatch = false
        state.tornadoWarning = false
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
        let msg = "Weather Alert! ${alert.description} from ${alert.date} until ${alert.expires}"
        if (alert.description.contains('Tornado Watch') && !state.tornadoWatch) {
        this.send(msg)
        console.log('Turning on tornado Watch Lights')
        state.tornadoWarning = false
        state.tornadoWatch = true
        
        context.api.devices.sendCommands(context.config.watchLights, 'switch', on)
    
        }
        if (alert.description.contains('Tornado Warning') && !state.tornadoWarning) {
        console.log('Turning on tornado Warning Lights')
        this.send(msg)
        state.tornadoWatch = false
        state.tornadoWarning = true
        
        context.api.devices.sendCommands(context.config.warningLights, 'switch', on)
    
        }
        }
        })
        }
        

	})
