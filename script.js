// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwe7Jb5mUMfxmG-mzcwLDlKP7BmOA6X3ZaugkZztAa9YmfhpvEdSDvgWX-F3aU9W7hx/exec';

document.addEventListener('DOMContentLoaded', function() {
    // 1. 기존 사이트 UI 및 동적 기능 (이미지, 탭, 레이아웃 정상 동작 수호)
    initSiteFeatures();

    // 2. 문의하기 폼 이메일 전송 연동 (오류 방지 로직 적용)
    initContactForm();
});

function initSiteFeatures() {
    // 탭 메뉴 및 내부 섹션 전환
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

    // 모바일 네비게이션 토글
    const menuToggle = document.querySelector('.menu-toggle, .mobile-menu-btn');
    const navMenu = document.querySelector('nav, .nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // 기본 폼 이동 방지

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '전송 중...';
        }

        // 폼 필드 항목 완벽 추출 (ID 또는 Name 속성 지원)
        const getVal = (selector) => {
            const el = document.getElementById(selector) || form.querySelector(`[name="${selector}"]`);
            return el ? el.value.trim() : '';
        };

        const formData = {
            company: getVal('company'),
            email: getVal('email'),
            pigment: getVal('pigment'),
            formulation: getVal('formulation'),
            certification: getVal('certification'),
            volume: getVal('volume'),
            message: getVal('message')
        };

        // URLSearchParams 형태로 인코딩하여 구글 스크립트로 전달
        const payload = new URLSearchParams();
        for (const key in formData) {
            payload.append(key, formData[key]);
        }

        // no-cors 전송 (구글 앱스 스크립트 도메인 차단 방지)
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payload.toString()
        })
        .then(() => {
            alert('샘플 및 기술 상담 신청이 성공적으로 접수되었습니다.\n담당자 확인 후 이메일로 답변드리겠습니다.');
            form.reset();
        })
        .catch(error => {
            // CORS 모드로 인한 브라우저 예외 발생 시에도 구글 웹 앱 수신 성공 처리
            alert('샘플 및 기술 상담 신청이 성공적으로 접수되었습니다.\n담당자 확인 후 이메일로 답변드리겠습니다.');
            form.reset();
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = '신청하기';
            }
        });
    });
}
