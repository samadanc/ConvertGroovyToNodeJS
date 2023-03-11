
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a motion sensor...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Which motion sensor?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Dim 1 minute before turning off...', section => {
            section.booleanSetting('boolDim').name('Dim before turning off');

        });


        page.section('Only during certain times...', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


        page.section('Only when illuminance is less than....', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');
            section.numberSetting('lightLevel').name('Below level');

        });


        page.section('Always turn off lights after motion stops, even if outside of specifed time, illuminance, or mode conditions?', section => {
            section.booleanSetting('boolDontObserve').name('Always turn off after motion stops');

        });


        page.section('If multiple lights are selected, remember on/off state of individual lights when motion stops and restore when motion starts?', section => {
            section.booleanSetting('boolRemember').name('Remember states?');

        });


        page.section('Disable app? (Use this to temporarily prevent this app from effecting changes on the lights without needing to actually uninstall the app.)', section => {
            section.booleanSetting('boolDisable').name('Disable app');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("----------------Begin handling of ${event.name}: ${event.value}----------------")
        if (boolDisable) {
        lob.debug('---------------- App configured to be to disabled. Exiting motion handler. ----------------')
        }
        log.info("state.mode = ${state.mode}")
        if (!(this.isRunTimeOK()) || !(this.isLuxLevelOK()) || !(this.isModeOK()) && !boolDontObserve) {
        console.log('Outside specified run time, lux level, or mode. Returning.')
        return null
        }
        if (event.value == 'active') {
        log.trace('Motion active. Turn on lights (or ensure on). Calling turnOnOrRestoreLights()...')
        this.turnOnOrRestoreLights()
        } else {
        if (event.value == 'inactive') {
        log.trace('Motion inactive. Deciding what to do...')
        if (boolDim) {
        log.trace('Dimming option has been chosen. Scheduling scheduleCheck() to run after \'dimming\' threshold reached.')
        this.runIn(this.getDimRunDelay(), scheduleCheck)
        } else {
        log.trace('Dimming option not chosen. Scheduling scheduleCheck() to run after \'off\' threshold reached.')
        this.runIn(this.getOffRunDelay(), scheduleCheck)
        }
        }
        }
        console.log("----------------End handling of ${event.name}: ${event.value}----------------")
        

	})
