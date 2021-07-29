
/* home page*/
//btn-btt
$(document).ready(function () {
    /**hidden header */
    let header = $('.header'),
        navSecondary = "";
    // headerHeight = header.height();
    let scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;
    $(window).on('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame)
                ? setTimeout(autoHideHeader, 250)
                : requestAnimationFrame(autoHideHeader);
        }
    });
    function autoHideHeader() {
        let currentTop = $(window).scrollTop();
        (navSecondary.length > 0)
            ? checkStickyNavigation(currentTop) // secondary navigation below intro
            : checkSimpleNavigation(currentTop);

        previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
        //there's no secondary nav or secondary nav is below primary nav
        if (previousTop - currentTop > scrollDelta) {
            //if scrolling up...
            header.removeClass('is-hidden');
        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            //if scrolling down...
            header.addClass('is-hidden');
        }
    }

    /**back to top */
    $('.ftBottom img').on('click', function () {
        window.scrollTo({
            top: 0
        });
    });
    /**nav */

    let nav = $('.nav');
    let btnMenu = $('header .top .btnMenu')
    btnMenu.on('click', function (e) {
        e.stopPropagation();
        nav.toggleClass('active');
    });
    $(document).on('click', function () {
        $('.nav').removeClass('active');
    });
    /**************project tag**************/
    $('.menuTag .tag li').on('click', function () {
        $('.menuTag .tag li').removeClass('active');
        $(this).addClass('active');
        let tag_id = $(this).data('id')
        console.log(tag_id);
        if (tag_id == "all") {
            console.log("ALL");
            dependHtmlForProject(projects)
        }
        else {
            let result = projects.filter((item) => (item.type == tag_id))
            dependHtmlForProject(result)
        }
    });
    let projects = [
        {
            id: 1,
            imgSrc: "img/project/project-01.jpg",
            title: "Project 01",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "img"
        },
        {
            id: 2,
            imgSrc: "img/project/project-02.jpg",
            title: "Project 02",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "img"
        },
        {
            id: 3,
            imgSrc: "img/project/project-03.jpg",
            title: "Project 03",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "img"
        },
        {
            id: 4,
            imgSrc: "img/project/project-04.jpg",
            title: "Project 04",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "img"
        },
        {
            id: 5,
            imgSrc: "img/project/project-05.jpg",
            title: "Project 05",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "film"
        },
        {
            id: 6,
            imgSrc: "img/project/project-06.jpg",
            title: "Project 06",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "film"
        },
        {
            id: 7,
            imgSrc: "img/project/project-07.jpg",
            title: "Project 07",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "film"
        },
        {
            id: 8,
            imgSrc: "img/project/project-08.jpg",
            title: "Project 08",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "img"
        },
        {
            id: 9,
            imgSrc: "img/project/project-09.jpg",
            title: "Project 09",
            des: "<p>Clients : Cif</p><p>photographer : <i>Eric huynh</i> </p>",
            type: "film"
        },
    ]
    function dependHtmlForProject(array) {
        let projects_item = ""
        array.forEach(function (item) {
            projects_item += ` 
            <div class="project__item" data-id="${item.type}">
                <div class="project__item-img">
                    <a href="/detail.html">
                        <img src="${item.imgSrc}" alt="">
                    </a>
                </div>
                <div class="project__item-text textbox">
                    <h2 class="title">${item.title}</h2>
                    <div class="des">
                        ${item.des}
                    </div>
                </div>
            </div>`
        });
        $(".projects .project").html(projects_item);
    }

    $(window).on('load', function () {
        dependHtmlForProject(projects);
    })
    /*****end project tag** */
    /**************************rental******************** */
    $('.formRental .choice li').on('click change', function (index) {
        $('.formRental .choice li').removeClass('active');
        $(this).addClass('active');
        let indexItem = $(this).index() + 1;
        let nemberRental = $('.rental .rental__title .square .number');
        nemberRental.text(indexItem.toString().padStart(2, 0));
    });

});

/**form contact */
$(document).on('click', '.btn-contact', function (e) {
    e.preventDefault();
    let name = $("input[name='name']").val();
    let phone = $("input[name='phone']").val();
    let email = $("input[name='email']").val();
    let content = $("textarea[name='content']").val();

    let ferrors = {
        name: [],
        phone: [],
        email: []
    };
    if (name == '') {
        ferrors.name.push('errors')
    };
    if (phone == '') {
        ferrors.phone.push('errors')
    } else {
        if (phone.length < 10 || phone.length > 11) {
            ferrors.phone.push('errors')
        }
    };
    if (email == '') {
        ferrors.email.push('errors')
    } else {
        if (IsEmail(email) == false) {
            ferrors.email.push('errors')
        };
    };
    console.log(ferrors)
    let success = true;
    for (let index in ferrors) {
        $(`input[name=${index}]`).parent().find(".errors").remove();
        if (ferrors[index].length > 0) {

            success = false;
            let htmlErrors = `<div class="errors">${ferrors[index][0]}<div>`;
            $(`input[name=${index}]`).parent().append(htmlErrors)
        }
    }
    function IsEmail(email) {
        var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(email)) {
            return false;
        } else {
            return true;
        }
    };

})
/**form rental */
$(document).on('click', '#btnRental', function () {
    // e.preventDefault();
    let nameCompanny = $("input[name='name-company']").val();
    let nameContact = $("input[name='name-contact']").val();
    let phoneRental = $("input[name='frphone']").val();
    let emailRental = $("input[name='frmail']").val();
    let accRental = $("input[name='fracc']").val();
    let addressCompany = $("textarea[name='address']").val();
    let requirements = $("textarea[name='requirements']").val();
    let date = $("input[name='date']").val();
    let projectReference = $("input[name='project-reference']").val();
    let question = $("input[name='question']").val();
    let ferrorsRental = {
        nameCompanny: [],
        nameContact: [],
        phoneRental: [],
        emailRental: [],
        accRental: [],
        addressCompany: [],
        requirements: [],
        date: [],
        projectReference: [],
        question: []
    };
    if (nameCompanny == '') {
        ferrorsRental.nameCompanny.push('errors')
    };
    if (nameContact == '') {
        ferrorsRental.nameContact.push('errors')
    };
    if (emailRental == '') {
        ferrorsRental.emailRental.push('errors')
    } else {
        if (IsEmailRental(emailRental) == false) {
            ferrorsRental.emailRental.push('errors')
        };
    };
    let successRental = true;
    for (let index in ferrorsRental) {
        $(`input[name=${index}]`).parent().find(".errors").remove();
        if (ferrorsRental[index].length > 0) {
            successRental = false;
            let htmlErrorsRental = `<p class="errors">${ferrorsRental[index][0]}<p>`;
            $(`input[name=${index}]`).append(htmlErrorsRental)
            console.log(htmlErrorsRental);
        }
    }
    function IsEmailRental(emailRental) {
        var regexemailRental = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexemailRental.test(emailRental)) {
            return false;
        } else {
            return true;
        }
    };



})
// $('.svg').svgToInline()
/***************flickity slider************* */
let $carousel = $('.slider');
$carousel.flickity({
    cellAlign: 'left',
    contains: true,
    prevNextButtons: false,
    pageDots: false,
    // freeScroll: true,
    wrapAround: true,
    autoPlay: undefined,
    fullscreen: true,
    lazyLoad: 1,
    on: {
        //     ready: function () {
        //         let dots = $('.flickity-page-dots');
        //         let paging = ('.slider__ctrl-paging .dot');
        //         dots.appendTo(paging);
        //     },
        change: function (index) {
            // console.log(index)
            let number = $('.detail__bottom .square .number');
            let indexPage = index + 1;
            number.text(indexPage.toString().padStart(2, 0));

        },

    }
});
$('.btnSlider .btnSlider__prev').on('click', function () {
    $carousel.flickity('previous');
});
$('.btnSlider .btnSlider__next').on('click', function () {
    $carousel.flickity('next');
});
$('.btnfs').on('click', function () {
    $carousel.flickity('viewFullscreen');
});

/*****************end flickity slider****************** */
/*******************DOM js for thumnail slide photoswipe**********************/
var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};
$(window).on('load', function () {
    initPhotoSwipeFromDOM('.gallery__grid');
});
// $(".svg").svgToInline();


$(".formRental__booking-middle label img").on("click", () => {
    $(this).prev().focus();
})

/*******************end*************************/









