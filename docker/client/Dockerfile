FROM nginx
MAINTAINER Poe "xs.nepaul@gmail.com"
COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY dist /app/static
# RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
#     ln -sf /dev/stderr /var/log/nginx/error.log
CMD ["nginx", "-g", "daemon off;"]
