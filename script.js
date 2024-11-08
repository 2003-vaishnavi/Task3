const chocolates = [
    { id: 1, name: "Dark Chocolate", image: "https://www.whitakerschocolates.com/cdn/shop/articles/What-is-Plain-Chocolate_720x720.jpg?v=1715958245" },
    { id: 2, name: "Milk Chocolate", image: "https://vaya.in/recipes/wp-content/uploads/2018/02/Milk-Chocolate-1.jpg" },
    { id: 3, name: "White Chocolate", image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Chocolate-branco-2.webp" },
    { id: 4, name: "Hazelnut Chocolate", image: "https://t3.ftcdn.net/jpg/08/79/44/34/360_F_879443456_Om6jifei9QMnyuebiF4tYb2LH9f8yMfO.jpg" },
    { id: 5, name: "Caramel Chocolate", image: "https://www.allrecipes.com/thmb/wlJFWMtpEnOe1ofVhIYRqUIiTYo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/556040-chocolate-covered-caramels-footballgrl16-4x3-1-8a39e44d26f74c7e9b7fcba5f6148995.jpg" },
    { id: 6, name: "Mint Chocolate", image: "https://bakingwithgranny.co.uk/wp-content/uploads/2019/08/peppermint2-740x1024.jpg" },
    { id: 7, name: "Belgium Chocolate", image: "https://www.shutterstock.com/image-photo/selection-belgian-chocolates-260nw-619179986.jpg" },
    { id: 8, name: "Almond Chocolate", image: "https://www.shutterstock.com/image-photo/chocolate-turron-whole-almonds-260nw-1041636793.jpg" },
    { id: 9, name: "Coconut Chocolate", image: "https://www.occasionallyeggs.com/wp-content/uploads/2021/02/Chocolate-Coconut-Bars-3.jpg" },
    { id: 10, name: "Ruby Chocolate", image: "https://www.foodie.com/img/gallery/ruby-chocolate-is-the-perfect-treat-for-fruit-lovers/intro-1706214566.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    loadChocolates();
    loadQuiz();
    updateCarousel();
});

// Load chocolates into the dropdown and display images with names
function loadChocolates() {
    const chocolateSelect = document.getElementById("chocolate");
    const chocolateList = document.getElementById("chocolate-list");

    chocolates.forEach(chocolate => {
        const option = document.createElement("option");
        option.value = chocolate.id;
        option.textContent = chocolate.name;
        chocolateSelect.appendChild(option);

        const chocolateDiv = document.createElement("div");
        const img = document.createElement("img");
        img.src = chocolate.image;
        img.alt = chocolate.name;
        const nameLabel = document.createElement("p");
        nameLabel.textContent = chocolate.name;

        chocolateDiv.appendChild(img);
        chocolateDiv.appendChild(nameLabel);
        chocolateList.appendChild(chocolateDiv);
    });

    // Handle order form submission
    document.getElementById("order-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedChocolateId = document.getElementById("chocolate").value;
        const selectedChocolate = chocolates.find(choco => choco.id == selectedChocolateId);
        alert(`You have ordered: ${selectedChocolate.name}`);
    });
}

// Quiz data
const quizQuestions = [
    {
        question: "What is the main ingredient in chocolate?",
        choices: ["Cocoa", "Sugar", "Milk"],
        answer: "Cocoa"
    },
    {
        question: "Which country is known for producing the most chocolate?",
        choices: ["USA", "Ivory Coast", "Belgium"],
        answer: "Ivory Coast"
    }
];

// Load quiz questions
function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizQuestions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `<p>${q.question}</p>`;
        q.choices.forEach(choice => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="question${index}" value="${choice}">
                ${choice}
            `;
            questionElement.appendChild(label);
        });
        quizContainer.appendChild(questionElement);
    });

    document.getElementById("submit-quiz").addEventListener("click", checkQuiz);
}

// Check quiz answers
function checkQuiz() {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });
    document.getElementById("quiz-result").innerText = `You scored ${score} out of ${quizQuestions.length}`;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchJoke(); // Fetch a joke on page load

    document.getElementById("new-joke").addEventListener("click", fetchJoke); // Fetch a new joke on button click
});

// Fetch a random chocolate joke from JokeAPI
function fetchJoke() {
    fetch('https://official-joke-api.appspot.com/jokes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const jokeContainer = document.getElementById("joke");
            jokeContainer.textContent = data.setup + " " + data.punchline;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById("joke").textContent = "Failed to fetch a joke.";
        });
}


    

// Carousel functionality
let currentIndex = 0;

document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % chocolates.length;
    updateCarousel();
});

document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + chocolates.length) % chocolates.length;
    updateCarousel();
});

// Update carousel image
function updateCarousel() {
    const carouselImage = document.getElementById("carousel-image");
    carouselImage.src = chocolates[currentIndex].image;
    carouselImage.style.transform = 'scale(1.05)';
    setTimeout(() => carouselImage.style.transform = 'scale(1)', 300);
}