import validator from "validator";

export const isEmail = (em) =>{
    return validator.isEmail(em);
}
