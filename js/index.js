document.addEventListener('DOMContentLoaded', () => {
  let btnCreate = document.querySelectorAll("[create-task-btn]")[0];
  let saveBtn = document.querySelector("[save-btn]");
  let closeBtn = document.querySelector("[cancel-btn]");
  let dialog;
  btnCreate.addEventListener('click', event => {
    dialog = new CreateDialog();
    dialog.open();
  });
  saveBtn.addEventListener('click', event => {
    dialog.submit();
  });
  closeBtn.addEventListener('click', event => {
    dialog.close();
  });


});
let setVerifyStatus = (ctx) => {
  let guid = ctx.getAttribute('task');
  let task = document.querySelector('[task=' + guid + ']');
  
  switch(ctx.value){
    case 'done':
        let checkMark = document.createElement('i');
        checkMark.className = 'fas fa-check-square';
        checkMark.style = "float: right;";
        task.firstChild.appendChild(checkMark);
        break;
    case 'delete':
        task.remove();
        break;
    case 'edit':
       break;
  }
}

let search = document.getElementById('search');
search.addEventListener('keyup', filterTaskTitles);

function filterTaskTitles() {
  let searchValue = document.getElementById('search').value.toUpperCase();

  let mainDiv = document.getElementById('tasks');
  let div = mainDiv.querySelectorAll('div.task');

  for (let i = 0; i < div.length; i++) {
    let p = div[i].getElementsByTagName('p')[0];
    if (p.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
      div[i].style.display = '';
    } else {
      div[i].style.display = 'none';
    }
  }

}
let priorityDd = document.getElementById('priority');
priorityDd.addEventListener('change', filterByPriority);

function filterByPriority() {
  var value = priorityDd.value.toUpperCase();
  let mainDiv = document.getElementById('tasks');
  let div = mainDiv.querySelectorAll('div.task');

  for (let i = 0; i < div.length; i++) {
    let taskPriority = div[i].getElementsByClassName('levelTask')[0].innerHTML.toUpperCase();
    if (taskPriority === value || value === 'ALL') {
      div[i].style.display = '';
    } else {
      div[i].style.display = 'none';
    }
  }
}

let statusDd = document.getElementById('status');
statusDd.addEventListener('change', filterByStatus);

function filterByStatus() {
  var value = statusDd.value.toUpperCase();
  let mainDiv = document.getElementById('tasks');
  let div = mainDiv.querySelectorAll('div.task');

  for (let i = 0; i < div.length; i++) {
    if(value === 'ALL') {
      div[i].style.display = '';
      continue;
    }
    let done = div[i].getElementsByClassName('fa-check-square')[0];
    let display = false;
    switch(value){
      case 'DONE':
          display = !!done;
          break;
      case 'OPEN':
          display = !done;
          break;
    }
    div[i].style.display = display ? '' : 'none';
  }
}
