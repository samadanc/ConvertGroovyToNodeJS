
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which door locks?', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Which switches?', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn on or off?', section => {
            section.booleanSetting('turnon').name('Turn on when door unlocks?');
            section.booleanSetting('turnoff').name('Turn off when door locks?');

        });


        page.section('Change mode?', section => {

        });


        page.section('Only between these times...', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');

        });


        page.section('More Options', section => {
            section.numberSetting('turnoffdelay').name('Delay turning off (Minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'checkTime')

    })

    .subscribedEventHandler('checkTime', (context, event) => {
        
        if (startTime && endTime ) {
        let currentTime = new Date()
        let startUTC = this.timeToday(startTime)
        let endUTC = this.timeToday(endTime)
        if (currentTime > startUTC && currentTime < endUTC && startUTC < endUTC || currentTime > startUTC && startUTC > endUTC || currentTime < endUTC && endUTC < startUTC ) {
        this.turniton(evt)
        }
        } else {
        this.turniton(evt)
        }
        

	})
