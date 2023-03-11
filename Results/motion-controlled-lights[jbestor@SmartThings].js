
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Pick your motion sensor');
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Pick your dimming lamp(s)');
            section.numberSetting('dimmerValue').name('Enter dimmer level percentage (no % sign)');
            section.numberSetting('delayValue').name('Delay (in minutes) before turning off lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'myMotionHandler')

    })

    .subscribedEventHandler('myMotionHandler', (context, event) => {
        
        if ('active' == event.value) {
        this.sendNotificationEvent('Motion detected - turning lights turned on')
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', setLevel)
    
        state.isActive = true
        } else {
        if ('inactive' == event.value) {
        console.log("Inactivity detected.  TurnoffHandlerCalled = ${state.TurnoffHandlerCalled}")
        state.isActive = false
        if (state.TurnoffHandlerCalled == false) {
        this.sendNotificationEvent("Calling handlerTurnoff in ${settings.delayValue} minutes.")
        let delaySeconds = settings.delayValue * 60
        this.runIn(delaySeconds, handlerTurnoff)
        state.TurnoffHandlerCalled = true
        }
        }
        }
        

	})
