const PIRATE_CAT_IDLE = 'images/pirate_cat_idle_big.gif'
const CAT_IDLE = 'images/normal_cat_idle_big.gif'

// Swap back to idle cat gifs, should be activated when Audio finishes
export function stopLeftCat() {
    document.getElementById('leftCat').src = CAT_IDLE;
}

export function stopRightCat() {
    document.getElementById('rightCat').src = PIRATE_CAT_IDLE;
}