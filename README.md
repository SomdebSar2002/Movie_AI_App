# 🎬 Movie AI App

**Personalized Movie Recommendations Powered by AI + Vector Search**

This project is an intelligent movie recommendation system that uses:

- **OpenAI (GPT + Embeddings)**
- **Supabase Vector Database**
- **TMDB API**
- **Custom user preference collection UI**
- **Dynamic movie poster & overview display**

Users answer a short set of questions, and the system:

1. Cleans & summarizes preferences using GPT  
2. Generates embeddings  
3. Searches a movie database using vector similarity  
4. Extracts unique movie titles  
5. Fetches poster + overview from TMDB  
6. Displays recommended movies with a sleek UI  

---

## 🚀 Features

### 🧠 AI-Powered Understanding
- GPT rewrites messy human inputs into clean semantic data.  
- Embeddings improve accuracy for user mood & movie-type matching.

### 📚 Vector Search (Supabase)
- Finds movies based on *semantic similarity*, not keywords.  
- Allows multiple users’ moods & preferences to be combined.

### 🎨 Movie Details Fetching
- Automatically fetches posters, descriptions, and metadata from TMDB.  
- Falls back to a default poster if information is missing.

### 👥 Multi-Person Support
- Each user’s preferences contribute to the final recommendation.  
- Designed for groups picking a movie together.

### 🎞 Smooth Recommendation UI
- Shows top recommendations with posters.  
- “Next Movie” button cycles through all suggestions.  
- Auto-disables button when no more results.

---

## 🛠 Tech Stack

### **Frontend**
- HTML  
- CSS  
- JavaScript  
- Interactive forms + dynamic DOM updates  

### **Backend / APIs**
- **OpenAI GPT Models** (text cleaning)
- **OpenAI Embeddings** (semantic search)
- **Supabase Postgres + Vector Index**
- **TMDB API** (movie posters & metadata)

---

## 📂 Project Structure

project/
│── index.html
│── final.html
│── styles.css
│── script.js
│── config.js
│── README.md
└── /assets

yaml
Copy code

---

## ⚙️ How It Works (Simplified Flow)

1. Users answer 4 short movie-preference questions.  
2. Responses are stored and converted into a structured text summary.  
3. GPT cleans and compresses the text into an embedding-friendly format.  
4. OpenAI’s `text-embedding-3-small` generates embeddings.  
5. Supabase vector search returns the top 3 closest matching movies.  
6. GPT extracts unique movie titles from the results.  
7. Titles are cleaned and URL-encoded.  
8. TMDB API returns posters + overviews.  
9. The frontend displays the final movie recommendations.

---

## 🔑 Environment Variables

Create a `.env` file or configure inside `config.js`:

SUPABASE_URL=...
SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
TMDB_BEARER_TOKEN=...

yaml
Copy code

---

## ▶️ Running the Project Locally

1. Clone the repo  
2. Install dependencies (if using a bundler)  
3. Add API keys  
4. Open `index.html` in your browser  
5. Enter movie preferences & enjoy AI-powered recommendations!

---

## 🧪 Example Output (UI)

- Movie title  
- Full-size poster  
- Movie overview  
- “Next Movie” button to switch between top recommendations  

---

## 🛡 Error Handling

- Missing TMDB data → fallback image + overview  
- Empty vector search → fallback default movie  
- Errors in `.map()` → handled safely  
- App avoids crashes through robust error-handling  

---

## 📝 Future Improvements

- Add genre filters  
- Add streaming platform availability  
- Rank movies based on group mood blends  
- Save recommendation history  
- Deploy frontend on Netlify / Vercel  

---

## 💡 Inspiration

Built as a fun project to combine **AI**, **vector databases**, and **movie discovery** into a single smooth interactive experience.

---

## 🙌 Author

Made with ❤️ by **Somdeb Sar**
