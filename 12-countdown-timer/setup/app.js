const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");
// set giveaway date
const futureDate = new Date(2021, 11, 24, 11, 30, 0);

const year = futureDate.getFullYear();
const date = futureDate.getDate();
const minutes = futureDate.getMinutes();
const seconds = futureDate.getSeconds();
const hours = futureDate.getHours();
// months and days are ZERO-indexed based
const monthNum = futureDate.getMonth();
const month = months[monthNum];
const day = futureDate.getDay();
const weekday = weekdays[day];

giveaway.textContent = `giveaway end on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();
function getRemaindingTime() {
  const today = new Date();
  const t = futureTime - today;
  // 1sec = 1000ms
  // 1min = 60sec
  // 1hr = 60hr
  // 1day = 24hr

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  // calculate values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  const format = function (item) {
    if (item < 10) return (item = `0${item}`);
    return item;
  };

  // set values array
  const values = [days, hours, minutes, seconds];
  items.forEach((item, index) => {
    console.log(item);
    item.innerHTML = format(values[index]);
  });

  if(t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}

const countdown = setInterval(getRemaindingTime, 1000);

// set initial values
getRemaindingTime();
