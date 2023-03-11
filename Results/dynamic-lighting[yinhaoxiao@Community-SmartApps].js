
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Triggers', section => {
            section.deviceSetting('switchButton').capability(['momentary']).name('When this switch is pushed:');
            section.deviceSetting('motion').capability(['motionSensor']).name('When motion is detected here:');

        });


        page.section('Settings', section => {
            section.deviceSetting('lights').capability(['switchLevel']).name('Light(s) to control');
            section.deviceSetting('weatherStation').capability(['illuminanceMeasurement']).name('Weather station to use');
            section.booleanSetting('toggleMode').name('Work in toggle mode? If enabled, will turn lights on/off from triggers. If disabled, it will only turn on');

        });


        page.section('['hideable': true, 'hidden': true], 'Advanced Light Values', section => {
            section.numberSetting('lowBrightness').name('Low outside light bulb brightness');
            section.numberSetting('lowLuxThreshold').name('Low outside light top lux value');
            section.numberSetting('medBrightness').name('Medium outside light bulb brightness');
            section.numberSetting('medLuxThreshold').name('Medium outside light top lux value');
            section.numberSetting('highBrightness').name('High outside light bulb brightness');
            section.numberSetting('lightThreshold').name('Don\');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchButton, 'momentary', 'momentary.pushed', 'appHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'appHandler')

    })

    .subscribedEventHandler('appHandler', (context, event) => {
        
        let lux = weatherStation.currentIlluminance
        let lightSwitches = lights?.currentSwitch
        let lightLevels = lights?.currentLevel
        console.log("Light switch is $lightSwitches and the level is set to $lightLevels. Illuminance is currently $lux")
        if (lightSwitches.toString().contains('off')) {
        if (lux < lightThreshold ) {
        console.log('At least one light is currently off, so turn them all on')
        lights?.on()
        if (lux > 0 && lux <= lowLuxThreshold ) {
        lights?.setLevel(lowBrightness)
        } else {
        if (lux > lowLuxThreshold && lux <= medLuxThreshold ) {
        lights?.setLevel(medBrightness)
        } else {
        lights?.setLevel(highBrightness)
        }
        }
        console.log("Light is ${lights?.currentSwitches} and set to ${lights?.currentLevels}")
        }
        } else {
        if (toggleMode == true) {
        console.log('All lights are currently on, so turn all of them off')
        lights?.off()
        }
        }
        

	})
