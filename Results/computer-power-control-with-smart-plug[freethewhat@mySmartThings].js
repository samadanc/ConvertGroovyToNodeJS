
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Simulated Switch', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Switch');

        });


        page.section('Smart Plug with Power Meter', section => {
            section.deviceSetting('themeter').capability(['powerMeter']).name('Power Meter');

        });


        page.section('Computer Settings', section => {
            section.textSetting('computerIP').name('Computer IP Address');
            section.numberSetting('computerPort').name('Web Server port');
            section.numberSetting('meterthreshold').name('Shutdown Threshold');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'theswitchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'theswitchOffHandler')

    })

    .subscribedEventHandler('theswitchOffHandler', (context, event) => {
        
        console.log("theswitchOffHandler: $evt")
        this.shutdownComputer()
        console.log('theswitchOffHandler: Shutdown Computer')
        this.schedule('* * * * * ?', setPowerOff)
        

	})

    .subscribedEventHandler('theswitchOnHandler', (context, event) => {
        
        console.log("theswitchOnHandler: $evt")
        this.schedule('* * * * * ?', getMeterValue)
        this.setPowerOn()
        

	})
