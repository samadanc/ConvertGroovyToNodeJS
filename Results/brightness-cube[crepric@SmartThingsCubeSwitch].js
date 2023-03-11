
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Cube sensor:', section => {
            section.deviceSetting('cube_sensor').capability(['accelerationSensor']).name('Which sensor is inside the cube?');

        });


        page.section('Which lights?', section => {
            section.deviceSetting('lights').capability(['switchLevel']).name('');

        });


        page.section('Scene 1', section => {
            section.numberSetting('bright_1').name('What is the brightness level?');

        });


        page.section('Scene 2', section => {
            section.numberSetting('bright_2').name('What is the brightness level?');

        });


        page.section('Scene 3', section => {
            section.numberSetting('bright_3').name('What is the brightness level?');

        });


        page.section('Scene 4', section => {
            section.numberSetting('bright_4').name('What is the brightness level?');

        });


        page.section('Scene 5', section => {
            section.numberSetting('bright_5').name('What is the brightness level?');

        });


        page.section('Scene 6', section => {
            section.numberSetting('bright_6').name('What is the brightness level?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.cube_sensor, 'accelerationSensor', 'currentFace', 'cubeMotionHandler')

    })

    .subscribedEventHandler('cubeMotionHandler', (context, event) => {
        
        console.log(event.name + ' ' + event.value + ' ' + event.isStateChange())
        this.unschedule()
        this.runIn(2, 'setScene', ['data': ['current_face': event.value]])
        

	})
