
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch to manage:', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Repeat settings', section => {
            section.numberSetting('repeatTimes').name('Number of times?');
            section.numberSetting('repeatDelay').name('Seconds between repeats?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("switchHandler called: $evt")
        if (repeatTimes < 1) {
        log.warn("Invalid value for repeatTimes: $repeatTimes")
        return null
        }
        if (repeatDelay < 1) {
        log.warn("Invalid value for repeatDelay: $repeatDelay")
        return null
        }
        let curCount = state.count
        console.log("Scheduling repeat #${(curCount + 1)} for '${event.value}' in $repeatDelay seconds...")
        this.runIn(repeatDelay, runCommand, ['data': ['command': event.value]])
        

	})
