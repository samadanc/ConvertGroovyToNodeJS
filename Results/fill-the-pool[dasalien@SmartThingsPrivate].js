
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When no water is sensed...', section => {
            section.deviceSetting('sensor').capability(['waterSensor']).name('Pool Level Sensor?');

        });


        page.section('Activate Sprinkler Zone...', section => {
            section.deviceSetting('valve').capability(['valve']).name('Which?');

        });


        page.section('For this amount of time...', section => {

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


        page.section('Minimum time between messages (optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'waterSensor', 'water', 'waterHandler')

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        console.log("Sensor says ${event.value}")
        if (state.dryCount == null) {
        state.dryCount = 0
        }
        if (state.splashTimeout == null) {
        state.splashTimeout = 0
        }
        if (state.poolRunning == null) {
        state.poolRunning = 0
        }
        if (event.value == 'wet') {
        console.log('Water sensed.')
        state.dryCount = 0
        state.splashTimeout = 0
        if (state.poolRunning > 0) {
        state.poolRunning = 0
        this.closeValve()
        }
        }
        if (event.value == 'dry') {
        console.log("poolRunning ${state.poolRunning}")
        console.log("splashTimeout ${state.splashTimeout}")
        console.log("dryCount ${state.dryCount}")
        if (state.poolRunning == 0) {
        console.log('Pool zone is not running')
        if (state.splashTimeout == 0) {
        console.log('No Splash Timeout')
        if (state.dryCount > 0) {
        console.log('dryCount > 0')
        this.fillPool()
        } else {
        console.log('dryCount == 0')
        state.splashTimeout = 1
        state.dryCount = 1
        state.poolRunning = 0
        console.log("Increasing Dry Count (${state.dryCount})")
        console.log('Waiting 60 seconds')
        this.runIn(60, splashTimer)
        }
        }
        }
        }
        

	})
