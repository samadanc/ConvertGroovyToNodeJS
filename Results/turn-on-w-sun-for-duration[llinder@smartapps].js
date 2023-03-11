
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on which device?', section => {
            section.deviceSetting('switchs').capability(['switch']).name('Select Light');

        });


        page.section('On which Days?', section => {
            section.enumSetting('days').name('Select Days');

        });


        page.section('Minutes before sunset?', section => {
            section.numberSetting('offset').name('Minutes Before Sun');

        });


        page.section('For how long?', section => {
            section.numberSetting('duration').name('Number of minutes');

        });


        page.section('Sun Action?', section => {
            section.enumSetting('sunAction').name('Sunrise or Sunset');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'this.action()', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
        this.scheduleTurnOn(event.value, false)
        

	})
