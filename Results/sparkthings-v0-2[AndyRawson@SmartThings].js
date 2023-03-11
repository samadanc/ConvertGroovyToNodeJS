
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Generate Username and Password', section => {
            section.textSetting('sparkUsername').name('Your Spark.io Username');

        });


        page.section('Digital Pins (* can send instant status)', section => {
            section.enumSetting('sensorTypeD$i').name('Select sensor type for Pin D$i$isInterrupt');

        });


        page.section('Analog Pins (* can send instant status)', section => {
            section.enumSetting('sensorTypeA$i').name('Select sensor type for Pin A$i$isInterrupt');

        });


    })
