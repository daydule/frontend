# make [command]

# 
# コンテナ起動
# 
up:
	docker-compose up
# デタッチモードオプション
detach:
	docker-compose up -d

# 
# コンテナ停止・削除
# 
down:
	docker-compose down
# ローカルイメージ削除オプション
rmi:
	docker-compose down --rmi local
