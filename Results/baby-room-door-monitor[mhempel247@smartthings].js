
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use this baby room door multi-sensor:', section => {
            section.deviceSetting('multisensor').capability(['accelerationSensor']).name('Which multi-sensor?');

        });


        page.section('To control these bulbs', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue bulbs?');

        });


        page.section('And use these light effects', section => {
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.multisensor, 'accelerationSensor', 'acceleration', 'accelerationHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

        await context.api.subscriptions.subscribeToDevices(context.config.multisensor, 'accelerationSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        log.trace('sunriseHandler()')
        log.trace("7 current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        if (state.force_night != 0) {
        console.log('sunrise occured but we are forcing night for debugging...state remains at night')
        return null
        }
        let prevState = state.state_current
        state.state_current = state.state_current | state.mask_sunlight
        console.log('sunrise/sunset state change')
        state.state_changed = state.state_changed | state.mask_sunlight
        log.trace("7a current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        this.realizeStateChange()
        log.trace("7b current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        log.trace('sunsetHandler()')
        log.trace("8 current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        let prevState = state.state_current
        state.state_current = state.state_current & 4294967295 ^ state.mask_sunlight
        console.log('sunrise/sunset state change')
        state.state_changed = state.state_changed | state.mask_sunlight
        log.trace("8a current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        this.realizeStateChange()
        log.trace("8b current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        log.trace("6 current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let curr = this.now()
        state.riseTime = s.sunrise.time
        state.setTime = s.sunset.time
        let prevState = state.state_current
        if (state.force_night != 0) {
        state.state_current = state.state_current & 4294967295 ^ state.mask_sunlight
        } else {
        if (curr >= state.riseTime && curr < state.setTime) {
        state.state_current = state.state_current | state.mask_sunlight
        } else {
        state.state_current = state.state_current & 4294967295 ^ state.mask_sunlight
        }
        }
        console.log('sunrise/sunset state change')
        state.state_changed = state.state_changed | state.mask_sunlight
        this.realizeStateChange()
        

	})

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        console.log('accelerationHandler()')
        log.trace("10 current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        let prevState = state.state_current
        if (prevState & state.mask_accel != 0) {
        console.log('old accel sensor state is ACTIVE')
        } else {
        console.log('old accel sensor state is INACTIVE')
        }
        if (event.value == 'active') {
        console.log('acceleration sensor is active!')
        state.state_current = state.state_current | state.mask_accel
        } else {
        if (event.value == 'inactive') {
        console.log('acceleration sensor is inactive!')
        state.state_current = state.state_current & 4294967295 ^ state.mask_accel
        }
        }
        console.log('acceleration state change')
        state.state_changed = state.state_changed | state.mask_accel
        log.trace("10a current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        this.realizeStateChange()
        log.trace("10b current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log('contactHandler()')
        log.trace("9 current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        let prevState = state.state_current
        if (prevState & state.mask_contact != 0) {
        console.log('old contact sensor state is OPEN')
        } else {
        console.log('old contact sensor state is CLOSED')
        }
        if (event.value == 'open') {
        console.log('contact sensor is open!')
        state.state_current = state.state_current | state.mask_contact
        } else {
        if (event.value == 'closed') {
        console.log('contact sensor is closed!')
        state.state_current = state.state_current & 4294967295 ^ state.mask_contact
        }
        }
        console.log('contact sensor state change')
        state.state_changed = state.state_changed | state.mask_contact
        log.trace("9a current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        this.realizeStateChange()
        log.trace("9b current state is ${state.state_current} and current change flag vector is ${state.state_changed}")
        

	})
