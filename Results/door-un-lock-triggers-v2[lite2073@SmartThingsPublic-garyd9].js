
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('lockHandler', (context, event) => {
        
                if (this.IsAllOkay()) {
                    let bRunIt = false
                    let usedCode = null
                    let usedMethod = null
                    if (event.data != null) {
                        usedCode = this.parseJson(event.data).usedCode
                        usedMethod = this.parseJson(event.data).method
                    }
                    if (lockCode == null || lockCode.isEmpty()) {
                        bRunIt = true
                    } else {
                        if (usedMethod == null) {
                            if (usedCode == 'manual') {
                                usedMethod = 'manual'
                            } else {
                                if (usedCode == 'auto') {
                                    usedMethod = 'auto'
                                } else {
                                    if (usedCode == 'keypad' || usedCode == 0) {
                                        usedMethod = 'keypad'
                                    } else {
                                        if (usedCode == null) {
                                            if (event.descriptionText.contains('manually')) {
                                                usedMethod = 'manual'
                                            } else {
                                                if (event.descriptionText.contains('autolocked')) {
                                                    usedMethod = 'auto'
                                                } else {
                                                    if (event.descriptionText.contains('keypad')) {
                                                        usedMethod = 'keypad'
                                                    } else {
                                                        usedMethod = 'other'
                                                    }
                                                }
                                            }
                                        } else {
                                            if (!(usedCode.toString().isInteger())) {
                                                usedMethod = 'other'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (usedCode != null && lockCode.contains(usedCode.toString()) || usedMethod != null && lockCode.contains(usedMethod)) {
                            bRunIt = true
                        }
                    }
                    if (bRunIt) {
                        this.performActions(evt)
                    }
                }
            

	})
