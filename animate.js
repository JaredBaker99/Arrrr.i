const CAT_TALKING = 'images/normal_cat_talk_big.gif'
const PIRATE_CAT_TALKING = 'images/pirate_cat_talk_big.gif'


// Swap idle gif with talking gif
function animatedLeftCat() {
    document.getElementById('leftCat').src = CAT_TALKING;
}

function animatedRightCat() {
    document.getElementById('rightCat').src = PIRATE_CAT_TALKING;
}
