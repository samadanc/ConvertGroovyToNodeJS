
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Door', section => {
            section.deviceSetting('garageDoor').capability(['contactSensor']).name('Garage Door');

        });


        page.section('Schedule', section => {
            section.textSetting('hourCron').name('Hour part of cron');

        });


        page.section('Notifications', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.garageDoor, 'contactSensor', 'acceleration.active', 'activeHandler')

        context.api.schedules.schedule('verifyClosedAtNight', delay);

    })

    .subscribedEventHandler('activeHandler', (context, event) => {
        
        console.log('The garage door is active')
        if (this.isClosed()) {
        console.log('The door is closed and acceleration, so it must be opening')
        this.runIn(60 * 60, 'verifyDoorNotLeftOpen')
        } else {
        console.log('The door is open and acceleration, so it must be closing')
        this.runIn(2 * 60, 'verifyClosingWorked')
        }
        

	})

    .scheduledEventHandler('verifyClosedAtNight', (context, event) => {
        
        if (this.isClosed()) {
        console.log('The garage door is closed')
        } else {
        console.log('The garage door is still open')
        this.messageMe('Check the garage door. It is still open.')
        }
        

	})
