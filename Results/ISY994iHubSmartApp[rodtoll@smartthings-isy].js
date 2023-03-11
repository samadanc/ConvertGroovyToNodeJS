
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('ISY Configuration', section => {
            section.textSetting('isyAddress').name('ISY Address');
            section.numberSetting('isyPort').name('ISY Port');
            section.textSetting('isyUserName').name('ISY Username');
            section.textSetting('isyPassword').name('ISY Password');
            section.textSetting('bridgeAddress').name('Bridge Address');
            section.textSetting('bridgePort').name('Bridge Port');
            section.textSetting('bridgeUserName').name('Bridge Username');
            section.textSetting('bridgePassword').name('Bridge Password');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'locationHandler')

    })

    .subscribedEventHandler('locationHandler', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        if (!msg.xml) {
        if (msg.body && msg.body.length() > 0) {
        msg.xml = new XmlSlurper().parseText(msg.body)
        }
        }
        if (msg.xml) {
        this.handleXmlMessage(msg.xml)
        } else {
        }
        

	})
