// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwe7Jb5mUMfxmG-mzcwLDlKP7BmOA6X3ZaugkZztAa9YmfhpvEdSDvgWX-F3aU9W7hx/exec';

document.addEventListener('DOMContentLoaded', function() {
    // 1. Contact Form 전송 이벤트 (Google Apps Script 연동)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '전송 중...';
            }

            const formData = {
                company: document.getElementById('company')?.value || '',
                email: document.getElementById('email')?.value || '',
                pigment: document.getElementById('pigment')?.value || '',
                formulation: document.getElementById('formulation')?.value || '',
                certification: document.getElementById('certification')?.value || '',
                volume: document.getElementById('volume')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                alert('샘플 및 기술 상담 신청이 성공적으로 접수되었습니다. 담당자 확인 후 연락드리겠습니다.');
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

    // 2. 모바일 메뉴 토글 (있을 경우)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});
