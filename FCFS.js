 $(document).ready(function(){
        var startbutton = document.getElementById("StartButton");
        var progressbar = document.getElementById("Bar");
        var addbutton = document.getElementById("AddButton")
        var queue = document.getElementById("Queue");
        var num = 0;
        var tablebody = document.getElementById("TableBody");
        processes = []
        var n = 0;


        /* Click event for Add Button
           This function creates a process object when the add button is clicked 
           based on user input. It also adds that object to an array*/
        addbutton.onclick = function(){
            
            var arrival = document.getElementById("Arrival").value;
            var burst = document.getElementById("Burst").value;
            num += 1
            tablebody.innerHTML += "<tr id=Process "+ num +"><td>"+num+"</td><td>"+arrival+"</td><td>"+burst+"</td><td id=Status"+ num +">Waiting</td>";
            processes.push([num, arrival, burst]);
            MakeProcess(arrival, burst);
           
        }

        // Click event for the Start Button
        startbutton.onclick = function(){
            evalProcesses();

        };

        // This function is used to create and design a Process object
        function MakeProcess(arrival, burst){
            n++;
            var newprocess = document.createElement("div");
            newprocess.innerHTML = "Process" + n;
            newprocess.id = "Process" + n;
            newprocess.className = "Process";
            queue.appendChild(newprocess);

        }

        //This function eveluates each process
        const evalProcesses = async() => {

            val=processes.sort(function(a,b) {
                return a[1]-b[1];
            });

            for (let i = 0; i < val.length; i++) {

                    topprocess = val[i][0];
                    bursttime = val[i][2];
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

            jQuery("#Status"+process).html("Terminated");

        }

        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve,milliseconds));

        }
    });    