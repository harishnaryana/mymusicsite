var checkOptions = {
    id: "",
    checkedGlyph: "glyphicon-ok-circle",
    uncheckedGlyph: "glyphicon-unchecked",
    checkedBtnClass: "btn-success",
    uncheckedBtnClass: "btn-primary",
    checkedText: "Selected",
    uncheckedText: " Not Selected"
};

var totalOptions = {
    id: "#total",
    priceClass: ".price",
    priceContainerClass: ".panel"
}

$(document).ready(function(){
    $("[type='checkbox']").on('change',function(){
        if($(this).prop('checked')){
            setChecked($(this));

        }
        else
        {
            setUnChecked($(this));
        }
        caluclateTotal($(this));

    });

    var checked=$(checkOptions.id + " .btn-group input:checked");
    for (var i=0; i < checked.length; i++) {
        setChecked($(checked[i]));
        caluclateTotal($(checked[i]));
    }


});

function setChecked(ctl)
{
    $(ctl).prev()
        .removeClass(checkOptions.uncheckedGlyph)
        .addClass(checkOptions.checkedGlyph);
    $(ctl).parent()
        .removeClass(checkOptions.uncheckedBtnClass)
        .addClass(checkOptions.checkedBtnClass);
    $(ctl).next().text(checkOptions.checkedText);
}

function setUnChecked(ctl)
{
    $(ctl).prev()
        .removeClass(checkOptions.checkedGlyph)
        .addClass(checkOptions.uncheckedGlyph);
    $(ctl).parent()
        .removeClass(checkOptions.checkedBtnClass)
        .addClass(checkOptions.uncheckedBtnClass);
    $(ctl).next().text(checkOptions.uncheckedText);
}


function caluclateTotal(ctl)
{
    var total = $(totalOptions.id).text();
    total = stripCurrency(total);
    var price = $(ctl)
        .closest(totalOptions.priceContainerClass)
        .find(totalOptions.priceClass).text();
    price = stripCurrency(price);

    if($(ctl).prop("checked")) {
        total = parseFloat(total) + parseFloat(price);

    }
    else{
        total = parseFloat(total) - parseFloat(price);
    }
    $(totalOptions.id).text(formatCurrency(total));
}

