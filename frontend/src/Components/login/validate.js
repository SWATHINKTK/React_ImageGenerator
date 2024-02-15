const validateData = ( name, value, errors, setErrors ) => {
    let newError = { ...errors };
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]{2,10}\.[a-zA-Z]{2,}$/;

    if (name === 'username') {

        newError[name] = value.trim() === '' ? '* username is required.' : '';

        if (!emailRegex.test(value)) {
            newError[name] = '* enter proper username';
        }

    } else if(name == "password"){

        newError[name] = value.trim() === '' ? '* password is required.' : '';

        if(value.length < 4){
            newError[name] = '* password must have 5 characters.';
        }
    }
    setErrors( newError );
   
}

export default validateData;