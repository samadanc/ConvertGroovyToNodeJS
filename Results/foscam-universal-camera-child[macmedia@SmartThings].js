
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Camera Name'', section => {

        });


        page.section('on this hub...', section => {

        });


        page.section('Add a Camera', section => {
            section.textSetting('cameraStreamIP').name('Camera\');
            section.textSetting('cameraStreamPort').name('Camera\');
            section.enumSetting('cameraStreamProtocol').name('Camera Protocol');
            section.textSetting('cameraStreamRTSPPort').name('Camera\');
            section.textSetting('cameraStreamUser').name('Camera\');
            section.textSetting('cameraStreamPwd').name('Camera\');
            section.booleanSetting('cameraStreamHD').name('Camera is HD');
            section.booleanSetting('cameraStreamDebug').name('Debug Mode');

        });


    })
