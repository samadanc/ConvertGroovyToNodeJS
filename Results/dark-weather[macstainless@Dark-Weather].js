
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Version 2.1'', section => {

        });


        page.section('', section => {

        });


        page.section('Choose a switch to trigger the change... ', section => {
            section.deviceSetting('triggerSwitch').capability(['switch']).name('');

        });


        page.section('When it rains change mode to...', section => {

        });


        page.section('When it\'s all clear change mode to...', section => {

        });


        page.section('and (optionally) turn off these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerSwitch, 'switch', 'switch', 'switchHandler')

        context.api.schedules.runEvery5Minutes('scheduleCheck', delay);

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log('Swich changed state!')
        if (event.value == 'on') {
        console.log('switch turned on!')
        this.weatherModeChange('wet')
        } else {
        if (event.value == 'off') {
        console.log('switch turned off!')
        this.weatherModeChange('dry')
        }
        }
        

	})

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        console.log('Checking mode and switch state.')
        console.log("location.currentMode: ${location.currentMode}")
        if (location.currentMode != rainMode && triggerSwitch.currentSwitch == 'on') {
        console.log('Switch is on but we are not rain mode. Executing mode change.')
        this.weatherModeChange('wet')
        } else {
        console.log('We do not need rain mode.')
        }
        

	})
