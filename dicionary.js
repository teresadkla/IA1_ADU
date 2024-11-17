document.getElementById('searchWord').addEventListener('click', function () {
    const word = document.getElementById('wordInput').value;
    
    if (word) {
        detectLanguage(word);
    } else {
        alert('Por favor, digite uma palavra');
    }
});

function detectLanguage(word) {
    const apiKey = 'YOUR_GOOGLE_API_KEY';  // Insira sua chave da API do Google Cloud Translation
    const apiUrl = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: word
        })
    })
    .then(response => response.json())
    .then(data => {
        const detectedLanguage = data.data.detections[0][0].language;
        console.log(`Idioma detectado: ${detectedLanguage}`);
        fetchWordDefinition(word, detectedLanguage);
    })
    .catch(error => {
        document.getElementById('wordResult').innerText = 'Erro ao detectar idioma';
        console.error(error);
    });
}

function fetchWordDefinition(word, language) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Palavra não encontrada');
            }
            return response.json();
        })
        .then(data => {
            displayWordDefinition(data);
        })
        .catch(error => {
            document.getElementById('wordResult').innerText = error.message;
        });
}

function displayWordDefinition(data) {
    const resultContainer = document.getElementById('wordResult');
    resultContainer.innerHTML = '';
    
    if (data && data[0] && data[0].meanings) {
        const meanings = data[0].meanings.map(meaning => `<p><strong>Tipo:</strong> ${meaning.partOfSpeech} <br> <strong>Definição:</strong> ${meaning.definitions[0].definition}</p>`).join('');
        resultContainer.innerHTML = meanings;
    } else {
        resultContainer.innerText = 'Definição não encontrada.';
    }
}
