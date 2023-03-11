
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Philio motion sensor...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Which sensor?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log("PSM02: motionActiveHandler called with event ${event.descriptionText} from ${event.displayName} with value ${event.value}")
        let dev = settings.motion1.find({
        it.id == event.deviceId
        })
        if (dev) {
        this.sendEvent(dev, ['name': 'motion', 'value': 'inactive'])
        }
        

	})
