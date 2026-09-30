let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){
let input=document.getElementById("taskInput");

if(input.value.trim()=="") return;

tasks.push({
id:Date.now(),
text:input.value,
priority:document.getElementById("priority").value,
done:false
});

input.value="";
save();
display();
}

function toggle(id){
tasks.forEach(t=>{
if(t.id===id) t.done=!t.done;
});
save();
display();
}

function removeTask(id){
tasks=tasks.filter(t=>t.id!==id);
save();
display();
}

function display(){
let list=document.getElementById("taskList");
list.innerHTML="";

tasks.forEach(t=>{
let li=document.createElement("li");
li.innerHTML=`
<span class="${t.done?'done':''}" onclick="toggle(${t.id})">
${t.text} (${t.priority})
</span>
<button class="delete" onclick="removeTask(${t.id})">Delete</button>`;
list.appendChild(li);
});

document.getElementById("total").innerText=tasks.length;
document.getElementById("completed").innerText=tasks.filter(t=>t.done).length;
document.getElementById("pending").innerText=tasks.filter(t=>!t.done).length;
}

display();
