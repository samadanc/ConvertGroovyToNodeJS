
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

        await context.api.subscriptions.subscribeToDevices(context.config.cube, 'threeAxis', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.cube, 'threeAxis', 'threeAxis', 'positionHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let action = event.value == 'open' ? 'leave' : 'home'
        log.trace("contact ${event.value} : $action")
        if (action != state.lastActiveAction) {
        this.runHomeAction(action)
        } else {
        log.trace('No status change')
        }
        state.lastActiveAction = action
        

	})

    .subscribedEventHandler('positionHandler', (context, event) => {
        
        let faceId = this.getOrientation(event.xyzValue)
        log.trace("orientation: $faceId")
        if (faceId != state.lastActiveSceneId) {
        this.runHomeAction(faceId)
        } else {
        log.trace('No status change')
        }
        state.lastActiveSceneId = faceId
        

	})
