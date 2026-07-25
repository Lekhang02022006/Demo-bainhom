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