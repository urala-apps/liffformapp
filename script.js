liff.init({
  liffId: '2003690789-4xoj9DNp'
}).catch((err) => {
  console.log(err);
});

liff.ready.then(() => {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
  const idToken = liff.getDecodedIDToken();
  const userId = idToken.sub;
  const userName = idToken.name;
  const userPic = idToken.picture;
  $('form').append(`<input type="hidden" name="userId" value="${userId}">`);
  $('form').append(`<input type="hidden" name="userName" value="${userName}">`);
  $('form').append(`<input type="hidden" name="userPic" value="${userPic}">`);

  $('ul').append('<input type="submit"  class="hide">');


  $('.btn-items').append('<li class="inner"><label><div class="flexItem"><img class="flexItem_a btn_animate04" src="https://urala-umeda.github.io/liffformapp/right_01.png"></div><button type="submit" id="btn_id_left" class="btn-left btn_animate04" name="voteLeft" value="">ラーメンに<br>投票する</button></label></li>');
  $('.btn-items').append('<li class="inner"><label><div class="flexItem"><img class="flexItem_b btn_animate04" src="https://urala-umeda.github.io/liffformapp/left_01.png"></div><button type="submit" id="btn_id_right" class="btn-right btn_animate04" name="voteRight" value="">からあげに<br>投票する</button><label></li>');

});

// $('.btn-items').append('<li class="inner"><label><div class="flexItem"><img class="flexItem_a btn_animate04" src="https://urala-umeda.github.io/liffformapp/right_01.png"></div><button type="submit" id="btn_id_left" class="btn-left btn_animate04" name="voteLeft" value="">ラーメンに<br>投票する</button></label></li>');
// $('.btn-items').append('<li class="inner"><label><div class="flexItem"><img class="flexItem_b btn_animate04" src="https://urala-umeda.github.io/liffformapp/left_01.png"></div><button type="submit" id="btn_id_right" class="btn-right btn_animate04" name="voteRight" value="">からあげに<br>投票する</button><label></li>');

const send_id = "btn_id_left";
const cancel_id = "btn_id_right";
const shop = "ウララ";
const left_name = "ラーメン";
const right_name = "からあげ"

$('form').submit(function (event) {
  event.preventDefault();

  const click_id = event.originalEvent.submitter.id;//⓵
  let buttonText = "";

  if (click_id === send_id) {
    console.log('left');
    buttonText = left_name;
  } else if (click_id === cancel_id) {
    console.log('right');
    buttonText = right_name;
  }

  // alert(buttonText + "に投票しますか？");
  let data = $('form').serializeArray();
  data.push({ name: 'menu', value: buttonText });
  data.push({ name: 'shop', value: shop });

  $.post('https://script.google.com/macros/s/AKfycbybDXIRMjVeOkQ8x0DHwkpxykHFSJ8O-0_IVxICdLoowg9mxPrkvnpkim3Jqp1QNZSg/exec', data);

  // alert("投票しました！");
  Swal.fire({
    title: "投票完了！",
    text: buttonText + "に投票しました。",
    icon: "success"
  });
  // liff.closeWindow();
});
