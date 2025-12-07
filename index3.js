import { openai, supabase } from './config.js'
const b_token = ""
async function text_to_embedding(input) {
    var embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: input
    });

    return embeddingResponse.data[0].embedding
}

function query() {
    const pc = JSON.parse(localStorage.getItem("person_choices"))
    const val = JSON.parse(localStorage.getItem("person_time"))

    let text = pc.map((e, index) => {
        let t1 = `Person ${index}\n`
        for (let key in e) {
            if (e[key] != "")
                t1 += `${key}: ${e[key]}\n`
        }
        return t1
    }).join('\n')

    text += `\n overall time they have ${val["time"]}`

    return text
}
async function findNearestMatch(embedding) {
    const { data } = await supabase.rpc('match_movies', {
        query_embedding: embedding,
        match_threshold: 0.0,
        match_count: 3
    });
    let final_data = data.map(e => e.content)
    return final_data
}
const fallbackMovie = {
    title: "Movie Not Found 😢",
    poster: "./pc-load-letter.gif",
    overview: "Sorry, We couldn't find details for this movie.Please try another one."
};

async function fetch_urls(queries) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${b_token}`
        }
    };
    
    let final_data = await Promise.all(queries.map(async (query) => {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
            const fd = await fetch(url, options);
            const data = await fd.json();
            
            
            if (!data.results || data.results.length === 0) {
                return fallbackMovie;
            }

            const movie = data.results[0];

            return {
                title: movie.title || fallbackMovie.title,
                poster: movie.poster_path 
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : fallbackMovie.poster,
                overview: movie.overview || fallbackMovie.overview
            }

        } catch (e) {
            console.error("TMDB fetch error:", e);
            return fallbackMovie; 
        }
    }));

    return final_data;
}

async function process_movie_lists(des) {
    des = des.join(',')
    const chatMessages = [{
        role: 'system',
        content: `Your task is to process arrays of movie search results and extract only the unique movie titles. 
    Each movie entry begins with a title followed by a colon, for example: "Oppenheimer: 2023 | R | 3h | 8.6 rating".

    Rules:
    - Only return the movie titles, nothing else.
    - Remove any dates, durations, ratings, or metadata.
    - If the same movie appears multiple times, output it only once.
    - Output should be a simple semicolon-separated list of titles with no extra explanation.
    - Preserve correct capitalization of the titles.`
    }];
    chatMessages.push({
        role: 'user',
        content: des
    });
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: chatMessages
    })
    let final_movies = response.choices[0].message.content
    final_movies = final_movies.replace(/\s+/g, '+')
    const arr = final_movies.split(";");
    final_movies = arr.map(s => s.replace(/^\+|\+$/g, ""));
    return final_movies
}
let mg = []
let si = 0
document.getElementById('finaln').addEventListener("click",()=>{
    const mn = document.getElementById("title")
    const img_url = document.getElementById("poster")
    const ov = document.getElementById("overview")
    mn.textContent = mg[si].title
    img_url.src = mg[si].poster
    ov.textContent = mg[si].overview
    si++
    if(mg.length==si)
    {
         document.getElementById('finaln').classList.add('disabled-button')
        document.getElementById('finaln').setAttribute('disabled',true)
    }
})
function button_process(answers){
    const mn = document.getElementById("title")
    const img_url = document.getElementById("poster")
    const ov = document.getElementById("overview")
    mg = answers
    document.getElementById('finaln').style.marginTop = "1px"
    mn.textContent = answers[si].title
    img_url.src = answers[si].poster
    ov.textContent = answers[si].overview
    si++
    if((mg.length>1)&&(mg[0].title!="Movie Not Found 😢"))
    {
        document.getElementById('finaln').classList.remove('disabled-button')
        document.getElementById('finaln').removeAttribute('disabled')
    }
}
async function main() {
    let text = query()
    const chatMessages = [{
        role: 'system',
        content: `Your task is to convert messy user movie preference data into a short, clean, embedding-friendly summary. 
        Do not add new information. 
        Do not recommend movies. 
        Do not analyze or interpret beyond simple rewriting. 
        Keep the output concise, factual, well-structured, and ideal for semantic embedding.
        Output plain text with clear sentences and bullet-like structure, no JSON.`
    }];
    chatMessages.push({
        role: 'user',
        content: `Rewrite the following group movie-preference description into a short, clean, embedding-ready summary. 
        Preserve all meaning but make it concise and easy for semantic search.
        Input:"${text}"
        Output only the cleaned summary.`
    });
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: chatMessages,
        temperature: 0, //for specificity
        frequency_penalty: 0.2 //repetations can't be neglected but can't be emphasized too much!
    })
    let processed_text = response.choices[0].message.content
    var embedded_query = await text_to_embedding(processed_text)
    let fin_mov = await findNearestMatch(embedded_query)
    fin_mov = await process_movie_lists(fin_mov)
    let urls = await fetch_urls(fin_mov)
    button_process(urls)
    mg = urls
}
main()
