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
            <td>
                <select onchange="updateStatus(${job.id}, this.value)">
                    <option ${job.status==="Applied"?"selected":""}>Applied</option>
                    <option ${job.status==="Interview"?"selected":""}>Interview</option>
                    <option ${job.status==="Rejected"?"selected":""}>Rejected</option>
                    <option ${job.status==="Offer"?"selected":""}>Offer</option>
                </select>
            </td>
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
async function updateStatus(id, newStatus){
    let job = jobs.find(j => j.id === id);
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({company: job.company, role: job.role, status: newStatus})
    });
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