export const validatePassword = (pswd) => {
  const specialCharArr = ['@', '#', '$', '%', '!', '*', '&', '*', '+', '-', '/', '>', '<', '/', '_']
  if(pswd==='')
    return(1);
  if(pswd<8)
    return(2);
  let numberChar = false;
  let letterChar = false;
  let specialCharr = false;
  for(let i=0;i<pswd.length;i++) {
    if(pswd[i]<='9' && pswd>='0')
      numberChar = true;
    if(pswd[i]<='z' && pswd[i]>='a')
      letterChar = true;
    if(pswd[i]<='Z' && pswd[i]>='A')
      letterChar = true;
    if(specialCharArr.indexOf(pswd[i])>-1)
      specialCharr = true;
  }
  if(numberChar===false || letterChar===false || specialCharr===false)
    return(2);
  return(0);
}

export const validateEmail = (eml) => {
  if(eml==='')
    return(1);
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eml))
    return(0);
  return(2);
}