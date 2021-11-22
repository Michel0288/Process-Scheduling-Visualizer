 $(document).ready(function(){
        var rows = document.querySelectorAll("#table_test tr");
        var lastRow = rows[rows.length - 1];
        var lastRowNum = parseInt(lastRow.children[0].textContent);
        console.log(lastRowNum)
        var newRow = document.createElement("tr");
        var startbutton = document.getElementById("StartButton");
        var progressbar = document.getElementById("Bar");

        $(".add-row").click(function(){
            newRow.innerHTML = "<tr><td>"+(lastRowNum+1)+"</td><td><input type='text' name='record'></td><td><input type='text' name='record'></td>";
            lastRow.insertAdjacentElement("afterend", newRow);

            // $("table tbody").append(markup);
        });

        // Find and remove selected table rows
        $(".delete-row").click(function(){
            $("table tbody").find('input[name="record"]').each(function(){
                if($(this).is(":checked")){
                    $(this).parents("tr").remove();
                }
            });
        });

       // Click event for the Start Button
        startbutton.onclick = function(){
            barmovement();
        };

        // This function is responsible for the movement of the progress bar.
        function barmovement(){
                var barwidth = 0;
                var interval = setInterval(progress, 80);
                
                function progress(){
                    if (barwidth >= 100){
                        clearInterval(interval);
                    }
                    else {
                        barwidth ++;
                        progressbar.style.width = barwidth + "%";
                        progressbar.style.backgroundColor = "rgb(70, 132, 248)"
                        progressbar.innerHTML = barwidth + "%";
                    }
                }
        }
    });    