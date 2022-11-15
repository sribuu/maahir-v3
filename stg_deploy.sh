#!/bin/bash

# code
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./src ubuntu@11.0.33.51:/home/ubuntu/next_maahir
# assets
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./public ubuntu@11.0.33.51:/home/ubuntu/next_maahir
# environment
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./.env.staging ubuntu@11.0.33.51:/home/ubuntu/next_maahir
# config
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./next-env.d.ts ubuntu@11.0.33.51:/home/ubuntu/next_maahir
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./next.config.js ubuntu@11.0.33.51:/home/ubuntu/next_maahir
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./package.json ubuntu@11.0.33.51:/home/ubuntu/next_maahir
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./tsconfig.json ubuntu@11.0.33.51:/home/ubuntu/next_maahir
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./tailwind.config.js ubuntu@11.0.33.51:/home/ubuntu/next_maahir
scp -i ~/.ssh/ilyaskprsribuu.pem -r ./postcss.config.js ubuntu@11.0.33.51:/home/ubuntu/next_maahir
