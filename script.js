// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwe7Jb5mUMfxmG-mzcwLDlKP7BmOA6X3ZaugkZztAa9YmfhpvEdSDvgWX-F3aU9W7hx/exec';

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form 전송 이벤트
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // 기본 폼 제출(페이지 이동) 방지
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '전송 중...';
            }

            // 폼 필드 데이터 가져오기 (HTML에 있는 name 또는 id 기준)
            const formData = {
                company: document.getElementById('company')?.value || form.querySelector('[name="company"]')?.value || '',
                email: document.getElementById('email')?.value || form.querySelector('[name="email"]')?.value || '',
                pigment: document.getElementById('pigment')?.value || form.querySelector('[name="pigment"]')?.value || '',
                formulation: document.getElementById('formulation')?.value || form.querySelector('[name="formulation"]')?.value || '',
                certification: document.getElementById('certification')?.value || form.querySelector('[name="certification"]')?.value || '',
                volume: document.getElementById('volume')?.value || form.querySelector('[name="volume"]')?.value || '',
                message: document.getElementById('message')?.value || form.querySelector('[name="message"]')?.value || ''
            };

            // URLSearchParams를 활용하여 구글 스크립트 전송 충돌 최소화
            const payload = new URLSearchParams();
            for (const key in formData) {
                payload.append(key, formData[key]);
            }

            // 구글 앱스 스크립트로 비동기 전송
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // CORS 충돌 방지
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payload.toString()
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

    // 모바일 메뉴 토글 (필요 시)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});
