const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {
  intro.style.transition = "opacity .6s ease, transform .6s ease";
  intro.style.opacity = "0";
  intro.style.transform = "scale(.98)";
  setTimeout(() => {
    intro.classList.add("hidden");
    mainContent.classList.remove("hidden");
    window.scrollTo(0, 0);
    runTerminal();
  }, 600);
});

// Small sound effect using the browser itself — no audio file needed.
function chime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + .18);
    gain.gain.setValueAtTime(.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.08, ctx.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + .25);
  } catch (e) {}
}

document.querySelectorAll(".scroll-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.target).scrollIntoView({ behavior: "smooth" });
  });
});

function runTerminal() {
  const body = document.getElementById("terminalBody");
  const lines = [
    ["> booting friendship.exe...", ""],
    ["✓ Bestie detected: Gnana Varshini", "good"],
    ["✓ Bestie detected: Tejaswini", "good"],
    ["✓ Distance module:", "highlight"],
    ["  Doesn't matter.", "highlight"],
    ["✓ Trust module: 100%", "good"],
    ["✓ PhoneCalls.exe: UNLIMITED", "good"],
    ["✓ LaughingAtNothing.exe: ACTIVE", "good"],
    ["", ""],
    ["SYSTEM RESULT:", "highlight"],
    ["This friendship is healthy, chaotic and permanent. ♡", "highlight"],
  ];

  body.innerHTML = "";
  lines.forEach(([text, cls], i) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "line " + cls;
      div.textContent = text;
      body.appendChild(div);
    }, i * 220);
  });
}

const callMessage = document.getElementById("callMessage");

document.getElementById("acceptBtn").addEventListener("click", () => {
  chime();
  callMessage.textContent = "📞 Connected! “Hiiiii...” → 3 hours later: still talking. 😂💗";
});

document.getElementById("declineBtn").addEventListener("click", () => {
  chime();
  callMessage.textContent = "Nice try. Besties don't get to escape that easily. 😌😂";
});

// Reasons get a tiny surprise when clicked.
document.querySelectorAll(".reason-card").forEach(card => {
  card.addEventListener("click", () => {
    chime();
    const messages = {
      "01": "Call duration limit: apparently not installed. 📞😂",
      "02": "Distance can't break what trust keeps strong. 🫂",
      "03": "You are one of those people who make life feel lighter. 🌷",
      "04": "Official friendship rule: being normal is optional. 🤭"
    };
    alert(messages[card.dataset.reason]);
  });
});

document.getElementById("runBtn").addEventListener("click", () => {
  chime();
  const result = document.getElementById("runResult");
  result.textContent = "✓ Process completed: FOREVER ♾️💗";
  launchConfetti();
});

document.getElementById("surpriseBtn").addEventListener("click", () => {
  chime();
  document.getElementById("finalMessage").classList.remove("hidden");
  launchConfetti(80);
  setTimeout(() => {
    document.getElementById("finalMessage").scrollIntoView({ behavior: "smooth", block: "center" });
  }, 150);
});

function launchConfetti(count = 45) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.style.position = "fixed";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-20px";
    piece.style.zIndex = "9999";
    piece.style.fontSize = (12 + Math.random() * 18) + "px";
    piece.textContent = ["💗", "✨", "🌸", "🎀", "♡"][Math.floor(Math.random() * 5)];
    piece.style.pointerEvents = "none";
    document.body.appendChild(piece);

    const duration = 1800 + Math.random() * 2200;
    piece.animate([
      { transform: "translateY(0) rotate(0deg)", opacity: 1 },
      { transform: `translateY(${window.innerHeight + 80}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 }
    ], { duration, easing: "cubic-bezier(.2,.7,.3,1)" });

    setTimeout(() => piece.remove(), duration);
  }
}
