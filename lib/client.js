window.__ModuleLoader__.load({
	id: "dsh-composer-modenter",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		function isComposerEnter(event) {
			return event.key === "Enter" || event.key === "NumpadEnter";
		}

		function isComposing(event) {
			return event.isComposing === true || event.keyCode === 229;
		}

		function composerRoot(target) {
			if (target instanceof Element) return target.closest("[data-composer-input]");
			if (target instanceof Node) return target.parentElement?.closest("[data-composer-input]") ?? null;
			return null;
		}

		function menuOpen(composer) {
			const card = composer.closest("[data-composer-card]");
			if (card?.querySelector("[data-trigger-menu]")) return true;
			if (card?.querySelector("[aria-haspopup][aria-expanded='true']")) return true;
			return document.querySelector("[data-trigger-menu]") !== null;
		}

		function forceShiftEnter(event) {
			try {
				Object.defineProperty(event, "shiftKey", {
					configurable: true,
					get() {
						return true;
					},
				});
			} catch {
				// Native KeyboardEvent fields are sometimes frozen.
			}
			return event.shiftKey === true;
		}

		function apply(ctx) {
			ctx.effect(() => {
				const onKeyDown = (event) => {
					if (!isComposerEnter(event)) return;
					if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;
					if (isComposing(event)) return;
					const composer = composerRoot(event.target);
					if (composer === null) return;
					if (menuOpen(composer)) return;
					if (forceShiftEnter(event)) return;
					event.preventDefault();
					event.stopImmediatePropagation();
					document.execCommand("insertLineBreak");
				};
				document.addEventListener("keydown", onKeyDown, true);
				return () => {
					document.removeEventListener("keydown", onKeyDown, true);
				};
			}, "composer-modenter: enter-to-newline");
		}

		exports.apply = apply;
		return module.exports;
	}
});
