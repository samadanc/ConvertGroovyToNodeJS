
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
        if (state.force_night != 0) {
        console.log('sunriseHandler: sunrise occured but we are forcing night for debugging...state remains at night')
        return null
        }
        this.determineState()
        state.state_changed = state.mask_sunlight
        this.realizeStateChange()
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        log.trace('sunsetHandler()')
        if (state.force_night != 0) {
        console.log('sunsetHandler: sunset occured but we are forcing night for debugging...state remains at night')
        return null
        }
        this.determineState()
        state.state_changed = state.mask_sunlight
        this.realizeStateChange()
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        this.determineState()
        state.state_changed = state.mask_sunlight
        this.realizeStateChange()
        

	})

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        console.log('accelerationHandler()')
        this.determineState()
        state.state_changed = state.mask_accel
        this.realizeStateChange()
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log('contactHandler()')
        this.determineState()
        state.state_changed = state.mask_contact
        this.realizeStateChange()
        

	})
