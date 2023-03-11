
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door is open...', section => {

        });


        page.section('For too long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Text me at...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.multisensor, 'device.smartSenseMulti', 'acceleration', 'accelerationHandler')

    })

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.multisensor, 'device.smartSenseMulti', latestState)
    
        if (latestThreeAxisState) {
        let latestThreeAxisDate = latestThreeAxisState.dateCreated.toSystemDate()
        let isOpen = Math.abs(latestThreeAxisState.xyzValue.z) > 250
        if (isOpen) {
        let deltaMillis = 1000 * 60 * maxOpenTime
        let timeAgo = new Date(this.now() - deltaMillis )
        let openTooLong = latestThreeAxisDate < timeAgo
        console.log("openTooLong: $openTooLong")
        let recentTexts = state.smsHistory.find({
        it.sentDate.toSystemDate() > timeAgo
        })
        console.log("recentTexts: $recentTexts")
        if (openTooLong && !recentTexts) {
        let openMinutes = maxOpenTime * state.smsHistory?.size() ? state.smsHistory?.size() : 1
        this.sendTextMessage(openMinutes)
        }
        } else {
        this.clearSmsHistory()
        }
        } else {
        log.warn("COULD NOT FIND LATEST 3-AXIS STATE FOR: $multisensor")
        }
        

	})
