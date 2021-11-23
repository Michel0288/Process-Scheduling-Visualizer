$(document).ready(function(){
    var startbutton = document.getElementById("StartButton");
    var addbutton = document.getElementById("AddButton")
    console.log(addbutton);
    var queue = document.getElementById("Queue");
    var num = 0;
    var tablebody = document.getElementById("TableBody");
    processes = []
    var n = 0;


    addbutton.onclick = function(){
        console.log("I work");
        
        var arrival = document.getElementById("Arrival").value;
        var burst = document.getElementById("Burst").value;
        num += 1
        tablebody.innerHTML += "<tr id=Process "+ num +"><td>"+num+"</td><td>"+arrival+"</td><td>"+burst+"</td><td id=Status"+ num +">Waiting</td>";
        processes.push([num, arrival, burst]);
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
        val=processes.sort(function(a,b) {
            return a[2]-b[2]
        });
        console.log(val);

        for (let i = 0; i < val.length; i++) {

                topprocess = val[i][0];
                bursttime = val[i][2]
                jQuery("#Process"+topprocess).appendTo("#Moveto");
                await sleep(bursttime * 1000);
                removeprocess(topprocess);
                await sleep(2000);
                           
           }       
    }

    function removeprocess(process){

        jQuery("#Process"+process).remove();
        updatestate(process);
    }

    function updatestate(process){
        jQuery("#Status"+process).html("Terminate");

    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve,milliseconds))
    }
});
