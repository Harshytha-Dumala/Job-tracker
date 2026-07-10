let form = document.getElementById("jobForm");
let jobList = document.getElementById("jobList");
let filter = document.getElementById("filterStatus");

let jobs = [];
let count = 1;

form.addEventListener("submit", function(e){
    e.preventDefault();

    let company = document.getElementById("company").value;
    let role = document.getElementById("role").value;
    let status = document.getElementById("status").value;

    jobs.push({company, role, status});
    displayJobs(jobs);
    form.reset();
});

function displayJobs(data){
    jobList.innerHTML="";
    count=1;

    data.forEach((job,index)=>{
        jobList.innerHTML += `
        <tr>
            <td>${count++}</td>
            <td>${job.company}</td>
            <td>${job.role}</td>
            <td>${job.status}</td>
            <td>
                <button class="delete-btn" onclick="deleteJob(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function deleteJob(i){
    jobs.splice(i,1);
    displayJobs(jobs);
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
