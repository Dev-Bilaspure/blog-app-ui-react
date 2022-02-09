export const validatePassword = (pswd) => {
  if(pswd==='' || pswd.length<8)
    return(1);
  return(0);
}

export const validateEmail = (eml) => {
  if(eml==='')
    return(1);
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eml))
    return(0);
  return(2);
}

