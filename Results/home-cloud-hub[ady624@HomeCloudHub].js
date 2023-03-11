
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'shmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanEventHandler')

    })

    .subscribedEventHandler('shmHandler', (context, event) => {
        
                let shmState = location.currentState('alarmSystemStatus')?.value
                log.info("Received notification of SmartThings Home Monitor having changed status to $shmState")
                let mode = null
                switch ( shmState ) {
                    case 'off':
                        mode = 'Home'
                        break
                    case 'stay':
                        mode = 'Stay'
                        break
                    case 'away':
                        mode = 'Away'
                        break
                }
                if (mode) {
                    let children = this.getChildDevices()
                    children.each({ 
                        if (it.currentValue('module') == 'digitallife' && it.currentValue('type') == 'digital-life-system') {
                            if (mode != it.currentValue('digital-life-mode')) {
                                log.info('Requesting mode ' + mode + ' from ' + it.name)
                                this.proxyCommand(it, 'digital-life-mode', mode)
                            }
                        }
                    })
                }
            

	})

    .subscribedEventHandler('lanEventHandler', (context, event) => {
        
                let description = event.description
                let hub = evt?.hubId
                let parsedEvent = this.parseLanMessage(description)
                if (parsedEvent.ssdpTerm && parsedEvent.ssdpTerm.contains(this.getLocalServerURN())) {
                    log.trace('DISCOVERY SUCCESSFUL')
                    atomicState.hchLocalServerIp = this.convertHexToIP(parsedEvent.networkAddress)
                }
                if (parsedEvent.data && parsedEvent.data.service && parsedEvent.data.service == 'hch') {
                    let msg = parsedEvent.data
                    if (msg.result == 'pong') {
                        log.info('Successfully contacted local server')
                        atomicState.hchPong = true
                    }
                }
                if (parsedEvent.data && parsedEvent.data.event) {
                    switch (parsedEvent.data.event) {
                        case 'init':
                            this.sendLocalServerCommand(state.hch.localServerIp, 'init', ['server': this.getHubLanEndpoint(), 'modules': this.processSecurity(['module': parsedEvent.data.data])])
                            break
                        case 'event':
                            this.processEvent(parsedEvent.data.data)
                            break
                    }
                }
            

	})
