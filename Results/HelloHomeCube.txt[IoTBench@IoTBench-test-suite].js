
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use the orientation of this cube', section => {
            section.deviceSetting('cube').capability(['threeAxis']).name('SmartSense Multi sensor');

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
        this.runHomeAction(sceneId)
        } else {
        log.trace('No status change')
        }
        state.lastActiveSceneId = sceneId
        

	})
