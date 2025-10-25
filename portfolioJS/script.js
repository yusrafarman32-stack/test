
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  const cursor = document.getElementById("cursor"); 
const amount = 20;
const sineDots = Math.floor(amount * 0.3);
const width = 26;
const idleTimeout = 150;
let lastFrame = 0;
let mousePosition = {x: 0, y: 0};
let dots = [];
let timeoutID;
let idle = false;

class Dot {
  constructor(index = 0) {
    this.index = index;
    this.anglespeed = 0.05;
    this.x = 0;
    this.y = 0;
    this.scale = 1 - 0.05 * index;
    this.range = width / 2 - width / 2 * this.scale + 2;
    this.limit = width * 0.75 * this.scale;
    this.element = document.createElement("span");
    gsap.set(this.element, {scale: this.scale});
    cursor.appendChild(this.element);
  }
  lock() {
    this.lockX = this.x;
    this.lockY = this.y;
    this.angleX = Math.PI * 2 * Math.random();
    this.angleY = Math.PI * 2 * Math.random();
  }
  draw(delta) {
    if (!idle || this.index <= sineDots) {
      gsap.set(this.element, {x: this.x, y: this.y});
    } else {
      this.angleX += this.anglespeed;
      this.angleY += this.anglespeed;
      this.y = this.lockY + Math.sin(this.angleY) * this.range;
      this.x = this.lockX + Math.sin(this.angleX) * this.range;
      gsap.set(this.element, {x: this.x, y: this.y});
    }
  }
}

function init() {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
  lastFrame += new Date();
  buildDots();
  render();
}

function startIdleTimer() {
  timeoutID = setTimeout(goInactive, idleTimeout);
  idle = false;
}

function resetIdleTimer() {
  clearTimeout(timeoutID);
  startIdleTimer();
}

function goInactive() {
  idle = true;
  for (let dot of dots) {
    dot.lock();
  }
}

function buildDots() {
  for (let i = 0; i < amount; i++) {
    let dot = new Dot(i);
    dots.push(dot);
  }
}

const onMouseMove = event => {
  mousePosition.x = event.clientX - width / 2;
  mousePosition.y = event.clientY - width / 2;
  resetIdleTimer();
};

const onTouchMove = event => {
  mousePosition.x = event.touches[0].clientX - width / 2;
  mousePosition.y = event.touches[0].clientY - width / 2;
  resetIdleTimer();
};

const render = timestamp => {
  const delta = timestamp - lastFrame;
  positionCursor(delta);
  lastFrame = timestamp;
  requestAnimationFrame(render);
};

const positionCursor = delta => {
  let x = mousePosition.x;
  let y = mousePosition.y;
  dots.forEach((dot, index, dots) => {
    let nextDot = dots[index + 1] || dots[0];
    dot.x = x;
    dot.y = y;
    dot.draw(delta);
    if (!idle || index <= sineDots) {
      const dx = (nextDot.x - dot.x) * 0.35;
      const dy = (nextDot.y - dot.y) * 0.35;
      x += dx;
      y += dy;
    }
  });
};
init();
  function toggleDescription(card) {
    const fullDesc = card.querySelector('.full-desc');
    fullDesc.classList.toggle('d-none');
  }
function validateForm() {
  let isValid = true;

  document.querySelectorAll('.error').forEach(el => el.style.display = 'none');

  const fullName = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10,15}$/;

  if (fullName === "") {
    document.getElementById('fullNameError').style.display = 'block';
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    document.getElementById('emailError').style.display = 'block';
    isValid = false;
  }
  if (!phonePattern.test(phone)) {
    document.getElementById('phoneError').style.display = 'block';
    isValid = false;
  }
  if (message === "") {
    document.getElementById('messageError').style.display = 'block';
    isValid = false;
  }

  return isValid;
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sendmail();
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sendEmail();
});

function sendEmail() {
    const fullName = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    Email.send({
        SecureToken: "ffef6885-2e6b-45e3-8c64-282330da90b3",
        To: 'yusra.farman@xpacetechnologies.com',
        From: 'yusra.farman@xpacetechnologies.com',
        Subject: `New Message from Index page from ${fullName}`,
        Body: `
                Name: ${fullName}<br>
                Email: ${email}<br>
                Phone: ${phone}<br>
                Message: ${message}
            `
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Email Sent!",
                    text: "Your message has been sent successfully.",
                    icon: "success"
                }).then(() => {
                    resetForm();
                });
            } else {
                console.error("Email sending failed:", message);
                Swal.fire({
                    title: "Oops...",
                    text: "Failed to send the message. Please try again later.",
                    icon: "error"
                });
            }
        }
    ).catch(error => {
        console.error("Email sending error:", error);
        Swal.fire({
            title: "Oops...",
            text: "Failed to send the message. Please try again later.",
            icon: "error"
        });
    });
}

function resetForm() {
    document.getElementById('contact-form').reset();
}

function resetForm() {
    document.getElementById('contact-form').reset();
}
