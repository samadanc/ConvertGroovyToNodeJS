
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When mode is set to...', section => {

        });


        page.section('...turn these off...', section => {
            section.deviceSetting('offWhenMode').capability(['switch']).name('Devices');

        });


        page.section('...and these on...', section => {
            section.deviceSetting('onWhenMode').capability(['switch']).name('Devices');

        });


        page.section('And when mode is different, turn these off...', section => {
            section.deviceSetting('offWhenNotMode').capability(['switch']).name('Devices');

        });


        page.section('...and these on...', section => {
            section.deviceSetting('onWhenNotMode').capability(['switch']).name('Devices');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('initialize', delay);

    })

    .scheduledEventHandler('initialize', (context, event) => {
        
        this.handleMode(location.mode)
        

	})
