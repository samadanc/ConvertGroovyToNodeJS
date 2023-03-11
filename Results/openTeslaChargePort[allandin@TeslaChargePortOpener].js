
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
                let access_token_contact_open = this.get_access_token()
                let awakeVehicleParams = ['uri': "https://owner-api.teslamotors.com/api/1/vehicles/$vehicle/wake_up", 'headers': ['Authorization': 'Bearer ' + access_token_contact_open ]]
                try {
                    this.httpPost(awakeVehicleParams, { let resp ->
                        this.sendPush("Car status: ${resp.data.response.state}")
                    })
                } 
                catch (let e) {
                    log.error("Awake command failed: $e")
                } 
                let openChargePortParams = ['uri': "https://owner-api.teslamotors.com/api/1/vehicles/$vehicle/command/charge_port_door_open", 'headers': ['Authorization': 'Bearer ' + access_token_contact_open ]]
                try {
                    this.httpPost(openChargePortParams, { let resp ->
                        if (resp.data.response.reason == 'could_not_wake_buses') {
                            this.sendPush('Failed: could_not_wake_buses')
                        }
                        if (resp.data.response.result) {
                            this.sendPush('The charge port has been opened.')
                        } else {
                            this.sendPush("The charge port could not be opened. Reason: ${resp.data.response.reason}.")
                        }
                    })
                } 
                catch (let e) {
                    log.error("Chargeport open command failed: $e")
                } 
            

	})
