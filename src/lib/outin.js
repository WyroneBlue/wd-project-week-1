import { append_styles } from "svelte/internal";

export default function outin(settings) {
    const states = [ 1, 2, 3, 4, 5, 6, 7 ];
    const [ INIT, OUTRO, INTRO_DELAYED, INTRO, COMPLETED, ABORTED, UNDO ] = states;
    const className = "svelte-outin";
    const concurrent = {};
    function findActive(node) {
        const found = Object.entries(concurrent).find(([ , entry ]) => entry.out === node || entry.in === node);
        if (found) {
            return [ found[ 1 ], found[ 0 ] ];
        }
        return [ void 0, -1 ];
    }
    let idle = true;
    const starting = [];
    let autoincrement = 0;
    function splitOptions(transition) {
        return Array.isArray(transition) ? transition : [ transition, {} ];
    }
    const [ outFn, outParams ] = settings.out ? splitOptions(settings.out) : splitOptions(settings.transition);
    const [ inFn, inParams ] = settings.in ? splitOptions(settings.in) : splitOptions(settings.transition);
    function outro(node, options) {
        const config = outFn(node, { ...outParams, ...options });
        const { position } = window.getComputedStyle(node);
        if ([ "fixed", "absolute" ].indexOf(position) === -1) {
            append_styles(node, "outin", `.svelte-outin { position: absolute !important; }`);
            node.classList.add(className);
        }
        let [ active ] = findActive(node);
        if (active) {
            if (idle) {
                active.out = node;
                active.in = void 0;
            }
        } else if (idle) {
            active = {
                delay: (config.duration ?? 0) + (config.delay ?? 0),
                out: node,
                in: void 0,
                state: INIT
            };
            autoincrement += 1;
            concurrent[ autoincrement ] = active;
        } else {
            return config;
        }
        if (idle) {
            starting.push(active);
        }
        if (active.state === INIT) {
            if (idle) {
                active.state = OUTRO;
                node.addEventListener("outroend", onOutroEnd);
            }
        } else if (active.state === INTRO) {
            active.state = UNDO;
        } else if (active.state === INTRO_DELAYED) {
            active.state = ABORTED;
        }
        return config;
    }
    function onOutroEnd(e) {
        const node = e.target;
        node.removeEventListener("outroend", onOutroEnd);
        const [ active ] = findActive(node);
        if (!active) {
            return;
        }
        if (active.state === INTRO_DELAYED) {
            active.state = INTRO;
        }
    }
    function intro(node, options) {
        node.classList.remove(className);
        const config = inFn(node, {
            ...inParams,
            ...options
        });
        let [ active ] = findActive(node);
        if (idle) {
            const startIndex = starting.findIndex((start) => start.in === void 0);
            let last = true;
            if (startIndex !== -1) {
                active = starting[ startIndex ];
                active.in = node;
                last = startIndex === starting.length - 1;
            }
            if (last) {
                idle = true;
                starting.length = 0;
            }
        }
        if (!active) {
            idle = false;
            starting.length = 0;
            return config;
        }
        if (!active.in) {
            active.in = node;
        }
        const first = active.in === node;
        if (active.state === OUTRO) {
            if (active.delay === 0) {
                if (first) {
                    active.state = INTRO;
                    node.addEventListener("introend", onIntroEnd);
                }
            } else {
                config.delay = active.delay + (config.delay ?? 0);
                if (first) {
                    active.state = INTRO_DELAYED;
                    node.addEventListener("introend", onIntroEnd);
                }
            }
        } else if (active.state === INTRO_DELAYED) {
            config.delay = active.delay + (config.delay ?? 0);
        } else if (active.state === ABORTED) {
            if (first) {
                active.state = INTRO;
                node.addEventListener("introend", onIntroEnd);
            }
        } else if (active.state === UNDO) {
            if (first) {
                active.state = INTRO_DELAYED;
                config.delay = active.delay + (config.delay ?? 0);
                node.addEventListener("introend", onIntroEnd);
            }
        }
        return config;
    }
    function onIntroEnd(e) {
        e.target.removeEventListener("introend", onIntroEnd);
        const [ ref, id ] = findActive(e.target);
        if (!ref) {
            return;
        }
        if (ref.state === INTRO) {
            ref.state = COMPLETED;
            delete concurrent[ id ];
        } else if (ref.state === INTRO_DELAYED) {
            ref.state = COMPLETED;
            ref.out.removeEventListener("outroend", onOutroEnd);
            delete concurrent[ id ];
        }
    }
    return [ outro, intro ];
}
