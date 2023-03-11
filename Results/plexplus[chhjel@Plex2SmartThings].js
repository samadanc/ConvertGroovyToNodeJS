
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('PlayerDTCommandRecieved', (context, event) => {
        
                if (!playerDT) {
                    return null
                }
                if (event.value == 'playing') {
                    this.AppCommandRecieved('onplay', 'Unknown', playerDT, 'ST Media Player Device', playerDT.currentplaybackType)
                } else {
                    if (event.value == 'stopped') {
                        this.AppCommandRecieved('onstop', 'Unknown', playerDT, 'ST Media Player Device', playerDT.currentplaybackType)
                    } else {
                        if (event.value == 'paused') {
                            this.AppCommandRecieved('onpause', 'Unknown', playerDT, 'ST Media Player Device', playerDT.currentplaybackType)
                        }
                    }
                }
            

	})
