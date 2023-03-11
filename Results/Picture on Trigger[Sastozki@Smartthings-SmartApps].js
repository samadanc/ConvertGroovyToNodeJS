
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick your motion sensor.', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor');

        });


        page.section('Pick your Door.', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Contact Sensor');

        });


        page.section('Pick your Camera.', section => {
            section.deviceSetting('Camera').capability(['imageCapture']).name('Camera');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'motionActive')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        this.capture()
        

	})

    .subscribedEventHandler('motionActive', (context, event) => {
        
        this.capture()
        

	})
