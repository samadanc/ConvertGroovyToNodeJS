
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('doDeviceSync', delay);

    })

    .subscribedEventHandler('groupListHandler', (context, event) => {
        
                let groups = [:]
                log.trace('Adding groups to state...')
                state.bridgeProcessedLightList = true
                event.jsonData.each({ let k, let v ->
                    log.trace("$k: $v")
                    if (v instanceof Map) {
                        groups[ k ] = ['id': k , 'name': v.name, 'type': v.type, 'hub': event.value]
                    }
                })
                state.groups = groups 
                log.info("${groups.size()} groups found")
            

	})

    .subscribedEventHandler('bulbListHandler', (context, event) => {
        
                let bulbs = [:]
                log.trace('Adding bulbs to state...')
                event.jsonData.each({ let k, let v ->
                    log.trace("$k: $v")
                    if (v instanceof Map) {
                        bulbs[ k ] = ['id': k , 'name': v.name, 'type': v.type, 'hub': event.value]
                    }
                })
                state.bulbs = bulbs 
                log.info("${bulbs.size()} bulbs found")
            

	})

    .scheduledEventHandler('doDeviceSync', (context, event) => {
        
                console.log('Doing Hue Device Sync!')
                this.convertBulbListToMap()
                this.convertGroupListToMap()
                if (!state.subscribe) {
                    this.subscribe(location, null, locationHandler, ['filterEvents': false])
                    state.subscribe = true
                }
                this.discoverBridges()
                this.poll()
            

	})
