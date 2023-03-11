
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a door opens...', section => {
            section.deviceSetting('locks').capability(['lock']).name('Which locks?');

        });


        page.section('With this code index...', section => {
            section.numberSetting('lockindex').name('');

        });


        page.section('Turn on switches (and then turn off in 900s) ...', section => {
            section.deviceSetting('switcheson').capability(['switch']).name('');

        });


        page.section('Turn off switches...', section => {
            section.deviceSetting('switchesoff').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.locks, 'lock', latestValue)
    
        let val = event.value
        console.log("value: $val, settings: $settings, latest: $lat")
        if (val == 'unlocked' && event.data) {
        let str = event.data
        console.log("str: $str ")
        let results = new groovy.json.JsonSlurper().parseText(str)
        console.log("results: $results ")
        let usedcode = (results.usedCode as Integer)
        console.log("used code $usedcode and lockindex $lockindex ")
        if (usedcode == lockindex || lockindex <= 0) {
        log.trace("Turning on switches: $switcheson")
        
        context.api.devices.sendCommands(context.config.switcheson, 'switch', on)
    
        log.trace("Turning off switches: $switchesoff")
        
        context.api.devices.sendCommands(context.config.switchesoff, 'switch', off)
    
        this.runIn(900, 'turnEmOff')
        this.sendPush("Unlocked with code $usedcode and disarming!")
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'off'])
        this.setLocationMode('Home')
        }
        }
        

	})
