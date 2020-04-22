function $g(selector){
    //判斷是否為id selector
    if(selector.includes('#') && !selector.includes(' ')){
        //回傳Element
        return document.querySelector(selector);
    }
 
    //回傳NodeList集合
    let nodelist = document.querySelector(selector);
    return nodelist; 
}
function $c(selector){
    return document.createElement(selector);
}