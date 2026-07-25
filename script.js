// =========================== RÀNG BUỘC ĐĂNG NHẬP =======================

function login(frm) {
  var email = document.getElementById("LoginUserEmail");
  var password = document.getElementById("LoginUserPassword");

  // Kiểm tra email
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailReg.test(email.value) == false) {
    alert("Email không hợp lệ");
    return false;
  }

  // Kiểm tra mật khẩu
  if (password.value.trim().length < 8) {
    alert("Mật khẩu dưới 8 ký tự");
    return false;
  }

  alert("Đã gửi dữ liệu");
  return true;
}

// =========================== RÀNG BUỘC ĐĂNG KÝ =======================
function signup(frm) {
  var email = document.getElementById("SignupUserEmail");
  var password = document.getElementById("SignupUserPassword");
  var password2 = document.getElementById("SignupUserPassword2");
  var avatar = document.getElementById("Avatar")

  // Kiểm tra email
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailReg.test(email.value) == false) {
    alert("Email không hợp lệ");
    return false;
  }

  // Kiểm tra mật khẩu
  if (password.value.trim().length < 8) {
    alert("Mật khẩu dưới 8 ký tự");
    return false;
  }

  // Kiểm tra nhập lại mật khẩu
  if (password2.value.trim().length < 8 || password.value != password2.value) {
    alert("Nhập lại mật khẩu dưới 8 ký tự hoặc không khớp với mật khẩu");
    return false;
  }

  // Kiểm tra file đã chọn
  if (avatar.files.length === 0) {
    alert("Chọn ảnh đại diện đi!!");
    return false;
  }


  alert("Đã gửi dữ liệu");
  return true;
}