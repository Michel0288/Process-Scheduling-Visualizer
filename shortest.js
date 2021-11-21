 $(document).ready(function(){
        var rows = document.querySelectorAll("#table_test tr");
        var lastRow = rows[rows.length - 1];
        var lastRowNum = parseInt(lastRow.children[0].textContent);
        console.log(lastRowNum)
        var newRow = document.createElement("tr");

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
    });    