document.addEventListener("DOMContentLoaded", () => {
    const textSection = document.querySelector(".text-section");
    const popup = document.getElementById("definition-popup");
    const popupWord = document.getElementById("popup-word");
    const popupDefinition = document.getElementById("popup-definition");
    const popupClose = document.getElementById("popup-close");
    const toggleDictionaryButton = document.getElementById("toggleDictionary");

    // Substitua pela sua chave de API Merriam-Webster
    const API_KEY = "3ef88425-0a6a-4e75-9abb-5776cdf456e6";

    // Variável de controle para ativar/desativar o dicionário
    let isDictionaryActive = false;

    // Atualiza o cursor dos elementos na seção de texto
    function updateCursorState() {
        const textElements = document.querySelectorAll(".text-section p, .text-section span, .text-section h3");
        textElements.forEach((element) => {
            element.style.cursor = isDictionaryActive ? "pointer" : "default";
        });
    }

    // Lógica para alternar o estado do dicionário
    toggleDictionaryButton.addEventListener("click", () => {
        isDictionaryActive = !isDictionaryActive;
        toggleDictionaryButton.setAttribute("aria-pressed", isDictionaryActive);
        
        // Atualiza o texto exibido no botão
        toggleDictionaryButton.textContent = isDictionaryActive ? "Dictionary: On" : "Dictionary: Off";
        
        // Atualiza o aria-label para refletir o estado atual
        toggleDictionaryButton.setAttribute("aria-label", isDictionaryActive ? "Desativar dicionário" : "Ativar dicionário");
        
        updateCursorState(); // Atualiza o cursor dinamicamente
    });
    

    textSection.addEventListener("click", async (event) => {
        const target = event.target;

        // Verifica se o dicionário está ativo antes de prosseguir
        if (!isDictionaryActive) return;

        if (target.tagName === "P" || target.tagName === "SPAN" || target.tagName === "H3") {
            const word = window.getSelection().toString().trim();

            if (word) {
                const url = `https://dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${API_KEY}`;
                try {
                    const response = await fetch(url);
                    const result = await response.json();

                    if (Array.isArray(result) && result[0]?.shortdef?.length) {
                        const definition = result[0].shortdef[0];

                        popupWord.textContent = word;
                        popupDefinition.innerHTML = `
                            <strong>Definition:</strong> ${definition}
                        `;
                        popup.classList.remove("hidden");
                    } else if (Array.isArray(result) && result.length) {
                        // Sugestões de palavras, caso não tenha uma definição exata
                        popupWord.textContent = word;
                        popupDefinition.textContent = `No exact definition found. Did you mean: ${result.join(", ")}?`;
                        popup.classList.remove("hidden");
                    } else {
                        popupWord.textContent = word;
                        popupDefinition.textContent = "Definition not found.";
                        popup.classList.remove("hidden");
                    }
                } catch (error) {
                    console.error("Error fetching definition:", error);
                    popupWord.textContent = word;
                    popupDefinition.textContent = "Error fetching definition.";
                    popup.classList.remove("hidden");
                }
            }
        }
    });

    popupClose.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // Fecha o popup se o usuário clicar fora dele
    document.addEventListener("click", (event) => {
        if (!popup.contains(event.target) && !event.target.closest(".text-section")) {
            popup.classList.add("hidden");
        }
    });

    // Atualizar cursor ao carregar a página
    updateCursorState();
});
