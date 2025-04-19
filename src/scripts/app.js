// Toggle dark mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Play audio dynamically
document.getElementById('audio-button').addEventListener('click', () => {
    const audioSrc = document.getElementById('audio-button').getAttribute('data-audio-src');
    if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
    } else {
        alert('Audio not available for this word.');
    }
});

// Search functionality (placeholder for API integration)
document.getElementById('search-bar').addEventListener('input', (event) => {
    const query = event.target.value.trim();
    if (query) {
        console.log(`Searching for: ${query}`);
        // Add API call logic here
    }
});

// Fetch word details from DictionaryAPI.dev
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.trim();
    const errorMessageElement = document.getElementById('error-message');

    // Clear any previous error message
    errorMessageElement.textContent = '';

    if (query) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Word not found!😒');
                }
                return response.json();
            })
            .then(data => {
                displayWordDetails(data[0]); // Pass the first result to the display function
            })
            .catch(error => {
                errorMessageElement.textContent = error.message; // Show error below the search bar
            });
    } else {
        errorMessageElement.textContent = 'Please enter a word to search..😜'; // Show error below the search bar
    }
});

// Display word details on the page
function displayWordDetails(wordData) {
    // Display the word and phonetics
    document.getElementById('word').textContent = wordData.word;
    document.getElementById('phonetics').textContent = wordData.phonetics[0]?.text || 'N/A';

    // Handle audio pronunciation
    const audioButton = document.getElementById('audio-button');
    if (wordData.phonetics[0]?.audio) {
        audioButton.style.display = 'inline';
        audioButton.setAttribute('data-audio-src', wordData.phonetics[0].audio);
    } else {
        audioButton.style.display = 'none';
        audioButton.removeAttribute('data-audio-src');
    }

    // Display meanings and definitions
    const meanings = wordData.meanings.map(meaning => {
        const definitions = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
        return `<h2>${meaning.partOfSpeech}</h2><ul>${definitions}</ul>`;
    }).join('');
    document.querySelector('.definition-section').innerHTML = meanings;
}

// Play audio on word element interaction
const wordElement = document.getElementById('word');
const audioElement = new Audio('path/to/audio/file.mp3'); // Replace with the correct audio file path

// Play audio on click
wordElement.addEventListener('click', () => {
    audioElement.play();
});

// Play audio on keyboard interaction (Enter or Space key)
wordElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent default behavior for Space key
        audioElement.play();
    }
});