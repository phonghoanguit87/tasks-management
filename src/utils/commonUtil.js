export function getStatus(status = null) {
  const statusList = ['not-yet', 'on-going', 'review', 'pending', 'finished'];
  
  if(status === null) {
    return statusList;
  }
  
  return statusList.filter((element) => element !== status);
}

export function getPriority(priority = null) {
  const priorityList = ['low', 'medium', 'high', 'urgent'];
  
  if(priority === null) {
    return priorityList;
  }
  
  return priorityList.filter((element) => element !== priority);
}

export  function setCookie(name, value, expDays = 7) {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (expDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + currentDate.toUTCString();
  
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  
  return undefined;
}
