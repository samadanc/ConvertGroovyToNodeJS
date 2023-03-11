
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select', section => {
            section.deviceSetting('masters').capability(['switch']).name('Ohm Connect Switch...');

        });


        page.section('During OhmHour turn off these switches...', section => {
            section.deviceSetting('slaves').capability(['switch']).name('On/Off Switch(es)...');

        });


        page.section('During OhmHour disable these Central AC units...', section => {
            section.deviceSetting('acCentral').capability(['thermostat']).name('On/Off Thermostat(s)...');

        });


        page.section('During OhmHour disable these Split AC units...', section => {
            section.deviceSetting('acSplit').capability(['thermostat']).name('On/Off Thermostat(s)...');

        });


        page.section('After OhmHour always turn on these switches...', section => {
            section.deviceSetting('onSlaves').capability(['switch']).name('On/Off Switch(es)...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.slaves, 'switch', 'switch.on', 'slaveSwitchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('slaveSwitchOnHandler', (context, event) => {
        
        let evtSwitch = event.device
        masters.each({
        if (it.currentValue('switch') == 'on') {
        evtSwitch.off()
        }
        })
        

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info("switchoffHandler Event: ${event.value}")
        this.resetDeviceState()
        this.runIn(30, resetDeviceState)
        this.runIn(60, turnOnSlaves)
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info("switchOnHandler Event: ${event.value}")
        state.switchprevious = [:]
        slaves.each({
        state.switchprevious[it.id] = ['switch': it.currentValue('switch')]
        })
        acCentral?.off()
        acSplit?.off()
        slaves?.off()
        onSlaves?.off()
        

	})
