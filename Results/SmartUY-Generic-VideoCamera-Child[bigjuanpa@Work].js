
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Camera Name'', section => {

        });


        page.section('Add a Camera', section => {
            section.enumSetting('CameraStreamPathList').name('Camera Stream Path');

        });


    })
