
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which switch activates the App?', section => {
            section.deviceSetting('trigger').capability(['switch']).name('');

        });


        page.section('Which light is the night light?', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('');

        });


        page.section('What percentage should we start at?', section => {
            section.numberSetting('number').name('Percentage, 0-50');

        });


        page.section('How often should we decrease levels?', section => {
            section.numberSetting('time').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch.on', 'triggerOn')

    })

    .subscribedEventHandler('triggerOn', (context, event) => {
        
        console.log('Running dimEvent')
        this.unschedule(dimEvent)
        this.unschedule(reset)
        this.initialize()
        this.dimEvent()
        

	})
