
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Switch to monitor', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.Off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.On', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        if (this.getSunriseAndSunset().sunrise.time < this.now() && this.getSunriseAndSunset().sunset.time > this.now()) {
        console.log('Daytime')
        this.setLocationMode('Home Day')
        } else {
        console.log('Nighttime')
        this.setLocationMode('Home Night')
        }
        console.log("Received on from $theSwitch")
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        if (this.getSunriseAndSunset().sunrise.time < this.now() && this.getSunriseAndSunset().sunset.time > this.now()) {
        console.log('Daytime')
        this.setLocationMode('Away Day')
        } else {
        console.log('Nighttime')
        this.setLocationMode('Away Night')
        }
        console.log("Received off from $theSwitch")
        

	})
