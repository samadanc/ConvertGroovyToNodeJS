
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set the temperature range for your comfort zone...', section => {
            section.numberSetting('minTemp').name('Minimum temperature');
            section.numberSetting('maxTemp').name('Maximum temperature');

        });


        page.section('Select windows to check...', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('');

        });


        page.section('Select temperature devices to monitor...', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor');
            section.deviceSetting('outTemp').capability(['temperatureMeasurement']).name('Outdoor (optional)');

        });


        page.section('Set your location', section => {
            section.textSetting('zipCode').name('Zip code');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.numberSetting('retryPeriod').name('Minutes between notifications:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let currentOutTemp = null
        if (outTemp) {
        
        context.api.devices.sendCommands(context.config.outTemp, 'temperatureMeasurement', latestValue)
    
        } else {
        console.log('No external temperature device set. Checking WUnderground....')
        currentOutTemp = this.weatherCheck()
        }
        let currentInTemp = event.doubleValue
        let openWindows = sensors.findAll({
        it?.latestValue('contact') == 'open'
        })
        log.trace("Temp event: $evt")
        log.info("In: $currentInTemp; Out: $currentOutTemp")
        if (!retryPeriod) {
        let retryPeriod = 30
        }
        let timeAgo = new Date(this.now() - 1000 * 60 * retryPeriod .toLong())
        
        context.api.devices.sendCommands(context.config.inTemp, 'temperatureMeasurement', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $retryPeriod minutes")
        if (currentInTemp > minTemp && currentInTemp < maxTemp ) {
        log.info("In comfort zone: $currentInTemp is between $minTemp and $maxTemp.")
        console.log('No notifications sent.')
        } else {
        if (currentInTemp > maxTemp ) {
        let alreadyNotified = recentEvents.count({
        it.doubleValue > currentOutTemp
        }) > 1
        if (!alreadyNotified) {
        if (currentOutTemp < maxTemp && !openWindows) {
        this.send("Open some windows to cool down the house! Currently $currentInTempF inside and $currentOutTempF outside.")
        } else {
        if (currentOutTemp > maxTemp && openWindows ) {
        this.send("It's gotten warmer outside! You should close these windows: ${openWindows.join(, )}. Currently $currentInTempF inside and $currentOutTempF outside.")
        } else {
        console.log('No notifications sent. Everything is in the right place.')
        }
        }
        } else {
        console.log('Already notified! No notifications sent.')
        }
        } else {
        if (currentInTemp < minTemp ) {
        let alreadyNotified = recentEvents.count({
        it.doubleValue < currentOutTemp
        }) > 1
        if (!alreadyNotified) {
        if (currentOutTemp > minTemp && !openWindows) {
        this.send("Open some windows to warm up the house! Currently $currentInTempF inside and $currentOutTempF outside.")
        } else {
        if (currentOutTemp < minTemp && openWindows ) {
        this.send("It's gotten colder outside! You should close these windows: ${openWindows.join(, )}. Currently $currentInTempF inside and $currentOutTempF outside.")
        } else {
        console.log('No notifications sent. Everything is in the right place.')
        }
        }
        } else {
        console.log('Already notified! No notifications sent.')
        }
        }
        }
        }
        

	})
