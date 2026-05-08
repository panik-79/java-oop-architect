const rules = [
    {
        goal: 'extensibility',
        constraints: [],
        pattern: 'Abstract Factory / Strategy',
        why: 'Use an interface to define behavior and allow new types to be added without modifying existing code (OCP).',
        tradeoff: 'Increased number of classes. Might be overkill for simple systems.'
    },
    {
        goal: 'behavior',
        constraints: [],
        pattern: 'Visitor Pattern',
        why: 'Excellent for adding operations to complex object structures without modifying the objects themselves.',
        tradeoff: 'Breaks encapsulation. Hard to maintain if object hierarchy changes often.'
    },
    {
        goal: 'decoupling',
        constraints: ['distributed'],
        pattern: 'Observer / Event Bus',
        why: 'Allows components to react to events asynchronously without knowing about each other.',
        tradeoff: 'Makes the flow of control harder to follow and debug.'
    },
    {
        goal: 'decoupling',
        constraints: ['dynamic'],
        pattern: 'Command Pattern',
        why: 'Encapsulates a request as an object, allowing you to parameterize clients with different requests and support undo.',
        tradeoff: 'Increased number of classes for each command.'
    },
    {
        goal: 'state',
        constraints: ['dynamic'],
        pattern: 'State Pattern',
        why: 'Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.',
        tradeoff: 'Can be over-engineered if state transitions are simple.'
    },
    {
        goal: 'creation',
        constraints: ['immutable'],
        pattern: 'Builder Pattern',
        why: 'Cleanly constructs complex, immutable objects. Prevents telescoping constructors and ensures object validity.',
        tradeoff: 'Requires a separate builder class for each domain object.'
    },
    {
        goal: 'wrapping',
        constraints: ['dynamic'],
        pattern: 'Decorator Pattern',
        why: 'Attaches additional responsibilities to an object dynamically. Flexible alternative to subclassing.',
        tradeoff: 'Can result in a system with many small objects that all look alike.'
    },
    {
        goal: 'skeleton',
        constraints: [],
        pattern: 'Template Method',
        why: 'Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.',
        tradeoff: 'Rigid structure. Subclasses are tied to the algorithm skeleton.'
    },
    {
        goal: 'guard',
        constraints: ['threadsafety'],
        pattern: 'Proxy Pattern (Synchronized)',
        why: 'Provides a surrogate or placeholder for another object to control access (synchronization, lazy loading).',
        tradeoff: 'Adds a layer of indirection. Can hide performance bottlenecks.'
    },
    {
        goal: 'creation',
        constraints: ['lowmemory'],
        pattern: 'Flyweight / Prototype',
        why: 'Use sharing (Flyweight) or cloning (Prototype) to manage large numbers of objects efficiently.',
        tradeoff: 'Flyweight increases complexity. Prototype requires careful deep-copy implementation.'
    }
];

export function initMatrix() {
    window.runMatrix = () => {
        const goal = document.getElementById('matrixGoal').value;
        const constraints = Array.from(document.querySelectorAll('input[name="constraint"]:checked')).map(c => c.value);
        
        const matches = rules.filter(r => r.goal === goal);
        
        let bestMatch = null;
        if (matches.length > 0) {
            bestMatch = matches.reduce((best, current) => {
                const currentScore = current.constraints.filter(c => constraints.includes(c)).length;
                const bestScore = best ? best.constraints.filter(c => constraints.includes(c)).length : -1;
                return currentScore >= bestScore ? current : best;
            }, null);
        }
        
        const content = document.getElementById('matrixResultContent');
        if (!bestMatch || goal === '') {
            content.innerHTML = `
                <div class="result-placeholder" style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-muted); text-align:center; gap:1rem;">
                    <i class="ri-search-eye-line" style="font-size:2rem; opacity:0.3;"></i>
                    <p>Select your architectural goal to see the recommendation.<br><small>Try selecting constraints like 'Distributed' or 'Immutable' for more specific patterns.</small></p>
                </div>`;
            return;
        }

        content.innerHTML = `
            <div class="result-card">
                <div class="result-pattern">${bestMatch.pattern}</div>
                <div class="result-why"><strong>Senior Insight:</strong> ${bestMatch.why}</div>
                <div class="result-tradeoff"><strong>Architectural Cost:</strong> ${bestMatch.tradeoff}</div>
            </div>
        `;
    };
}
