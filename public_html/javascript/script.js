/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var totalWidth = 0;
    var positions = new Array();

    $('#slides .slide').each(function (i) {
        //here we iterate through each slide to have its width and save it in a array at the corresponding position
        positions[i] = totalWidth;
        totalWidth += $(this).width();
        if (!$(this).width())
        {
            alert("please add a width to this slide");
            return false;
        }

    });
    $('#slides').width(totalWidth);//we put the width of div slides as the total of all slide's width 
    // menu item click handler
    $('#menu ul li a').click(function (e) {
        //add inactive class on all li.product 
        $('li.product').removeClass('active').addClass('inactive');
        //add active class to parent li
        $(this).parent().addClass('active');// the clicked li.product we add active so class='product inactive active'

        var pos = $(this).parent().prevAll('.product').length;//count all the previous siblings li.product of clicked element and return the total
        $('#slides').stop().animate({marginLeft: -positions[pos] + 'px'}, 500);// we use the position of clicked slide to assign a marginLeft to div#slides

        //prevent default
        e.preventDefault();
        //Stop autoscroll
        if (!autoScroll)
            clearInterval(itvl);
    });

    //  make first image active
    $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');

    //autoscroll
    var current = 1;
    function autoScroll()
    {
        if (current === -1)
            return false;// stop the sutoscrolling if the element is found at the index -2
        //the auto trigger will be applied to any ( object #menu ul li a) which will be found to 
        //at the index retune from computing current % $('#menu ul li a').length).$('#menu ul li a').length return the total
        // of element which follow the property #menu ul li a. eq() constructs an object.
        //the trigger will be auto fired on an object at specify index in eq(index).
        $('#menu ul li a').eq(current % $('#menu ul li a').length).trigger('click', [true]);
        current++;
    }

    // duration for autoscroll
    var duration = 10000;
    // this setInterval function allows the autoscrolling every 10s;
    var itvl = setInterval(function () {
        autoScroll();
    }, duration);
});
