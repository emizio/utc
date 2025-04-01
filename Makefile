test:
	@env TZ=Asia/Kolkata pnpm exec vitest run

test-watch:
	@env TZ=Asia/Kolkata pnpm exec vitest

types:
	@pnpm exec tsc --noEmit

types-watch:
	@pnpm exec tsc --noEmit --watch

test-types: build 
	@pnpm exec attw --pack lib

build: prepare-build
	@pnpm exec tsc -p tsconfig.lib.json 
	@env BABEL_ENV=esm pnpm exec babel src --config-file ./babel.config.json --source-root src --out-dir lib --extensions .js,.ts --out-file-extension .js --quiet
	@node copy.mjs

prepare-build:
	@rm -rf lib
	@mkdir -p lib

publish: build
	@cd lib && pnpm publish --access public

publish-next: build
	@cd lib && pnpm publish --access public --tag next

link:
	@pnpm link --global
