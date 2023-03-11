
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Light Sensor', section => {
            section.deviceSetting('lightMeter').capability(['illuminanceMeasurement']).name('Light Meters');

        });


        page.section('Select Dimmers to Use', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('Dimmer Switches');
            section.deviceSetting('dependentSwitch').capability(['switch']).name('Override switch');
            section.enumSetting('dependentSwitchState').name('Switch state');

        });


        page.section('When any of the following members are present', section => {
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightMeter, 'illuminanceMeasurement', 'illuminance', 'handleLuxChange')

    })

    .subscribedEventHandler('handleLuxChange', (context, event) => {
        
        state.luxMeasurement = event.integerValue
        console.log("Current lux is ${state.luxMeasurement}")
        console.log("dependentSwitchState is $dependentSwitchState")
        console.log("luxStep is $luxStep")
        if
        return null
        }
        let presentCounter = 0
        presenceSensors.each({
        if (it.currentValue('presence') == 'present') {
        presentCounter++
        }
        })
        if (presentCounter > 0) {
        if (state.luxMeasurement < luxStep ) {
        console.log('Dimmers to 100%')
        switches?.setLevel(100)
        }
        if (state.luxMeasurement >= luxStep && state.luxMeasurement < 2 * luxStep ) {
        console.log('Dimmers to 75%')
        switches?.setLevel(75)
        }
        if (state.luxMeasurement >= 2 * luxStep && state.luxMeasurement < 3 * luxStep ) {
        console.log('Dimmers to 50%')
        switches?.setLevel(50)
        }
        if (state.luxMeasurement >= 3 * luxStep && state.luxMeasurement < 4 * luxStep ) {
        console.log('Dimmers to 25%')
        switches?.setLevel(25)
        }
        if (state.luxMeasurement >= 4 * luxStep ) {
        console.log('Dimmers to 0%')
        switches?.setLevel(0)
        }
        } else {
        console.log('No-one is present')
        }
        

	})
