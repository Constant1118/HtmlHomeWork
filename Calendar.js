let month = document.getElementById('month');
let year = document.getElementById('year');
let year_num = new Date().getFullYear();
year.innerHTML = year_num;
const monthName = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
let month_num = new Date().getMonth();
month.innerHTML = monthName[month_num];
let tds = document.querySelectorAll('td');
let firstday = new Date(year_num, month_num, 1).getDay();
let allday = new Date(year_num, month_num + 1, 0).getDate()
let clickday = 0;
let todolist = document.getElementsByClassName('todolist')[0];
let showlist = document.getElementsByClassName('showtodolist')[0];


tds.forEach(el => {
    let p = document.createElement('p');
    el.appendChild(p);
    let div = document.createElement('div');
    div.classList.add('ul_container');
    el.appendChild(div);
})
function adddate() {

    for (let i = 1; i <= allday; i++) {
        let ps = document.querySelectorAll('td p')
        ps[firstday].innerText = i;
        let scheduleObj;
        let ul_container = document.querySelectorAll('.ul_container');
        ul_container[firstday].innerHTML = '';
        if (localStorage.getItem(`${year_num}${month_num}${i}`) != null) {
            scheduleObj = JSON.parse(localStorage.getItem(`${year_num}${month_num}${i}`))
            ul_container[firstday].innerText = '';
            let ul = document.createElement('ul')
            if (scheduleObj.length == 1) {
                let li = document.createElement('li');
                let span = document.createElement('span')
                span.innerHTML = `${scheduleObj[0].title}`;
                li.appendChild(span);
                span.style.wordBreak = 'break-all'
                ul.appendChild(li);
                li.style.color = `${scheduleObj[0].color}`
            }
            else {
                for (let j = 0; j < 2; j++) {
                    let li = document.createElement('li');
                    let span = document.createElement('span')
                    span.innerHTML = `${scheduleObj[j].title}`;
                    li.appendChild(span);
                    ul.appendChild(li);
                    li.style.color = `${scheduleObj[j].color}`
                }
            }
            ul_container[firstday].appendChild(ul);
        }
        
        tds[firstday].onclick = function () {
            clickday = this.children[0].textContent;

            if (clickday != '') {
                todolist.innerHTML = ''
                let ul = document.createElement('ul')
                if (localStorage.getItem(`${year_num}${month_num}${clickday}`) != null) {
                    for (let item of scheduleObj) {
                        let li = document.createElement('li');
                        let span = document.createElement('span');
                        span.innerHTML = `${item.title}`;
                        li.appendChild(span);
                        ul.appendChild(li);

                        li.onclick = function () {
                            let md_head_h5 = document.querySelector('#showtodolist .modal-header h5');
                            md_head_h5.innerHTML = `${item.title}`;
                            let md_body_p = document.querySelector('#showtodolist .modal-body p');
                            md_body_p.innerText = `${item.description}`;
                            $('#showtodolist').modal('show');
                            $('#modal_todolist').modal('hide')
                        }
                    }
                }
                todolist.appendChild(ul)
                $('#modal_todolist').modal('show')
            }
        }
        firstday++;
    }

}
adddate();


function cleardate() {

    let ps = document.querySelectorAll('td p');

    for (let j = 0; j < tds.length; j++) {
        ps[j].innerText = '';
    }
}

function addmonth() {
    cleardate();
    if (month_num == 11) {
        year_num++;
        year.innerHTML = year_num
        month_num = 0;
        month.innerHTML = monthName[month_num];
    }
    else {
        month_num++;
        month.innerHTML = monthName[month_num];
    }
    firstday = new Date(year_num, month_num, 1).getDay();
    allday = new Date(year_num, month_num + 1, 0).getDate();

    adddate()
}
function lessmonth() {
    cleardate();
    if (month_num == 0) {
        year_num--;
        year.innerHTML = year_num
        month_num = 11;
        month.innerHTML = monthName[month_num];
        allday = new Date(year_num, month_num + 1, 0).getDate();
    }
    else {
        month_num--;
        month.innerHTML = monthName[month_num];
    }
    firstday = new Date(year_num, month_num, 1).getDay();
    allday = new Date(year_num, month_num + 1, 0).getDate();
    adddate()
}

function save() {
    let txt_tit = document.getElementById('schedule_title').value;
    let txt_des = document.getElementById('schedule_description').value;
    let txt_col = document.getElementById('schedule_color').value;
    console.log(txt_tit);
    console.log(txt_des);
    console.log(txt_col);



    if (localStorage.getItem(`${year_num}${month_num}${clickday}`) != null) {
        scheduleObj = JSON.parse(localStorage.getItem(`${year_num}${month_num}${clickday}`));

        let sc = [];
        for (let i = 0; i < scheduleObj.length + 1; i++) {

            if (i == scheduleObj.length) {
                sc.push({ title: txt_tit, description: txt_des, color: txt_col })
            }
            else {
                sc.push(scheduleObj[i]);
            }
        }

        let txt_sc = JSON.stringify(sc);
        console.log(txt_sc)
        let sc_id = `${year_num}${month_num}${clickday}`
        localStorage.setItem(`${sc_id}`, `${txt_sc}`);
    }
    else {
        let sc = [];
        sc.push({ title: txt_tit, description: txt_des, color: txt_col })
        let txt_sc = JSON.stringify(sc);
        console.log(txt_sc)
        let sc_id = `${year_num}${month_num}${clickday}`
        localStorage.setItem(`${sc_id}`, `${txt_sc}`);
    }



    firstday = new Date(year_num, month_num, 1).getDay();


    cleardate();
    adddate();
    document.getElementById('schedule_title').value = '';
    document.getElementById('schedule_description').value = ''
    $('#modal_addtodolist').modal('hide')
}
function add() {
    $('#modal_addtodolist').modal('show')
    $('#modal_todolist').modal('hide')
}
function del() {
    let title = document.querySelector('#showtodolist h5').textContent;
    let p = document.querySelector('#showtodolist p').textContent;
    let id = `${year_num}${month_num}${clickday}`;
    let scheduleObj = JSON.parse(localStorage.getItem(`${year_num}${month_num}${clickday}`))
    let sc = [];
    if (scheduleObj.length == 1) {
        localStorage.removeItem(id)
    }
    else {
        scheduleObj.forEach(el => {
            if (el.title == title && el.description == p) {

            }
            else {
                sc.push(el);
            }
        })
        let txt_sc = JSON.stringify(sc);
        localStorage.setItem(`${id}`, `${txt_sc}`);
    }
    firstday = new Date(year_num, month_num, 1).getDay();
    cleardate();
    adddate();
    $('#showtodolist').modal('hide');
}