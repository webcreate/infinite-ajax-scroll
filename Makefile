BUILD_DIR = .build
TEST_DIR = .
SEMVER=prerelease --preid=beta

EXAMPLES=$(dir $(wildcard examples/*/package.json))

install:
	npm install
	npm run build
	$(foreach ex,$(EXAMPLES),(cd $(ex) && npm install && npm run link && npm run build) || exit $$?;)
.PHONY: install

update:
	$(foreach ex,$(EXAMPLES),(cd $(ex) && npm update) || exit $$?;)
.PHONY: update

up:
	npm run start
	open http://localhost:8080
.PHONY: up

bump: guard-SEMVER
	npm --no-git-tag-version version $(SEMVER);
.PHONY: bump

build:
	mkdir $(BUILD_DIR)
	git archive HEAD | tar -x -C $(BUILD_DIR)
	cd $(BUILD_DIR); \
		npm ci; \
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
	npm pack @webcreate/infinite-ajax-scroll
	make clean
.PHONY: release

clean:
	rm -rf $(BUILD_DIR)
.PHONY: clean

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* not set"; \
		exit 1; \
	fi
