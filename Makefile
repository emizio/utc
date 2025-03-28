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
	@env BABEL_ENV=cjs pnpm exec babel src --config-file ./babel.config.json --source-root src --out-dir lib --extensions .js,.ts --out-file-extension .cjs --quiet
	@node copy.mjs
	@make build-cts
	@make copy-declarations
	
build-cts:
	@find lib -name '*.d.ts' | while read file; do \
		new_file=$${file%.d.ts}.d.cts; \
		cp $$file $$new_file; \
	done

# New target to move declaration files to match package.json expectations
copy-declarations:
	@cp lib/index.d.ts ./index.d.ts
	@cp lib/index.d.cts ./index.d.cts
	@mkdir -p date utc
	@cp lib/date/index.d.ts ./date/
	@cp lib/date/index.d.cts ./date/
	@cp lib/date/mini.d.ts ./date/
	@cp lib/date/mini.d.cts ./date/
	@cp lib/utc/index.d.ts ./utc/
	@cp lib/utc/index.d.cts ./utc/

prepare-build:
	@rm -rf lib
	@mkdir -p lib
	@rm -f index.d.ts index.d.cts
	@rm -rf date utc

publish: build
	@cd lib && pnpm publish --access public

publish-next: build
	@cd lib && pnpm publish --access public --tag next

link:
	@cd lib && pnpm link
