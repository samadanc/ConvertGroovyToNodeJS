
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('['hideable': true], 'Overview'', section => {

        });


        page.section('SmartApp Settings', section => {
            section.deviceSetting('coopBoss').capability(['doorControl']).name('Select CoopBoss to manage.');
            section.deviceSetting('coopLight').capability(['switch']).name('Select Coop light(s) to manage.');
            section.numberSetting('offLightValue').name('Enter the CoopBoss light level that will turn off the light in the morning.');
            section.enumSetting('sendPushMessage').name('Notify me when this app turns the light on or off (sends a SmartThings notification to your phone).');
            section.enumSetting('skipTomorrow').name('Let your hens sleepin.  Select yes to disable rule and let your hens sleep in tomorrow.');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.coopBoss, 'doorControl', 'currentLightLevel', 'checkLight')

    })

    .subscribedEventHandler('checkLight', (context, event) => {
        
        let outsideLightLevel = (event.value as int)
        let sleepTime = 24 - targetLightHours
        log.info("outside light level: $outsideLightLevel, coop light has been turned on by app: ${atomicState.clmTurnedLightOn}, sleep time: $sleepTime hours, timer is ${atomicState.timerState}")
        if (outsideLightLevel >= offLightValue && atomicState.clmTurnedLightOn == 'yes') {
        console.log('Turning coop light off')
        if (sendPushMessage == 'Yes') {
        this.sendPush('Coop Light Management app turned coop light off.')
        }
        coopLight*.off()
        atomicState.clmTurnedLightOn = 'no'
        }
        if (outsideLightLevel == 0 && atomicState.timerState == 'off') {
        let secondsToLightOn = sleepTime * 3600
        secondsToLightOn = ((int) secondsToLightOn)
        atomicState.timerState = 'on'
        console.log("Sunset detected, light will be switched on in $secondsToLightOn seconds.")
        this.runIn(secondsToLightOn, 'turnLightOn')
        }
        

	})
