FROM node:15.14.0

# RUN apt-get update && apt-get install
RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm ci
RUN npm install -g serve

ARG REACT_APP_BACKEND_DEV_URL
ENV REACT_APP_BACKEND_DEV_URL=${REACT_APP_BACKEND_DEV_URL}
ARG REACT_APP_GOOGLE_MAPS_API_KEY
ENV REACT_APP_GOOGLE_MAPS_API_KEY = ${REACT_APP_GOOGLE_MAPS_API_KEY}

CMD ["npm", "run", "start_file"]
