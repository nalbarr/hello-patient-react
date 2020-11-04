help:
	@echo make install
	@echo make start
	@echo make run-ui
	@echo make run-api
	@echo make run
	@echo make run

install:
	yarn install

run-ui:
	yarn start

run-api:
	yarn mock:api

run:
	yarn dev
