// =========================== TOTOP =======================
// Hàm kiểm tra và hiển thị nội dung
function checkVisibility_totop() {
  var $toTop = $('#sticky-to-top');

  // Lấy vị trí cuộn hiện tại
  var scrollTop = $(this).scrollTop();

  // Nếu cuộn xuống hơn 100px
  if (scrollTop > 100) {
    $toTop.addClass('to-top-show');
  } else {
    $toTop.removeClass('to-top-show');
  }
};

// =========================== TRANG CHU =======================
// Hàm kiểm tra và hiển thị nội dung
function checkVisibility_trangchu() {
  // Lấy vị trí cuộn hiện tại
  var scrollTop = $(window).scrollTop();
  // Lấy chiều cao cửa sổ trình duyệt
  var windowHeight = $(window).height();

  // Duyệt qua từng nội dung
  $('.trangchu-hidden').each(function () {
    var $item = $(this);

    if ($item.hasClass('trangchu-show')) return;
    // Lấy vị trí của nội dung so với top trang
    var itemTop = $item.offset().top;

    // Tính toán vị trí để hiển thị
    // Khi nội dung vào giữa màn hình (có thể điều chỉnh)
    var triggerPoint = itemTop - windowHeight + 100;

    // Nếu đã cuộn đến vị trí cần hiển thị
    if (scrollTop > triggerPoint) {
      // Thêm class visible để hiển thị
      $item.addClass('trangchu-show');
    }
  })
};
// =========================== GIỚI THIỆU =======================
function checkVisibility_gioithieu() {
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();

  $('.gioithieu-item').each(function () {
    var $item = $(this);
    if ($item.hasClass('gioithieu-visible')) return;
    var itemTop = $item.offset().top;
    var triggerPoint = itemTop - windowHeight + 100;

    if (scrollTop > triggerPoint) {
      $item.addClass('gioithieu-visible');
    }
  })
};


//================== CHITTIETSANPHAM ==================//

function addToCartFromDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  if (id) {
    addToCart(id);
  }
}
// Thêm lắng nghe sự kiện click cho div sản phẩm
document.querySelectorAll('.sanpham').forEach(function (product) {
  product.addEventListener('click', function (event) {
    event.stopPropagation();

    const productId = this.getAttribute('data-id');

    if (productId) {
      window.location.href = `chitietsanpham.html?id=${productId}`;
    }
  });
});

// Hiển thị trang chi tiết sản phẩm theo đúng id
// Lấy id trên url
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

const product = itemList.find(item => item.id === productId);

if (product) {
  document.querySelector('.chitiet-ten h3').textContent = product.ten;
  document.querySelector('.chitiet-mota p').textContent = product.mo_ta;
  document.querySelector('.chitiet-giatien p').textContent = product.gia_dinh_dang;
  document.querySelector('.chitiet-anh img').src = product.anh;
  document.querySelector('.chitiet-anh img').alt = product.ten;
}

// Hàm thêm vào giỏ hàng
function addToCart(productId) {
  var soLuongDatHang = document.querySelector('.chitiet-soluong input');
  var soLuongGioHang = parseInt(soLuongDatHang.value);

  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var sanPhamTrongGio = cart.find(item => item.id === productId);

  const MAX_SO_LUONG = 50;

  if (sanPhamTrongGio) {
    var tong = sanPhamTrongGio.quantity + soLuongGioHang;

    if (tong > MAX_SO_LUONG) {
      sanPhamTrongGio.quantity = MAX_SO_LUONG;
      alert("Bạn đã đặt quá số lượng cho phép. Tối đa 50 sản phẩm");
    } else {
      sanPhamTrongGio.quantity = tong;
      alert("Đã cập nhật số lượng sản phẩm trong giỏ hàng");
    }
  } else {
    if (soLuongGioHang > MAX_SO_LUONG) {
      alert("Bạn đã đặt quá số lượng cho phép. Tối đa 50 sản phẩm");
      soLuongDatHang.value = 1;
      return;
    }

    function findProduct(productId) {
      for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].id === productId) {
          return itemList[i];
        }
      }

      return null;
    }

    var product = findProduct(productId);
  
    if (product) {
      cart.push({
        id: product.id,
        ten: product.ten,
        gia: product.gia,
        gia_dinh_dang: product.gia_dinh_dang,
        anh: product.anh,
        quantity: soLuongGioHang
      });
      alert("Đã thêm sản phẩm vào giỏ hàng");
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  soLuongDatHang.value = 1;
}

function purchasingProducts() {

  addToCart(productId);

  window.location.href = "giohang.html";

}

//================== GIOHANG ==================//

function showCart() {
  //create a body for later usages
  var cartB = document.getElementById("CartBody");

  if (cartB == null) {
    return;
  }

  cartB.innerHTML = "";
  var TotalPreTax = 0;

  //VND converter funtion (it might not be necessary but i did it anyway)
  var vndConvert = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })

  //read data from local storage and then add it to table
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartB.innerHTML = '<tr><td colspan="6" class="text-center">Giỏ hàng trống</td></tr>';
    document.getElementById('Cost').innerHTML = vndConvert.format(0);
    document.getElementById('TaxCost').innerHTML = vndConvert.format(0);
    document.getElementById('finalCost').innerHTML = vndConvert.format(0);
    return;
  }

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var product = itemList.find(p => p.id === item.id);

    if (product) {
      var photo = product.anh;
      var name = product.ten;
      var price = product.gia;
      var orderNumber = item.quantity;
      var pxo = price * orderNumber;

      /*Secret behind contents*/
      var tr = document.createElement("tr")

      var photoCell = document.createElement("td")
      photoCell.innerHTML = "<img src='" + photo + "' class='giohang-img'/>"
      var nameCell = document.createElement("td");
      nameCell.innerHTML = name;
      var priceCell = document.createElement("td");
      priceCell.innerHTML = vndConvert.format(price);
      var orderNumberCell = document.createElement("td");
      orderNumberCell.innerHTML = orderNumber
      var pxoCell = document.createElement("td");
      pxoCell.innerHTML = vndConvert.format(pxo);

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
      delink.dataset.id = item.id;
      var icon = document.createElement("i");
      icon.className = "fa fa-trash icon-pink";
      delink.appendChild(icon);

      // CHỈ GÁN 1 LẦN DUY NHẤT
      delink.onclick = function (e) {
        e.preventDefault();
        removeCart(parseInt(this.dataset.id));
      };

      deleteCell.appendChild(delink);
      tr.appendChild(deleteCell);
      cartB.appendChild(tr);

      /*Calculating part 1*/
      TotalPreTax += pxo;
    }
  }

  /*Calculating part 2*/
  var taxC = 0.1 * TotalPreTax;
  var totalCost = TotalPreTax + taxC;

  //This will assign values for 3 final line of cart 
  document.getElementById('Cost').innerHTML = vndConvert.format(TotalPreTax);
  document.getElementById('TaxCost').innerHTML = vndConvert.format(taxC);
  document.getElementById('finalCost').innerHTML = vndConvert.format(totalCost);
}

function removeCart(productId) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
}

//Refresh cart on load
window.onload = function () {
  showCart();
};

// =================== THANH TOÁN ==================//
function checkout() {
  // Lấy giỏ hàng từ localStorage
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Kiểm tra giỏ hàng có trống không
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi thanh toán.");
    return;
  }

  // Tính tổng tiền
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var product = itemList.find(p => p.id === item.id);
    if (product) {
      total += product.gia * item.quantity;
    }
  }

  // Định dạng tiền VND
  var vndConvert = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  // Hiển thị thông báo cảm ơn kèm tổng tiền
  alert("Chúng mình cảm ơn bạn đã mua hàng!\nTổng giá trị đơn hàng của bạn là: " + vndConvert.format(total) + "\nGóc Họa Sĩ hẹn gặp lại bạn!");

  // Xóa toàn bộ giỏ hàng
  localStorage.removeItem('cart');

  // Cập nhật lại giao diện giỏ hàng
  showCart();
}



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
    return false;
  }

  // Kiểm tra email
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailReg.test(email.value.trim()) == false) {
    alert("Email không hợp lệ");
    return false;
  }

  // Định nghĩa cấu trúc chuẩn của số điện thoại:
  // [0-9]   : Chỉ cho phép các ký tự là số từ 0 đến 9.
  // {9}$  : Tổng số lượng chữ số bắt buộc phải nằm trong khoảng 9 ký tự.
  var phoneReg = /^0[0-9]{9}$/;

  // Kiểm tra xem số điện thoại người dùng nhập vào có đúng là số và đủ độ dài hay không
  if (phoneReg.test(phone.value) == false) {
    alert("Số điện thoại không hợp lệ"); // Cảnh báo nếu chứa chữ cái hoặc quá ngắn/quá dài
    return false;                        
  }


  // Kiểm tra thông tin đưa vào là quá ít 
  if (content.value.trim().length < 10) {
    alert("Chúng tôi không giải quyết liên hệ này");
    return false;
  }

  alert("Đã gửi dữ liệu");
  return true;
}