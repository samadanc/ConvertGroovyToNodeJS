
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick your motion sensor.', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor');

        });


        page.section('Pick your Dropcam.', section => {
            section.deviceSetting('dropcam').capability(['imageCapture']).name('Dropcam');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'motionActive')

    })

    .subscribedEventHandler('motionActive', (context, event) => {
        
        this.capture()
        

	})
