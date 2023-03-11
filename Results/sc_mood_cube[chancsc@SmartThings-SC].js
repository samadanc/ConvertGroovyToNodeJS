
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use the orientation of this cube', section => {
            section.deviceSetting('cube').capability(['threeAxis']).name('SmartSense Multi sensor');

        });


        page.section('To control these lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights, switches & dimmers');

        });


        page.section(' ', section => {

        });


        page.section('Enabled/Disabled', section => {
            section.booleanSetting('enabled').name('Enabled?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.cube, 'threeAxis', 'threeAxis', 'positionHandler')

    })

    .subscribedEventHandler('positionHandler', (context, event) => {
        
        let sceneId = this.getOrientation(event.xyzValue)
        log.trace("orientation: $sceneId")
        log.trace("state.lastActiveSceneId: ${state.lastActiveSceneId}")
        if (sceneId != state.lastActiveSceneId) {
        this.restoreStates(sceneId)
        } else {
        log.trace('No status change')
        }
        log.trace('set state.lastActiveSceneId = sceneId')
        state.lastActiveSceneId = sceneId
        log.trace("state.lastActiveSceneId: ${state.lastActiveSceneId}")
        

	})
