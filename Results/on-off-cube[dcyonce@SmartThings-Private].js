
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''On/Off Cube - dcyonce'', section => {

        });


        page.section('Select a Sensor to control lights  ...', section => {
            section.deviceSetting('cube').capability(['threeAxis']).name('SmartSense Multi sensor');

        });


        page.section('To control these lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights, switches & dimmers');

        });


        page.section(' ', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.cube, 'threeAxis', 'threeAxis', 'positionHandler')

    })

    .subscribedEventHandler('positionHandler', (context, event) => {
        
        let sceneId = this.getOrientation(event.xyzValue)
        log.trace("orientation: $sceneId")
        if (sceneId != state.lastActiveSceneId) {
        this.restoreStates(sceneId)
        } else {
        log.trace('No status change')
        }
        state.lastActiveSceneId = sceneId
        

	})
