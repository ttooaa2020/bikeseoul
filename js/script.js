$(function () {
    const $window = $(window);
    const $header = $("header");
    const $menu = $(".language");
    const $submenu = $(".language-list");
    const duration = 300;

    AOS.init({
        duration: 500,
        offset: 120, // 기본값은 120
    });

    // 헤더에 마우스 오버시 언어 메뉴 표시------------------------------------------------------------
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
    // 헤더에 마우스 오버시 언어 메뉴 표시----------------------------------------------------------------

    // 헤더, 탑버튼이 비주얼을 벗어 나갈때----------------------------------------------------------
    const $visual = $(".visual");
    const $topBtn = $(".top-btn");

    $window.on("scroll", function () {
        const visualBottom = $visual.offset().top + $visual.outerHeight();
        const scrollTop = $window.scrollTop();

        if (scrollTop > visualBottom) {
            $header.addClass("scrolled");
        } else {
            $header.removeClass("scrolled");
        }
    });
    // 탑 버튼 클릭 이벤트
    $topBtn.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 100);
    });
    // 헤더, 탑버튼이 비주얼을 벗어 나갈때------------------------------------------------------------

    // phone-con------------------------------------------------------------
    const swiperContainer = document.querySelector(".phone-con");
    // 스와이퍼
    if (swiperContainer) {
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
        // 스와이퍼 end

        // Intersection Observer 설정 (보일때 작동)
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

        // Swiper 컨테이너 관찰 시작 (폰과 텍스트 연동)
        observer.observe(swiperContainer);
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

        // 페이지 로드 시 첫 번째 요소 활성화
        document.addEventListener("DOMContentLoaded", () => {
            updateCardText(0);
        });
    }
    // phone-con end------------------------------------------------------------

    // safety-guide------------------------------------------------------------
    const SafetyGuide = new Swiper(".safety", {
        speed: 500,
        loop: true,
        slidesPerView: 4,
        slidesPerGroup: 1, // 한 번에 n개의 슬라이드를 그룹으로 이동
        spaceBetween: 146, // 간격

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
    // safety-guide end------------------------------------------------------------

    // youtube------------------------------------------------------------
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

    // 닫기 버튼을 클릭 했을때
    $btnClose.on("click", function () {
        $dim.fadeOut();
        $videoWrap.removeClass("active");

        // 동영상 주소 삭제 (소리 삭제)
        $video.attr("src", "");
    });

    // youtube end------------------------------------------------------------

    // 이용 방법------------------------------------------------------------
    // lcd
    $(function () {
        const $lendListLcd = $(".lend-list-lcd");

        $lendListLcd.on("mouseenter", "li", function () {
            const $hoveredItem = $(this);
            const $allItems = $lendListLcd.find("li");

            // 모든 li에서 'on' 클래스 제거
            $allItems.removeClass("on");

            // 마우스가 올라간 li에 'on' 클래스 추가
            $hoveredItem.addClass("on");
        });

        $lendListLcd.on("mouseleave", function () {
            // 마우스가 영역을 벗어나면 모든 li에서 'on' 클래스 제거
            $lendListLcd.find("li").removeClass("on");
        });
    });
    // lcd end

    // qr
    $(function () {
        const $lendListQr = $(".lend-list-qr");

        $lendListQr.on("mouseenter", "li", function () {
            const $hoveredItem = $(this);
            const $allItems = $lendListQr.find("li");

            // 모든 li에서 'on' 클래스 제거
            $allItems.removeClass("on");

            // 마우스가 올라간 li에 'on' 클래스 추가
            $hoveredItem.addClass("on");
        });

        $lendListQr.on("mouseleave", function () {
            // 마우스가 영역을 벗어나면 모든 li에서 'on' 클래스 제거
            $lendListQr.find("li").removeClass("on");
        });
    });
    // qr end

    const $tabMenu = $(".lend-tabmenu > button");
    const $tabCon = $(".lend-tabcon-item");

    tabAction(0);

    // 탭메뉴를 클릭 했을때
    $tabMenu.on("click", function (e) {
        // a의 기본 동작막기
        e.preventDefault();

        // 선택한 탭메뉴의 인덱스 구하기
        const tabIdx = $(this).index();
        console.log(tabIdx);

        tabAction(tabIdx);
    });

    // 공통의 동작을 함수로 정의
    function tabAction(index) {
        // 탭메뉴 활성화
        $tabMenu.removeClass("on");
        $tabMenu.eq(index).addClass("on");

        // 인덱스에 해당하는 $tabCon 보이기
        $tabCon.hide();
        $tabCon.eq(index).show();
    }
    // 이용 방법 end------------------------------------------------------------

    // question------------------------------------------------------------
    const $question = $(".question-list > li");
    const $answer = $(".answer-wrap");
    const $questionList = $(".question-list");

    // 초기 상태 설정
    $answer.hide();

    // 질문을 클릭했을 때
    $question.on("click", function (e) {
        e.stopPropagation(); // 이벤트 버블링 방지
        // 선택한 항목을 제외한 다른 항목들의 on 클래스 제거 및 답변 숨기기
        $(this).siblings().removeClass("on").find($answer).stop().slideUp(duration);

        // 선택한 항목의 on 클래스 토글 및 답변 토글
        $(this).toggleClass("on");
        $(this).find($answer).stop().slideToggle(duration);
    });

    // 문서 전체에 클릭 이벤트 추가
    $(document).on("click", function (e) {
        // 클릭된 요소가 질문 리스트 내부가 아닐 경우
        if (!$(e.target).closest($questionList).length) {
            $question.removeClass("on");
            $answer.stop().slideUp(duration);
        }
    });

    // question end------------------------------------------------------------
});
