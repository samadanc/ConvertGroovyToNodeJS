
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('CoolMasterNet', section => {
            section.textSetting('CM_ip').name('IP Address');
            section.textSetting('CM_serial').name('Serial number');

        });


        page.section('Misc', section => {
            section.enumSetting('userTempUnit').name('User Temperature Unit');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('pollDevices', delay);

    })

    .scheduledEventHandler('pollDevices', (context, event) => {
        
        this.sendCommandToCoolMaster(['name': 'ls'])
        

	})
