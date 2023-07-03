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

export  function setCookie(cname, value, expDays = 7) {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (expDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + currentDate.toUTCString();
  
  document.cookie = cname + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  
  return undefined;
}

export function clearCookie(cname) {
  const expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  document.cookie = cname + "=" + JSON.stringify({}) + ";" + expires + ";path=/";
}

export function formatCSVData(data) {
  const tasksWithoutTodo = data.map((task) => {
    const { todo, ...taskWithoutTodo } = task;
    
    return taskWithoutTodo;
  });
  
  let csvData = '';
  const keys = Object.keys(tasksWithoutTodo[0]);
  csvData += keys.join(',') + '\n';
  
  tasksWithoutTodo.forEach((element) => {
    let row = '';
    
    keys.forEach((key) => {
      row += element[key] + ',';
    });
    
    csvData += row + '\n';
  });

  return csvData;
}

export function getCurrentDate() {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  
  const formattedDate = String(date).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');
  
  return `${year}/${formattedMonth}/${formattedDate}`;
}

