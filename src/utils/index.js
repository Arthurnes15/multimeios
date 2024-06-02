export const dateFormatter = (dateString, locale = 'pt-BR' ) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale).format(date);
}

export const validateEmail = (email) => {  
    return email?.toString().includes('@') && email?.toString().includes('.');
}

export const validatePassword = (pass) => {  
    return pass?.toString().length > 6;
}