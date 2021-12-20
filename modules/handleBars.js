import ExpressHandlebars from 'express-handlebars';
import { displayNotifications } from '../controllers/NotificationController.js';

const handleBarsOpts = {
    extname: '.hbs',
    helpers : {
        isInvalid : function(inputName, errorList){
            if(!errorList)
                return false;

            for(let index in errorList){
                if(errorList[index].input == inputName)
                    return true;
            }

            return false;
        },
        toJSON: function(obj){
            return JSON.stringify(obj);
        },
        displayNotifications: function(session){
            return displayNotifications(session);
        },
        not: function(obj){
            return obj == null || !obj;
        },
        eq: function(obj1, obj2){
            return obj1 == obj2;
        },
        eq: (v1, v2) => v1 === v2,
        ne: (v1, v2) => v1 !== v2,
        lt: (v1, v2) => v1 < v2,
        gt: (v1, v2) => v1 > v2,
        lte: (v1, v2) => v1 <= v2,
        gte: (v1, v2) => v1 >= v2,
        and() {
            return Array.prototype.every.call(arguments, Boolean);
        },
        or() {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        }

    }
}

export default ExpressHandlebars(handleBarsOpts)