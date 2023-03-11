
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('colorlights').capability(['colorControl']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('huechange', delay);

    })
