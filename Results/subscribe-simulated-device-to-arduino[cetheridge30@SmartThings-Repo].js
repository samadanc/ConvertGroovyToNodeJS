
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select arduino that sensors are connected to.', section => {
            section.deviceSetting('arduino').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to Office Windows.', section => {
            section.deviceSetting('office').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to Dining Room Windows.', section => {
            section.deviceSetting('diningroom').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to Bedroom Windows.', section => {
            section.deviceSetting('bedroom').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to Livingroom Windows.', section => {
            section.deviceSetting('livingroom').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to Kitchen Windows.', section => {
            section.deviceSetting('kitchen').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to the Front Door.', section => {
            section.deviceSetting('frontdoor').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to the Back Door.', section => {
            section.deviceSetting('backdoor').capability(['contactSensor']).name('Select...');

        });


        page.section('Select the simulated sensor you would like to attach to the Garage Door.', section => {
            section.deviceSetting('garagedoor').capability(['contactSensor']).name('Select...');

        });


    })

    .updated(async (context, updateData) => {

    })
