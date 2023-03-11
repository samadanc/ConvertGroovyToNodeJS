
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Flags', section => {
            section.booleanSetting('clearState').name('Clear State');
            section.booleanSetting('ignore' + name ').name('Ignore ');

        });


        page.section('Contact Sensors', section => {
            section.deviceSetting('name').capability(['contactSensor']).name('title + ' Contact Sensor');

        });


        page.section('Illuminance Measurements', section => {
            section.deviceSetting('name').capability(['illuminanceMeasurement']).name('title + ' Illuminance Measurement');

        });


        page.section('Motion Sensors', section => {
            section.deviceSetting('name').capability(['motionSensor']).name('title + ' Motion Sensor');

        });


        page.section('Switch Inputs', section => {
            section.deviceSetting('name').capability(['switch']).name('title + ' Switch Input');

        });


        page.section('Switches', section => {
            section.deviceSetting('name').capability(['switch']).name('title + ' Switch');
            section.deviceSetting('name').capability(['switchLevel']).name('title + ' Switch Level');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('respondToMotion', (context, event) => {
        
        this.respond(indent + "⚽ ${e.value} ${e.name} ${e.device}")
        

	})

    .subscribedEventHandler('respondToContact', (context, event) => {
        
        this.respond(indent + "⚡ ${e.value} ${e.name} ${e.device}")
        

	})

    .subscribedEventHandler('respondToIlluminance', (context, event) => {
        
        this.respond(indent + "☼ ${e.value} ${e.name} ${e.device}")
        

	})

    .subscribedEventHandler('respondToSwitch', (context, event) => {
        
        this.respond(indent + "⚡ ${e.value} ${e.name} ${e.device}")
        

	})
