
function startListening() {
  const output = document.getElementById("output");
  output.innerHTML = "🎤 Mendengarkan...";

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'id-ID';

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    output.innerHTML = "🗣️ Kamu berkata: " + text;
    sendToChatGPT(text);
  };

  recognition.onerror = function(event) {
    output.innerHTML = "❌ Error: " + event.error;
  };

  recognition.start();
}

function useTyping() {
  document.getElementById("typingArea").style.display = "block";
}

function sendTyped() {
  const text = document.getElementById("textInput").value;
  if (text.trim() !== "") {
    document.getElementById("output").innerHTML = "⌨️ Kamu mengetik: " + text;
    sendToChatGPT(text);
  }
}

function sendToChatGPT(message) {
  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
  .then(res => res.json())
  .then(data => {
    const response = data.reply;
    document.getElementById("output").innerHTML += "<br>🤖 Asisten: " + response;
    const utter = new SpeechSynthesisUtterance(response);
    utter.lang = "id-ID";
    speechSynthesis.speak(utter);
  })
  .catch(err => {
    document.getElementById("output").innerHTML += "<br>❌ Gagal menghubungi AI.";
  });
}

    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("output").innerHTML += "<br>🤖 AI: " + data.reply;
    const utterance = new SpeechSynthesisUtterance(data.reply);
    speechSynthesis.speak(utterance);
  })
  .catch(err => {
    document.getElementById("output").innerHTML += "<br>❌ Gagal menghubungi AI.";
  });
}
