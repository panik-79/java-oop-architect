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
        why: 'Encapsulates a request as an object, allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations.',
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
        why: 'Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.',
        tradeoff: 'Can result in a system with many small objects that all look alike.'
    },
    {
        goal: 'creation',
        constraints: ['lowmemory'],
        pattern: 'Flyweight Pattern',
        why: 'Use sharing to support large numbers of fine-grained objects efficiently.',
        tradeoff: 'Increases complexity in state management (intrinsic vs extrinsic state).'
    }
];

export function initMatrix() {
    window.runMatrix = () => {
        const goal = document.getElementById('matrixGoal').value;
        const constraints = Array.from(document.querySelectorAll('input[name="constraint"]:checked')).map(c => c.value);
        
        // Find best match: check goal and see if any rule matches all current constraints
        // If multiple matches, pick the one with most constraint matches
        const matches = rules.filter(r => r.goal === goal);
        
        let bestMatch = null;
        if (matches.length > 0) {
            // Pick match that satisfies the most selected constraints
            bestMatch = matches.reduce((best, current) => {
                const currentScore = current.constraints.filter(c => constraints.includes(c)).length;
                const bestScore = best ? best.constraints.filter(c => constraints.includes(c)).length : -1;
                return currentScore >= bestScore ? current : best;
            }, null);
        }
        
        const content = document.getElementById('matrixResultContent');
        if (!bestMatch || goal === '') {
            content.innerHTML = '<div class="result-placeholder" style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-style:italic;">Select a goal and constraints to see the architect\'s recommendation...</div>';
            return;
        }

        content.innerHTML = `
            <div class="result-card">
                <div class="result-pattern">${bestMatch.pattern}</div>
                <div class="result-why"><strong>The "Why":</strong> ${bestMatch.why}</div>
                <div class="result-tradeoff"><strong>Architectural Cost:</strong> ${bestMatch.tradeoff}</div>
            </div>
        `;
    };
}
