// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwe7Jb5mUMfxmG-mzcwLDlKP7BmOA6X3ZaugkZztAa9YmfhpvEdSDvgWX-F3aU9W7hx/exec';

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 페이지별 동적 콘텐츠 로딩 및 탭 처리 (기존 스크립트 복구)
    initPageFeatures();

    // 2. 문의 폼 전송 및 Google Apps Script 연동
    initContactForm();

});

function initPageFeatures() {
    // 탭 메뉴 및 동적 요소 제어
    const tabButtons = document.querySelectorAll('.tab-btn, .nav-item');
    const tabContents = document.querySelectorAll('.tab-content, .section-content');

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

    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
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
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '전송 중...';
        }

        // 입력 데이터 추출
        const formData = {
            company: document.getElementById('company')?.value || form.querySelector('[name="company"]')?.value || '',
            email: document.getElementById('email')?.value || form.querySelector('[name="email"]')?.value || '',
            pigment: document.getElementById('pigment')?.value || form.querySelector('[name="pigment"]')?.value || '',
            formulation: document.getElementById('formulation')?.value || form.querySelector('[name="formulation"]')?.value || '',
            certification: document.getElementById('certification')?.value || form.querySelector('[name="certification"]')?.value || '',
            volume: document.getElementById('volume')?.value || form.querySelector('[name="volume"]')?.value || '',
            message: document.getElementById('message')?.value || form.querySelector('[name="message"]')?.value || ''
        };

        const payload = new URLSearchParams();
        for (const key in formData) {
            payload.append(key, formData[key]);
        }

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payload.toString()
        })
        .then(() => {
            alert('샘플 및 기술 상담 신청이 성공적으로 접수되었습니다.');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = '신청하기';
            }
        });
    });
}
