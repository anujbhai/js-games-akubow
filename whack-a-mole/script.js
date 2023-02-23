const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const time_left = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hit_position = null;
let current_time = 10;

function random_square() {
  squares.forEach(square => {
    square.classList.remove("mole"); 
    random_sq_pos.classList.remove("whack");
  });

  let random_sq_pos = squares[Math.floor(Math.random() * 9)]

  random_sq_pos.classList.add("mole");

  hit_position = random_sq_pos.id;
}

squares.forEach(square => {
  square.addEventListener("mousedown", () => {
    if (square.id === hit_position) {
      result++;

      square.classList.add("whack")

      score.textContent = result;

      hit_position = null;
    }
  });
});

function move_mole() {
  let timer_id = null;

  timer_id = setInterval(random_square, 1000);
}
move_mole();

function countdown() {
  current_time--;

  time_left.textContent = current_time;

  if (current_time === 0) {
    clearInterval(countdown_timer_id);

    alert(`GAME OVER! Your final score is: ${result}`)
  }
}

let countdown_timer_id = setInterval(countdown, 1000);

