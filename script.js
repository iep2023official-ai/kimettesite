/**
 * Kimcolor Website Script
 * Google Apps Script Web App Integration & UI Engine
 */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwe7Jb5mUMfxmG-mzcwLDlKP7BmOA6X3ZaugkZztAa9YmfhpvEdSDvgWX-F3aU9W7hx/exec';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 기존 사이트 UI 및 화면 렌더링, 탭 기능 초기화 (화면 날아감 방지)
    initSiteLayoutAndFeatures();

    // 2. 문의 폼 전송 기능 초기화
    initContactForm();
});

// 기존 사이트의 UI/레이아웃/탭/애니메이션 동작 복구
function initSiteLayoutAndFeatures() {
    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle, .mobile-menu-btn');
    const navMenu = document.querySelector('nav, .nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 탭 및 카테고리 전환 기능
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

    // 스크롤 페이드인 효과
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, section').forEach(section => {
        observer.observe(section);
    });
}

// 이메일 전송 기능
function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerText : '신청하기';

        const companyInput = form.querySelector('input[name="company"]') || form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[name="email"]') || form.querySelector('input[type="email"]');
        const pigmentInput = form.querySelector('input[name="pigment"]');
        const formulationInput = form.querySelector('input[name="formulation"]');
        const certificationInput = form.querySelector('input[name="certification"]');
        const volumeInput = form.querySelector('input[name="volume"]');
        const messageInput = form.querySelector('textarea[name="message"]') || form.querySelector('textarea');

        if (!companyInput || !emailInput) {
            alert('필수 입력 항목이 누락되었습니다.');
            return;
        }

        const payload = {
            company: companyInput.value.trim(),
            email: emailInput.value.trim(),
            pigment: pigmentInput ? pigmentInput.value.trim() : '',
            formulation: formulationInput ? formulationInput.value.trim() : '',
            certification: certificationInput ? certificationInput.value.trim() : '',
            volume: volumeInput ? volumeInput.value.trim() : '',
            message: messageInput ? messageInput.value.trim() : ''
        };

        if (!payload.company || !payload.email) {
            alert('회사명/성함과 이메일을 입력해 주세요.');
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = '전송 중...';
        }

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            alert('신청이 성공적으로 완료되었습니다.\n영업일 기준 48시간 이내에 회신드리겠습니다.');
            form.reset();

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        }
    });
}
