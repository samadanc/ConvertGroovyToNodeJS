
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''App Setup (Version 2)'', section => {

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
