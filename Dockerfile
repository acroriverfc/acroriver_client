# 어떤 환경에서 도커 이미지를 만들지 결정하기.
FROM node:alpine

# 도커 컨테이너 내부의 작업 디렉토리 결정하기. 원하는 대로 정하면 됩니다.
WORKDIR '/app'

ENV PATH /app/node_modules/.bin:$PATH
# 외부 패키지 설치를 위해 package.json과 yarn.lock 파일 복사

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

# 패키지 설치
RUN yarn install

COPY . ./
# 빌드
RUN yarn build
CMD ["yarn", "start"]