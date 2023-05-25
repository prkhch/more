# 싸피_9기_관통프로젝트
## 영화 플랫폼
2023.05.17(수) ~ 2023.05.26(금)

### 후기
##### 박희창
- 상상을 현실화하는 것은 역시 재미있다.
- 사용자가 undefined를 보는 일은 없어야 한다.
- 내가 작성한 코드는 아무리 길어도 잘 읽을 것 같다.
- 읽기야 잘 읽지만 어지러운 건 싫다. 설계를 잘하고 최적화된 코드를 작성하는 습관을 길들일 것이다.
- 팀원과 비슷한 점이 많아서 좋았다. 표기법이나 프로젝트에 대한 니즈 등.
- 다른 점이 있어도 금방 합의점을 찾아서 재미있게 잘 할 수 있었던 거 같다.
- 열심히 공부해야겠다는 생각을 했다. 1. 내가 정확히 알고 있어야 팀원과 의사소통하기 좋다. 2. 프로젝트 진행 중 겪는 어려움에 있어 단순 해결이 아닌 정확히 알고 해결하고 싶다. 3. 잘 만든 타프로젝트와 비교하면 부족한 점이 많다. 내가 더 많은 것을 할줄 안다면, 더 창의적인 생각을 할 수 있다고 믿는다.

##### 최찬석
- django의 모델을 구축할 때 다른 팀과는 다르게 영화의 정보를 극히 일부만 저장하다 보니 모델 구상에 어려움이 있었다
- 처음부터 끝까지 우리가 원하는 모델을 구축해야하기 때문에 어떤 필드를 쓰고 외래키를 받을지 말지, manytomanyfield를 쓸지 말지 애매한 부분이 있어서 더 어려웠던거 같다
- 모델 구축전에 ERD를 구성하기 했지만 탄탄하게 구성하진 않았기 때문에 많은 부분이 수정되었고, 모델을 만든 후 ERD에 추가하기도 했다
- 어느정도 백엔드의 api들을 만들어 두고 profile 수정부분을 작성할 때 많은 어려움들이 있었는데, 지금까지 써오지 않던 chat gpt의 도움을 받아봤다. 매우 좋은 친구다
- 안그래도 자신없는 vue에다가 django만 만지다가 작성하려 했기에 gpt의 도움이 더 크게 다가왔다
- 확실히 단순 공부와 실습보단 이런 프로젝트가 실력 향상에 더 도움이 되는거 같다

---

<img src="https://img.shields.io/badge/django-092E20?style=flat-square&logo=django&logoColor=white"/><img src="https://img.shields.io/badge/Vue.js2-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" style="width:100px height:25px">

#### ERD
<img title="" src="history/erd.png" alt="">

#### 영화추천 알고리즘
<img title="" src="history/recmovie.png" alt="">

- ## DAY-9

FE

- 홈(장르 분류, TOP버튼)
- 로딩 처리
- 프로필(저장영화 삭제, 추천영화 새로고침, 비밀번호 수정)
- 예고편 없는 영화, 포스터 없는 영화 처리
- 로그인, 회원가입 더 자세한 알림

BE

- 비밀번호 수정
- 디버깅
- 예외 처리

<img title="" src="history/day9.png" alt="">

- ## DAY-8

FE

- 프로필 수정
- 프로필(저장한 영화)
- 프로필(저장한 영화를 기반으로한 영화 추천)
- 저장한 영화 메뉴 드래그 앤 드롭

BE

- 프로필 수정
- 댓글 이미지

<img title="" src="history/day8.png" alt="">

- ## DAY-7

FE

- 나중에 볼 영화(저장, store.state를 이용하여 모든 url에서 호출 가능)
- 댓글 수정
- 프로필

BE

- 프로필 이미지

<img title="" src="history/day7.png" alt="">

- ## DAY-6

FE

- 나중에 볼 영화(드롭다운)

BE

- 댓글 수정
- 프로필
- 프로필 수정
- 비밀번호 변경

<img title="" src="history/day6.png" alt="">

- ## DAY-5

FE

- 좋아요
- 나중에 볼 영화 저장
- 애니메이션 효과

BE

-  나중에 볼 영화
-  팔로우
-  좋아요 수

<img title="" src="history/day5.png" alt="">

- ## DAY-4

FE

- 홈페이지, 상세페이지 레이아웃

BE

- 영화 좋아요

<img title="" src="history/day4.png" alt="">

## DAY-3

FE

- 인피니트 스크롤(홈페이지)

- 상세페이지(댓글 작성 및 삭제)

- 로그인, 회원가입

BE

- 모델 수정 및 업데이트(유저, 영화, 댓글, 저장한 영화)

- 댓글 작성 및 삭제

<img title="" src="history/day3.png" alt="">

## DAY-2

FE 

- 홈페이지

- 상세페이지(영화 정보)

BE 

- 모델 생성

- TMDB API를 통해 영화 DB 불러오기 및 저장

- 영화 상세페이지 읽기

- 로그인, 회원가입

<img title="" src="history/day2.png" alt="loading-ag-578">

## DAY-1

- 기획
- 프로젝트 생성