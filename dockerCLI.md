docker pull busybox

Using default tag: latest
latest: Pulling from library/busybox
45a0cdc5c8d3: Pull complete
Digest: sha256:3b3128d9df6bbbcc92e2358e596c9fbd722a437a62bafbc51607970e9e3b8869
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

docker images

REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
busybox      latest    334e4a014c81   11 days ago   4.86MB

docker run --name pinger -it busybox ping netology.ru

PING netology.ru (188.114.99.225): 56 data bytes
64 bytes from 188.114.99.225: seq=0 ttl=37 time=38.586 ms
64 bytes from 188.114.99.225: seq=1 ttl=37 time=40.167 ms
64 bytes from 188.114.99.225: seq=2 ttl=37 time=41.870 ms
64 bytes from 188.114.99.225: seq=3 ttl=37 time=34.843 ms
64 bytes from 188.114.99.225: seq=4 ttl=37 time=194.764 ms
64 bytes from 188.114.99.225: seq=5 ttl=37 time=225.453 ms
64 bytes from 188.114.99.225: seq=6 ttl=37 time=194.557 ms

docker logs -f -t pinger

2022-12-18T14:54:23.923430697Z PING netology.ru (188.114.99.225): 56 data bytes
2022-12-18T14:54:23.961949552Z 64 bytes from 188.114.99.225: seq=0 ttl=37 time=38.586 ms
2022-12-18T14:54:24.964087772Z 64 bytes from 188.114.99.225: seq=1 ttl=37 time=40.167 ms
2022-12-18T14:54:25.966081895Z 64 bytes from 188.114.99.225: seq=2 ttl=37 time=41.870 ms
2022-12-18T14:54:26.959611329Z 64 bytes from 188.114.99.225: seq=3 ttl=37 time=34.843 ms
2022-12-18T14:54:28.119860243Z 64 bytes from 188.114.99.225: seq=4 ttl=37 time=194.764 ms

docker stop pinger
pinger

docker start pinger
pinger

docker ps -a
CONTAINER ID   IMAGE     COMMAND              CREATED          STATUS         PORTS     NAMES
bf9be2274c48   busybox   "ping netology.ru"   11 minutes ago   Up 2 minutes             pinger

docker logs -f -t pinger

2022-12-18T15:07:02.460901453Z 64 bytes from 188.114.99.225: seq=245 ttl=37 time=68.351 ms
2022-12-18T15:07:03.453823691Z 64 bytes from 188.114.99.225: seq=246 ttl=37 time=60.988 ms
2022-12-18T15:07:04.553217636Z 64 bytes from 188.114.99.225: seq=247 ttl=37 time=160.187 ms
2022-12-18T15:07:05.466520040Z 64 bytes from 188.114.99.225: seq=248 ttl=37 time=73.366 ms
2022-12-18T15:07:06.451587687Z 64 bytes from 188.114.99.225: seq=249 ttl=37 time=58.348 ms
2022-12-18T15:07:07.468110335Z 64 bytes from 188.114.99.225: seq=250 ttl=37 time=74.505 ms
2022-12-18T15:07:08.448096602Z 64 bytes from 188.114.99.225: seq=251 ttl=37 time=54.486 ms


2022-12-18T14:54:23.923430697Z PING netology.ru (188.114.99.225): 56 data bytes
2022-12-18T14:54:58.111731714Z --- netology.ru ping statistics ---
2022-12-18T14:54:58.111734610Z 35 packets transmitted, 35 packets received, 0% packet loss
2022-12-18T14:54:58.111771861Z round-trip min/avg/max = 33.752/117.588/305.858 ms
2022-12-18T15:02:57.331304694Z PING netology.ru (188.114.99.225): 56 data bytes


docker rm -f pinger
pinger

docker rmi busybox
Untagged: busybox:latest
Untagged: busybox@sha256:3b3128d9df6bbbcc92e2358e596c9fbd722a437a62bafbc51607970e9e3b8869
Deleted: sha256:334e4a014c81bd4050daa78c7dfd2ae87855e9052721c164ea9d9d9a416ebdd3
Deleted: sha256:98004ed6104b2f4cc21559ea6e4a742ebf6731e37b5d1b04013ca68862749ba3


docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES













