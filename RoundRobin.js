$(document).ready(function(){
    var startbutton = document.getElementById("StartButton");
    var addbutton = document.getElementById("AddButton")
    console.log(addbutton);
    var queue = document.getElementById("Queue");
    var num = 0;
    var tablebody = document.getElementById("TableBody");
    processes = []
    var processtime = 3;
    var n = 0;
    var bursttime = 0;


    addbutton.onclick = function(){
        var arrival = document.getElementById("Arrival").value;
        var burst = document.getElementById("Burst").value;
        num += 1
        tablebody.innerHTML += "<tr id=Process "+ num +"><td>"+num+"</td><td>"+arrival+"</td><td id=UpdateBurst"+ num +">"+burst+"</td><td id=Status"+ num +">Waiting</td>";
        processes.push([num, arrival, burst]);
        console.log(processes);
        MakeProcess(arrival, burst);

    }

    startbutton.onclick = function(){
        evalProcesses();

    };

    function MakeProcess(arrival, burst){
        n++;
        var newprocess = document.createElement("div");
        newprocess.style.width = 80 + "px";
        newprocess.style.height = 80 + "px";
        newprocess.style.borderRadius = 100 + "%";
        newprocess.style.backgroundColor = "pink"
        newprocess.style.padding = 20 + "px";
        newprocess.style.margin = 10 + "px";
        newprocess.style.fontSize = 12 + "px";
        newprocess.style.textAlign = "center";
        newprocess.style.display = "inline-block"
        newprocess.innerHTML = "Process" + n;
        newprocess.id = "Process" + n;
        newprocess.className = "Process" + n;
        queue.appendChild(newprocess);

    }

    const evalProcesses = async() => {
        i = 0
        val=processes.sort(function(a,b) {
            return a[1]-b[1]
        });
        console.log(val);

        while (val.length != 0) {
                topprocess = val[i][0];
                bursttime = val[i][2];
                jQuery("#Process"+topprocess).appendTo("#Moveto");
                await sleep(processtime * 1000);
               
                if (bursttime>processtime){
                    console.log("Here");
                    bursttime = bursttime - processtime;
                    val[i][2] = bursttime;
                    console.log(val[i][2]);
                    jQuery("#Process"+topprocess).appendTo("#Queue");
                    jQuery("#UpdateBurst"+topprocess).html("" + bursttime);
                    jQuery("#Status"+topprocess).html("Paused");
                    await sleep(2000);
                    element = processes.shift();
                    processes.push(element);
                    console.log(processes);
                }
                else{
                    removeprocess(topprocess);
                    await sleep(2000);
                    processes.shift();
                    console.log("Here now");
                    console.log(processes)

                }
                           
           }       
    }

    function removeprocess(process){

        jQuery("#Process"+process).remove();
        updatestate(process);
    }

    function updatestate(process){
        jQuery("#Status"+process).html("Terminated");

    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve,milliseconds))
    }
});