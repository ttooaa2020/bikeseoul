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
        $("html, body").animate({ scrollTop: 0 }, 100, function () {
            $header.removeClass("hide"); //탑버튼 누를시 헤더가 나옴
        });
    });

    // 키보드에 홈 버튼을 눌렀을때도 헤더가 내려옴
    $(document).on("keydown", function (e) {
        if (e.key === "Home") {
            // Home 키가 눌렸을 때
            $("html, body").animate({ scrollTop: 0 }, 100, function () {
                $header.removeClass("hide"); // 헤더를 보이게 함
            });
        }
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
            // Pagination 추가
            pagination: {
                el: ".phone-pagination",
                clickable: true,
            },
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
    if (swiperContainer) {
        const SafetyGuide = new Swiper(".safety", {
            speed: 500,
            loop: true,
            slidesPerGroup: 1, // 한 번에 n개의 슬라이드를 그룹으로 이동

            breakpoints: {
                100: {
                    slidesPerView: 1,
                },

                901: {
                    slidesPerView: 3,
                    spaceBetween: 76,
                },

                1501: {
                    slidesPerView: 4,
                    spaceBetween: 146,
                },
            },

            pagination: {
                el: ".safety-pagination",
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: ".button-next",
                prevEl: ".button-prev",
            },
        });
    }

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

    // 배경 클릭 시 비디오 닫기
    $dim.on("click", function (e) {
        if (!$(e.target).closest($videoWrap).length) {
            // 비디오를 제외한 배경 클릭 확인
            $dim.fadeOut();
            $videoWrap.removeClass("active");
            $video.attr("src", ""); // 동영상 주소 삭제 (소리 삭제)
        }
    });

    // youtube end------------------------------------------------------------

    // 대여여하기----------------------------------------------------------------
    // 이용 방법------------------------------------------------------------
    // lcd

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
    // lcd end

    // qr
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
        // 마우스가 영역을 벗어나면 모든 li에서 'on' 클래스 제
        $lendListQr.find("li").removeClass("on");
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
    // 대여하기 end----------------------------------------------------------------

    // 모바일 더보기
    const btnMenu = document.querySelector(".more-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const btnClose = document.querySelector(".mobile-btn-close");

    btnMenu.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    btnClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
    // 모바일 더보기 end

    // 이용하기
    gsap.registerPlugin(ScrollTrigger);

    const accidentItems = gsap.utils.toArray(".accident-list li");

    accidentItems.forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                // markers: true,
                start: "top 50%",
                end: "bottom 0%",
                toggleActions: "play none reverse none",
            },

            y: 100,
            autoAlpha: 0.5,
            filter: "grayscale(1)",
            duration: 1,
            ease: "power4.out",
        });
    });

    const review = new Swiper(".review-all-1", {
        speed: 5000,
        loop: true,
        slidesPerView: 4,
        spaceBetween: 60,

        autoplay: {
            delay: 0,
        },
    });

    const reviewAll = new Swiper(".review-all-2", {
        speed: 5000,
        loop: true,
        slidesPerView: 4,
        spaceBetween: 60,

        autoplay: {
            delay: 0,
            reverseDirection: true, // 슬라이드 방향을 왼쪽으로 설정
        },
    });
    // 이용하기end

    // 맵
    const $mapBtn = $(".map-btn > a");
    const $mapCon = $(".map-con");
    const $mapIframe = $(".map-iframe"); // 모든 map-iframe 요소 선택

    // map 버튼 클릭 시 동작
    $mapBtn.on("click", function (e) {
        // 기본 동작 막기
        e.preventDefault();

        // 선택한 버튼의 인덱스 구하기
        const tabIdx = $(this).index();

        // 모든 map-con 숨기기
        $mapCon.removeClass("active").hide();
        $mapIframe.hide(); // 모든 map-iframe 요소 숨기기

        // 모든 mapBtn에서 .on 클래스 제거
        $mapBtn.removeClass("on");

        // 클릭한 mapBtn에 .on 클래스 추가
        $(this).addClass("on");

        // 인덱스에 해당하는 map-con 보이기
        $mapCon.eq(tabIdx).addClass("active").show();
        $mapIframe.eq(tabIdx).show(); // 해당하는 map-iframe 보이기
    });

    // 기본적으로 첫 번째 map-con 보이기
    $mapCon.hide(); // 모든 map-con 숨김
    $mapCon.eq(0).addClass("active").show(); // 첫 번째 map-con 보이기
    $mapIframe.hide(); // 모든 map-iframe 요소 숨김
    $mapIframe.eq(0).show(); // 첫 번째 map-iframe 보이기
    $mapBtn.eq(0).addClass("on"); // 첫 번째 버튼에 .on 클래스 추가

    // 팝업 메세지
    const submitButton = document.getElementById("submitButton");
    const searchInput = document.getElementById("searchInput");

    if (submitButton && searchInput) {
        submitButton.addEventListener("click", function () {
            var inputValue = searchInput.value;
            if (inputValue) {
                alert("여기가 어딘데요..? "); // 팝업 메시지 표시
            } else {
                alert("내용을 입력하세요."); // 내용이 없을 경우 메시지
            }
        });

        // Enter 키를 눌렀을 때도 실행
        document.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                submitButton.click(); // 버튼 클릭 이벤트 호출
            }
        });
    }

    // 맵 end

    // 이벤트
    const courseSwiper = new Swiper(".course-list", {
        speed: 1000,
        loop: true,
        slidesPerView: 6,
        spaceBetween: 83,

        autoplay: {
            delay: 2000,
        },

        navigation: {
            nextEl: ".course-button-next",
            prevEl: ".course-button-prev",
        },
    });
});
