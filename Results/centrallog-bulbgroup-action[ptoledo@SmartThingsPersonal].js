
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your devices', section => {
            section.deviceSetting('bulbGroups').capability(['refresh']).name('Pick your BulbGroup devices');
            section.deviceSetting('bulbs').capability(['switch']).name('Pick your Bulbs');
            section.deviceSetting('clearSwitch').capability(['switch']).name('Pick your Alexa clear switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bulbGroups, 'refresh', 'refresh', 'refreshBulbs')

        await context.api.subscriptions.subscribeToDevices(context.config.clearSwitch, 'switch', 'switch.on', 'clear')

    })

    .subscribedEventHandler('refreshBulbs', (context, event) => {
        
        let data = ['name': this.parseJson(event.data).name, 'bulb': this.parseJson(event.data).bulb, 'coun': 0, 'check': false, 'value': this.parseJson(event.data).value, 'setti': this.parseJson(event.data).setting, 'tempe': this.parseJson(event.data).colorTemp, 'cohue': this.parseJson(event.data).hue, 'cosat': this.parseJson(event.data).saturation]
        this.action(data)
        

	})

    .subscribedEventHandler('clear', (context, event) => {
        
        bulbGroups.each({
        it.clear()
        })
        
        context.api.devices.sendCommands(context.config.clearSwitch, 'switch', off)
    
        

	})
