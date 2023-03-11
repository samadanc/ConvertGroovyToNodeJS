
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there is motion...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Delay after motions stops to turn off lights...', section => {
            section.numberSetting('delayMinutes').name('Delay in Minutes..');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn on a dimmer...', section => {
            section.deviceSetting('dimmer1').capability(['switchLevel']).name('');

        });


        page.section('Dimmer Value', section => {
            section.numberSetting('dimmerValue').name('dimmer Value 10% - 100%?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'contactMotionHandler')

    })

    .subscribedEventHandler('contactMotionHandler', (context, event) => {
        
        let lastStatusDimmer = state.dimmerLastStatus
        let lastStatusSwitch = state.switchLastStatus
        if (event.value == 'active') {
        console.log('There is motion')
        state.motionStopTime = this.now()
        if (dimmer1 != null && state.dimmerLastStatus != 'on') {
        log.trace("dimmerValue = $dimmerValue")
        log.trace('Turning Dimmer on')
        
        context.api.devices.sendCommands(context.config.dimmer1, 'switchLevel', setLevel)
    
        state.dimmerLastStatus = 'on'
        }
        if (switch1 != null && state.switchLastStatus != 'on') {
        log.trace('Turning Switch On')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        state.switchLastStatus = 'on'
        }
        } else {
        if (event.value == 'inactive') {
        console.log('There is no motion')
        state.motionStopTime = this.now()
        if (delayMinutes != null) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay, ['overwrite': false])
        } else {
        this.turnOffMotionNoDelay()
        }
        }
        }
        

	})
