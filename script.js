
const jokeSetupElement = document.getElementById('joke-setup');
const jokePunchlineElement = document.getElementById('joke-punchline');
const getJokeBtn = document.getElementById('getJokeBtn');

// The API endpoint for a random joke
const apiUrl = 'https://official-joke-api.appspot.com/random_joke';

// Function to fetch a joke from the API
async function fetchJoke() {
   
    jokeSetupElement.textContent = 'Fetching a joke...';
    jokeSetupElement.classList.add('loading-text'); // Add class for styling
    jokePunchlineElement.textContent = ''; // Clear previous punchline
    jokePunchlineElement.style.display = 'none'; // Hide punchline while loading

    try {
        const response = await fetch(apiUrl); // Send a request to the API

        if (!response.ok) {
            throw new Error(`Oops! Something went wrong. Status: ${response.status}`);
        }

        const data = await response.json(); 

        
        jokeSetupElement.textContent = data.setup;
        jokeSetupElement.classList.remove('loading-text'); 
        setTimeout(() => {
            jokePunchlineElement.textContent = data.punchline;
            jokePunchlineElement.style.display = 'block'; 
        }, 5000); 

    } catch (error) {
       
        console.error("Failed to fetch joke:", error);
        jokeSetupElement.textContent = 'Sorry, couldn\'t load a joke. Please try again!';
        jokeSetupElement.classList.remove('loading-text');
        jokePunchlineElement.textContent = '';
        jokePunchlineElement.style.display = 'none';
    }
}


getJokeBtn.addEventListener('click', fetchJoke);

fetchJoke();