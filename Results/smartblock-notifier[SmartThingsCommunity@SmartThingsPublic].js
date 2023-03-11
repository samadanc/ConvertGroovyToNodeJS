
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('redstoneSignalStrengthHandler', (context, event) => {
        
                console.log("redstoneSignalStrengthHandler: ${event.value}")
                java.lang.Integer newValue = (event.value as int)
                java.lang.Integer lastValue = (smartBlock.latestState('redstoneSignalStrength').value as int)
                if (redstoneGreaterThan) {
                    java.lang.Integer gt = (redstoneGreaterThan as int)
                    if (newValue > gt ) {
                        console.log("greater than $gt. send notification")
                        this.notifyUserOfRedstoneChange(newValue)
                    }
                }
                if (redstoneLessThan) {
                    java.lang.Integer lt = (redstoneLessThan as int)
                    if (newValue < lt ) {
                        console.log("less than $lt. send notification")
                        this.notifyUserOfRedstoneChange(newValue)
                    }
                }
                if (redstoneEqualTo) {
                    java.lang.Integer et = (redstoneEqualTo as int)
                    if (newValue == et ) {
                        console.log("equal to $et. send notification")
                        this.notifyUserOfRedstoneChange(newValue)
                    }
                }
            

	})

    .subscribedEventHandler('smartBlockNeighborChangedHandler', (context, event) => {
        
                console.log("smartBlockNeighborChangedHandler event.value: ${event.value}")
                console.log("neighborBlockParsed: $neighborBlockParsed")
                if (neighborBlockParsed?.contains(event.value)) {
                    this.notifyUserOfNeighborChange(event.value)
                }
            

	})

    .subscribedEventHandler('smartBlockDestroyedHandler', (context, event) => {
        
                console.log("smartBlockDestroyedHandler event.value: ${event.value}")
                let pageName = 'destroyedPage'
                let message = this.message(pageName)
                this.notifyUser(pageName, message)
            

	})
