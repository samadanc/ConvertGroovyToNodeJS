
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.enumSetting('mode').name('Set thermostat mode to');

        });


        page.section('', section => {

        });


        page.section('Home Day Modes', section => {

        });


        page.section('Home Night Modes', section => {

        });


        page.section('Away Modes', section => {

        });


        page.section('When home during the day,', section => {

        });


        page.section('When home at night', section => {

        });


        page.section('When away', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Get temperature readings from these sensors');
            section.deviceSetting('humiditySensors').capability(['relativeHumidityMeasurement']).name('Get humidity readings from these sensors');

        });


        page.section('', section => {
            section.deviceSetting('coolWindows').capability(['contactSensor']).name('Turn-off Devices When cooling');
            section.deviceSetting('heatWindows').capability(['contactSensor']).name('Turn-off Devices When heating ');
            section.numberSetting('windowDelaySeconds').name('Seconds of Delay to evaluate and Shut off Devices');

        });


        page.section('', section => {
            section.deviceSetting('coolOutlets').capability(['switch']).name('Control these switches when cooling');
            section.deviceSetting('heatOutlets').capability(['switch']).name('Control these switches when heating ');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('evtHandler', (context, event) => {
        
        this.logtrace('Executing \'evtHandler\'')
        console.log("Event: $evt")
        let temp = this.getReadings('temperature')
        log.info("Temp: $temp")
        let humidity = this.getReadings('humidity')
        log.info("Humidity: $humidity")
        let feelsLike = this.getFeelsLike(temp, humidity)
        log.info("Feels Like: $feelsLike")
        this.setSetpoint(feelsLike)
        this.logtrace('End Executing \'evtHandler\'')
        

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        this.logtrace('Executing \'modeChangeHandler\'')
        log.info("modeChangeHandler: $evt, $settings")
        this.evtHandler(evt)
        this.logtrace('End Executing \'modeChangeHandler\'')
        

	})

    .subscribedEventHandler('contactChangeEventHandler', (context, event) => {
        
        this.logtrace('Executing \'contactChangeEventHandler\'')
        let isWindowOpen = false
        if (mode == 'Cooling') {
        isWindowOpen = coolWindows.currentContact.find({
        it == 'open'
        }) ? true : false
        } else {
        isWindowOpen = heatWindows.currentContact.find({
        it == 'open'
        }) ? true : false
        }
        console.log("Window Open: $isWindowOpen")
        if (!state.waitingForWindowDelayTime && isWindowOpen ) {
        this.scheduleRunIn()
        } else {
        if (state.waitingForWindowDelayTime && !isWindowOpen) {
        console.log('Waiting for delay time, but the window isn\'t open')
        } else {
        if (!state.waitingForWindowDelayTime && !isWindowOpen) {
        this.scheduleRunIn()
        console.log('Not currently waiting for assessment, and window closed')
        } else {
        if (state.waitingForWindowDelayTime && isWindowOpen ) {
        console.log('Waiting for delay time, and the window is open')
        } else {
        log.warn('Missed something in Contact Event Handler')
        }
        }
        }
        }
        this.logtrace('End Executing \'contactChangeEventHandler\'')
        

	})
