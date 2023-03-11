
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who...');
            section.deviceSetting('motion1').capability(['motionSensor']).name('and this sensor sees movement...');

        });


        page.section('Unlock the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('And changes the house mode to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionevent')

    })

    .subscribedEventHandler('motionevent', (context, event) => {
        
        console.log("Unlock-on-move event: ${event.value} | presence: ${presence1.currentPresence}[0]")
        if (event.value == 'active' && presence1.currentPresence[0] == 'present') {
        console.log('Movement was active ')
        this.sendPush('Unlocking door because motion sensor and presence detected')
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        console.log("Settings target mdoe to $targetmode")
        this.setLocationMode(targetmode)
        }
        

	})
