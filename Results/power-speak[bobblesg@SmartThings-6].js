
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('aboveThreshold').name('Reports above...');
            section.deviceSetting('switch1').capability(['switch']).name('Turn on this \');
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

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switch1Handler')

    })

    .subscribedEventHandler('switch1Handler', (context, event) => {
        
        state.currS1 = event.value
        this.LOGDEBUG("$switch1 is ${state.currS1}")
        

	})

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        state.meterValue = (event.value as double)
        let currTime = new Date()
        this.LOGINFO("$meter shows ${state.meterValue} Watts")
        this.checkNow()
        

	})
