
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Module Name'', section => {

        });


        page.section('Add a module', section => {
            section.enumSetting('ModuleType').name('Module');

        });


        page.section('Module Settings:', section => {

        });


        page.section('Hub Settings', section => {

        });


    })
