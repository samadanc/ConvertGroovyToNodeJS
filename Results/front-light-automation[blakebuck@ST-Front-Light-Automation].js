
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when opened:', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('What?');

        });


        page.section('When there\'s motion on any of these sensors', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('');

        });


        page.section('Turn on these lights', section => {
            section.deviceSetting('light').capability(['switch']).name('Which?');

        });


        page.section('Turn light off when no motion for ', section => {
            section.numberSetting('timeOn').name('Minutes');

        });


        page.section('Turn light off if already on?', section => {
            section.enumSetting('offAlreadyOn').name('Default: Yes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'turnLightOn')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'turnLightOn')

    })

    .subscribedEventHandler('turnLightOn', (context, event) => {
        
        state.lightPrevState = light.currentValue
        console.log("Previous State: ${state.lightPrevState}")
        if ('open' == event.value || 'active' == event.value) {
        if (this.nightTime()) {
        light?.on()
        this.lightTimer()
        }
        }
        

	})
