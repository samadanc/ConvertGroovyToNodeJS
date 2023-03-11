
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('First light(s):', section => {
            section.deviceSetting('lights1').capability(['switch']).name('');

        });


        page.section('First light delay to simulate occupancy (recommend 5-10):', section => {
            section.numberSetting('delayStartSec1').name('Seconds:');

        });


        page.section('Blink first light when already on:', section => {
            section.booleanSetting('lights1Blink').name('');

        });


        page.section('Second light(s):', section => {
            section.deviceSetting('lights2').capability(['switch']).name('');

        });


        page.section('Second light delay to simulate occupancy (recommend 8-15):', section => {
            section.numberSetting('delayStartSec2').name('Seconds:');

        });


        page.section('Blink second light when already on:', section => {
            section.booleanSetting('lights2Blink').name('');

        });


        page.section('Triggering sensor:', section => {
            section.deviceSetting('accel').capability(['accelerationSensor']).name('Which acceleration sensor?');
            section.deviceSetting('motio').capability(['motionSensor']).name('Which motion sensor?');

        });


        page.section('Turn lights off when there\'s been no movement after:', section => {
            section.numberSetting('delayStopSec').name('Seconds:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motio, 'motionSensor', 'motion', 'accelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.accel, 'accelerationSensor', 'acceleration', 'accelHandler')

    })

    .subscribedEventHandler('accelHandler', (context, event) => {
        
        console.log("accelHandler event: ${event.name}: ${event.value} descriptionText:${event.descriptionText}")
        if (event.value == 'active') {
        console.log("light1 original state is ${lights1.currentSwitch}")
        if (lights2) {
        console.log("light2 original state is ${lights2.currentSwitch}")
        }
        console.log("turning on lights due to motion with $delayStartSec1, $delayStartSec2 seconds delay")
        this.runIn(delayStartSec1, turnOnLights1, ['overwrite': false])
        if (lights2) {
        if (delayStartSec2) {
        this.runIn(delayStartSec2, turnOnLights2, ['overwrite': false])
        } else {
        this.runIn(delayStartSec1 + 5, turnOnLights2, ['overwrite': false])
        }
        }
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        if (delayStopsec) {
        this.runIn(delayStopSec, turnOffMotionAfterDelay, ['overwrite': false])
        } else {
        this.runIn(59, turnOffMotionAfterDelay, ['overwrite': false])
        }
        }
        

	})
