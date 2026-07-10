const API_URL = "http://localhost:8080/api/jobs";

let form = document.getElementById("jobForm");
let jobList = document.getElementById("jobList");
let filter = document.getElementById("filterStatus");
let jobs = [];
let count = 1;

async function loadJobs(){
    let res = await fetch(API_URL);
    jobs = await res.json();
    displayJobs(jobs);
}

form.addEventListener("submit", async function(e){
    e.preventDefault();
    let company = document.getElementById("company").value;
    let role = document.getElementById("role").value;
    let status = document.getElementById("status").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({company, role, status})
    });

    form.reset();
    loadJobs();
});

function displayJobs(data){
    jobList.innerHTML="";
    count=1;
    data.forEach((job)=>{
        jobList.innerHTML += `
        <tr>
            <td>${count++}</td>
            <td>${job.company}</td>
            <td>${job.role}</td>
            <td>${job.status}</td>
            <td>
                <button class="delete-btn" onclick="deleteJob(${job.id})">Delete</button>
            </td>
        </tr>`;
    });
}

async function deleteJob(id){
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadJobs();
}

function filterJobs(){
    let value = filter.value;
    if(value==="all"){
        displayJobs(jobs);
    }else{
        let filtered = jobs.filter(j => j.status===value);
        displayJobs(filtered);
    }
}

function sortJobs(type){
    if(type==="az"){
        jobs.sort((a,b)=>a.company.localeCompare(b.company));
    }
    else if(type==="za"){
        jobs.sort((a,b)=>b.company.localeCompare(a.company));
    }
    displayJobs(jobs);
}

loadJobs();