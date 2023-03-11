
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Who?', section => {
            section.deviceSetting('selectedSensors').capability(['presenceSensor']).name('Presense sensors?');

        });


        page.section('Cameras to adjust?', section => {
            section.deviceSetting('selectedCameras').capability(['imageCapture']).name('Cameras?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.selectedSensors, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        if (state.home == false) {
        if (event.value == 'present') {
        selectedCameras.each({ let camera ->
        log.trace('go home')
        camera.home()
        })
        state.home = true
        }
        } else {
        let allGone = true
        selectedSensors.each({ let sensor ->
        if (sensor.currentValue('presence') == 'present') {
        allGone = false
        }
        })
        log.trace("all gone = $allGone")
        if (allGone == true) {
        selectedCameras.each({ let camera ->
        log.trace('go middle')
        camera.presetGoName('middle')
        })
        state.home = false
        }
        }
        

	})
