const validateRegister = ( name, value, errors , setErrors ) => {

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]{2,10}\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^[6-9]\d{9}$/;

    const newError = {...errors};
    newError[name] = value.trim() == '' ? `* ${name} must included.` : '';
    
    if(name == 'email' ){
        newError[name] = !emailRegex.test(value) ? '* enter valid email.' : '';
        
    }

    if(name == 'phoneNumber' ){
        newError[name] = !phoneNumberRegex.test(value) ? '* enter valid phone number.' : '';
    }

    if(name == 'password' && value.length < 5){
        newError[name] = '* password must have 5 characters.';
    }

    setErrors(newError)
}

export default validateRegister;