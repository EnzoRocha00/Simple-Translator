const selects = document.querySelectorAll("select");

const textareaFrom = document.getElementById('textareaOrigem');
const textareaTo = document.getElementById('textareaDestino');

const btnTranslate = document.getElementById('btnTranslate');
const btnClear = document.getElementById('btnCLEAR');
const bntTroca = document.getElementById('btnTroca');

const languages = {
  "en-GB": "Inglês",
  "es-ES": "Espanhol",
  "pt-BR": "Português",
  "de-ch": "Alemão"
};

selects.forEach((tag) => {
  for (let language in languages) {
    let selected;
    if (tag.className.includes("selectOrigem") && language == "pt-BR") {
      selected = "selected";
    } 
    else if (tag.className.includes("selectDestino") && language == "en-GB") {
      selected = "selected";
    }

    const option = `<option value="${language}" ${selected}>${languages[language]}</option>`;

    tag.insertAdjacentHTML("beforeend", option);
  }
});

function loadTranslation() {
  const lang_origem = selects[0].value;
  const lang_destino = selects[1].value;

  fetch(
    `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${lang_origem}|${lang_destino}`
  )
    .then((res) => res.json())
    .then((data) => {
      textareaTo.value = data.responseData.translatedText;
    });
}

btnTranslate.addEventListener('click', () => {
  if (textareaFrom.value) {
    loadTranslation();
  } 
  else {
    textareaTo.value = "";
  }
});

btnClear.addEventListener('click', () => {
  textareaFrom.value = "";
  textareaTo.value = "";
});

bntTroca.addEventListener('click', () => {
  const temp = selects[0].value;
  selects[0].value = selects[1].value;
  selects[1].value = temp;
});