# 성경찾기 앱



<div align="center">
 <img src="https://img.shields.io/badge/Vue-4FC08D.svg?logo=Vue.js&logoColor=white" />
 <img src="https://img.shields.io/badge/AwsLambda-FF9900.svg?logo=AWS-Lambda&logoColor=white" />
 <img src="https://img.shields.io/badge/Python-3776AB.svg?logo=Python&logoColor=white" />
</div>



![image](https://user-images.githubusercontent.com/1642243/210727807-c3cf8801-1cba-4566-92f9-27237f920e91.png)



[앱 링크](http://bible-finder-vue.s3-website-ap-northeast-1.amazonaws.com/)



[관련 블로그 포스트](https://krksap.tistory.com/1575)



## API 사용방법

json형태 입니다.

https://2kstde4150.execute-api.ap-northeast-1.amazonaws.com/dev/v1/find/single/롬5:1

 

위와 같이 뒤에 롬5:1이라고 되어 있는 부분을 창1:1 이런식으로 바꿔서 웹브라우저에 붙여넣기 합니다.

 

텍스트로 받고 싶다면 아래 endpoint를 이용하세요.

https://2kstde4150.execute-api.ap-northeast-1.amazonaws.com/dev/v1/find/single/xml/롬5:1

