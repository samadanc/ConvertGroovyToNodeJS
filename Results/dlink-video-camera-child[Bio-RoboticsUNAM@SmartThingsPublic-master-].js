
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Camera Name'', section => {

        });


        page.section('Add a Camera', section => {
            section.enumSetting('CameraType').name('Camera Model');

        });


        page.section('Camera Settings:', section => {

        });


        page.section('Hub Settings', section => {

        });


    })
