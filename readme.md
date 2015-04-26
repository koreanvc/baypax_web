해야 할 것

리눅스 서버 구축하기
— sudo apt-get install git
- ssh-keygen -t rsa 
- ~/.ssh/id_rsa.pub 복사
- github.com 가입, 로그인
- setting -> SSH keys -> Add SSH key ( Key 란에만 복붙하면됨 )
- cd 원하는 폴더
- git clone git@github.com:gumab/baypax_web.git



- node.js 설치
- PM2도 설치하는게 좋음 (관련사항은 구글링)
- npm 모듈 필요한것 전부 설치

- cd baypax_web/server/
- node server.js     or     nodes server.js
- 이 때 npm 모듈 설치 전부 안돼있으면 오류뜨는데 그거 보면서  필요한것들 추가로 설치할것


- mysql 설치
- /server/config/config.js 수정할것 

- 현재 테스트한 테이블은 users 하나!

create table users (
seq int NOT NULL AUTO_INCREMENT,
user_mail varchar(50) NOT NULL,
user_name varchar(50) NOT NULL,
user_pwd varchar(500) NOT NULL,
PRIMARY KEY(seq));




웹페이지 관련: client 폴더
서버기능 관련: server 폴더