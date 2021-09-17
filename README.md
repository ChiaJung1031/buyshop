# buyshop


08/26 apun


1.新增一個template.js頁面，主要放其他也面也會用到的JS，目前想說裡面放檢查是否log in 或是 log out的function
名稱可再看看是否要用template 還是其他的~~


2.新增一個api_member.js頁面，裡面就放寫登入/註冊的東西吧 ~ ，

8/27 ruby
1.前台 index 頁面的部分,先把登入、註冊、忘記密碼 按鈕點選後的流程先出來
2.index 頁面先把 中間原本要顯示圖片的區塊拿掉

08/30 ruby
1.static/js 新增 jquery-1.12.4.min.js、propper.min.js、productlist.js、productdtl.js
2.static/js 修改 index.js
3.template 資料夾新增前台每個頁面共用的 head nav footer
4.修改 view 資料夾的 index.ejs、productdtl.ejs 
5.新增 view 資料夾的 productlist.ejs
6.新增 api 資料夾的  api_productlist.js
7.新增 DAO 資料夾的 sql_productlist.js
8.新增 module 資料夾放共用的程式  conn.js (放連線字串 其他檔案資料庫連線請參考這隻)
9.app.js 修改 & 新增對應的get 頁面 & api


9/4 ruby
1.sql連線字串修改為放 .env 檔案,所以本機測試的話需額外在建立這個檔案
2.sql連線字串改參考 config/conn.js
3.新增 log 模組 utility/log4js.js,如需產生新的log檔案，請到這隻設定地方再附加上去
4.新增product 相關模組 module/product.js 、 DAO/sql_product.js ，產品相關的這兩隻前後台可共用
5.目前整個程式開發流程部分可用MVC的方式 直接根據URL呼叫對應的API回傳資料給view呈現
  範例可參考 productlist.ejs 這個頁面
  **要整個網頁reload的才用這種方式，如不要就照原本的 fetch 方式就可以

9/12
1.新增購物車相關功能(api_cart.js) 、產生訂單相關功能(api_order.js)、取會員資料功能(api_member.js)
2.修改 app.js 修改為限制session 30分鐘過期，secret 改為抓  process.env
3.修改 config/conn.js 改為只回傳連線的 json ,createPool 改在 dao 做


9/17
1.新增 utility 資料夾放共用function,總共新增三隻
        utility/dbhelp.js  : Dao 連資料庫統一引用這隻
        utility/encrypt.js : 密碼加密用這隻
        utility/util.js  : 共用的檢核規則用這隻
2.新增訂單查詢功能
3.新增check資料夾 放api檢核欄位相關檔案
       
       