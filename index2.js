let person_choices = []
let ok2 = JSON.parse(localStorage.getItem("person_time"))
console.log(ok2)
let num = ok2["number of persons"]
console.log(num)
let cp = 1
document.querySelector("h1").textContent = cp
const favorite_movie = document.getElementById("reason")
const famous = document.getElementById("famous")
let movie_type = {
    "new":false,
    "classic":false
}
let mood = {
    "fun":false,
    "serious":false,
    "inspiring":false,
    "scary":false
}
document.addEventListener("click",e=>{
    e.preventDefault()
    let moods = e.target.dataset.mood
    if(moods)
    {
        if(moods in movie_type)
        {
            movie_type[moods]^=1;
        }
        else
        {
            mood[moods]^=1;
        }
        document.getElementById(moods).classList.toggle("activated")
    }
})
const button = document.getElementById("next")
button.addEventListener("click",()=>
{
    let ftv = favorite_movie.value
    let ano = famous.value
    
    let m_type = ""
    let m = ""
     for (let key in mood) {
        if(mood[key])
        m+=key+" "
         mood[key]=false
          document.getElementById(key).classList.remove("activated")
        }
    for(let key in movie_type)
    {
        if(movie_type[key])
        m_type+=key+" "
        movie_type[key]= false
        document.getElementById(key).classList.remove("activated")
    }
    if((ftv!="")&&(ano!=""))
    {
        person_choices.push({
            "-favorite movie ":ftv,
            "-movie type preferences":m_type,
            "-mood preferences ":m,
            "-favorite actor":ano}
        )
        cp++
        if(cp<=num)
        {
            document.querySelector("form").reset()
            document.querySelector("h1").textContent = cp
        }
        
        if(cp==num)
        {
            button.textContent = "Get Movie" 
            
        }
        if(cp>num)
        {
            
            localStorage.setItem("person_choices",JSON.stringify(person_choices))
            window.location.href = "./final.html"
        }
    }
})
