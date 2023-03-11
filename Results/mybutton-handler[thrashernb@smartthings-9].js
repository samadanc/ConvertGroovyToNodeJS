
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Devices', section => {
            section.deviceSetting('remote').capability(['button']).name('Remote');
            section.deviceSetting('light').capability(['switch']).name('Light');

        });


        page.section('Which Actions', section => {
            section.enumSetting('button1_pushed').name('Button 1 Pushed');
            section.enumSetting('button1_held').name('Button 1 Held');
            section.enumSetting('button2_pushed').name('Button 2 Pushed');
            section.enumSetting('button2_held').name('Button 2 Held');
            section.enumSetting('button3_pushed').name('Button 3 Pushed');
            section.enumSetting('button3_held').name('Button 3 Held');
            section.enumSetting('button4_pushed').name('Button 4 Pushed');
            section.enumSetting('button4_held').name('Button 4 Held');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.remote, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        if (event.value == 'held') {
        console.log('button was held')
        } else {
        if (event.value == 'pushed') {
        console.log('button was pushed')
        }
        }
        let value = event.value
        let buttonNumber = event.data
        
        context.api.devices.sendCommands(context.config.remote, 'button', eventsSince)
    
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 1 second")
        if (recentEvents.size <= 1) {
        switch ( buttonNumber ) {
        case ~('.*1.*') :
        this.execute(1, value)
        break
        case ~('.*2.*') :
        this.execute(2, value)
        break
        case ~('.*3.*') :
        this.execute(3, value)
        break
        case ~('.*4.*') :
        this.execute(4, value)
        break
        }
        } else {
        console.log("Found recent button press events for $buttonNumber with value $value")
        }
        try {
        let data = event.jsonData
        console.log("event.jsonData: $data")
        console.log("button number: $buttonNumber")
        }
        catch (let e) {
        log.warn("caught exception getting event data as json: $e")
        }
        

	})
