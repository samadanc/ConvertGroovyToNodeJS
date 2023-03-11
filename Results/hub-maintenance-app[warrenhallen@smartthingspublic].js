
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings account credentials', section => {

        });


        page.section('Reboot hub at schedule', section => {
            section.booleanSetting('needToRebootHub').name('Reboot Hub?');
            section.textSetting('rebootCron').name('Cron Schedule');

        });


        page.section('Repair Z-Wave network on schedule', section => {
            section.booleanSetting('needToRepairZWave').name('Repair Z-Wave?');
            section.textSetting('repairCron').name('Cron Schedule');

        });


        page.section('Notification', section => {
            section.enumSetting('pushNotification').name('Push notification');

        });


        page.section('"Version: ${this.getVersion()}"', section => {

        });


    })
