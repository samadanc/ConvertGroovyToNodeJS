
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('enableswitch1').capability(['switch']).name('Enable/Disable app with this switch (Optional)');
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('belowThreshold').name('Reports Below...');
            section.numberSetting('delay1').name('And stays that way for...');
            section.deviceSetting('speaker1').capability(['musicPlayer']).name('Choose a speaker');
            section.numberSetting('volume1').name('Speaker volume');
            section.textSetting('message1').name('Message to speak');
            section.numberSetting('msgDelay').name('Delay between messages (Enter 0 for no delay)');

        });


        page.section('Logging', section => {
            section.booleanSetting('debugmode').name('Enable logging');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.enableswitch1, 'switch', 'switch', 'enableswitch1Handler')

    })

    .subscribedEventHandler('enableswitch1Handler', (context, event) => {
        
        state.enablecurrS1 = event.value
        this.LOGDEBUG("$enableswitch1 is ${state.enablecurrS1}")
        

	})

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        state.meterValue = (event.value as double)
        this.LOGINFO("$meter shows ${state.meterValue} Watts")
        if (state.enablecurrS1 != 'off') {
        this.checkNow()
        } else {
        if (state.enablecurrS1 == 'off') {
        this.LOGDEBUG("App disabled by $enableswitch1 being off")
        }
        }
        

	})
