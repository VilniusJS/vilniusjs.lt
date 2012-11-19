.PHONY: default build run deploy


default: build


build:
	jekyll

run:
	jekyll --server

deploy:
	git push
