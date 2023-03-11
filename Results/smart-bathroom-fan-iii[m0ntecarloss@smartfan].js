
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('hourlyHandler', delay);

        context.api.schedules.runEvery5Minutes('dumps', delay);

    })

    .subscribedEventHandler('lightHandler', (context, event) => {
        
                String debug_string = 'lightHandler:\n'
                try {
                } 
                catch (let e) {
                } 
            

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
                String debug_string = 'contactOpenHandler:\n'
                try {
                } 
                catch (let e) {
                } 
            

	})

    .subscribedEventHandler('fanOnHandler', (context, event) => {
        
                String debug_string = 'fanOnHandler:\n'
                try {
                } 
                catch (let e) {
                } 
            

	})

    .subscribedEventHandler('fanOffHandler', (context, event) => {
        
                String debug_string = 'fanOffHandler:\n'
                try {
                } 
                catch (let e) {
                } 
            

	})

    .subscribedEventHandler('contactCloseHandler', (context, event) => {
        
                String debug_string = 'contactCloseHandler:\n'
                try {
                } 
                catch (let e) {
                } 
            

	})

    .scheduledEventHandler('dumps', (context, event) => {
        
                this.oldSchoolDump_7days()
                this.oldSchoolDump24()
            

	})

    .scheduledEventHandler('hourlyHandler', (context, event) => {
        
                String debug_string = 'hourlyHandler:\n'
                try {
                } 
                catch (let e) {
                } 
            

	})
