
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your device', section => {
            section.deviceSetting('switch_to_control').capability(['switch']).name('Switch to control');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'handleLANEvent')

    })

    .subscribedEventHandler('handleLANEvent', (context, event) => {
        
        let prefix = '/switch'
        let message = this.parseLanMessage(event.value)
        if (!message.header) {
        log.error("Message with no header received: $message")
        return null
        }
        let path = message.header.split('\n')[0].split()[1]
        let decoded_path = URLDecoder.decode(path, 'UTF-8')
        log.info("Received HTTP request on URL $decoded_path")
        if (decoded_path == prefix + '/' + switch_to_control + '?on') {
        log.info("Switching '$switch_to_control' ON...")
        
        context.api.devices.sendCommands(context.config.switch_to_control, 'switch', on)
    
        } else {
        if (decoded_path == prefix + '/' + switch_to_control + '?off') {
        log.info("Switching '$switch_to_control' OFF...")
        
        context.api.devices.sendCommands(context.config.switch_to_control, 'switch', off)
    
        } else {
        if (decoded_path == prefix || decoded_path.startsWith(prefix + '/')) {
        log.error('URL is invalid or incomplete')
        } else {
        log.warn('Message not for this SmartApp, ignoring.')
        }
        }
        }
        return 'yes'
        

	})
