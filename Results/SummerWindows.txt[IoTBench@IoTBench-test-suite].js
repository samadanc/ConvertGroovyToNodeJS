
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Outdoor sensor...', section => {
            section.deviceSetting('temperatureSensorOut').capability(['temperatureMeasurement']).name('');

        });


        page.section('Indoor sensor...', section => {
            section.deviceSetting('temperatureSensorIn').capability(['temperatureMeasurement']).name('');

        });


        page.section('How much cooler or warmer...', section => {
            section.numberSetting('offset').name('how many degrees.');

        });


        page.section('Open/Close what?', section => {
            section.textSetting('noteSuffix').name('Room and Door/Windows');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensorIn, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let inIS = event.doubleValue
        let lastOut = temperatureSensorOut.currentTemperature - offset
        console.log("in is $inIS and out is $lastOut")
        if (inIS > lastOut ) {
        if (state.windows != 'open') {
        this.send("It's cooling off outside, open the ${settings.noteSuffix}!")
        state.windows = 'open'
        console.log('open')
        }
        } else {
        if (inIS < lastOut ) {
        if (state.windows != 'closed') {
        this.send("It's warming up outside, close the ${settings.noteSuffix}!")
        state.windows = 'closed'
        console.log('closed')
        }
        }
        }
        

	})
