
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


        page.section('Monoprice Controller', section => {
            section.booleanSetting('enableDiscovery').name('Discover Zones (WARNING: all existing zones will be removed)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('discoverChildDevices', delay);

    })

    .scheduledEventHandler('discoverChildDevices', (context, event) => {
        
        this.sendCommand('/plugins/mpr-sg6z/discover')
        

	})
