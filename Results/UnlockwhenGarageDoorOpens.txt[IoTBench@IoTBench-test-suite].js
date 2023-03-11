
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door sensor:', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which sensor?');

        });


        page.section('Interior door lock:', section => {
            section.deviceSetting('interiorDoorLock').capability(['lock']).name('Which door lock?');

        });


        page.section('Relock later?', section => {
            section.enumSetting('lockLater').name('Should I relock?');
            section.enumSetting('reallyLockLater').name('Relock even if originally unlocked?');
            section.numberSetting('lockDelay').name('How many minutes should I wait before locking?');

        });


        page.section('Optional: Have Ubi speak when the door locks:', section => {
            section.textSetting('behaviorToken').name('What is the Ubi Token?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorSensor, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("current lock status: ${interiorDoorLock.currentLock}")
        if (interiorDoorLock.currentLock == 'locked') {
        
        context.api.devices.sendCommands(context.config.interiorDoorLock, 'lock', unlock)
    
        if (lockLater == 'Yes') {
        let timeDelay = lockDelay * 60
        this.runIn(timeDelay, relock)
        }
        } else {
        if (reallyLockLater == 'Yes') {
        let timeDelay = lockDelay * 60
        this.runIn(timeDelay, relock)
        }
        }
        

	})
