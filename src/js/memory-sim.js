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
            { line: 8, stack: [{label:'p', val: 'null'}], heap: [], expl: "Step 1: Declaration. Reference 'p' is created on the Stack but points to null." },
            { line: 8, stack: [{label:'p', val: '0x101 (pending)'}], heap: [{addr:'0x101', val:'Person {name: null}'}], expl: "Step 2: Allocation. Memory is allocated on the Heap at address 0x101. Fields get default values (null)." },
            { line: 3, stack: [{label:'p', val: '0x101'}, {label:'this', val: '0x101'}, {label:'n', val: '"Bob"'}], heap: [{addr:'0x101', val:'Person {name: null}'}], expl: "Step 3: Constructor Call. New frame on Stack. 'this' points to the object. Parameters are assigned." },
            { line: 4, stack: [{label:'p', val: '0x101'}, {label:'this', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "Bob"}'}], expl: "Step 4: Field Assignment. The 'name' field on the Heap is updated. String 'Bob' is actually in the Pool (0x999)." },
            { line: 8, stack: [{label:'p', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "Bob"}'}], expl: "Step 5: Completion. Constructor frame is popped. 'p' now fully points to the initialized object." }
        ]
    },
    reference: {
        code: `Person p1 = new Person("A");
Person p2 = p1;
p1 = new Person("B");`,
        steps: [
            { line: 1, stack: [{label:'p1', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "A"}'}], expl: "p1 points to Object A at 0x101." },
            { line: 2, stack: [{label:'p1', val: '0x101'}, {label:'p2', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "A"}'}], expl: "Reference Copy. p2 now points to the same memory address (0x101) as p1." },
            { line: 3, stack: [{label:'p1', val: '0x202'}, {label:'p2', val: '0x101'}], heap: [{addr:'0x101', val:'Person {name: "A"}'}, {addr:'0x202', val:'Person {name: "B"}'}], expl: "Reassignment. p1 points to a new object at 0x202. p2 still points to 0x101." }
        ]
    },
    stringpool: {
        code: `String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");`,
        steps: [
            { line: 1, stack: [{label:'s1', val: '0x100'}], heap: [{addr:'0x100', val:'"Java" (Pool)'}], expl: "s1 points to 'Java' in the String Constant Pool." },
            { line: 2, stack: [{label:'s1', val: '0x100'}, {label:'s2', val: '0x100'}], heap: [{addr:'0x100', val:'"Java" (Pool)'}], expl: "s2 literal found in Pool. Points to same 0x100 address. s1 == s2 is true." },
            { line: 3, stack: [{label:'s1', val: '0x100'}, {label:'s2', val: '0x100'}, {label:'s3', val: '0x200'}], heap: [{addr:'0x100', val:'"Java" (Pool)'}, {addr:'0x200', val:'String Object -> 0x100'}], expl: "'new' keyword forces a new Object on the Heap (0x200), even if the literal is in the Pool. s1 == s3 is false." }
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
            { line: 5, stack: [{label:'pt', val: '0x501'}], heap: [{addr:'0x501', val:'Point {x:10, y:10}'}], expl: "Main: pt created at 0x501." },
            { line: 2, stack: [{label:'pt', val: '0x501'}, {label:'p', val: '0x501'}], heap: [{addr:'0x501', val:'Point {x:100, y:10}'}], expl: "Swap(): 'p' is a copy of the reference pt (both 0x501). Changing p.x affects the same object." },
            { line: 3, stack: [{label:'pt', val: '0x501'}, {label:'p', val: '0x606'}], heap: [{addr:'0x501', val:'Point {x:100, y:10}'}, {addr:'0x606', val:'Point {x:0, y:0}'}], expl: "Swap(): 'p' reassigned to 0x606. The original 'pt' in main still points to 0x501. This is why Java is always pass-by-value." }
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

    const expl = document.getElementById('simExplanation');
    if(expl) expl.innerText = step.expl;
}
