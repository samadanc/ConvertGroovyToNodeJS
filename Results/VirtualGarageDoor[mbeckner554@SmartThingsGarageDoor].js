
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the switch/relay that opens closes the garage?', section => {
            section.deviceSetting('opener').capability(['switch']).name('Physical Garage Opener?');

        });


        page.section('Use a off() trigger for garage switch?', section => {
            section.enumSetting('customTrigger').name('Use off() trigger?');

        });


        page.section('Choose the sensor that senses if the garage is open closed? ', section => {
            section.deviceSetting('sensor').capability(['contactSensor']).name('Physical Garage Door Open/Closed?');

        });


        page.section('Choose the Virtual Garage Door Device? ', section => {
            section.deviceSetting('virtualgd').capability(['doorControl']).name('Virtual Garage Door?');

        });


        page.section('Choose the Virtual Garage Door Device sensor (same as above device)?', section => {
            section.deviceSetting('virtualgdbutton').capability(['contactSensor']).name('Virtual Garage Door Open/Close Sensor?');

        });


        page.section('Choose the virtual switch that Alexa uses to control the garage?', section => {
            section.deviceSetting('alexavirtualswitch').capability(['switch']).name('Alexa Garage Opener?');

        });


        page.section('Timeout before checking if the door opened or closed correctly?', section => {
            section.numberSetting('checkTimeout').name('Door Operation Check Timeout?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('subscribeDevices', delay);

    })

    .scheduledEventHandler('subscribeDevices', (context, event) => {
        
        this.subscribe(sensor, 'contact', contactHandler)
        this.subscribe(virtualgdbutton, 'contact', virtualgdcontactHandler)
        this.subscribe(alexavirtualswitch, 'switch', alexacontactHandler)
        

	})
