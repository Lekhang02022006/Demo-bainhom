// =========================== RÀNG BUỘC ĐĂNG NHẬP =======================

function login(frm) {
  var email = document.getElementById("LoginUserEmail");
  var password = document.getElementById("LoginUserPassword");

  // Kiểm tra email
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailReg.test(email.value.trim()) == false) {
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
  if (emailReg.test(email.value.trim()) == false) {
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


// =========================== RÀNG BUỘC LIÊN HỆ =======================
function contact(frm) {
  var hoten = document.getElementById("ContactUserName");
  var phone = document.getElementById("ContactNumber");
  var email = document.getElementById("ContactUserEmail");
  var content = document.getElementById("ContactContent");

  // Kiểm tra họ tên
  if (hoten.value.trim().length < 4) {
    alert("Họ Tên không hợp lệ")
    hoten.focus();
    return false;
  }

  // Kiểm tra email
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailReg.test(email.value.trim()) == false) {
    alert("Email không hợp lệ");
    email.focus();
    return false;
  }

  // ==================== 3. KIỂM TRA SỐ ĐIỆN THOẠI ====================
  // Định nghĩa cấu trúc chuẩn của số điện thoại:
  // ^[0-9]   : Chỉ cho phép các ký tự là số từ 0 đến 9.
  // {10}$  : Tổng số lượng chữ số bắt buộc phải nằm trong khoảng 10 ký tự.
  var phoneReg = /^0[0-9]{9}$/;

  // Kiểm tra xem số điện thoại người dùng nhập vào có đúng là số và đủ độ dài hay không
  if (phoneReg.test(phone.value) == false) {
    alert("Số điện thoại không hợp lệ"); // Cảnh báo nếu chứa chữ cái hoặc quá ngắn/quá dài
    phone.focus();                       // Đưa con trỏ chuột quay lại ô nhập Số điện thoại
    return false;                        // Dừng hàm, ngăn chặn gửi form
  }


  // Kiểm tra thông tin đưa vào là quá ít 
  if (content.value.trim().length < 10) {
    alert("Chúng tôi không giải quyết liên hệ này");
    content.focus();
    return false;
  }

  alert("Đã gửi dữ liệu");
  return true;
}

// =========================== GIỎ HÀNG =======================
// function goToCart(){
//     window.location.href="Cart.html"
// }
function showCart(){
    //create a body for later usages
    var cartB=document.getElementById("CartBody");
    cartB.innerHTML="";
    var TotalPreTax=0;

    //VND converter funtion (it might not be necessary but i did it anyway)
    var vndConvert = new Intl.NumberFormat('vi-VN',{
        style: 'currency',
        currency: 'VND',
    })

    //read data from local storage and then add it to table
    for(var i=0; i<localStorage.length;i++){
        var key = localStorage.key(i);
        
        if(itemList[key]){
            /*Declaration*/
            var item = itemList[key];
            var photo = item.photo;
            var name = item.name;
            var price = item.price;
            var orderNumber= localStorage.getItem(key);
            var pxo= price*orderNumber;
            
            /*Secret behind contents*/
            var tr = document.createElement("tr")
            
            var photoCell = document.createElement("td")
            photoCell.innerHTML="<img src='" + photo + "' class='rounf-figure' width='100px'/>"
            var nameCell=document.createElement("td");
            nameCell.innerHTML=name;
            var priceCell=document.createElement("td");
            priceCell.innerHTML=price;
            var orderNumberCell=document.createElement("td");
            orderNumberCell.innerHTML=orderNumber
            var pxoCell=document.createElement("td");
            pxoCell.innerHTML=pxo;
            
            /*Row's contents*/
            tr.appendChild(photoCell)
            tr.appendChild(nameCell);
            tr.appendChild(orderNumberCell);
            tr.appendChild(priceCell);
            tr.appendChild(pxoCell);
            
            /*Delete button*/
            var delink = document.createElement("a");
            var deleteCell = document.createElement("td");
            delink.href = "#";
            delink.dataset.code= key;
            var icon = document.createElement("i")
            icon.className = "fa fa-trash icon-pink";
            delink.appendChild(icon);
            delink.onclick= function(){
                removeCart(this.dataset.code);
            }
            deleteCell.appendChild(delink);
            tr.appendChild(deleteCell);
            cartB.appendChild(tr);

            /*Calculating part 1*/
            TotalPreTax+=pxo;
        }
    }
    /*Calculating part 2*/
    var taxC = 0.1 * (TotalPreTax );
    var totalCost = TotalPreTax + taxC;

    //This will assign values for 3 final line of cart 
    document.getElementById('Cost').innerHTML=vndConvert.format(TotalPreTax);
    document.getElementById('TaxCost').innerHTML=vndConvert.format(taxC);
    document.getElementById('finalCost').innerHTML=vndConvert.format(totalCost);
}

function removeCart(code){
    if(typeof window.localStorage[code] !== "undefined"){
        window.localStorage.removeItem(code);
        document.getElementById("CartTable").getElementsByTagName('tbody')[0].innerHTML="";
        showCart();
    }
}
//Refresh cart on load
window.onload = function() {
    showCart();
};