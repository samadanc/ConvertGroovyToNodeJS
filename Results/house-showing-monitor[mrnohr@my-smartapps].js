
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('door1').capability(['contactSensor']).name('Which door?');
            section.deviceSetting('light1').capability(['switch']).name('Which light?');

        });


        page.section('Config', section => {
            section.numberSetting('thresholdMin').name('How Long?');

        });


        page.section('Contacts', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.light1, 'switch', 'switch.off', 'switchOffHanlder')

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contactHandler - ${state.inProgress} - ${event.value}")
        let milliThreshold = ((thresholdMin * 60 * 1000) as Long)
        if (state.inProgress == true) {
        let timePassed = this.now() - (state.startTime as Long)
        if (event.value == 'closed' && timePassed > milliThreshold ) {
        this.endShowing()
        } else {
        console.log("In progress, door ${event.value} - time $timePassed - threshold $milliThreshold")
        }
        } else {
        if (event.value == 'open') {
        this.startShowing()
        }
        }
        

	})

    .subscribedEventHandler('switchOffHanlder', (context, event) => {
        
        if (atomicState.inProgress == true) {
        this.resetState(false)
        let msg = 'House showing reset'
        console.log(msg)
        this.messageMe(msg)
        }
        

	})
