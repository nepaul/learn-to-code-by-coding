## Mobile

- 一个完整的请求组成
  - host: `http://localhost:8080`
  - prefix: `/api/v1`
  - 一个完整的请求 url：`host + prefix + api`，例如 下面的获取用户信息接口就是，`http://localhost:8080/api/v1/players`
- 返回状态码：RFC 标准，可以查看 [维基百科](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

### Player

> 主要在用户首次登录 APP 时使用

1. show：获取用户基本信息

   ```
   GET /players HTTP/1.1
   Content-Type: application/json
   authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExLCJpYXQiOjE0NzU5OTg3NjUsImV4cCI6MTQ3ODU5MDc2NX0.ag2D1gUUKKry2PO086C33TMF-HVBIA6mfLmMZAL-yh8
   ```

2. create: 注册用户基本信息

   ```
   POST /players HTTP/1.1
   Content-Type: application/json
   authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExLCJpYXQiOjE0NzU5OTg3NjUsImV4cCI6MTQ3ODU5MDc2NX0.ag2D1gUUKKry2PO086C33TMF-HVBIA6mfLmMZAL-yh8
   {
     "email": "nibo@kingsoft.com",
     "name": "nibo",
     "gender": "male",
     "phone": "18688188888"
   }
   ```



### Tests

1. 用 code 获取单个测试信息

   ```
   GET /tests/:code/mobile HTTP/1.1
   Content-Type: application/json
   authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExLCJpYXQiOjE0NzU5OTg3NjUsImV4cCI6MTQ3ODU5MDc2NX0.ag2D1gUUKKry2PO086C33TMF-HVBIA6mfLmMZAL-yh8
   ```

   ​

### Result

> 用户完成任务后的相关 API

1. create: 记录任务结果，包括用户筛查、视频、后期感受等信息

   ```
   POST /results HTTP/1.1
   Content-Type: application/json
   authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExLCJpYXQiOjE0NzU5OTg3NjUsImV4cCI6MTQ3ODU5MDc2NX0.ag2D1gUUKKry2PO086C33TMF-HVBIA6mfLmMZAL-yh8
   {
     "testID": "11xx22",
     "video": "存在 金山云 的file key（或者叫 文件名）",
     ...
   }
   ```

   ​