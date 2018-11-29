BUILD_DIR = .build
TEST_DIR = .

build:
	mkdir $(BUILD_DIR)
	git archive HEAD | tar -x -C $(BUILD_DIR)
	cd $(BUILD_DIR); \
		npm install; \
		npm run build;
.PHONY: build

test:
	cd $(TEST_DIR); \
		npm run test
.PHONY: test

release: TEST_DIR=$(BUILD_DIR)
release: guard-SEMVER clean build test
	cd $(BUILD_DIR); \
		npm --no-git-tag-version version $(SEMVER); \
		npm publish --dry-run
.PHONY: release

clean:
	rm -rf $(BUILD_DIR)
.PHONY: clean

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* not set"; \
		exit 1; \
	fi
