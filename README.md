# find-near-me

## 專案說明
- 使用者可透過台北市的座標做為參數，查詢最近的2個還有youbike可以借的站點。
- 查詢結果包含站點名稱、該站youbike剩餘數量等等。
- 應用新版的node搭配ES6+ async await等語法撰寫完成，對於座標距離各站點的遠近的判斷使用 mongodb的$near運算子來完成，證明自己NoSQL type DB的操作能力。部署於Heroku。
- 應用[Google Maps Geocoding API](http://developers.google.com/maps/documentation/geocoding)來判斷使用者傳入的座標參數是否位於台北市。
- [台北市政府開放資料的youbike data](http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48)每分鐘更新1次，因此另外設定cron job每分鐘藉由開放資料的api獲取台北市各youbike站點的即時資訊 (例如youbike剩餘數量等等)，並進一步更新到mongo db service：mLab。
- cron jon的部分原本含在本專案中，但部署於heroku後發現超過30分鐘內沒有任何request則包括cron job部分的整個應用就會被閒置，因此將cron job的部分另外抽出為專案：[cron-job-fetch-youbike-data-every-min](https://github.com/alvinyen/cron-job-fetch-youbike-data-every-min)，部署於Digital Ocean。

## API SPEC.
- host： https://find-near-me.herokuapp.com
- /v1/ubike-station/taipei
    - Request Method: GET
    - Request Parameters:
        - lat: latitude of location
        - lng: longitude of location
    - Spec and Error Handling:
        - 如果座標不在台北市內，則回傳 error code -2。
        - 其他error code說明
            - 1：所有youbike站點都沒有youbike可借
            - 0：OK
            - -1：不正確的經度或緯度  
                - 經度範圍：-180 ~ 180
                - 緯度範圍：-90 ~ 90
            - -2：座標不在台北市內
            - -3：系統錯誤
            - 任何非0錯誤代碼必須搭配回傳空的result陣列
            - 回傳的youbike站點的剩餘youbike數量必須不等於0
    - Response
        - Content Type: application/json
        - Body
            ```
            {
                "code": $error-code,
                "result": [
                    {
                        "station": "$name-of-station", 
                        "num_ubike": $number-of-available-ubike
                    },
                    {
                        "station": "$name-of-station", 
                        "num_ubike": $number-of-available-ubike
                    }
                ]           
            }
            ```
    - Sample Request
        - GET /v1/ubike-station/taipei?lat=25.034153&lng=121.568509
        - response
            Content-Type: application/json
            ```
            {
                "code": 0,
                "result": [
                    {"station": "捷運象山站", "num_ubike": 10},
                    {"station": "世貿二館", "num_ubike": 33}
                ]               
            }
            ```
## 測資
- given location in Taipei City
    -  https://find-near-me.herokuapp.com/v1/ubike-station/taipei?lat=25.062645&lng=121.574267
- given location in Argentina
    -   https://find-near-me.herokuapp.com/v1/ubike-station/taipei?lat=-40.338582&lng=-67.235581
- given location in New Taipei City
    -   https://find-near-me.herokuapp.com/v1/ubike-station/taipei?lat=25.003993&lng=121.600701