
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('triggerThrown', (context, event) => {
        
                for (let receiverCount = 1; receiverCount <= numReceivers ; receiverCount++) {
                    for (let keyCount = 1; keyCount <= numKeys ; keyCount++) {
                        this.sendKey(this.getSettingByPrefixAndSuffix('keys-', String.format('%02d', keyCount)), this.getSettingByPrefixAndSuffix('masterReceiverIp-', "${String.format(%02d, receiverCount)}"), this.getSettingByPrefixAndSuffix('masterReceiverPort-', "${String.format(%02d, receiverCount)}"), this.getSettingByPrefixAndSuffix('clientReceiverMac-', "${String.format(%02d, receiverCount)}"))
                    }
                }
                if (triggerReset) {
                    if (triggerEvent == 'on') {
                        triggerSwitch.off()
                    } else {
                        triggerSwitch.on()
                    }
                }
            

	})
