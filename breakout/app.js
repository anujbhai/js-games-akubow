const grid = document.querySelector(".grid");
const score_display = document.querySelector("#score");
const block_width = 100;
const block_height = 20;
const user_start_pos = [230, 10];
const ball_start_pos = [270, 40];
const ball_diameter = 20;
const board_width = 560;
const board_height = 300;

let timer_id = null;
let x_direction = -2;
let y_direction = 2;
let current_pos = user_start_pos;
let ball_current_pos = ball_start_pos;
let score = 0;

// create block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomright = [xAxis + block_width, yAxis];
    this.topLeft = [xAxis, yAxis + block_height];
    this.topRight = [xAxis + block_height, yAxis + block_height];
  }
}

// Array of blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// draw block
function add_blocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");

    block.classList.add("block");
    block.style.left = `${blocks[i].bottomLeft[0]}px`;
    block.style.bottom = `${blocks[i].bottomLeft[1]}px`;

    grid.appendChild(block);
  }
}
add_blocks();

// add user
const user = document.createElement("div");

user.classList.add("user");

draw_user();

grid.appendChild(user);

// add ball
const ball = document.createElement("div");

ball.classList.add("ball");

draw_ball();

grid.appendChild(ball);

// move user
function move_user(e) {
  switch(e.key) {
    case "ArrowLeft":
      if (current_pos[0] > 0) {
        current_pos[0] -= 10;
        draw_user();
      }

      break;
    case "ArrowRight":
      if (current_pos[0] < 460) {
        current_pos[0] += 10;
        draw_user();
      }
      break;
  }
}

// draw the user
function draw_user() {
  user.style.left = `${current_pos[0]}px`;
  user.style.bottom = `${current_pos[1]}px`;
}

// draw the ball
function draw_ball() {
  ball.style.left = `${ball_current_pos[0]}px`;
  ball.style.bottom = `${ball_current_pos[1]}px`;
}

document.addEventListener("keydown", move_user);

// move ball
function move_ball() {
  ball_current_pos[0] += x_direction;
  ball_current_pos[1] += y_direction;

  draw_ball();
  check_for_collisions();
}

timer_id = setInterval(move_ball, 30);

// check for collision
function check_for_collisions() {
  // check block collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      (
        ball_current_pos[0] > blocks[i].bottomLeft[0] &&
        ball_current_pos[0] < blocks[i].bottomright[0]
      ) &&
      (
        (ball_current_pos[1] + ball_diameter) > blocks[i].bottomLeft[1] &&
        ball_current_pos[1] < blocks[i].topLeft[1]
      )
    ) {
      const all_blocks = Array.from(document.querySelectorAll(".block"));
      all_blocks[i].classList.remove("block");
      blocks.splice(i, 1);
      change_direction();
      score++;
      score_display.innerHTML = score;

      // check for win
      if (blocks.length === 0) {
        score_display.innerHTML = "YOU WIN!";
        clearInterval(timer_id);
        document.removeEventListener("keydown");
      }
    }
  }
  
  // check user collisioin
  if (
    (
      ball_current_pos[0] > current_pos[0] &&
      ball_current_pos[0] < current_pos[0] + block_width
    ) &&
    (
      ball_current_pos[1] > current_pos[1] &&
      ball_current_pos[1] < current_pos[1] + block_height
    )
  ) {
    change_direction();
  }

  // check wall collision
  if (
    ball_current_pos[0] >= (board_width - ball_diameter) ||
    ball_current_pos[1] >= (board_height - ball_diameter) ||
    ball_current_pos[0] <= 0
  ) {
    change_direction();
  }

  // check game over
  if (ball_current_pos[1] <= 0) {
    clearInterval(timer_id);

    score_display.innerHTML = "You lose";

    document.removeEventListener("keydown", move_user);
  }
}

function change_direction() {
  if (x_direction === 2 && y_direction === 2) {
    y_direction = -2;
    return;
  }

  if (x_direction === 2 && y_direction === -2) {
    x_direction = -2;
    return;
  }

  if (x_direction === -2 && y_direction === -2) {
    y_direction = 2;
    return;
  }

  if (x_direction === -2 && y_direction === 2) {
    x_direction = 2;
    return;
  }
}

