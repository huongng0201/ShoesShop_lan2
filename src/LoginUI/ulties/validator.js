export const checkRequired =value=>{
if (value.trim()){
    return '';

}
return '* Please do not have a blank '
}

export const emailValidation =(email)=>{
    //tra goodle lay doan code dung cho dinh dang email bang "regex email javascript"
const REGEX_Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(REGEX_Email.test(email)){
    return '';
}
 return '* Email is not correct'
}

export const rangeValidation = ({value, input, min, max})=>{
    const valueCount = value.trim().length
    if(valueCount >= min && valueCount <= max) {
        return '';
    }
     return `* ${input} requires at least ${min} letters to ${max} letters`
    
}

export const nameValidation = ({value, input})=>{
    const REGEX_name =  /^[A-Za-z]+$/ 
    if(REGEX_name.test(value)){
        return '';
    }
     return `* ${input} has only letters` 
}

export const phoneValidation =({value, input})=>{
    const REGEX_phone = /^[0-9]+$/
    if (REGEX_phone.test(value)){
       return ''
    }
    return `* ${input} has only numbers` 
}