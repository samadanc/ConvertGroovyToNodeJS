
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Dimmers to Control', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers to Control');

        });


        page.section('Select Dimmers levels for Min Level and Max Level Periods', section => {
            section.numberSetting('MinDimming').name('% Level for Min. Level Period');
            section.numberSetting('MaxDimming').name('% Level for Max. Level Period');

        });


        page.section('Select Start and Stop Time for Min. Level Period or Location Mode for Min. Level Period', section => {
            section.timeSetting('startTime').name('Start Time for Min. Level Period');
            section.timeSetting('stopTime').name('Stop Time for Min. Level Period');

        });


    })

    .updated(async (context, updateData) => {

    })
