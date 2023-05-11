# make [command]

################
# コンテナ起動
################
up:
	docker-compose up
# デタッチモードオプション
detach:
	docker-compose up -d

######################
# コンテナ停止・削除
######################
down:
	docker-compose down
# ボリューム & ローカルイメージ 削除オプション
# package.json内に記載している利用しているライブラリをいじったときに使う
reset:
	docker-compose down --volumes --rmi local