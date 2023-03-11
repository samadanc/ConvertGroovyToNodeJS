
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('TCP Connected Remote Credentials', section => {
            section.textSetting('username').name('Enter TCP Remote Email/UserName');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('syncronizeDevices', delay);

    })

    .scheduledEventHandler('syncronizeDevices', (context, event) => {
        
        this.debugOut('In syncronizeDevices')
        let update = this.getChildDevices().findAll({
        selectedBulbs?.contains(it.deviceNetworkId)
        })
        update.each({
        let dni = this.getChildDevice(it.deviceNetworkId)
        this.debugOut("dni = $dni")
        if (this.isRoom(dni)) {
        this.pollRoom(dni)
        } else {
        this.poll(dni)
        }
        })
        

	})
