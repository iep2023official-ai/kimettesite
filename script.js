document.addEventListener('DOMContentLoaded', function() {
    // 1. 네비게이션 및 메뉴 토글 기능
    const menuToggle = document.querySelector('.menu-toggle, .mobile-menu-btn');
    const navMenu = document.querySelector('nav, .nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 2. 탭 및 섹션 전환 기능
    const tabButtons = document.querySelectorAll('.tab-btn, .nav-item, .category-btn');
    const tabContents = document.querySelectorAll('.tab-content, .section-content, .category-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const targetId = this.getAttribute('data-target') || this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));

                    this.classList.add('active');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.classList.add('active');
                    }
                }
            });
        });
    }

    // 3. 스크롤 애니메이션 및 UI 로드 처리
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, section').forEach(section => {
        observer.observe(section);
    });
});
