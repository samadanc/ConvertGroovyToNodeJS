
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this contact sensor is opened', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('');

        });


        page.section('Move to this preset', section => {
            section.enumSetting('preset').name('');

        });


        page.section('Travel Time to wait before taking photo', section => {
            section.numberSetting('pauseSeconds').name('');

        });


        page.section('Take a picture with this camera', section => {
            section.deviceSetting('camera').capability(['imageCapture']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.open', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log('Contact Opened - Moving into position')
        if (preset == '1') {
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', preset1)
    
        }
        if (preset == '2') {
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', preset2)
    
        }
        if (preset == '3') {
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', preset3)
    
        }
        this.runIn(pauseSeconds, takePicture)
        

	})
