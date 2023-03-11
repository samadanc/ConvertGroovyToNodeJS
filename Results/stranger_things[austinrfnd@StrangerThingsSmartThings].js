
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('motion_sensor').capability(['motionSensor']).name('Motion Sensor');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Speaker player');
            section.deviceSetting('christmas_light').capability(['switch']).name('Christmas Lights');
            section.deviceSetting('dimmed_light').capability(['switchLevel']).name('Outdoor Porch Lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion_sensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if ('active' == event.value) {
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playTrackAtVolume)
    
        
        context.api.devices.sendCommands(context.config.dimmed_light, 'switchLevel', setLevel)
    
        this.runIn(1, turnOffLightsA)
        this.runIn(2, turnOnLightsA)
        this.runIn(4, turnOffLightsB)
        this.runIn(5, turnOnLightsB)
        this.runIn(6, turnOffLightsC)
        this.runIn(7, turnOnLightsC)
        this.runIn(10, turnOffLightsD)
        this.runIn(11, turnOnLightsD)
        this.runIn(14, turnOffLightsE)
        this.runIn(15, turnOnLightsE)
        this.runIn(20, resetEverything)
        }
        

	})
