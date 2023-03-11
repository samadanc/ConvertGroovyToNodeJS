
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('relays').capability(['switch']).name('Select a relay switch');
            section.numberSetting('zipcode').name('Enter rain delay zip code');

        });


        page.section('', section => {
            section.enumSetting('days').name('Choose days');
            section.timeSetting('starttime').name('Enter a start time');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('minuteHandler', delay);

    })

    .scheduledEventHandler('minuteHandler', (context, event) => {
        
        let currentDay = new Date().format('EEEE', location.timeZone)
        if
        console.log('not a watering day, leaving')
        this.changeWateringState('')
        return null
        }
        if (zipcode != null && zipcode != '') {
        let recentPrecipitation = this.getPrecipitationInches()
        if (recentPrecipitation > 0.5) {
        console.log('too much precipitation, leaving')
        this.changeWateringState('')
        return null
        }
        }
        let time = this.getLocalTime()
        let totalMinutes = time[0] * 60 + time[1]
        let newWateringState = state.wateringSchedule.get(totalMinutes.toString())
        this.changeWateringState(newWateringState)
        

	})
