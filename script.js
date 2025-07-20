// DARK MODE TOGGLE
const darkModeToggle = document.getElementById("dark-mode-toggle");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.classList.add("active");
}
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.classList.toggle("active");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

// RANDOM QUOTE GENERATOR
const quotesByCategory = {
    motivational: [
        { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { quote: "Act as if what you do makes a difference. It does.", author: "William James" }
    ],
    humor: [
        { quote: "I'm on a seafood diet. I see food and I eat it.", author: "Unknown" },
        { quote: "Why don’t skeletons fight each other? They don’t have the guts.", author: "Unknown" }
    ],
    relationship: [
        { quote: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
        { quote: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" }
    ],
    historical: [
        { quote: "History is the version of past events that people have agreed upon.", author: "Napoleon Bonaparte" },
        { quote: "Those who do not remember the past are condemned to repeat it.", author: "George Santayana" }
    ],
    cultural: [
        { quote: "Culture is the widening of the mind and of the spirit.", author: "Jawaharlal Nehru" },
        { quote: "Art is the lie that enables us to realize the truth.", author: "Pablo Picasso" }
    ],
    tech: [
        { quote: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
        { quote: "Technology is best when it brings people together.", author: "Matt Mullenweg" }
    ],
    philosophical: [
        { quote: "I think, therefore I am.", author: "René Descartes" },
        { quote: "The unexamined life is not worth living.", author: "Socrates" }
    ],
    nature: [
        { quote: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
        { quote: "In nature, light creates the color. In the picture, color creates the light.", author: "Hans Hofmann" }
    ],
    dream: [
        { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
        { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
    ]
};

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const generateBtn = document.getElementById("generate-btn");
const categorySelector = document.getElementById("category-selector");
const speakBtn = document.getElementById("speak-btn");
const saveBtn = document.getElementById("save-btn");
const favouriteBtn = document.getElementById("favourite-btn");
const downloadBtn = document.getElementById("download-btn");
const favouritesContainer = document.getElementById("favourites-container");

let savedQuotes = JSON.parse(localStorage.getItem("favouriteQuotes")) || [];

generateBtn.addEventListener("click", () => {
    const selectedCategory = categorySelector.value;
    const quotes = quotesByCategory[selectedCategory] || [];
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteText.textContent = selectedQuote.quote;
        authorText.textContent = `- ${selectedQuote.author}`;
    } else {
        quoteText.textContent = "No quotes available for this category.";
        authorText.textContent = "";
    }
});

speakBtn.addEventListener("click", () => {
    const textToSpeak = `${quoteText.textContent} ${authorText.textContent}`;
    if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support speech synthesis.");
    }
});

saveBtn.addEventListener("click", () => {
    const currentQuote = quoteText.textContent;
    const currentAuthor = authorText.textContent;
    if (currentQuote.trim() !== "") {
        savedQuotes.push({ quote: currentQuote, author: currentAuthor });
        localStorage.setItem("favouriteQuotes", JSON.stringify(savedQuotes));
        alert("Quote saved to favourites!");
    }
});

favouriteBtn.addEventListener("click", () => {
    if (favouritesContainer.style.display === "none" || favouritesContainer.style.display === "") {
        displayFavourites();
        favouritesContainer.style.display = "block";
    } else {
        favouritesContainer.style.display = "none";
    }
});

downloadBtn.addEventListener("click", () => {
    const currentQuote = quoteText.textContent;
    const currentAuthor = authorText.textContent;
    if (!currentQuote || currentQuote.includes("generate a quote")) return;
    const content = `${currentQuote}\n${currentAuthor}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quote.txt";
    link.click();
    URL.revokeObjectURL(link.href);
});

function displayFavourites() {
    favouritesContainer.innerHTML = "<h2>Favourite Quotes</h2>";
    if (savedQuotes.length === 0) {
        favouritesContainer.innerHTML += "<p>No favourite quotes saved.</p>";
        return;
    }
    const list = document.createElement("ul");
    savedQuotes.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.quote} ${item.author}`;
        list.appendChild(li);
    });
    favouritesContainer.appendChild(list);
}
// ADVANCED GENERATOR
const advQuotes = [
    { topic: "Inspirational", tone: "Inspiring", length: "5-8 words", quote: "Dream big, conquer challenges.", author: "Anonymous" },
    { topic: "Inspirational", tone: "Inspiring", length: "9-12 words", quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { topic: "Funny", tone: "Humorous", length: "5-8 words", quote: "I used to think I was indecisive.", author: "Unknown" },
    { topic: "Funny", tone: "Humorous", length: "9-12 words", quote: "I am not lazy, I'm on energy-saving mode.", author: "Unknown" },
    { topic: "Love", tone: "Romantic", length: "5-8 words", quote: "Love is in every heartbeat.", author: "Anonymous" },
    { topic: "Love", tone: "Romantic", length: "9-12 words", quote: "In the end, we all dream of love and belonging.", author: "Anonymous" },
    { topic: "Career", tone: "Serious", length: "5-8 words", quote: "Success is built upon persistent effort.", author: "Anonymous" },
    { topic: "Career", tone: "Serious", length: "9-12 words", quote: "Your work is going to fill a large part of your life.", author: "Steve Jobs" },
    { topic: "Life", tone: "Inspiring", length: "5-8 words", quote: "Life is a daring adventure.", author: "Helen Keller" },
    { topic: "Life", tone: "Inspiring", length: "9-12 words", quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" }
];

const advForm = document.getElementById("adv-quote-form");
const advResults = document.getElementById("adv-results");

advForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const description = document.getElementById("adv-description").value.trim().toLowerCase(); // ← NEW
    const topic = document.getElementById("adv-topic").value;
    const tone = document.getElementById("adv-tone").value;
    const length = document.getElementById("adv-length").value;

    let filteredQuotes = advQuotes.filter(q =>
        q.topic === topic &&
        q.tone === tone &&
        q.length === length &&
        q.quote.toLowerCase().includes(description) // ← NEW
    );

    if (filteredQuotes.length === 0) {
        advResults.innerHTML = "<p>No matching quotes found. Please try different criteria.</p>";
        return;
    }

    // Shuffle
    for (let i = filteredQuotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredQuotes[i], filteredQuotes[j]] = [filteredQuotes[j], filteredQuotes[i]];
    }

    const keywords = description.split(" ");
    filteredQuotes = filteredQuotes.filter(q =>
        keywords.some(word => q.quote.toLowerCase().includes(word))
    );

    const outputQuotes = filteredQuotes.slice(0, 4);
    advResults.innerHTML = "";

    outputQuotes.forEach(item => {
        const card = document.createElement("div");
        card.className = "quote-card";
        card.innerHTML = `
      <p class="quote-text">"${item.quote}"</p>
      <p class="quote-author">- ${item.author}</p>
      <div class="quote-actions">
        <button class="copy-btn"><i class="fas fa-copy"></i> Copy</button>
        <button class="download-btn"><i class="fas fa-download"></i> Download</button>
      </div>
    `;
        advResults.appendChild(card);

        const copyBtn = card.querySelector(".copy-btn");
        copyBtn.addEventListener("click", () => {
            const textToCopy = `"${item.quote}" - ${item.author}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.textContent = "Copied!";
                setTimeout(() => {
                    copyBtn.innerHTML = `<i class="fas fa-copy"></i> Copy`;
                }, 1500);
            });
        });

        const downloadBtnCard = card.querySelector(".download-btn");
        downloadBtnCard.addEventListener("click", () => {
            const textToDownload = `"${item.quote}" - ${item.author}`;
            const blob = new Blob([textToDownload], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "quote.txt";
            a.click();
            URL.revokeObjectURL(url);
        });
    });
});
