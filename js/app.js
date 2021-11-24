let startbutton = document.getElementById("StartButton");
var add_more_fields = document.getElementById('add_more_fields');
var remove_fields = document.getElementById('remove_fields');

let colors = ["bg-danger","bg-info","bg-primary","bg-secondary","bg-success","bg-dark","bg-warning"];

startbutton.addEventListener("click", ()=>{
    startbutton.style.display = "none";
    add_more_fields.style.display = "none";
    remove_fields.style.display = "none";

    const barArea = document.querySelector(".help");
    barArea.innerHTML="";

    let barHTML = `<h1>Processor Simulation</h1> `;
    barArea.insertAdjacentHTML("beforeend",barHTML);


    let process = document.querySelectorAll(".arrival");
    let numProcess = process.length;
    let prev = 0;
    let total = 0;
    let index = 0;

    for(let x = 0; x<numProcess; x++){
        if(index > 7){
            index = 0;
        }
        prev = total;
        total += Number(process[x].value);
        addBars(index,x,prev,total,process);
        index++;
    }

    loading(-1,numProcess);
}); 

function addBars(index,x,prev,total,process){
    let start = document.getElementsByClassName("start");
    let end = document.getElementsByClassName("end");

    const barArea = document.querySelector(".help");
    let bars =` <div>
                    <div style="display:none; height: 30px;" class="inner`+x+` progress"> 
                    </div>
                    <div class="team`+x+`" style="margin-bottom: 30px;font-size: 11px">
                        <div style="display:none" class="start start-display`+x+`"></div>
                        <div style="display:none" class="end end-display`+x+`"></div>
                    </div>
                </div>`;
    barArea.insertAdjacentHTML("beforeend",bars);


    start[x].innerHTML = prev + " secs";
    end[x].innerHTML = total + " secs";

    const progressArea = document.querySelector(".inner"+x);
    let num = Number(x)+1;
    let progressHTML = `<div style="width: 100%;" class="bar`+x+` progress-bar progress-bar-animated progress-bar-striped `+colors[index]+`" role="progressbar">P`+num+` - `+process[x].value+` seconds</div>`;
    progressArea.insertAdjacentHTML("beforeend",progressHTML);
}

function loading(x,numProcess){
    var intervalId = setInterval(function(){
        window.scrollTo(0,document.body.scrollHeight);

        if(x>=numProcess){
            $("#StartButton").show();
            $("#add_more_fields").show();
            $("#remove_fields").show();
            clearInterval(intervalId);
        }
        $(function() {
            $(".bar"+x).each(function() {
                $(".inner"+x).show();
                $(".start-display"+x).show();
                $(".end-display"+x).show();
                var width = $(this).width();
                $(this)
                    .width(0)
                    .animate({
                        width: width
                    }, 2500,)
                    .width(width);
                
            });
        });
        x++;
    }, 2800);
}