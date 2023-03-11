
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('vswitch', (context, event) => {
        
                let vswitch = event.descriptionText.find('switch.').replaceAll(' ', '')
                let vkid = this.getChildDevice(this.ddni(vswitch))
                vkid."${event.value}"()
            

	})
