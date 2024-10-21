$(function () {
    const $window = $(window);
    const $header = $("header");
    const $menu = $(".language");
    const $submenu = $(".language-list");
    const duration = 300;

    // 헤더에 마우스 오버시 언어 메뉴 표시
    $menu.on("mouseenter", function () {
        $(this).addClass("on");
        $header.addClass("active");
        $submenu.stop().slideDown(duration);
    });

    $menu.on("mouseleave", function () {
        $(this).removeClass("on");
        $header.removeClass("active");
        $submenu.stop().slideUp(duration);
    });

    $window.on("wheel", function (e) {
        e.originalEvent.wheelDelta > 0 ? $header.removeClass("hide") : $header.addClass("hide");
    });
    // 헤더에 마우스 오버시 언어 메뉴 표시

    // 헤더가 비주얼을 벗어 나갈때
    const $visual = $(".visual"); // 비주얼 섹션 선택

    $window.on("scroll", function () {
        const visualBottom = $visual.offset().top + $visual.outerHeight();
        if ($window.scrollTop() > visualBottom) {
            $header.addClass("scrolled");
        } else {
            $header.removeClass("scrolled");
        }
    });

    $window.on("wheel", function (e) {
        e.originalEvent.wheelDelta > 0 ? $header.removeClass("hide") : $header.addClass("hide");
    });
    // 헤더가 비주얼을 벗어 나갈때

    // phone-con
    const swiper = new Swiper(".phone-con", {
        // Optional parameters
        initialSlide: 0,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 300,
        effect: "fade",
        allowTouchMove: false,
        on: {
            init: function () {
                updateCardText(this.realIndex);
            },
            slideChange: function () {
                updateCardText(this.realIndex);
            },
        },
    });

    // Intersection Observer 설정
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        },
        { threshold: 0.5 }
    ); // 50% 이상 보일 때 감지

    // Swiper 컨테이너 관찰 시작
    observer.observe(document.querySelector(".phone-con"));

    function updateCardText(index) {
        const cardTexts = document.querySelectorAll(".text-con");
        cardTexts.forEach((cardText, i) => {
            if (i === index) {
                cardText.classList.add("on");
            } else {
                cardText.classList.remove("on");
            }
        });
    }
    // phone-con end

    // safety-guide
    const SafetyGuide = new Swiper(".safety", {
        speed: 800,
        loop: true,
        slidesPerView: 4,
        slidesPerGroup: 1, // 한 번에 4개의 슬라이드를 그룹으로 이동
        spaceBetween: 146, // 간격 20px

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        },
    });
    // safety-guide end

    // youtube
    const $dim = $(".dim");
    const $videoWrap = $(".video-wrap");
    const $video = $videoWrap.find(".video iframe");
    const $caption = $(".caption");
    const $btnClose = $(".btn-close");

    const $videoItem = $(".video-list li");

    // 비디오 리스트를 선택 했을 때
    $videoItem.on("click", function () {
        let videoLink = $(this).attr("data-link");

        videoLink += "?autoplay=1";

        $video.attr("src", videoLink);

        const videoTitle = $(this).text();
        $caption.text(videoTitle);

        $dim.fadeIn();
        $videoWrap.addClass("active");

        console.log(videoLink);
    });

    // dim 영역 클릭 시 팝업 닫기
    $dim.on("click", function () {
        closeVideoPopup();
    });

    // 비디오 영역 클릭 시 이벤트 전파 중지
    $videoWrap.on("click", function (e) {
        e.stopPropagation();
    });

    $btnClose.on("click", function () {
        closeVideoPopup();
    });

    // 팝업 닫기 함수
    function closeVideoPopup() {
        $dim.fadeOut();
        $videoWrap.removeClass("active");
        $video.attr("src", "");
    }
    // youtube end

    AOS.init({
        duration: 500,
    });
});
