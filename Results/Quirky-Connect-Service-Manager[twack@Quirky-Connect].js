
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('updateWinkSubscriptions', delay);

    })

    .scheduledEventHandler('updateWinkSubscriptions', (context, event) => {
        
                console.log('In updateWinkSubscriptions')
                state.deviceDataArr.each({ 
                    if (it.subsPath) {
                        let path = it.subsPath
                        let suffix = it.subsSuff
                        this.apiGet(it.subsPath, { let response ->
                            response.data.data.each({ 
                                if (it.subscription_id) {
                                    this.deleteWinkSubscription(path + '/', it.subscription_id)
                                    this.createWinkSubscription(path, suffix)
                                }
                            })
                        })
                    }
                })
            

	})
