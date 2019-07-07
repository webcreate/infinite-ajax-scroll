BUILD_DIR = .build
TEST_DIR = .
SEMVER=prerelease --preid=beta

install:
	npm install
	npm run build
	cd examples/articles && npm install && npm link && npm run build;
	cd examples/blocks && npm install && npm link && npm run build;
	cd examples/masonry && npm install && npm link && npm run build;
.PHONY: install

up:
	npm run start
	open http://localhost:8080
.PHONY: up

bump:
	npm --no-git-tag-version version $(SEMVER);
.PHONY: bump

build: guard-SEMVER
	mkdir $(BUILD_DIR)
	git archive HEAD | tar -x -C $(BUILD_DIR)
	cd $(BUILD_DIR); \
		npm install; \
		npm run build --production;
.PHONY: build

test:
	cd $(TEST_DIR); \
		npm run lint && \
		npm run test
.PHONY: test

release: TEST_DIR=$(BUILD_DIR)
release: clean build test
	cd $(BUILD_DIR); \
		npm publish
.PHONY: release

clean:
	rm -rf $(BUILD_DIR)
.PHONY: clean

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* not set"; \
		exit 1; \
	fi
