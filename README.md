[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7011123&assignment_repo_type=AssignmentRepo)
# 나쁜말 Bad-Horse 🤬🐴 

머신러닝 모델을 이용해 **나쁜 말(채팅, 댓글, 게시글 등)을 자동으로 필터링 해 주는 API**
## 프로잭트 소개

우리는 사람들과 카톡과 같은 메신저를 이용해서 다양한 이야기를 나누기도 하고, 유튜브, 인스타 같은 서비스에 댓글을 남기면서 소통을 합니다.
하지만 이런 SNS에는 항상 악의적인 사용자인 '어뷰저'들이 존재합니다. 어뷰저들은 의도적으로 악플을 남기면서 사람들에게 지우기 어려운 깊은 상처를 남깁니다.
저희는 이러한 문제를 해결하기 위해서 "나쁜말 필터링 API"를 만들고자 합니다.

'나쁜말 필터링 API' 는 댓글, 채팅, 게시글 등 다양한 텍스트를 입력으로 받고, 해당 텍스트의 의도를 Deep Learning 모델을 이용해 파악하여 나쁜말인지 여부를 분류합니다.
특정 서비스에 국한된 것이 아니라 API 형태로 제공하기 때문에 기존 또는 새롭게 등장하는 서비스 모두 '나쁜말 필터링 API'를 이용해 나쁜 말들을 제거할 수 있습니다.
지속적으로 데이터를 추가하면서 모델을 개선하여 신조어를 기반으로 하는 어뷰징도 적극적으로 대응해 나갈 예정입니다.

나쁜말은 국민대학교 캡스톤디자인 프로젝트 수업에서 개발되었으며 향후 사업화까지 염두해 두고 있는 프로젝트 입니다.
SNS 내의 악플로 인해 상처 받는 사람들을 보호할 수 있는 최소한의 장치로서 역할을 다하고 싶습니다.

## 팀 소개

'나쁜 말을 필터링할 수 있는 서비스를 만든다' 라는 하나의 목표를 두고 수평적으로 각자의 역할에 최선을 다할 것입니다.

**김준성**

![김준성이미지](images/profile/김준성.jpg)

```
Student ID: 20171603
E-mail: codertimo@gmail.com
Role: NLP 모델 학습, 모델 서빙
```

**박건후**

![박건후이미지](images/profile/박건후.jpg)

```
Student ID: 20171622
E-mail: parkgeonhu@gmail.com
Role: 데이터 크롤링 파이프라인, 나쁜말 API 백엔드
```

**김도민**

![김도민이미지](images/profile/김도민.jpg)

```
Student ID: 20171585
E-mail: doremin98@gmail.com
Role: 나쁜말 API 데모 사이트, 트위치 봇 개발
```

## 트위치 봇 실행 방법
* bad-horse-filterbot directory에 .env 파일 생성
* .env파일에 다음 내용 추가
```
TWITCH_BOT_USERNAME = "~~~~~~~~~~"
TWITCH_OAUTH_TOKEN = "oauth:~~~~~~"
TWITCH_BOT_CHANNEL = "#~~~~~~~~~~"
```
* 다음 코드로 실행
```
node bot.js
```
