import ExpressHandlebars from "express-handlebars";

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
        }
    }
}

export default ExpressHandlebars(handleBarsOpts)