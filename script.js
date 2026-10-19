/**
 * Kimcolor Website Script
 * Google Apps Script Web App Integration for Email Notifications
 */

// Google Apps Script Deploy URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwe7Jb5mUMfxmG-mzcwLDlKP7BmOA6X3ZaugkZztAa9YmfhpvEdSDvgWX-F3aU9W7hx/exec';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Form Handler
  initContactForm();
});

function initContactForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : '신청하기';

    // Get Form Elements
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

    // UI Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = '전송 중...';
    }

    try {
      // Send data to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script CORS handoff
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Show Success Message
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
