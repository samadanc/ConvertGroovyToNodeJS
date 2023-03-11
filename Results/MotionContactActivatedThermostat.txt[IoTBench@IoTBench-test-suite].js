
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('On this thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('When movement is detected by any of these...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor(s)');

        });


        page.section('Or when any of these are open...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Sensor');

        });


        page.section('Delay the no motion event...', section => {
            section.numberSetting('delayNoMotionEvent').name('Minutes');

        });


        page.section('Set motion air conditioning setting...', section => {
            section.numberSetting('coolingSetpointMotion').name('Degrees?');

        });


        page.section('Set no motion air conditioning setting...', section => {
            section.numberSetting('coolingSetpointNoMotion').name('Degrees?');

        });


        page.section('Set motion heat setting...', section => {
            section.numberSetting('heatingSetpointMotion').name('Degrees?');

        });


        page.section('Set no motion heat setting...', section => {
            section.numberSetting('heatingSetpointNoMotion').name('Degrees?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("device: $device, value: ${event.value}, event: $evt, settings: $settings, handlerName: ${event.handlerName}")
        let delay = delayNoMotionEvent != null && delayNoMotionEvent != '' ? delayNoMotionEvent * 60 : 3600
        if (event.value == 'active' || event.value == 'open') {
        console.log('unscheduling no motion temp timer')
        this.unschedule(setTemp)
        console.log('setting motion temp')
        this.setTemp('motion')
        } else {
        if (motion.find({
        it.currentState('motion').value == 'active'
        }) == null && contact.find({
        it.currentState('contact').value == 'open'
        }) == null) {
        console.log("will set no motion temp in $delay secs")
        this.runIn(delay, setTemp)
        }
        }
        

	})
