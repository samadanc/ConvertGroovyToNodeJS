
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('Dishwasher Power Meter');
            section.numberSetting('openThreshold').name('Consider Open Above...');
            section.numberSetting('runningThreshold').name('Consider Running Above...');

        });


        page.section('', section => {
            section.deviceSetting('switches').capability(['switch']).name('Control These Switches');
            section.numberSetting('openLevel').name('Level when open');
            section.numberSetting('runningLevel').name('Lvel when running');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        if (meterValue > (runningThreshold as int)) {
        this.dishwasherRunning()
        } else {
        if (meterValue > (openThreshold as int)) {
        this.dishwasherOpened()
        } else {
        this.dishwasherClosed()
        }
        }
        

	})
