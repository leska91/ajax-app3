function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // イベント発火
    post.addEventListener("click", () => {
      // クリックしたらdata-idを取得しpostIdへ代入
      const postId = post.getAttribute("data-id");
      // 非同期通信（ajax）を利用できるよう設定
      const XHR = new XMLHttpRequest();
      // getメソッドで/posts/${postId}を非同期通信で取得
      XHR.open("GET", `/posts/${postId}`, true);
      // データ形式jsonにて
      XHR.responseType = "json";
      // コントローラーへ送信
      XHR.send();
      // コントローラーからの処理を受信した場合{}内の処理をする
      XHR.onload = () => {
        // もしエラーならアラートを出し
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // javascript処理から抜け出す
          return null;          
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);