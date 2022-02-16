
window.speechSynthesis.cancel();
let btnTop=document.getElementById('btnTop');
btnTop.addEventListener('click',()=>{
    let message=new SpeechSynthesisUtterance();
    message.text="Hello! This is Eklavya's website. It contains some simple projects he has done so far. Have a look. You may contact him using the details mentioned.";
    
    window.speechSynthesis.cancel();
    speechSynthesis.speak(message); 
});
btnTop.click();
// Project1 Begins

function project1() {
  console.log("hello");
  let username = document.getElementById("username");
  let email = document.getElementById("email");
  let password1 = document.getElementById("password1");
  let password2 = document.getElementById("password2");
  let submit = document.getElementById("submission");
  let a = [username, email, password1, password2];

  function showError(input, message) {
    input.className = "form-control error";
    input.parentElement.children[2].className = "form-text error";
    input.parentElement.children[2].innerText = message;
  }

  function showSuccess(input) {
    input.className = "form-control success";
    input.parentElement.children[2].className = "form-text";
  }

  function checkRequired(a) {
    a.forEach((ele) => {
      if (ele.value.trim() === "") {
        showError(
          ele,
          `${ele.parentElement.children[0].innerText} is required`
        );
      } else {
        showSuccess(ele);
      }
    });
  }

  function checkUsername(input, min, max) {
    if (input.value < min || input.value > max) {
      showError(input, `Username length should be between ${min} and ${max}`);
    }
  }

  function checkEmail(input) {
    if (
      !String(input.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      showError(email, "Enter a valid email");
    }
  }

  function checkPassword(p1, p2) {
    if (p1.value !== p2.value) {
      showError(p2, "Passwords do not match");
    }
  }
  submit.addEventListener("click", (e) => {
    checkRequired(a);
    checkUsername(username, 3, 10);
    checkEmail(email);
    checkPassword(password1, password2);
    e.preventDefault();
  });
}
project1();
// Project1 Ends

// Project2 Begins
function project2() {
  let seats = document.getElementById("seats");
  let seat = document.querySelectorAll(".row1 .seat");
  let total1 = document.getElementById("total1");
  let money1 = document.getElementById("money1");
  let movie = document.getElementById("movie");

  let ticketPrice = +movie.value;

  let a = [];
  function updatePrice() {
    a = [];
    console.log(document.querySelectorAll(".row1"));
    let length = document.querySelectorAll(".row1 .seat.selected").length;
    let b = [...seat];
    total1.innerText = length;
    console.log(total1.innerText);
    money1.innerText = length * ticketPrice;
    b.forEach((ele) => {
      if (ele.classList.contains("selected")) {
        a.push(b.indexOf(ele));
      }
    });
    localStorage.setItem("selectedSeats", JSON.stringify(a));
  }
  function populateUI() {
    a = JSON.parse(localStorage.getItem("selectedSeats"));
    let b = [...seat];
    a.forEach((ele) => {
      b[ele].classList.add("selected");
    });
  }

  seats.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      updatePrice();
    }
  });
  movie.addEventListener("change", (e) => {
    ticketPrice = e.target.value;
    updatePrice();
  });
  populateUI();
  updatePrice();
}
project2();

function project3() {
  let video = document.getElementById("video");
  let play = document.getElementById("btn3 play");
  let stop1 = document.getElementById("btn3 stop");
  let timeStamp = document.getElementById("timeStamp");
  let progress = document.getElementById("progress");

  function toggleVideoStatus() {
    if (video.paused) {
      video.play();
      play.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
      video.pause();
      play.innerHTML = `<i class="fas fa-play">`;
    }
  }
  function stopVideo() {
    video.currentTime = 0;
    video.pause();
    play.innerHTML = `<i class="fas fa-play">`;
  }
  function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
      mins = "0" + String(mins);
    }
    let sec = Math.floor(video.currentTime % 60);
    if (sec < 10) {
      sec = "0" + String(sec);
    }
    timeStamp.innerText = `${mins}:${sec}`;
  }
  function updateVideo() {
    video.currentTime = (progress.value * video.duration) / 100;
  }

  video.addEventListener("click", toggleVideoStatus);
  play.addEventListener("click", toggleVideoStatus);
  stop1.addEventListener("click", stopVideo);
  video.addEventListener("timeupdate", updateProgress);
  progress.addEventListener("change", updateVideo);
}
project3();

function project4() {
  let curr_one = document.getElementById("currency-one");
  let curr_two = document.getElementById("currency-two");
  let amount_one = document.getElementById("amount-one");
  let amount_two = document.getElementById("amount-two");
  let swap = document.getElementById("swap");
  let rate = document.getElementById("rate");

  function calculate4() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${curr_one.value}`)
      .then((res) => res.json())
      .then((data) => {
        amount_two.value = (
          amount_one.value * data.rates[curr_two.value]
        ).toFixed(2);
        rate.innerText = `1 ${curr_one.value}=${data.rates[curr_two.value]} ${
          curr_two.value
        }`;
      });
  }
  function swap4() {
    let t = curr_one.value;
    curr_one.value = curr_two.value;
    curr_two.value = t;
    calculate4();
  }

  curr_one.addEventListener("change", calculate4);
  curr_two.addEventListener("change", calculate4);
  amount_one.addEventListener("input", calculate4);
  amount_two.addEventListener("input", calculate4);
  swap.addEventListener("click", swap4);
  calculate4();
}
project4();
function project5() {
  let addUser = document.getElementById("add-user");
  let doubleMoney = document.getElementById("double");
  let showMillion = document.getElementById("show-millionaires");
  let sort = document.getElementById("sort");
  let calcWealth = document.getElementById("calculate-wealth");
  let screen = document.getElementById("main5");
  let data = [];

  function addData() {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((a) => {
        let b = a.results[0];
        data.push({
          user: `${b.name.first} ${b.name.last}`,
          money: Math.floor(Math.random() * 1000000),
        });
        updateDOM();
      });
    
  }
  function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  function updateDOM() {
    screen.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    console.log(data);
    data.forEach((ele) => {
      let element = document.createElement("div");
      element.className = "person";
      element.innerHTML = `<strong>${ele.user}</strong>${formatMoney(ele.money)}`;
      screen.appendChild(element);
    });
  }
  // function addUserfunc(){
  //     data.push(addData());
  //     console.log(data);
  //     updateDOM();
  // }
  function doubleMoneyfunc() {
    data = data.map((item) => {
      return { ...item, money: item.money * 2 };
    });
    updateDOM();
  }
  function showMillionfunc() {
    data = data.filter((item) => item.money > 1000000);
    updateDOM();
  }
  function sortfunc() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
  }
  function calcWealthfunc() {
    let element = document.createElement("div");
    element.innerHTML = `<h3>Total Wealth:</h3>${formatMoney(data.reduce(
      (acc, num) => (acc += num.money),
      0
    ))}`;
    element.className = "person";
    screen.appendChild(element);
  }

  addUser.addEventListener("click", addData);
  doubleMoney.addEventListener("click", doubleMoneyfunc);
  showMillion.addEventListener("click", showMillionfunc);
  sort.addEventListener("click", sortfunc);
  calcWealth.addEventListener("click", calcWealthfunc);
}
project5();

function project6() {
  let close=document.getElementById('close');
let signup=document.getElementById('btn5');
let toggle=document.getElementById('toggle');
let modal=document.getElementById('modal5');
let container6=document.getElementById('container6');
let container_modal=document.getElementById('container-modal');
toggle.addEventListener('click',()=>{
    container6.classList.toggle('show-nav');
})
signup.addEventListener('click',()=>{
    container_modal.style.visibility="visible";
})
close.addEventListener('click',()=>{
    container_modal.style.visibility="hidden";
})

document.addEventListener('click',(e)=>{
    if(e.target==container_modal){
    container_modal.style.visibility="hidden";
    }
})
}
project6();

