
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door is open...', section => {
            section.deviceSetting('multisensor').capability(['threeAxis']).name('Which?');

        });


        page.section('For too long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.multisensor, 'threeAxis', 'acceleration', 'accelerationHandler')

    })

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        let latestThreeAxisState = multisensor.threeAxisState
        if (latestThreeAxisState) {
        let isOpen = Math.abs(latestThreeAxisState.xyzValue.z) > 250
        let isNotScheduled = state.status != 'scheduled'
        if (!isOpen) {
        this.clearSmsHistory()
        this.clearStatus()
        }
        if (isOpen && isNotScheduled ) {
        this.runIn(maxOpenTime * 60, takeAction, ['overwrite': false])
        state.status = 'scheduled'
        }
        } else {
        log.warn("COULD NOT FIND LATEST 3-AXIS STATE FOR: $multisensor")
        }
        

	})
