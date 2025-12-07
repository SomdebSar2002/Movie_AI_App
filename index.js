localStorage.clear();
const time = document.getElementById("th")
const num_persons = document.getElementById("mp")
document.getElementById("start").addEventListener("click" , e=>{
    e.preventDefault()
    localStorage.setItem("person_time",JSON.stringify({
        "number of persons":num_persons.value,
        "time":time.value
    }))
    window.location.href="person.html"
})