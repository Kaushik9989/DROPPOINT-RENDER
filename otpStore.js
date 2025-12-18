const crypto = require("crypto");

const store = new Map();

const OTP_TTL = parseInt(process.env.OTP_TTL_SECONDS);

const RESEND_COOLDOWN = parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS);

function hashOtp(otp){
    return crypto.createHash("sha256").update(otp).digest("hex");
}


function generateOtp(length = 6) {
  let otp = "";
  const digits = "0123456789";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  console.log(otp);
  return otp;
}


function storeOtp(key, otp){
    const now = Date.now();
    store.set(key,{
        otpHash : hashOtp(otp),
        expiresAt : now + OTP_TTL * 1000,
        attempts : 0,
        lastSeenAt : now,
        resendCount : 0
    });
}

function canResend(key){
    const rec = store.get(key);
    if(!rec) return true;
    return (Date.now() - rec.lastSeenAt) >= RESEND_COOLDOWN * 1000;
}

function updateResendTimestamp(key){
    const rec = store.get(key);
    if (!rec) return;
    rec.lastSeenAt = Date.now();
    rec.resendCount = (rec.resendCount || 0) + 1;
    store.set(key,rec); 
}

function verifyOtp(key, otp){
    const rec = store.get(key);
    if (!rec) return { ok: false, reason: "no_otp" };
      if (Date.now() > rec.expiresAt) {
    store.delete(key);
    return { ok: false, reason: "expired" };
  }
  rec.attempts = (rec.attempts || 0) + 1;
  store.set(key, rec);
  const isMatch = rec.otpHash === hashOtp(otp);
  if (isMatch) {
    store.delete(key); // OTP single-use
    return { ok: true };
  }
  else {
    // optional: limit attempts here (e.g., 5 attempts)
    if (rec.attempts >= 5) {
      store.delete(key);
      return { ok: false, reason: "attempts_exceeded" };
    }
    return { ok: false, reason: "incorrect" };
  }
}

generateOtp();

module.exports = { generateOtp, storeOtp, canResend, updateResendTimestamp, verifyOtp };