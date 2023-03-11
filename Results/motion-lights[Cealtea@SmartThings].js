
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select lights to turn on ...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which lights?');

        });


        page.section('When motion is detected...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Only when selected switch(s) are off', section => {
            section.deviceSetting('lightcondition').capability(['switch']).name('Which switchs?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if 
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        this.runIn(minutes1 * 60, scheduleCheck, ['overwrite': false])
        }
        }
        

	})
