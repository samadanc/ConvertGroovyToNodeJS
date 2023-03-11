
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which light to set the mood on:', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('');

        });


        page.section('What Level to set at...', section => {
            section.numberSetting('lvl').name('');

        });


    })

    .updated(async (context, updateData) => {

    })
