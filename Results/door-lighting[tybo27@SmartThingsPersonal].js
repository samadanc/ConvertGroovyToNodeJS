
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on these things', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Door Switch');
            section.deviceSetting('switches').capability(['switch']).name('On/Off Devices');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmer Devices');
            section.numberSetting('dimmerLevel').name('dimmerLevel');
            section.numberSetting('timeDelay').name('Time Delay');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'doorOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'doorClosedHandler')

    })

    .subscribedEventHandler('doorClosedHandler', (context, event) => {
        
        console.log("${event.displayName} has triggered door *${event.value}*, scheduling return to previous in $timeDelays")
        let eventDevice = event.device
        atomicState.delayIsOn = 1
        this.runIn(timeDelay, returnState)
        

	})

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        console.log("${event.displayName} has triggered door *${event.value}*")
        let eventDevice = event.device
        let delayIsOn = atomicState.delayIsOn
        let curSwitchStates = [:]
        let curDimmerLevels = [:]
        if (delayIsOn == 1) {
        console.log('Removing scheduled execution')
        this.unschedule(returnState)
        } else {
        for (let aSwitch : switches ) {
        console.log("${aSwitch.displayName} is currently *${aSwitch.currentSwitch}*, commanding on")
        curSwitchStates[aSwitch.displayName] = aSwitch.currentSwitch
        aSwitch.on()
        }
        for (let aDimmer : dimmers ) {
        curSwitchStates[aDimmer.displayName] = aDimmer.currentSwitch
        curDimmerLevels[aDimmer.displayName] = aDimmer.currentLevel
        if (aDimmer.currentLevel < dimmerLevel ) {
        console.log("${aDimmer.displayName} is currently *${aDimmer.currentSwitch}* and ${aDimmer.currentLevel} < $dimmerLevel so setting level")
        aDimmer.setLevel(dimmerLevel)
        } else {
        console.log("${aDimmer.displayName} is currently *${aDimmer.currentSwitch}* and ${aDimmer.currentLevel} >= $dimmerLevel so turning on")
        aDimmer.setLevel(aDimmer.currentLevel)
        }
        }
        console.log("Switches were: $curSwitchStates")
        console.log("Dimmers were: $curDimmerLevels")
        atomicState.dimmerLevels = curDimmerLevels
        atomicState.switchStates = curSwitchStates
        }
        

	})
