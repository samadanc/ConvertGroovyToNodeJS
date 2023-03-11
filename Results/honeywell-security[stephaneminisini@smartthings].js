
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('SmartThings Node Proxy', section => {
            section.textSetting('proxyAddress').name('Proxy Address');
            section.textSetting('proxyPort').name('Proxy Port');

        });


        page.section('Envisalink Vista TPI', section => {
            section.textSetting('evlAddress').name('Host Address');
            section.textSetting('evlPort').name('Host Port');
            section.booleanSetting('enableDiscovery').name('Enable Discovery of Partitions & Zones');

        });


        page.section('Security Panel', section => {

        });


        page.section('Smart Home Monitor', section => {
            section.booleanSetting('enableSHM').name('Integrate with Smart Home Monitor');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('discoverChildDevices', delay);

    })

    .scheduledEventHandler('discoverChildDevices', (context, event) => {
        
        this.sendCommand('/plugins/envisalink/discover')
        

	})
