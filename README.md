# template-backend

this is a template-backend

# how to start

- need to have docker on your system
- build the api docker images (lookup commands section build image)
- start the container by excuting this command "docker-compose up" or lookup the commands section for help
- stop project by ctrl+c
- remove the container by excuting this command "docker-compose down" or lookup the commands section for help

# commands

- build image:
  - docker build . -t template-backend
- start containers:
  - docker-compose -p template-backend -f docker-compose.yml up
  - docker-compose -p template-backend-test -f docker-compose.test.yml up
  - docker-compose -p template-backend-jsdoc -f docker-compose.jsdoc.yml up
- remove containers:
  - docker-compose -p template-backend down
  - docker-compose -p template-backend-test down
  - docker-compose -p template-backend-jsdoc down --remove-orphans

# live jsdoc github page

https://devahmedradwan.github.io/template-backend/
