# 官方 image 地址：https://hub.docker.com/_/mongo/

# 
docker run -itd -p 127.0.0.1:27017:27017 --name puf-mongo -d mongo

# 挂在宿主机 volumn，windows&mac 无法使用
docker run -itd -p 127.0.0.1:27017:27017 -v /docker-data/mongo:/data/db --name uf-mongo -d mongo
