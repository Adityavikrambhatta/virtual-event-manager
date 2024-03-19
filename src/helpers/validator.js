class Validations{
    static validatePropsNotNeeded(eventInfo){
        if( (
            eventInfo.hasOwnProperty("_id")||
            eventInfo.hasOwnProperty("createdBy") || 
            eventInfo.hasOwnProperty("createdAt") 
         ) 
            ) 
            
        {
            return {
                "status" : true,
                "message" : "event can be updated." 
            }
        }
        else{ 
            return {
                "status" : false,
                "message" : "Some properties of the events cannot be upddated." 
            }
        }          

    }
    static validateForUpdate(eventInfoBody){
        if( 
            eventInfoBody.hasOwnProperty("eventName") ||
            eventInfoBody.hasOwnProperty("eventDescription") ||
            eventInfoBody.hasOwnProperty("duration") ||
            eventInfoBody.hasOwnProperty("participants") ||
            eventInfoBody.hasOwnProperty("eventStartDateTime")  
        )  
            
        {
            return {
                "status" : true,
                "message" : "The event properties have been validated." 
            }
        }
        else{ 
            return {
                "status" : false,
                "message" : "Event info is malformed, please provide valid parameters." 
            }
        }
    }
    
}

module.exports = Validations;
