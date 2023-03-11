
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('Panasonic TV', section => {
            section.textSetting('tvName').name('Name');
            section.textSetting('tvIp').name('IP');
            section.enumSetting('tvInstances').name('Rooms');

        });


    })
