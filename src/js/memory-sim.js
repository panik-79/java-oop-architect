const scenarios = {
    constructor: {
        code: `public class Person {
    String name;
    public Person(String n) {
        this.name = n;
    }
}
// Execution
Person p = new Person("Bob");`,
        steps: [
            { line: 10, stack: [{label:'p', val: 'null'}], heap: [], meta: [], expl: "Step 1: Declaration. Reference 'p' is created on the Stack but points to null." },
            { line: 10, stack: [{label:'p', val: '0x101 (pending)'}], heap: [{addr:'0x101', val:'Person {name: null}'}], meta: [{addr:'Class', val:'Person.class'}], expl: "Step 2: Allocation. Memory is allocated on the Heap. The 'Method Area' already contains the Class metadata (Person.class)." },
            { line: 5, stack: [{label:'p', val: '0x101'}, {label:'this', val: '0x101'}, {label:'n', val: '"Bob"'}], heap: [{addr:'0x101', val:'Person {name: null}'}], meta: [{addr:'Class', val:'Person.class'}], expl: "Step 3: Constructor Call. New frame on Stack. 'this' points to the object. Parameters are assigned." },
            { line: 6, stack: [{label:'p', val: '0x101'}, {label:'this', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "Bob"}'}], meta: [{addr:'Class', val:'Person.class'}], expl: "Step 4: Field Assignment. The 'name' field on the Heap is updated." },
            { line: 10, stack: [{label:'p', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "Bob"}'}], meta: [{addr:'Class', val:'Person.class'}], expl: "Step 5: Completion. Constructor frame is popped. 'p' now fully points to the object." }
        ]
    },
    reference: {
        code: `Person p1 = new Person("A");
Person p2 = p1;
p1 = new Person("B");`,
        steps: [
            { line: 1, stack: [{label:'p1', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "A"}'}], meta: [], expl: "p1 points to Object A at 0x101." },
            { line: 2, stack: [{label:'p1', val: '0x101'}, {label:'p2', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "A"}'}], meta: [], expl: "Reference Copy. p2 now points to the same memory address (0x101) as p1." },
            { line: 3, stack: [{label:'p1', val: '0x202'}, {label:'p2', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "A"}'}, {addr:'0x202', val:'Person {name: "B"}'}], meta: [], expl: "Reassignment. p1 points to a new object at 0x202. p2 still points to 0x101." }
        ]
    },
    stringpool: {
        code: `String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");`,
        steps: [
            { line: 1, stack: [{label:'s1', val: '0x100'}], heap: [], meta: [{addr:'Pool', val:'"Java" (0x100)'}], expl: "s1 points to 'Java' in the String Constant Pool (Method Area)." },
            { line: 2, stack: [{label:'s1', val: '0x100'}, {label:'s2', val: '0x100'}], heap: [], meta: [{addr:'Pool', val:'"Java" (0x100)'}], expl: "s2 literal found in Pool. Points to same 0x100 address. s1 == s2 is true." },
            { line: 3, stack: [{label:'s1', val: '0x100'}, {label:'s2', val: '0x100'}, {label:'s3', val: '0x200'}], heap: [{addr:'0x200', val:'String Object -> 0x100'}], meta: [{addr:'Pool', val:'"Java" (0x100)'}], expl: "'new' keyword forces a new Object on the Heap (0x200), even if literal is in Pool. s1 == s3 is false." }
        ]
    },
    passbyvalue: {
        code: `void swap(Point p) {
    p.x = 100;
    p = new Point(0,0);
}
Point pt = new Point(10,10);
swap(pt);`,
        steps: [
            { line: 5, stack: [{label:'pt', val: '0x501'}], heap: [{addr:'0x501', val:'Point {x:10, y:10}'}], meta: [], expl: "Main: pt created at 0x501." },
            { line: 2, stack: [{label:'pt', val: '0x501'}, {label:'p', val: '0x501'}], heap: [{addr:'0x501', val:'Point {x:100, y:10}'}], meta: [], expl: "Swap(): 'p' is a copy of reference pt (both 0x501). Changing p.x affects the original object." },
            { line: 3, stack: [{label:'pt', val: '0x501'}, {label:'p', val: '0x606'}], heap: [{addr:'0x501', val:'Point {x:100, y:10}'}, {addr:'0x606', val:'Point {x:0, y:0}'}], meta: [], expl: "Swap(): 'p' reassigned to 0x606. The original 'pt' in main still points to 0x501. Pass-by-value proved." }
        ]
    },
    staticflow: {
        code: `public class Counter {
    static int count = 0;
    void inc() { count++; }
}
// 1. Access static directly
Counter.count = 10;
// 2. Access via instance
Counter c1 = new Counter();
c1.inc();`,
        steps: [
            { line: 2, stack: [], heap: [], meta: [{addr:'Static', val:'count = 0'}], expl: "Step 1: Class Loading. Static members are initialized in the Method Area before any objects are created." },
            { line: 6, stack: [], heap: [], meta: [{addr:'Static', val:'count = 10'}], expl: "Step 2: Global State. We can access 'count' directly via the class. No Heap allocation needed yet." },
            { line: 8, stack: [{label:'c1', val:'0x101'}], heap: [{addr:'0x101', val:'Counter Object'}], meta: [{addr:'Static', val:'count = 10'}], expl: "Step 3: Instance Creation. Object c1 points back to its class metadata and shared static state." },
            { line: 9, stack: [{label:'c1', val:'0x101'}], heap: [{addr:'0x101', val:'Counter Object'}], meta: [{addr:'Static', val:'count = 11'}], expl: "Step 4: Modification. Calling inc() via c1 updates the SHARED variable in the Method Area. All instances see this." }
        ]
    },
    dispatch: {
        code: `Animal a = new Dog();
// invokevirtual makeSound()
a.makeSound();`,
        steps: [
            { line: 1, stack: [{label:'a', val: '0x777'}], heap: [{addr:'0x777', val:'Dog Instance'}], meta: [{addr:'V-Table', val:'Dog: makeSound -> Dog::bark'}], expl: "Step 1: Polymorphism. Variable 'a' is typed as Animal but points to a Dog in the Heap." },
            { line: 3, stack: [{label:'a', val: '0x777'}], heap: [{addr:'0x777', val:'Dog Instance'}], meta: [{addr:'V-Table', val:'Dog: makeSound -> Dog::bark'}], expl: "Step 2: Runtime Dispatch. The JVM looks at the instance at 0x777, sees it's a Dog, and uses Dog's V-Table to find the actual code to run. Dog's 'bark' is executed." }
        ]
    }
};

let currentScenario = 'constructor';
let currentStep = 0;

export function initMemorySim() {
    window.loadScenario = (val) => {
        currentScenario = val;
        currentStep = 0;
        updateSim();
    };

    window.nextSimStep = () => {
        if (currentStep < scenarios[currentScenario].steps.length - 1) {
            currentStep++;
            updateSim();
        }
    };

    window.prevSimStep = () => {
        if (currentStep > 0) {
            currentStep--;
            updateSim();
        }
    };

    updateSim();
}

function updateSim() {
    const sc = scenarios[currentScenario];
    if (!sc) return;
    const step = sc.steps[currentStep];

    const counter = document.getElementById('simStepCounter');
    if(counter) counter.innerText = `Step ${currentStep + 1} / ${sc.steps.length}`;

    const codeDisplay = document.getElementById('simCodeDisplay');
    if(codeDisplay) {
        const lines = sc.code.split('\n');
        codeDisplay.innerHTML = lines.map((l, i) => 
            `<div class="${i + 1 === step.line ? 'line-highlight' : ''}">${l}</div>`
        ).join('');
    }

    const stack = document.getElementById('stackContainer');
    if(stack) {
        stack.innerHTML = step.stack.map(s => 
            `<div class="mem-block highlight"><strong>${s.label}:</strong> ${s.val}</div>`
        ).reverse().join('');
    }

    const heap = document.getElementById('heapContainer');
    if(heap) {
        heap.innerHTML = step.heap.map(h => 
            `<div class="mem-block pointer" data-addr="${h.addr}">${h.val}</div>`
        ).join('');
    }

    const meta = document.getElementById('metaContainer');
    if(meta) {
        meta.innerHTML = (step.meta || []).map(m => 
            `<div class="mem-block" style="border-color:var(--amber); color:var(--amber)" data-addr="${m.addr}">${m.val}</div>`
        ).join('');
    }

    const expl = document.getElementById('simExplanation');
    if(expl) expl.innerText = step.expl;
}
