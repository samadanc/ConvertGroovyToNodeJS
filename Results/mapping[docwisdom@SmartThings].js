
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Departing From:', section => {
            section.textSetting('departFrom').name('Address?');

        });


        page.section('Arriving At:', section => {
            section.textSetting('arriveAt').name('Address?');

        });


        page.section('Expected Arrival Time:', section => {
            section.timeSetting('arrivalTime').name('When?');

        });


        page.section('Begin Checking At:', section => {
            section.timeSetting('checkTime').name('When?');

        });


        page.section('Trigger MODERATE TRAFFIC if commute increases this many minutes:', section => {
            section.numberSetting('threshold2').name('Minutes?');

        });


        page.section('Trigger BAD TRAFFIC if commute increases by this many minutes:', section => {
            section.numberSetting('threshold3').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkTimeHandler', delay);

    })

    .scheduledEventHandler('checkTimeHandler', (context, event) => {
        
        if (this.now() > this.timeToday(checkTime).time && this.now() < this.timeToday(arrivalTime).time) {
        console.log('Its time')
        this.runIn(60, checkTrafficHandler)
        } else {
        console.log('Its not time anymore')
        this.initialize()
        }
        

	})
