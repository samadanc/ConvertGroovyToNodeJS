
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there is motion or a contact change, blink a light up to ten seconds.  Optionally, blink S.O.S if motion detected.', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('What motion?');

        });


        page.section('Blink a light when this contact opens or closes.', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('What contact?');

        });


        page.section('Blink this light, up to ten seconds.', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which light?');

        });


        page.section('Light timing for motion or open contact.', section => {
            section.numberSetting('nblinks').name('Number of Blinks?\nWARNING: Too high a number may exceed ST limits.');
            section.numberSetting('mson').name('Milliseconds light on?');
            section.numberSetting('msoff').name('Milliseconds light off?');

        });


        page.section('Light timing for closed contact or SOS signal.', section => {
            section.numberSetting('cnblinks').name('Number of Blinks? If over 1000, motion will issue S.O.S..');
            section.numberSetting('cmson').name('Milliseconds light on or S.O.S. ms timing unit?');
            section.numberSetting('cmsoff').name('Milliseconds light off?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'blinker')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActive')

    })

    .subscribedEventHandler('blinker', (context, event) => {
        
        console.log("blinker: ${event.value}")
        if (event.value == 'open') {
        this.blinkLight(nblinks, mson, msoff)
        } else {
        if (event.value == 'closed') {
        if (cnblinks < 1001) {
        this.blinkLight(cnblinks, cmson, cmsoff)
        }
        }
        }
        

	})

    .subscribedEventHandler('motionActive', (context, event) => {
        
        console.log("Motion: ${event.value}")
        if (cnblinks > 1000) {
        this.sendSOS()
        } else {
        this.blinkLight(nblinks, mson, msoff)
        }
        

	})
