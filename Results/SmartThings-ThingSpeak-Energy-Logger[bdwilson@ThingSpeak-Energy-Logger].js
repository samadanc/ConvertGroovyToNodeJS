
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('power').capability(['powerMeter']).name('Power');

        });


        page.section('ThinkSpeak channel id...', section => {
            section.numberSetting('channelId').name('Channel id');

        });


        page.section('ThinkSpeak read key...', section => {
            section.textSetting('readKey').name('Read key');

        });


        page.section('ThinkSpeak write key...', section => {
            section.textSetting('writeKey').name('Write key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'handlePowerEvent')

    })

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        this.logField(evt, 'power', {
        it.toString()
        })
        

	})
