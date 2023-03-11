
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which door?');

        });


        page.section('Between what times? (optionally)', section => {
            section.timeSetting('startTime').name('Starting at');
            section.timeSetting('endTime').name('Ending at');

        });


        page.section('Notify if raining at...', section => {
            section.textSetting('zipCode').name('Zipcode');
            section.numberSetting('precipThreshold').name('Rain threshold (mm)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        console.log("$contact1 was opened")
        if (startTime != null && endTime != null) {
        let now = new Date(this.now())
        if (now.before(this.timeToday(startTime)) || now.after(this.timeToday(endTime))) {
        return null
        }
        }
        let data = this.getWeatherFeature('conditions', zipCode)
        let threshold = precipThreshold == null ? 10 : precipThreshold
        if (Integer.parseInt(data.current_observation.precip_today_metric) >= threshold ) {
        console.log("Precepitation is higher than threshold of $threshold, sending push notification")
        this.sendPush('Looks like it\'s rainy today, don\'t forget your umbrella!')
        } else {
        console.log("Precepitation is lower than threshold of $threshold")
        }
        

	})
