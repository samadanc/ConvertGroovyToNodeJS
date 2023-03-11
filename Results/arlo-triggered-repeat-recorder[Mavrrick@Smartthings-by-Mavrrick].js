
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of the following devices trigger...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor?');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Sensor?');
            section.deviceSetting('myButton').capability(['momentary']).name('What Button?');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Sensor?');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch?');
            section.deviceSetting('myPresence').capability(['presenceSensor']).name('Presence Sensor?');
            section.deviceSetting('myMoisture').capability(['waterSensor']).name('Moisture Sensor?');

        });


        page.section('Setup', section => {
            section.deviceSetting('cameras').capability(['videoCapture']).name('');
            section.numberSetting('clipLength').name('Clip Length');
            section.booleanSetting('recordRepeat').name('Enable Camare to trigger recording as long as arlarm is occuring?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myMoisture, 'waterSensor', 'water.wet', 'arloCapture')

        await context.api.subscriptions.subscribeToDevices(context.config.myPresence, 'presenceSensor', 'presence', 'arloCapture')

        await context.api.subscriptions.subscribeToDevices(context.config.mySwitch, 'switch', 'switch.on', 'arloCapture')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'arloCapture')

        await context.api.subscriptions.subscribeToDevices(context.config.acceleration, 'accelerationSensor', 'acceleration.active', 'arloCapture')

        await context.api.subscriptions.subscribeToDevices(context.config.myButton, 'momentary', 'momentary.pushed', 'arloCapture')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'arloCapture')

    })

    .subscribedEventHandler('arloCapture', (context, event) => {
        
        console.log("Refreshing cameras with $clipLength second capture")
        Date start = new Date()
        Date end = new Date()
        this.use(TimeCategory, {
        end = start + clipLength.seconds
        })
        console.log("Capturing at $start to $end...")
        
        context.api.devices.sendCommands(context.config.cameras, 'videoCapture', capture)
    
        this.use(TimeCategory, {
        start = start + clipLength.seconds
        })
        if (settings.recordRepeat) {
        this.runIn(clipLength, cameraRepeatChk)
        }
        

	})
