import "./styles.css";
import $ from "jquery";
import image from './assets/imgs/placeholder.png';

$.when($.ready).then(() => {
    console.log("document ready");
    $('#root').append(`<img src=${image}/>`);
})
