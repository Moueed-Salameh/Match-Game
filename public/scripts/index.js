$(".button").on("click", clickButton);

let numSelected = 0;
let btnSelected = [];

function clickButton (event) {
    $(".button.wrong").removeClass("wrong");
    $(event.target).toggleClass("selected");

    if ($(".selected").length === 2) {
        if (checkAnswer()) {
            $(".button.selected").addClass("hide");
        } else {
            $(".button.selected").addClass("wrong");
        }
        $(".button.selected").removeClass("selected");
    }
}

function checkAnswer() {
    // ADD SCORE AND WIN STREAK?
    selection1 = $(".selected")[0].classList[1];
    selection2 = $(".selected")[1].classList[1];

    if (dataDict[selection1] === selection2 || dataDict[selection2] === selection1) {
        return true;
    }
    return false;
}
