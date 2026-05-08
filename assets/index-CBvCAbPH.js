(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function t(n){if(n.ep)return;n.ep=!0;const c=e(n);fetch(n.href,c)}})();const v=`<div id="abstract-classes" class="section">
  <div class="breadcrumb">handbook / <span>section 10</span></div>
  <div class="section-eyebrow">The Foundations</div>
  <h1>Abstract Classes: Partial Reality</h1>
  <div class="section-desc">Abstract classes sit between pure interfaces and concrete classes. They are the primary tool for building <strong>Frameworks</strong>, the <strong>Template Method Pattern</strong>, and defining a shared identity across a hierarchy.</div>

  <h2>1. What is an Abstract Class?</h2>
  <p>An abstract class is a class that is declared with the <code>abstract</code> keyword. It <strong>cannot be instantiated</strong> but can be used as a base for other classes. It allows you to share both <strong>State</strong> (fields) and <strong>Behavior</strong> (methods).</p>

  <h2>2. The Template Method Pattern (Senior implementation)</h2>
  <p>This is the most common use case for abstract classes. You define the <strong>Skeleton</strong> of an algorithm in a <code>final</code> method, but leave specific steps as <code>abstract</code> for subclasses to fill in. You can also provide <strong>Hooks</strong> (empty concrete methods).</p>
  <pre><code><span class="kw">public abstract class</span> <span class="cl">DataProcessor</span> {
    <span class="cm">// The Template Method (final to prevent overriding)</span>
    <span class="kw">public final void</span> <span class="fn">process</span>() {
        <span class="fn">readData</span>();
        <span class="fn">transformData</span>();
        <span class="kw">if</span> (<span class="fn">shouldSave</span>()) { <span class="fn">saveData</span>(); } <span class="cm">// Hook</span>
    }
    <span class="kw">protected abstract void</span> <span class="fn">readData</span>();
    <span class="kw">protected abstract void</span> <span class="fn">transformData</span>();
    <span class="kw">protected boolean</span> <span class="fn">shouldSave</span>() { <span class="kw">return true</span>; } <span class="cm">// Hook with default value</span>
    <span class="kw">private void</span> <span class="fn">saveData</span>() { ... }
}</code></pre>

  <h3>Concrete Implementation</h3>
  <pre><code><span class="kw">public class</span> <span class="cl">CsvProcessor</span> <span class="kw">extends</span> <span class="cl">DataProcessor</span> {
    <span class="kw">@Override</span>
    <span class="kw">protected void</span> <span class="fn">readData</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Reading CSV file..."</span>);
    }

    <span class="kw">@Override</span>
    <span class="kw">protected void</span> <span class="fn">transformData</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Parsing CSV rows..."</span>);
    }
}

<span class="kw">public class</span> <span class="cl">JsonProcessor</span> <span class="kw">extends</span> <span class="cl">DataProcessor</span> {
    <span class="kw">@Override</span>
    <span class="kw">protected void</span> <span class="fn">readData</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Reading JSON..."</span>);
    }

    <span class="kw">@Override</span>
    <span class="kw">protected void</span> <span class="fn">transformData</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Mapping JSON to objects..."</span>);
    }

    <span class="kw">@Override</span>
    <span class="kw">protected boolean</span> <span class="fn">shouldSave</span>() { <span class="kw">return false</span>; } <span class="cm">// override hook!</span>
}

<span class="cm">// Usage — the algorithm skeleton is fixed, steps are pluggable</span>
<span class="cl">DataProcessor</span> p1 = <span class="kw">new</span> <span class="cl">CsvProcessor</span>();
p1.<span class="fn">process</span>(); <span class="cm">// reads CSV, transforms, then saves</span>

<span class="cl">DataProcessor</span> p2 = <span class="kw">new</span> <span class="cl">JsonProcessor</span>();
p2.<span class="fn">process</span>(); <span class="cm">// reads JSON, transforms, does NOT save</span>
</code></pre>

  <h2>3. Why have a Constructor in an Abstract Class?</h2>
  <p>To initialize the shared state of the parent class. When a child is created, <code>super()</code> runs the abstract parent's constructor.</p>
  <pre><code><span class="kw">public abstract class</span> <span class="cl">BaseEntity</span> {
    <span class="kw">private final</span> <span class="cl">String</span> id;
    <span class="kw">private final</span> <span class="cl">LocalDateTime</span> createdAt;

    <span class="kw">protected</span> <span class="cl">BaseEntity</span>(<span class="cl">String</span> id) {
        <span class="kw">this</span>.id = id;
        <span class="kw">this</span>.createdAt = <span class="cl">LocalDateTime</span>.<span class="fn">now</span>();
    }

    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">getId</span>() { <span class="kw">return</span> id; }
    <span class="kw">public</span> <span class="cl">LocalDateTime</span> <span class="fn">getCreatedAt</span>() { <span class="kw">return</span> createdAt; }
}

<span class="kw">public class</span> <span class="cl">User</span> <span class="kw">extends</span> <span class="cl">BaseEntity</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;

    <span class="kw">public</span> <span class="cl">User</span>(<span class="cl">String</span> id, <span class="cl">String</span> name) {
        <span class="kw">super</span>(id); <span class="cm">// MUST call abstract parent's constructor</span>
        <span class="kw">this</span>.name = name;
    }
}

<span class="cl">User</span> u = <span class="kw">new</span> <span class="cl">User</span>(<span class="str">"U1"</span>, <span class="str">"Alice"</span>);
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(u.<span class="fn">getId</span>()); <span class="cm">// "U1"</span>
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(u.<span class="fn">getCreatedAt</span>()); <span class="cm">// timestamp set by parent</span>
</code></pre>

  <h2>4. Abstract Class vs. Interface (The LLD Battle)</h2>
  <div class="table-wrap"><table>
    <tr><th>Feature</th><th>Abstract Class</th><th>Interface</th></tr>
    <tr><td><strong>Core Purpose</strong></td><td>Identity (is-a). Base for a hierarchy.</td><td>Capability (can-do). Contract for behavior.</td></tr>
    <tr><td><strong>State</strong></td><td>Can have instance fields (state).</td><td>Cannot have instance fields (only static final).</td></tr>
    <tr><td><strong>Inheritance</strong></td><td>Only one abstract class can be extended.</td><td>Many interfaces can be implemented.</td></tr>
    <tr><td><strong>Constructors</strong></td><td>Yes, to initialize state.</td><td>No constructors.</td></tr>
    <tr><td><strong>Access Modifiers</strong></td><td>Any (private, protected, public).</td><td>Default to public. No protected/private state.</td></tr>
  </table></div>

  <h2>5. The "Abstract Base" Pattern (JDK Level)</h2>
  <div class="box box-lld">
    <div class="box-title">⚙️ LLD Connection: The Spring Framework</div>
    A common architectural pattern in FAANG is to have an <code>Interface</code> (e.g., <code>Filter</code>) defining the API, and an <code>AbstractClass</code> (e.g., <code>OncePerRequestFilter</code> in Spring) that provides a robust, thread-safe partial implementation.
    <br><br>
    <strong>Benefit</strong>: Users can either implement the interface from scratch (for total control) or extend the abstract class (to save 90% of the boilerplate).
  </div>
  
  <div class="box box-smell">
    <div class="box-title">🤢 Design Smell: The God Base Class</div>
    Beware the <code>BaseController</code> or <code>BaseEntity</code> that has 50 protected methods. This violates the Single Responsibility Principle. If a base class is constantly changing, it creates a <strong>Fragile Base Class</strong> where an update breaks every subclass in the system. Use Composition for shared utilities (e.g., <code>SecurityUtils</code>), not Inheritance.
  </div>

  <h2>6. Forced Implementation</h2>
  <p>If a concrete class inherits from an abstract class, it <strong>must</strong> implement all abstract methods. If it doesn't, that class itself must be declared <code>abstract</code>.</p>
  <pre><code><span class="cm">// This WON'T compile! Must implement readData() and transformData()</span>
<span class="cm">// public class BrokenProcessor extends DataProcessor { }</span>

<span class="cm">// This is OK — it's still abstract, so it defers implementation</span>
<span class="kw">public abstract class</span> <span class="cl">FileProcessor</span> <span class="kw">extends</span> <span class="cl">DataProcessor</span> {
    <span class="kw">@Override</span>
    <span class="kw">protected void</span> <span class="fn">readData</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Reading file..."</span>);
    }
    <span class="cm">// transformData() still abstract — child must implement</span>
}
</code></pre>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 10</div>
    <ul>
      <li><strong>Cannot be instantiated</strong> directly.</li>
      <li><strong>Supports state and behavior</strong> (unlike pure interfaces).</li>
      <li><strong>Template Method Pattern</strong> is its primary architectural use.</li>
      <li><strong>Protected methods</strong> are common for internal "pieces" of the template.</li>
      <li><strong>Shared Identity</strong>: Use it when the classes are variations of the same "thing."</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 10</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can an abstract class be final?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>No.</strong> This is a compile-time contradiction. <code>abstract</code> means "must be inherited to be used," and <code>final</code> means "cannot be inherited." You cannot have both.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can we have an abstract class without any abstract methods?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes.</strong> This is done when you want to prevent direct instantiation of a class (e.g., a base class for generic entities) but it has only concrete methods that you want subclasses to reuse.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can an abstract class have a constructor? If so, when is it called?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes.</strong> Even though you cannot instantiate an abstract class using <code>new</code>, it can (and often does) have a constructor to initialize its state. This constructor is called implicitly (via <code>super()</code>) or explicitly when a concrete subclass is instantiated.</div>
  </div>
</div>`,b=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"})),f=`<div id="abstraction" class="section">\r
  <div class="breadcrumb">handbook / the 4 pillars / <span>section 04B</span></div>\r
  <div class="section-eyebrow">The Second Pillar</div>\r
  <h1>Abstraction: Managing Complexity</h1>\r
  <div class="section-desc">Abstraction is the art of hiding the "How" to focus on the "What." It is the primary tool we use to design APIs, decoupled systems, and scalable architectures.</div>\r
\r
  <h2>1. The "Iceberg" Model of Abstraction</h2>\r
  <p>An object is like an iceberg. The 10% above the water is the <strong>Public Interface</strong> (What the object does). The 90% below is the <strong>Private Implementation</strong> (How it does it). As long as the tip stays the same, the bottom can change entirely without affecting the world.</p>\r
\r
  <div class="diagram">\r
[ CLIENT CODE ]\r
      │\r
      ▼\r
[ PUBLIC API (Interface) ]  <── "I need to send an email."\r
      │\r
      ▼\r
[ PRIVATE LOGIC (Impl) ]   <── Connect to SMTP, handle retries, \r
                                 log errors, manage sockets.</div>\r
\r
  <h3>Example: The Iceberg in Action</h3>\r
  <pre><code><span class="cm">// The PUBLIC surface — the client only sees this</span>\r
<span class="kw">public interface</span> <span class="cl">EmailService</span> {\r
    <span class="kw">void</span> <span class="fn">send</span>(<span class="cl">String</span> to, <span class="cl">String</span> subject, <span class="cl">String</span> body);\r
}\r
\r
<span class="cm">// The PRIVATE iceberg — 90% of the complexity is hidden</span>\r
<span class="kw">public class</span> <span class="cl">SmtpEmailService</span> <span class="kw">implements</span> <span class="cl">EmailService</span> {\r
    <span class="kw">private final</span> <span class="cl">SmtpConnection</span> connection;\r
    <span class="kw">private final</span> <span class="cl">RetryPolicy</span> retryPolicy;\r
    <span class="kw">private final</span> <span class="cl">Logger</span> logger;\r
\r
    <span class="kw">public</span> <span class="cl">SmtpEmailService</span>(<span class="cl">SmtpConnection</span> conn, <span class="cl">RetryPolicy</span> rp) {\r
        <span class="kw">this</span>.connection = conn;\r
        <span class="kw">this</span>.retryPolicy = rp;\r
        <span class="kw">this</span>.logger = <span class="cl">LoggerFactory</span>.<span class="fn">getLogger</span>(<span class="cl">SmtpEmailService</span>.<span class="kw">class</span>);\r
    }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">send</span>(<span class="cl">String</span> to, <span class="cl">String</span> subject, <span class="cl">String</span> body) {\r
        retryPolicy.<span class="fn">execute</span>(() -> {\r
            connection.<span class="fn">open</span>();\r
            connection.<span class="fn">sendMail</span>(to, subject, body);\r
            connection.<span class="fn">close</span>();\r
            logger.<span class="fn">info</span>(<span class="str">"Email sent to {}"</span>, to);\r
        });\r
    }\r
}\r
\r
<span class="cm">// CLIENT CODE — beautifully simple</span>\r
<span class="cl">EmailService</span> emailService = <span class="kw">new</span> <span class="cl">SmtpEmailService</span>(conn, policy);\r
emailService.<span class="fn">send</span>(<span class="str">"user@example.com"</span>, <span class="str">"Welcome!"</span>, <span class="str">"Hello World"</span>);\r
</code></pre>\r
\r
  <h2>2. Abstract Data Types (ADT) &amp; Clean Architecture</h2>\r
  <p>In computer science, an <strong>ADT</strong> defines a data structure by its behavior (e.g., a <code>Stack</code> has <code>push</code> and <code>pop</code>) rather than its memory layout. In Java, we use <strong>Interfaces</strong> to define ADTs.</p>\r
\r
  <h3>Example: Stack as an ADT</h3>\r
  <pre><code><span class="cm">// The ADT — defines WHAT, not HOW</span>\r
<span class="kw">public interface</span> <span class="cl">Stack</span>&lt;<span class="cl">T</span>&gt; {\r
    <span class="kw">void</span> <span class="fn">push</span>(<span class="cl">T</span> item);\r
    <span class="cl">T</span> <span class="fn">pop</span>();\r
    <span class="cl">T</span> <span class="fn">peek</span>();\r
    <span class="kw">boolean</span> <span class="fn">isEmpty</span>();\r
    <span class="kw">int</span> <span class="fn">size</span>();\r
}\r
\r
<span class="cm">// Implementation 1: Array-based</span>\r
<span class="kw">public class</span> <span class="cl">ArrayStack</span>&lt;<span class="cl">T</span>&gt; <span class="kw">implements</span> <span class="cl">Stack</span>&lt;<span class="cl">T</span>&gt; {\r
    <span class="kw">private</span> <span class="cl">Object</span>[] data = <span class="kw">new</span> <span class="cl">Object</span>[<span class="num">16</span>];\r
    <span class="kw">private int</span> top = -<span class="num">1</span>;\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">push</span>(<span class="cl">T</span> item) { data[++top] = item; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public</span> <span class="cl">T</span> <span class="fn">pop</span>() { <span class="kw">return</span> (<span class="cl">T</span>) data[top--]; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public</span> <span class="cl">T</span> <span class="fn">peek</span>() { <span class="kw">return</span> (<span class="cl">T</span>) data[top]; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public boolean</span> <span class="fn">isEmpty</span>() { <span class="kw">return</span> top == -<span class="num">1</span>; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public int</span> <span class="fn">size</span>() { <span class="kw">return</span> top + <span class="num">1</span>; }\r
}\r
\r
<span class="cm">// Implementation 2: LinkedList-based</span>\r
<span class="kw">public class</span> <span class="cl">LinkedStack</span>&lt;<span class="cl">T</span>&gt; <span class="kw">implements</span> <span class="cl">Stack</span>&lt;<span class="cl">T</span>&gt; {\r
    <span class="kw">private</span> <span class="cl">Node</span>&lt;<span class="cl">T</span>&gt; head;\r
    <span class="kw">private int</span> count = <span class="num">0</span>;\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">push</span>(<span class="cl">T</span> item) {\r
        head = <span class="kw">new</span> <span class="cl">Node</span>&lt;&gt;(item, head);\r
        count++;\r
    }\r
    <span class="cm">// ... other methods follow the same pattern</span>\r
}\r
\r
<span class="cm">// The client doesn't care which implementation is used!</span>\r
<span class="cl">Stack</span>&lt;<span class="cl">String</span>&gt; stack = <span class="kw">new</span> <span class="cl">ArrayStack</span>&lt;&gt;();\r
stack.<span class="fn">push</span>(<span class="str">"Hello"</span>);\r
stack.<span class="fn">push</span>(<span class="str">"World"</span>);\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(stack.<span class="fn">pop</span>()); <span class="cm">// "World"</span>\r
</code></pre>\r
\r
  <div class="box box-lld">\r
    <div class="box-title">⚙️ LLD Connection: Hexagonal Architecture (Ports & Adapters)</div>\r
    By abstracting the database layer behind a <code>Repository</code> interface (The Port), you make your business logic "database agnostic." You can swap PostgreSQL for MongoDB by simply changing the implementation class (The Adapter). This is how FAANG companies migrate databases with zero downtime.\r
  </div>\r
\r
  <h3>Example: Repository Pattern (Hexagonal Architecture)</h3>\r
  <pre><code><span class="cm">// PORT — the abstraction</span>\r
<span class="kw">public interface</span> <span class="cl">UserRepository</span> {\r
    <span class="cl">User</span> <span class="fn">findById</span>(<span class="cl">String</span> id);\r
    <span class="kw">void</span> <span class="fn">save</span>(<span class="cl">User</span> user);\r
    <span class="cl">List</span>&lt;<span class="cl">User</span>&gt; <span class="fn">findAll</span>();\r
}\r
\r
<span class="cm">// ADAPTER 1 — PostgreSQL</span>\r
<span class="kw">public class</span> <span class="cl">PostgresUserRepository</span> <span class="kw">implements</span> <span class="cl">UserRepository</span> {\r
    <span class="kw">private final</span> <span class="cl">JdbcTemplate</span> jdbc;\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public</span> <span class="cl">User</span> <span class="fn">findById</span>(<span class="cl">String</span> id) {\r
        <span class="kw">return</span> jdbc.<span class="fn">queryForObject</span>(\r
            <span class="str">"SELECT * FROM users WHERE id = ?"</span>, userMapper, id);\r
    }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">save</span>(<span class="cl">User</span> user) {\r
        jdbc.<span class="fn">update</span>(<span class="str">"INSERT INTO users VALUES (?, ?)"</span>,\r
            user.<span class="fn">getId</span>(), user.<span class="fn">getName</span>());\r
    }\r
}\r
\r
<span class="cm">// ADAPTER 2 — MongoDB (swap without touching business logic!)</span>\r
<span class="kw">public class</span> <span class="cl">MongoUserRepository</span> <span class="kw">implements</span> <span class="cl">UserRepository</span> {\r
    <span class="kw">private final</span> <span class="cl">MongoCollection</span>&lt;<span class="cl">Document</span>&gt; collection;\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public</span> <span class="cl">User</span> <span class="fn">findById</span>(<span class="cl">String</span> id) {\r
        <span class="cl">Document</span> doc = collection.<span class="fn">find</span>(<span class="fn">eq</span>(<span class="str">"_id"</span>, id)).<span class="fn">first</span>();\r
        <span class="kw">return</span> <span class="fn">mapToUser</span>(doc);\r
    }\r
}\r
\r
<span class="cm">// BUSINESS LOGIC — depends only on the abstraction</span>\r
<span class="kw">public class</span> <span class="cl">UserService</span> {\r
    <span class="kw">private final</span> <span class="cl">UserRepository</span> repo; <span class="cm">// abstraction, not concrete!</span>\r
\r
    <span class="kw">public</span> <span class="cl">UserService</span>(<span class="cl">UserRepository</span> repo) {\r
        <span class="kw">this</span>.repo = repo;\r
    }\r
\r
    <span class="kw">public</span> <span class="cl">User</span> <span class="fn">getUser</span>(<span class="cl">String</span> id) {\r
        <span class="kw">return</span> repo.<span class="fn">findById</span>(id);\r
    }\r
}\r
</code></pre>\r
\r
  <h2>3. Levels of Abstraction (The Stack)</h2>\r
  <p>Engineering is a stack of abstractions. Each layer relies on the one below it being "correct" without needing to know why:</p>\r
  <ol>\r
    <li><strong>Business Logic</strong>: "Place Order."</li>\r
    <li><strong>Application Service</strong>: <code>orderService.place(id)</code>.</li>\r
    <li><strong>Domain Model</strong>: <code>order.validate()</code>.</li>\r
    <li><strong>Java Method</strong>: <code>invokevirtual</code> call.</li>\r
    <li><strong>JVM / OS</strong>: Memory management, file handles.</li>\r
    <li><strong>Hardware</strong>: CPU instructions and registers.</li>\r
  </ol>\r
\r
  <h2>4. The "Leaky Abstraction" Problem</h2>\r
  <div class="box box-senior">\r
    <div class="box-title">🧠 How Senior Engineers Think: Joel Spolsky's Law</div>\r
    "All non-trivial abstractions, to some degree, are leaky." \r
    <br><br>\r
    Example: <code>Hibernate/JPA</code> abstracts SQL away. But if you don't understand how SQL joins work underneath, you will create a "N+1 Query Problem" that kills production performance. The abstraction <em>leaks</em> the underlying complexity. A senior dev trusts the abstraction but intimately understands the layer beneath it.\r
  </div>\r
\r
  <h3>Example: The N+1 Problem (Leaky Abstraction)</h3>\r
  <pre><code><span class="cm">// BAD — N+1 Queries (the abstraction leaks!)</span>\r
<span class="cl">List</span>&lt;<span class="cl">Author</span>&gt; authors = authorRepo.<span class="fn">findAll</span>(); <span class="cm">// 1 query</span>\r
<span class="kw">for</span> (<span class="cl">Author</span> a : authors) {\r
    <span class="cl">List</span>&lt;<span class="cl">Book</span>&gt; books = a.<span class="fn">getBooks</span>(); <span class="cm">// N queries! (lazy load)</span>\r
    <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(a.<span class="fn">getName</span>() + <span class="str">" wrote "</span> + books.<span class="fn">size</span>());\r
}\r
\r
<span class="cm">// GOOD — Eager fetch with JOIN (understand the layer below)</span>\r
<span class="cl">List</span>&lt;<span class="cl">Author</span>&gt; authors = authorRepo.<span class="fn">findAllWithBooks</span>(); <span class="cm">// 1 query with JOIN</span>\r
<span class="kw">for</span> (<span class="cl">Author</span> a : authors) {\r
    <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(a.<span class="fn">getName</span>() + <span class="str">" wrote "</span> + a.<span class="fn">getBooks</span>().<span class="fn">size</span>());\r
}\r
</code></pre>\r
\r
  <h2>5. Abstraction vs. Encapsulation</h2>\r
  <div class="table-wrap"><table>\r
    <tr><th>Pillar</th><th>Focus</th><th>Goal</th></tr>\r
    <tr><td><strong>Abstraction</strong></td><td>Design Level</td><td>Hiding complexity (WHAT). Focused on <strong>Behavior</strong>.</td></tr>\r
    <tr><td><strong>Encapsulation</strong></td><td>Implementation Level</td><td>Hiding state / Data protection (HOW). Focused on <strong>Data</strong>.</td></tr>\r
  </table></div>\r
\r
  <h3>Example: Abstraction + Encapsulation Together</h3>\r
  <pre><code><span class="cm">// ABSTRACTION — hides WHAT a shape can do</span>\r
<span class="kw">public interface</span> <span class="cl">Shape</span> {\r
    <span class="kw">double</span> <span class="fn">area</span>();\r
    <span class="kw">double</span> <span class="fn">perimeter</span>();\r
}\r
\r
<span class="cm">// ENCAPSULATION — hides HOW the data is stored</span>\r
<span class="kw">public class</span> <span class="cl">Circle</span> <span class="kw">implements</span> <span class="cl">Shape</span> {\r
    <span class="kw">private final double</span> radius; <span class="cm">// encapsulated!</span>\r
\r
    <span class="kw">public</span> <span class="cl">Circle</span>(<span class="kw">double</span> radius) {\r
        <span class="kw">if</span> (radius <= <span class="num">0</span>) <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>();\r
        <span class="kw">this</span>.radius = radius;\r
    }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">area</span>() { <span class="kw">return</span> <span class="cl">Math</span>.PI * radius * radius; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">perimeter</span>() { <span class="kw">return</span> <span class="num">2</span> * <span class="cl">Math</span>.PI * radius; }\r
}\r
\r
<span class="kw">public class</span> <span class="cl">Rectangle</span> <span class="kw">implements</span> <span class="cl">Shape</span> {\r
    <span class="kw">private final double</span> width, height;\r
\r
    <span class="kw">public</span> <span class="cl">Rectangle</span>(<span class="kw">double</span> w, <span class="kw">double</span> h) {\r
        <span class="kw">this</span>.width = w;\r
        <span class="kw">this</span>.height = h;\r
    }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">area</span>() { <span class="kw">return</span> width * height; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">perimeter</span>() { <span class="kw">return</span> <span class="num">2</span> * (width + height); }\r
}\r
\r
<span class="cm">// Polymorphic usage — client only knows "Shape"</span>\r
<span class="cl">List</span>&lt;<span class="cl">Shape</span>&gt; shapes = <span class="cl">List</span>.<span class="fn">of</span>(<span class="kw">new</span> <span class="cl">Circle</span>(<span class="num">5</span>), <span class="kw">new</span> <span class="cl">Rectangle</span>(<span class="num">3</span>, <span class="num">4</span>));\r
<span class="kw">double</span> totalArea = shapes.<span class="fn">stream</span>()\r
    .<span class="fn">mapToDouble</span>(<span class="cl">Shape</span>::area)\r
    .<span class="fn">sum</span>();\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Total area: "</span> + totalArea);\r
</code></pre>\r
\r
  <h2>6. The Facade Pattern: The Ultimate Abstraction</h2>\r
  <p>If you have a complex subsystem with 50 classes, don't expose them all. Create a <strong>Facade</strong> class that provides 3 simple methods. This is an abstraction that simplifies the entry point to a complex system.</p>\r
\r
  <h3>Example: Facade Pattern</h3>\r
  <pre><code><span class="cm">// Complex subsystem classes</span>\r
<span class="kw">class</span> <span class="cl">InventoryService</span> {\r
    <span class="kw">boolean</span> <span class="fn">checkStock</span>(<span class="cl">String</span> productId) { <span class="cm">/* complex logic */</span> <span class="kw">return true</span>; }\r
}\r
\r
<span class="kw">class</span> <span class="cl">PaymentService</span> {\r
    <span class="kw">boolean</span> <span class="fn">charge</span>(<span class="cl">String</span> userId, <span class="kw">double</span> amount) { <span class="cm">/* gateway logic */</span> <span class="kw">return true</span>; }\r
}\r
\r
<span class="kw">class</span> <span class="cl">ShippingService</span> {\r
    <span class="cl">String</span> <span class="fn">ship</span>(<span class="cl">String</span> productId, <span class="cl">String</span> address) { <span class="kw">return</span> <span class="str">"TRACK-123"</span>; }\r
}\r
\r
<span class="cm">// THE FACADE — one simple method hides all complexity</span>\r
<span class="kw">public class</span> <span class="cl">OrderFacade</span> {\r
    <span class="kw">private final</span> <span class="cl">InventoryService</span> inventory = <span class="kw">new</span> <span class="cl">InventoryService</span>();\r
    <span class="kw">private final</span> <span class="cl">PaymentService</span> payment = <span class="kw">new</span> <span class="cl">PaymentService</span>();\r
    <span class="kw">private final</span> <span class="cl">ShippingService</span> shipping = <span class="kw">new</span> <span class="cl">ShippingService</span>();\r
\r
    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">placeOrder</span>(<span class="cl">String</span> userId, <span class="cl">String</span> productId,\r
                               <span class="kw">double</span> amount, <span class="cl">String</span> address) {\r
        <span class="kw">if</span> (!inventory.<span class="fn">checkStock</span>(productId))\r
            <span class="kw">throw new</span> <span class="cl">RuntimeException</span>(<span class="str">"Out of stock"</span>);\r
        <span class="kw">if</span> (!payment.<span class="fn">charge</span>(userId, amount))\r
            <span class="kw">throw new</span> <span class="cl">RuntimeException</span>(<span class="str">"Payment failed"</span>);\r
        <span class="kw">return</span> shipping.<span class="fn">ship</span>(productId, address);\r
    }\r
}\r
\r
<span class="cm">// CLIENT — one line does everything</span>\r
<span class="cl">OrderFacade</span> facade = <span class="kw">new</span> <span class="cl">OrderFacade</span>();\r
<span class="cl">String</span> trackingId = facade.<span class="fn">placeOrder</span>(<span class="str">"U1"</span>, <span class="str">"P1"</span>, <span class="num">99.99</span>, <span class="str">"123 Main St"</span>);\r
</code></pre>\r
\r
  <div class="takeaways">\r
    <div class="takeaways-title">Key Takeaways — Section 04B</div>\r
    <ul>\r
      <li><strong>Interfaces</strong> are the strongest form of abstraction in Java.</li>\r
      <li><strong>Abstract only what changes</strong>; don't over-engineer static logic.</li>\r
      <li><strong>Decoupling</strong> is the primary result of good abstraction.</li>\r
      <li><strong>Understand the layer below</strong> to avoid "leaks."</li>\r
      <li><strong>Hiding vs Omitting</strong>: Abstraction is about hiding unnecessary details, not omitting them entirely.</li>\r
      <li><strong>Facade Pattern</strong> is the most practical use of abstraction in enterprise code.</li>\r
    </ul>\r
  </div>\r
\r
  <h2>Interview Deep Dive — Section 04B</h2>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">Can we have Abstraction without Encapsulation?<span class="arrow">▶</span></div>\r
    <div class="qa-a">Technically, yes. But it's bad design. Abstraction gives you the "remote control" (Interface), and Encapsulation ensures the "battery compartment" (Data) is locked. Without encapsulation, the user could mess with the internals of the remote, breaking the abstraction.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is "Interface Segregation" in the context of Abstraction?<span class="arrow">▶</span></div>\r
    <div class="qa-a">It means creating specific abstractions for specific clients. Instead of one giant <code>Machine</code> interface, create <code>Printer</code>, <code>Scanner</code>, and <code>Fax</code> interfaces. This ensures that a client using the printer isn't forced to know about (or depend on) the fax functionality. It keeps the abstraction "clean."</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is the difference between abstraction via Interface vs Abstract Class?<span class="arrow">▶</span></div>\r
    <div class="qa-a"><strong>Interface</strong>: Pure contract. No state. Multiple inheritance. Use when you want to define "what" something can do. <strong>Abstract Class</strong>: Partial implementation. Can have state and constructors. Single inheritance. Use when you want to share common code among closely related classes. Since Java 8 (default methods), the gap has narrowed, but the conceptual difference remains: interfaces define capability, abstract classes define identity.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is a "Leaky Abstraction"?<span class="arrow">▶</span></div>\r
    <div class="qa-a">A leaky abstraction occurs when the underlying implementation details "leak" through the abstraction barrier, forcing the user of the API to understand those internals. For example, an ORM (like Hibernate) abstracts SQL. But if you encounter the N+1 select problem and have to manually write JOIN fetches or tweak the ORM to generate better SQL, the SQL implementation has "leaked." According to Spolsky's Law, "All non-trivial abstractions, to some degree, are leaky."</div>\r
  </div>\r
</div>`,w=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),y=`<div id="access-modifiers" class="section">
  <div class="breadcrumb">handbook / <span>section 06</span></div>
  <div class="section-eyebrow">The Gatekeepers</div>
  <h1>Access Modifiers: Architectural Gates</h1>
  <div class="section-desc">Access modifiers are not just about security; they are about <strong>API Surface Area</strong>. The smaller your surface area, the easier it is to maintain and refactor your system.</div>

  <h2>1. The Visibility Matrix</h2>
  <div class="table-wrap"><table>
    <tr><th>Modifier</th><th>Class</th><th>Package</th><th>Subclass</th><th>World</th></tr>
    <tr><td><strong>public</strong></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
    <tr><td><strong>protected</strong></td><td>✅</td><td>✅</td><td>✅</td><td>❌</td></tr>
    <tr><td><strong>(default)</strong></td><td>✅</td><td>✅</td><td>❌</td><td>❌</td></tr>
    <tr><td><strong>private</strong></td><td>✅</td><td>❌</td><td>❌</td><td>❌</td></tr>
  </table></div>

  <h3>Example: All Four Modifiers in Action</h3>
  <pre><code><span class="kw">package</span> com.example.banking;

<span class="kw">public class</span> <span class="cl">BankAccount</span> {
    <span class="kw">public</span> <span class="cl">String</span> accountType;         <span class="cm">// visible everywhere</span>
    <span class="kw">protected</span> <span class="cl">String</span> bankBranch;       <span class="cm">// visible to subclasses + same package</span>
    <span class="cl">String</span> internalCode;               <span class="cm">// package-private (default)</span>
    <span class="kw">private double</span> balance;            <span class="cm">// ONLY this class</span>

    <span class="kw">public double</span> <span class="fn">getBalance</span>() {
        <span class="kw">return</span> balance;
    }

    <span class="kw">public void</span> <span class="fn">deposit</span>(<span class="kw">double</span> amount) {
        <span class="kw">if</span> (amount <= <span class="num">0</span>) <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>(<span class="str">"Must be positive"</span>);
        <span class="kw">this</span>.balance += amount;
    }

    <span class="kw">private void</span> <span class="fn">logTransaction</span>(<span class="cl">String</span> msg) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"[LOG] "</span> + msg);
    }
}
</code></pre>

  <h2>2. The "Default" (Package-Private) Power</h2>
  <p>In many frameworks (like Spring), the "default" access modifier is highly underrated. It allows you to create classes that are visible within your module but completely hidden from the outside world. This is the first line of defense in <strong>Modular Design</strong>.</p>

  <h3>Example: Package-Private for Internal Services</h3>
  <pre><code><span class="kw">package</span> com.example.order.internal;

<span class="cm">// Package-private! Not visible outside this package.</span>
<span class="kw">class</span> <span class="cl">OrderValidator</span> {
    <span class="kw">boolean</span> <span class="fn">isValid</span>(<span class="cl">Order</span> order) {
        <span class="kw">return</span> order.<span class="fn">getItems</span>().<span class="fn">size</span>() > <span class="num">0</span>
            && order.<span class="fn">getTotal</span>() > <span class="num">0</span>;
    }
}

<span class="cm">// Public facade — the only entry point</span>
<span class="kw">public class</span> <span class="cl">OrderService</span> {
    <span class="kw">private final</span> <span class="cl">OrderValidator</span> validator = <span class="kw">new</span> <span class="cl">OrderValidator</span>();

    <span class="kw">public void</span> <span class="fn">placeOrder</span>(<span class="cl">Order</span> order) {
        <span class="kw">if</span> (!validator.<span class="fn">isValid</span>(order)) {
            <span class="kw">throw new</span> <span class="cl">IllegalStateException</span>(<span class="str">"Invalid order"</span>);
        }
        <span class="cm">// proceed with order...</span>
    }
}
</code></pre>

  <div class="box box-insight">
    <div class="box-title">💡 Architect's Rule: Tighten by Default</div>
    Always start with <code>private</code>. If it needs to be visible in the package, go to <code>default</code>. Only go to <code>protected</code> or <code>public</code> if there is a clear, documented need for external access.
  </div>

  <h2>3. The "Protected" Trap</h2>
  <p>A <code>protected</code> member is visible to subclasses <strong>AND</strong> to other classes in the same package. This "package access" often leads to accidental exposure. Senior devs use <code>protected</code> sparingly, mainly for <strong>Template Method Patterns</strong> where a subclass <em>must</em> override a specific piece of logic.</p>

  <h3>Example: Protected in Template Method Pattern</h3>
  <pre><code><span class="kw">public abstract class</span> <span class="cl">DataExporter</span> {
    <span class="cm">// Template method — defines the algorithm skeleton</span>
    <span class="kw">public final void</span> <span class="fn">export</span>(<span class="cl">List</span>&lt;<span class="cl">String</span>&gt; data) {
        <span class="cl">String</span> header = <span class="fn">getHeader</span>();
        <span class="cl">String</span> formatted = <span class="fn">formatData</span>(data);
        <span class="cl">String</span> footer = <span class="fn">getFooter</span>();
        <span class="fn">writeToFile</span>(header + <span class="str">"\\n"</span> + formatted + <span class="str">"\\n"</span> + footer);
    }

    <span class="cm">// Protected hooks — subclasses MUST override these</span>
    <span class="kw">protected abstract</span> <span class="cl">String</span> <span class="fn">getHeader</span>();
    <span class="kw">protected abstract</span> <span class="cl">String</span> <span class="fn">formatData</span>(<span class="cl">List</span>&lt;<span class="cl">String</span>&gt; data);
    <span class="kw">protected abstract</span> <span class="cl">String</span> <span class="fn">getFooter</span>();

    <span class="kw">private void</span> <span class="fn">writeToFile</span>(<span class="cl">String</span> content) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Writing: "</span> + content);
    }
}

<span class="kw">public class</span> <span class="cl">CsvExporter</span> <span class="kw">extends</span> <span class="cl">DataExporter</span> {
    <span class="kw">@Override</span>
    <span class="kw">protected</span> <span class="cl">String</span> <span class="fn">getHeader</span>() { <span class="kw">return</span> <span class="str">"name,age,city"</span>; }

    <span class="kw">@Override</span>
    <span class="kw">protected</span> <span class="cl">String</span> <span class="fn">formatData</span>(<span class="cl">List</span>&lt;<span class="cl">String</span>&gt; data) {
        <span class="kw">return</span> <span class="cl">String</span>.<span class="fn">join</span>(<span class="str">"\\n"</span>, data);
    }

    <span class="kw">@Override</span>
    <span class="kw">protected</span> <span class="cl">String</span> <span class="fn">getFooter</span>() { <span class="kw">return</span> <span class="str">"--- END ---"</span>; }
}

<span class="cm">// Usage</span>
<span class="cl">DataExporter</span> exporter = <span class="kw">new</span> <span class="cl">CsvExporter</span>();
exporter.<span class="fn">export</span>(<span class="cl">List</span>.<span class="fn">of</span>(<span class="str">"Alice,30,NY"</span>, <span class="str">"Bob,25,LA"</span>));
</code></pre>

  <h2>4. Strong Encapsulation (Project Jigsaw)</h2>
  <div class="box box-danger">
    <div class="box-title">🚨 Java 9+ Module Access</div>
    Even if a class is <code>public</code>, it is <strong>not visible</strong> to other modules unless the package is explicitly <code>exported</code> in the <code>module-info.java</code>. This added a 5th level of access: <strong>Module-Internal Public</strong>.
  </div>

  <h3>Example: module-info.java</h3>
  <pre><code><span class="cm">// module-info.java</span>
<span class="kw">module</span> com.example.banking {
    <span class="kw">exports</span> com.example.banking.api;     <span class="cm">// public to the world</span>
    <span class="cm">// com.example.banking.internal is NOT exported</span>
    <span class="cm">// Even public classes there are invisible to other modules!</span>

    <span class="kw">requires</span> java.sql;                   <span class="cm">// this module depends on java.sql</span>
    <span class="kw">opens</span> com.example.banking.model <span class="kw">to</span> hibernate.core; <span class="cm">// reflection access</span>
}
</code></pre>

  <h2>5. Private Methods in Interfaces (Java 9+)</h2>
  <p>Java 9 introduced <strong>private methods in interfaces</strong>. These allow you to share code between default methods without exposing it.</p>
  <pre><code><span class="kw">public interface</span> <span class="cl">Loggable</span> {
    <span class="kw">default void</span> <span class="fn">logInfo</span>(<span class="cl">String</span> msg) {
        <span class="fn">log</span>(<span class="str">"INFO"</span>, msg);
    }

    <span class="kw">default void</span> <span class="fn">logError</span>(<span class="cl">String</span> msg) {
        <span class="fn">log</span>(<span class="str">"ERROR"</span>, msg);
    }

    <span class="cm">// Private helper — shared by default methods, hidden from implementors</span>
    <span class="kw">private void</span> <span class="fn">log</span>(<span class="cl">String</span> level, <span class="cl">String</span> msg) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"["</span> + level + <span class="str">"] "</span> + msg);
    }
}
</code></pre>

  <h2>6. Testing Private Methods?</h2>
  <p>There is a massive debate: Should you test private methods?</p>
  <ul>
    <li><strong>The "Purist" View</strong>: No. Test the public API; if the private method has a bug, the public API test will fail. Testing privates makes tests fragile during refactoring.</li>
    <li><strong>The "Pragmatist" View</strong>: Sometimes. If a private method has complex logic, it might be worth making it <code>package-private</code> (or using <code>@VisibleForTesting</code> in Google Guava) to test it in isolation.</li>
  </ul>

  <h3>Example: @VisibleForTesting Pattern</h3>
  <pre><code><span class="kw">public class</span> <span class="cl">PriceCalculator</span> {
    <span class="kw">public double</span> <span class="fn">calculateTotal</span>(<span class="cl">List</span>&lt;<span class="cl">Item</span>&gt; items) {
        <span class="kw">double</span> subtotal = items.<span class="fn">stream</span>()
            .<span class="fn">mapToDouble</span>(<span class="cl">Item</span>::getPrice)
            .<span class="fn">sum</span>();
        <span class="kw">return</span> <span class="fn">applyDiscount</span>(subtotal);
    }

    <span class="cm">// Package-private instead of private — testable!</span>
    <span class="cm">// @VisibleForTesting</span>
    <span class="kw">double</span> <span class="fn">applyDiscount</span>(<span class="kw">double</span> subtotal) {
        <span class="kw">if</span> (subtotal > <span class="num">100</span>) <span class="kw">return</span> subtotal * <span class="num">0.9</span>;
        <span class="kw">if</span> (subtotal > <span class="num">50</span>) <span class="kw">return</span> subtotal * <span class="num">0.95</span>;
        <span class="kw">return</span> subtotal;
    }
}

<span class="cm">// Test class in same package can access applyDiscount()</span>
<span class="kw">class</span> <span class="cl">PriceCalculatorTest</span> {
    <span class="kw">@Test</span>
    <span class="kw">void</span> <span class="fn">testDiscount</span>() {
        <span class="cl">PriceCalculator</span> calc = <span class="kw">new</span> <span class="cl">PriceCalculator</span>();
        assertEquals(<span class="num">90.0</span>, calc.<span class="fn">applyDiscount</span>(<span class="num">100.0</span>));
    }
}
</code></pre>

  <h2>7. Member-Level vs. Class-Level</h2>
  <p>Remember: Outer classes can only be <code>public</code> or <code>default</code>. Only <strong>Inner Classes</strong> can be <code>private</code> or <code>protected</code>.</p>

  <h3>Example: Private Inner Class</h3>
  <pre><code><span class="kw">public class</span> <span class="cl">LinkedList</span>&lt;<span class="cl">T</span>&gt; {
    <span class="kw">private</span> <span class="cl">Node</span>&lt;<span class="cl">T</span>&gt; head;

    <span class="cm">// Private inner class — completely hidden from the outside world</span>
    <span class="kw">private static class</span> <span class="cl">Node</span>&lt;<span class="cl">T</span>&gt; {
        <span class="cl">T</span> data;
        <span class="cl">Node</span>&lt;<span class="cl">T</span>&gt; next;

        <span class="cl">Node</span>(<span class="cl">T</span> data, <span class="cl">Node</span>&lt;<span class="cl">T</span>&gt; next) {
            <span class="kw">this</span>.data = data;
            <span class="kw">this</span>.next = next;
        }
    }

    <span class="kw">public void</span> <span class="fn">addFirst</span>(<span class="cl">T</span> item) {
        head = <span class="kw">new</span> <span class="cl">Node</span>&lt;&gt;(item, head);
    }

    <span class="kw">public</span> <span class="cl">T</span> <span class="fn">getFirst</span>() {
        <span class="kw">return</span> head != <span class="kw">null</span> ? head.data : <span class="kw">null</span>;
    }
}
</code></pre>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 06</div>
    <ul>
      <li><strong>Public is forever</strong>: Once it's public, you can't change it without breaking others.</li>
      <li><strong>Private is safe</strong>: You can delete/rename private members with zero fear.</li>
      <li><strong>Default</strong> is perfect for internal module logic.</li>
      <li><strong>Protected</strong> is for inheritance-based hooks (Template Method).</li>
      <li><strong>Java 9 modules</strong> add a 5th level: module-internal public.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 06</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can a subclass reduce the visibility of an inherited method?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>No.</strong> This is a rule of Polymorphism. If a parent method is <code>public</code>, the override in the subclass must also be <code>public</code>. You can <em>increase</em> visibility (e.g., overriding a <code>protected</code> method as <code>public</code>), but you can never decrease it. Doing so would break the "IS-A" contract.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why is there no 'private protected' in Java?<span class="arrow">▶</span></div>
    <div class="qa-a">It actually existed in very early versions of Java (1.0) but was removed. It meant "visible only to subclasses, but not to the package." It was considered too complex and rarely used, so it was pruned to keep the language simpler.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can a constructor be private? When would you use that?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes.</strong> Private constructors are used in three key patterns: <strong>1) Singleton</strong> — prevent external instantiation. <strong>2) Utility class</strong> — prevent instantiation entirely (e.g., <code>java.util.Collections</code>). <strong>3) Static Factory Method</strong> — control object creation through named methods like <code>of()</code>, <code>valueOf()</code>, or <code>newInstance()</code>.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is the exact difference between default (package-private) and protected?<span class="arrow">▶</span></div>
    <div class="qa-a">Both allow access to classes in the same package. The key difference lies outside the package: <strong>default</strong> completely hides the member from classes outside the package, even subclasses. <strong>Protected</strong> allows subclasses in different packages to inherit and access the member. Therefore, protected is slightly more visible than default.</div>
  </div>
</div>
`,k=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),S=`<div id="cheat-sheets" class="section">
  <div class="breadcrumb">handbook / <span>section 20</span></div>
  <div class="section-eyebrow">The Mastery Roadmap</div>
  <h1>The Senior Developer's Cheat Sheet</h1>
  <div class="section-desc">A high-density reference for the modern Java architect. Bytecode, JVM versions, SOLID principles, and the "Design for Change" checklist.</div>

  <h2>1. Bytecode: The Language of the JVM</h2>
  <div class="table-wrap"><table>
    <tr><th>Instruction</th><th>Usage</th><th>Dispatch Type</th></tr>
    <tr><td><code>invokevirtual</code></td><td>Standard instance methods.</td><td>Dynamic (vtable)</td></tr>
    <tr><td><code>invokeinterface</code></td><td>Interface methods.</td><td>Dynamic (itable)</td></tr>
    <tr><td><code>invokestatic</code></td><td>Static methods.</td><td>Static (Direct)</td></tr>
    <tr><td><code>invokespecial</code></td><td>Private methods, constructors, super.</td><td>Static (Direct)</td></tr>
    <tr><td><code>invokedynamic</code></td><td>Lambdas and dynamic languages.</td><td>Runtime Bootstrap</td></tr>
  </table></div>

  <h2>2. Modern Java Evolution (8 → 21)</h2>
  <ul>
    <li><strong>Java 8</strong>: Lambdas, Streams, Optional, Default methods.</li>
    <li><strong>Java 11</strong>: Local variable type inference (<code>var</code>), HTTP Client.</li>
    <li><strong>Java 17</strong>: <strong>Sealed Classes</strong>, <strong>Records</strong>, Pattern Matching for <code>switch</code>.</li>
    <li><strong>Java 21</strong>: <strong>Virtual Threads (Loom)</strong>, Record Patterns, Sequenced Collections.</li>
  </ul>

  <h2>3. SOLID in 5 Sentences</h2>
  <ol>
    <li><strong>S</strong>: A class should have <strong>only one reason to change</strong>.</li>
    <li><strong>O</strong>: Software entities should be <strong>open for extension, but closed for modification</strong>.</li>
    <li><strong>L</strong>: Subtypes must be <strong>completely substitutable</strong> for their base types.</li>
    <li><strong>I</strong>: Many <strong>specific interfaces</strong> are better than one general-purpose interface.</li>
    <li><strong>D</strong>: Depend on <strong>Abstractions</strong>, not on concretions.</li>
  </ol>

  <h2>4. The "Senior" Design Checklist</h2>
  <div class="box box-insight">
    <div class="box-title">⚖️ The Quality Checklist</div>
    <ul>
      <li><strong>Is it Extendable?</strong> (Can I add a new type without changing existing code? -> OCP).</li>
      <li><strong>Is it Testable?</strong> (Can I mock the dependencies? -> DIP).</li>
      <li><strong>Is it Readable?</strong> (Do the names reflect the business domain? -> DDD).</li>
      <li><strong>Is it Consistent?</strong> (Does it handle errors and invariants predictably? -> Encapsulation).</li>
    </ul>
  </div>

  <h2>5. Common Anti-Patterns & Fixes</h2>
  <div class="table-wrap"><table>
    <tr><th>Smell</th><th>Problem</th><th>The OOP Fix</th></tr>
    <tr><td><strong>God Class</strong></td><td>One class does everything.</td><td>Break into smaller, cohesive classes (SRP).</td></tr>
    <tr><td><strong>Shotgun Surgery</strong></td><td>Changing one thing requires changes everywhere.</td><td>Encapsulate the changing logic in its own class.</td></tr>
    <tr><td><strong>Anemic Domain</strong></td><td>Classes are just data buckets (getters/setters only).</td><td>Move behavior into the domain classes.</td></tr>
    <tr><td><strong>Feature Envy</strong></td><td>Class A uses too many methods of Class B.</td><td>Move the method from A to B (Tell, Don't Ask).</td></tr>
  </table></div>

  <div class="box box-success">
    <div class="box-title">💡 Final Senior Wisdom</div>
    Great design is not about using as many patterns as possible. It is about choosing the <strong>simplest</strong> structure that solves the problem while remaining flexible for the future. Over-engineering is just as dangerous as under-engineering.
  </div>

  <div class="takeaways">
    <div class="takeaways-title">Your Next Steps</div>
    <ul>
      <li><strong>Profile Your Code</strong>: Use JProfiler or VisualVM to see vtable overhead.</li>
      <li><strong>Read the JDK</strong>: Study <code>java.util.Collections</code> for static factory design.</li>
      <li><strong>Practice Refactoring</strong>: Take a "God Class" and break it down using the bridge pattern.</li>
    </ul>
  </div>

  <div class="hero-tags" style="justify-content:center;margin-top:40px;">
    <span class="tag tag-purple">Handbook Mastery</span>
    <span class="tag tag-green">Senior Perspective</span>
    <span class="tag tag-teal">Architect Ready</span>
  </div>
</div>`,x=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"})),C=`<div id="classes-objects" class="section">
  <div class="breadcrumb">handbook / <span>section 02</span></div>
  <div class="section-eyebrow">The Mechanics</div>
  <h1 class="text-gradient">Classes & Objects: The JVM Deep Dive</h1>
  <div class="section-desc">We move beyond the "Blueprint" analogy into the actual byte-level reality of how the JVM manages entities in memory, handles class metadata, and optimizes object creation.</div>

  <div class="takeaways glass-card" style="margin: 3rem 0;">
    <div class="takeaways-title text-gradient-accent">The Logical Split</div>
    <ul>
      <li><strong>Class (Metaspace)</strong>: The blueprint. Contains method bytecode, constant pool, and the <code>vtable</code> for dynamic dispatch.</li>
      <li><strong>Object (Heap)</strong>: The physical instance. Contains actual state (fields) and a header linking back to the blueprint.</li>
    </ul>
  </div>

  <h2>1. Memory Allocation: The Journey of 'new'</h2>
  <p>When you execute <code>User u = new User();</code>, the JVM performs a high-speed orchestration between three memory regions:</p>
  
  <div class="table-wrap">
    <table>
      <tr><th>Region</th><th>Operation</th><th>Stored Data</th></tr>
      <tr><td><strong>Stack</strong></td><td>Frame Creation</td><td>The reference variable <code>u</code> (a 4/8 byte pointer).</td></tr>
      <tr><td><strong>Heap</strong></td><td>Space Allocation</td><td>The actual object data (Header + Instance fields).</td></tr>
      <tr><td><strong>Metaspace</strong></td><td>Metadata Look-up</td><td>Class structure, method vtable, and static fields.</td></tr>
    </table>
  </div>

  <div class="box box-senior">
    <div class="box-title">🧠 Senior Insight: Zero-Initializaton</div>
    Before your constructor even runs, the JVM "zeros out" the allocated heap space. This is why fields like <code>int</code> default to <code>0</code> and references to <code>null</code>. This safety feature prevents "garbage data" from previous memory usage from leaking into your new object.
  </div>

  <h2>2. The Object Anatomy: What's inside?</h2>
  <p>Every object on the heap is more than just its data. The JVM wraps your fields in a high-performance <strong>Header</strong>.</p>

  <div class="memory-viz-container">
    <div class="memory-header">
      <i class="ri-database-2-line"></i> HEAP OBJECT LAYOUT
    </div>
    
    <div class="memory-stack">
      <div class="memory-cell glass-card" style="--border-color: var(--purple); --glow: var(--purple);">
        <div class="cell-meta">
          <span class="cell-tag">Header Part 1</span>
          <span class="cell-size">8 Bytes</span>
        </div>
        <div class="cell-content">
          <div class="cell-title">Mark Word</div>
          <div class="cell-desc">Handles <strong>HashCode</strong>, <strong>Locking</strong>, and <strong>GC Generational Age</strong>.</div>
        </div>
      </div>

      <div class="memory-cell glass-card" style="--border-color: var(--accent); --glow: var(--accent);">
        <div class="cell-meta">
          <span class="cell-tag">Header Part 2</span>
          <span class="cell-size">4/8 Bytes</span>
        </div>
        <div class="cell-content">
          <div class="cell-title">Klass Pointer</div>
          <div class="cell-desc">The physical link to the <strong>Klass metadata</strong> in Metaspace.</div>
        </div>
      </div>

      <div class="memory-cell glass-card" style="--border-color: var(--green); --glow: var(--green);">
        <div class="cell-meta">
          <span class="cell-tag">Fields</span>
          <span class="cell-size">Variable</span>
        </div>
        <div class="cell-content">
          <div class="cell-title">Instance Data</div>
          <div class="cell-desc">Your actual <code>int</code>, <code>boolean</code>, and <code>Object</code> references.</div>
        </div>
      </div>

      <div class="memory-cell glass-card" style="--border-color: var(--text-muted); opacity: 0.6;">
        <div class="cell-meta">
          <span class="cell-tag">Alignment</span>
          <span class="cell-size">0-7 Bytes</span>
        </div>
        <div class="cell-content">
          <div class="cell-title">Padding</div>
          <div class="cell-desc">Fills the gap to ensure the object is <strong>8-byte aligned</strong> for CPU efficiency.</div>
        </div>
      </div>
    </div>
  </div>

  <h2>3. References vs. Values</h2>
  <p>In Java, variables either hold <strong>Primitives</strong> (the actual value) or <strong>References</strong> (the address of an object). This distinction is critical for understanding "Pass-by-Value".</p>

  <pre><code><span class="kw">int</span> x = <span class="num">10</span>;          <span class="cm">// 'x' holds the bits 10 on the STACK</span>
<span class="cl">User</span> u1 = <span class="kw">new</span> <span class="cl">User</span>(); <span class="cm">// 'u1' holds the HEAP ADDRESS (e.g., 0xAF22)</span>
<span class="cl">User</span> u2 = u1;         <span class="cm">// 'u2' holds the SAME ADDRESS. No new object created.</span>

u2.<span class="fn">setName</span>(<span class="str">"Alice"</span>); 
<span class="kw">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(u1.<span class="fn">getName</span>()); <span class="cm">// Prints "Alice" - both share one object!</span>
</code></pre>

  <div class="box box-warning">
    <div class="box-title">⚠️ The Equality Trap</div>
    <code>==</code> compares the <strong>bits</strong> in the variable. For primitives, it compares values. For objects, it compares <strong>addresses</strong>. Always use <code>.equals()</code> for content comparison.
  </div>

  <h2>4. Initialization Blocks: The Hidden Setup</h2>
  <p>Java provides "Instance Initialization Blocks" that run every time an object is created, before the constructor logic.</p>

  <pre><code><span class="kw">public class</span> <span class="cl">Engine</span> {
    <span class="kw">private String</span> status;

    <span class="cm">// Instance Initialization Block</span>
    {
        <span class="kw">this</span>.status = <span class="str">"PRE-HEATING"</span>;
        <span class="kw">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Global init block ran"</span>);
    }

    <span class="kw">public Engine</span>() {
        <span class="kw">this</span>.status = <span class="str">"RUNNING"</span>;
    }
}</code></pre>

  <h2>5. Statics: The Class-Level State</h2>
  <p>Static fields and methods belong to the <strong>Class (Metaspace)</strong>, not the instance. They are shared across all objects of that type.</p>

  <pre><code><span class="kw">public class</span> <span class="cl">Counter</span> {
    <span class="kw">public static int</span> <span class="fn">globalCount</span> = <span class="num">0</span>; <span class="cm">// Shared across ALL instances</span>
    <span class="kw">public int</span> <span class="fn">instanceCount</span> = <span class="num">0</span>;     <span class="cm">// Unique to EACH instance</span>

    <span class="kw">public Counter</span>() {
        globalCount++;
        instanceCount++;
    }
}</code></pre>

  <h2>6. Escape Analysis: The "Invisible" Optimization</h2>
  <p>Modern JVMs use <strong>Escape Analysis</strong> to determine if an object "escapes" a method. If not, the JVM might perform <strong>Scalar Replacement</strong>, breaking the object into primitives and keeping them on the <strong>Stack</strong> or in <strong>Registers</strong> to avoid GC overhead entirely.</p>

  <div class="takeaways glass-card">
    <div class="takeaways-title text-gradient">Architectural Takeaways</div>
    <ul>
      <li><strong>Header Overhead</strong>: Every object costs 12-16 bytes before your data starts. Small objects are expensive.</li>
      <li><strong>Pointer Compression</strong>: JVM uses "Compressed OOPs" to keep references at 4 bytes even on 64-bit systems (up to 32GB heap).</li>
      <li><strong>Identity != HashCode</strong>: The default <code>hashCode()</code> is generated once and stored in the Mark Word; it's not simply the memory address (which can change during GC).</li>
      <li><strong>Statics are Singletons</strong>: Treat static state with care in multi-threaded environments.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What happens if you run out of Metaspace instead of Heap?<span class="arrow">▶</span></div>
    <div class="qa-a">You get a <code>java.lang.OutOfMemoryError: Metaspace</code>. This usually happens in apps that generate many dynamic classes (e.g., using proxies or script engines) without unloading them. Unlike the Heap, Metaspace grows dynamically but is limited by <code>-XX:MaxMetaspaceSize</code>.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why is <code>padding</code> necessary in object anatomy?<span class="arrow">▶</span></div>
    <div class="qa-a">CPU architectures are optimized to read memory in 8-byte (64-bit) chunks. If an object's address isn't aligned to an 8-byte boundary, the CPU might need two memory reads instead of one to fetch a single field. Padding ensures high-performance alignment.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can an object be created without <code>new</code>?<span class="arrow">▶</span></div>
    <div class="qa-a">Yes. Via <strong>Deserialization</strong>, <strong>Reflection</strong> (<code>newInstance()</code>), <strong>Cloning</strong>, or via <strong>Unsafe</strong> (which allocates memory without calling any constructor).</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Is Java "Pass-by-Reference" or "Pass-by-Value"?<span class="arrow">▶</span></div>
    <div class="qa-a">Java is strictly <strong>Pass-by-Value</strong>. However, for objects, the "value" being passed is the <em>reference</em> (memory address) to the object. You can mutate the object's fields via this reference, but you cannot change which object the original variable points to.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is "Escape Analysis" in modern JVMs?<span class="arrow">▶</span></div>
    <div class="qa-a">It is a JIT optimization where the compiler analyzes if an object "escapes" the current method or thread. If it doesn't, the JVM can allocate the object directly on the <strong>Stack</strong> instead of the Heap, eliminating Garbage Collection overhead for that object.</div>
  </div>
  <style>
    .memory-viz-container {
      margin: 4rem 0;
      background: var(--bg-sidebar);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }
    .memory-header {
      padding: 1rem 1.5rem;
      background: rgba(255,255,255,0.02);
      border-bottom: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .memory-stack {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .memory-cell {
      padding: 1.25rem;
      position: relative;
      border-left: 4px solid var(--border-color) !important;
      transition: all 0.3s ease;
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 2rem;
      align-items: center;
    }
    .memory-cell:hover {
      transform: translateX(10px);
      background: rgba(255,255,255,0.05);
      box-shadow: -10px 0 30px -10px var(--glow);
    }
    .cell-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .cell-tag {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      font-weight: 700;
    }
    .cell-size {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--border-color);
      font-weight: 600;
    }
    .cell-title {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 4px;
    }
    .cell-desc {
      font-size: 0.9rem;
      color: var(--text-dim);
      line-height: 1.4;
    }
    @media (max-width: 768px) {
      .memory-cell {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .cell-meta { flex-direction: row; justify-content: space-between; }
    }
  </style>
</div>`,T=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"})),I=`<div id="constructors" class="section">
  <div class="breadcrumb">handbook / <span>section 03</span></div>
  <div class="section-eyebrow">The Initialization</div>
  <h1>Constructors: Mastering Object Birth</h1>
  <div class="section-desc">We go beyond simple initialization. We look at the bytecode, the security risks of construction, the "Initialization Order," and the strategic use of constructor overloading.</div>

  <h2>1. The Bytecode Secret: &lt;init&gt; vs &lt;clinit&gt;</h2>
  <p>The JVM doesn't actually see "Constructors." It sees two special methods:</p>
  <ul>
    <li><strong>&lt;clinit&gt;</strong>: The "Class Initializer." Runs when the class is loaded. Handles <code>static</code> blocks and variables.</li>
    <li><strong>&lt;init&gt;</strong>: The "Instance Initializer." This is what your constructor compiles into. It handles the actual object setup.</li>
  </ul>

  <h2>2. The Mandatory Execution Flow</h2>
  <p>When you call <code>new Child()</code>, the JVM follows a non-negotiable sequence. Memorize this for LLD interviews:</p>
  <div class="diagram">
1. Load Parent Class (if not loaded)
2. Load Child Class
3. Execute Parent STATIC blocks
4. Execute Child STATIC blocks
5. Allocate Heap memory (set defaults: 0, null)
6. Execute Parent INSTANCE blocks & fields
7. Execute Parent CONSTRUCTOR
8. Execute Child INSTANCE blocks & fields
9. Execute Child CONSTRUCTOR</div>

  <div class="box box-insight">
    <div class="box-title">💡 The Default Constructor Rule</div>
    The compiler only provides a <strong>no-argument default constructor</strong> if you write <strong>zero</strong> constructors yourself. As soon as you add even one constructor (e.g., <code>public User(String name)</code>), the default constructor is <strong>gone</strong>. This often breaks child classes that implicitly call <code>super()</code>.
  </div>
<h2>2. Simple Constructor Example</h2>
<pre><code><span class="kw">public class</span> <span class="cl">Person</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;
    <span class="kw">private int</span> age;

    <span class="kw">public Person</span>(<span class="cl">String</span> name, <span class="kw">int</span> age) {
        <span class="kw">this</span>.<span class="fn">name</span> = name;
        <span class="kw">this</span>.<span class="fn">age</span> = age;
    }

    <span class="kw">public void</span> <span class="fn">introduce</span>() {
        <span class="kw">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Hi, I'm "</span> + name + <span class="str">", "</span> + age + <span class="str">" years old."</span>);
    }
}

// Usage
<span class="cl">Person</span> p = <span class="kw">new</span> <span class="cl">Person</span>(<span class="str">"Bob"</span>, <span class="num">28</span>);
p.<span class="fn">introduce</span>(); <span class="cm">// prints Hi, I'm Bob, 28 years old.</span>
</code></pre>
  <div class="box box-danger">
    <div class="box-title">🚨 The Mortal Sin: Calling Overridable Methods</div>
    Never call a non-final method inside a constructor.
    <pre style="margin-top:10px;"><code><span class="kw">class</span> <span class="cl">Parent</span> {
    <span class="cl">Parent</span>() { <span class="fn">setup</span>(); } <span class="cm">// DANGER!</span>
    <span class="kw">void</span> <span class="fn">setup</span>() { System.out.println(<span class="str">"Parent"</span>); }
}
<span class="kw">class</span> <span class="cl">Child</span> <span class="kw">extends</span> <span class="cl">Parent</span> {
    <span class="cl">String</span> name = <span class="str">"Child"</span>;
    <span class="kw">void</span> <span class="fn">setup</span>() { System.out.println(name.length()); } <span class="cm">// NullPointerException!</span>
}</code></pre>
    <strong>Why?</strong> Because <code>Parent</code> constructor runs <em>before</em> <code>Child</code> fields are initialized. <code>name</code> is still <code>null</code> when <code>setup()</code> is called.
  </div>

  <h2>3. Constructor Overloading & Telescoping Constructors</h2>
  <div class="box box-smell">
    <div class="box-title">🤢 Design Smell: Telescoping Constructors</div>
    If you have a class with 5 different constructors, each taking one more parameter than the last, you have a <strong>Telescoping Constructor</strong> anti-pattern. It makes the code unreadable (e.g., <code>new User("Alice", null, 0, false, null)</code>).
  </div>
  <div class="box box-lld">
    <div class="box-title">⚙️ LLD Connection: The Builder Pattern</div>
    To fix telescoping constructors, Senior Engineers use the <strong>Builder Pattern</strong> (Effective Java Item 2). It allows you to construct complex objects step-by-step and makes the client code infinitely more readable.
  </div>
  <p>Constructor overloading allows you to provide multiple ways to initialize an object. If you must use it, use <code>this()</code> to avoid code duplication and centralize validation.</p>
  <pre><code><span class="kw">public class</span> <span class="cl">Product</span> {
    <span class="kw">private</span> <span class="cl">String</span> id;
    <span class="kw">private double</span> price;

    <span class="kw">public</span> <span class="cl">Product</span>(<span class="cl">String</span> id) { 
        <strong>this</strong>(id, <span class="num">0.0</span>); <span class="cm">// Chain to the master constructor</span>
    }

    <span class="kw">public</span> <span class="cl">Product</span>(<span class="cl">String</span> id, <span class="kw">double</span> price) {
        this.id = id;
        this.price = price;
    }
}</code></pre>

  <h2>4. Leaking 'this' (Security Risk)</h2>
  <div class="box box-senior">
    <div class="box-title">🧠 How Senior Engineers Think: Escape Before Construction</div>
    If you pass <code>this</code> to another thread or listener inside a constructor, you are leaking a "partially constructed" object. Other threads might access the object before its <code>final</code> fields are fully initialized, breaking the Java Memory Model guarantees.
  </div>
  <pre><code><span class="cm">// DANGEROUS — leaking 'this' before construction is complete</span>
<span class="kw">public class</span> <span class="cl">EventSource</span> {
    <span class="kw">private final</span> <span class="cl">List</span>&lt;<span class="cl">Listener</span>&gt; listeners;
    <span class="kw">private int</span> value;

    <span class="kw">public</span> <span class="cl">EventSource</span>(<span class="cl">List</span>&lt;<span class="cl">Listener</span>&gt; listeners) {
        <span class="kw">this</span>.listeners = listeners;
        listeners.<span class="fn">forEach</span>(l -> l.<span class="fn">onCreated</span>(<span class="kw">this</span>)); <span class="cm">// DANGER! 'value' not set yet!</span>
        <span class="kw">this</span>.value = <span class="num">42</span>; <span class="cm">// too late — listeners already saw value = 0</span>
    }
}

<span class="cm">// SAFE — use a static factory method</span>
<span class="kw">public class</span> <span class="cl">EventSource</span> {
    <span class="kw">private</span> <span class="cl">EventSource</span>(<span class="kw">int</span> value) { <span class="kw">this</span>.value = value; }

    <span class="kw">public static</span> <span class="cl">EventSource</span> <span class="fn">create</span>(<span class="kw">int</span> val, <span class="cl">List</span>&lt;<span class="cl">Listener</span>&gt; listeners) {
        <span class="cl">EventSource</span> es = <span class="kw">new</span> <span class="cl">EventSource</span>(val); <span class="cm">// fully constructed</span>
        listeners.<span class="fn">forEach</span>(l -> l.<span class="fn">onCreated</span>(es)); <span class="cm">// safe!</span>
        <span class="kw">return</span> es;
    }
}
</code></pre>

  <h2>5. Copy Constructor (Better than clone())</h2>
  <pre><code><span class="kw">public class</span> <span class="cl">Address</span> {
    <span class="kw">private</span> <span class="cl">String</span> city;
    <span class="kw">private</span> <span class="cl">String</span> zip;

    <span class="kw">public</span> <span class="cl">Address</span>(<span class="cl">String</span> city, <span class="cl">String</span> zip) {
        <span class="kw">this</span>.city = city;
        <span class="kw">this</span>.zip = zip;
    }

    <span class="cm">// COPY CONSTRUCTOR — explicit deep copy</span>
    <span class="kw">public</span> <span class="cl">Address</span>(<span class="cl">Address</span> other) {
        <span class="kw">this</span>.city = other.city;
        <span class="kw">this</span>.zip = other.zip;
    }
}

<span class="cl">Address</span> original = <span class="kw">new</span> <span class="cl">Address</span>(<span class="str">"NY"</span>, <span class="str">"10001"</span>);
<span class="cl">Address</span> copy = <span class="kw">new</span> <span class="cl">Address</span>(original); <span class="cm">// independent copy</span>
</code></pre>

  <h2>6. Modern Java: Compact Constructors</h2>
  <p>With <strong>Records</strong> (Java 14+), we use "Compact Constructors" to perform validation without the boilerplate of assignment.</p>
  <pre><code><span class="kw">public record</span> <span class="cl">User</span>(<span class="kw">String</span> username, <span class="kw">int</span> age) {
    <span class="kw">public</span> <span class="cl">User</span> {
        <span class="kw">if</span> (age < <span class="num">18</span>) <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>();
        <span class="cm">// username and age are assigned automatically!</span>
    }
}</code></pre>

  <h2>6. Constructor Chaining Strategy</h2>
  <p>Always have one "Master Constructor" that does the heavy lifting, and have all other constructors (overloads) call it using <code>this()</code>. This ensures validation logic is centralized.</p>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 03</div>
    <ul>
      <li><strong>Constructors are not inherited</strong>, but they are chained via <code>super()</code>.</li>
      <li><strong>Static blocks run once</strong> per classloader, not per object.</li>
      <li><strong>Private constructors</strong> are for Singletons and Utility classes (prevent <code>new</code>).</li>
      <li><strong>Throwing exceptions in constructors</strong> is legal and a good way to prevent "Invalid Objects."</li>
      <li><strong>this() and super()</strong> must be the first line of the constructor.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 03</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can you use <code>this()</code> and <code>super()</code> together in one constructor?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>No.</strong> Both must be the first statement in a constructor. Since there can only be one "first" statement, they are mutually exclusive. If you use <code>this()</code>, the <code>super()</code> call will happen in the constructor you chained to.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is a 'Copy Constructor' and why does Java prefer it over <code>clone()</code>?<span class="arrow">▶</span></div>
    <div class="qa-a">A Copy Constructor takes an instance of the same class as a parameter. It is preferred because <code>clone()</code> is buggy, requires complex error handling, and creates a shallow copy by default. Copy constructors allow you to explicitly control the deep copy of each field and are much more readable.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can a constructor be synchronized?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>No.</strong> A constructor cannot be synchronized. Only the thread that creates an object should have access to it while it is being constructed. Synchronization is not needed and will result in a compile-time error.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What happens if an Exception is thrown inside a constructor?<span class="arrow">▶</span></div>
    <div class="qa-a">If an exception is thrown in a constructor and not caught within it, the object creation fails. The reference to the partially constructed object is never assigned, making it eligible for garbage collection. However, any external resources opened before the exception (like files or database connections) might leak unless properly handled (e.g., in a finally block before throwing).</div>
  </div>
</div>`,A=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),P=`<div id="encapsulation" class="section">\r
  <div class="breadcrumb">handbook / the 4 pillars / <span>section 04A</span></div>\r
  <div class="section-eyebrow">The First Pillar</div>\r
  <h1>Encapsulation: Protecting the Invariants</h1>\r
  <div class="section-desc">We move beyond "making fields private." Encapsulation is about <strong>Information Hiding</strong> and maintaining the internal consistency (Invariants) of an object at all costs.</div>\r
\r
  <h2>1. Encapsulation vs. Information Hiding</h2>\r
  <ul>\r
    <li><strong>Encapsulation</strong>: Bundling data (fields) and methods (behavior) together into a single unit (Class).</li>\r
    <li><strong>Information Hiding</strong>: Preventing the outside world from seeing or modifying internal state directly via <strong>Access Modifiers</strong>.</li>\r
  </ul>\r
\r
  <h3>Example: Complete Encapsulated Class</h3>\r
  <pre><code><span class="kw">public class</span> <span class="cl">BankAccount</span> {\r
    <span class="kw">private</span> <span class="cl">String</span> accountId;\r
    <span class="kw">private double</span> balance;\r
    <span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">String</span>&gt; transactionHistory = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();\r
\r
    <span class="kw">public</span> <span class="cl">BankAccount</span>(<span class="cl">String</span> accountId, <span class="kw">double</span> initialBalance) {\r
        <span class="kw">if</span> (initialBalance < <span class="num">0</span>)\r
            <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>(<span class="str">"Cannot start negative"</span>);\r
        <span class="kw">this</span>.accountId = accountId;\r
        <span class="kw">this</span>.balance = initialBalance;\r
        <span class="fn">logTransaction</span>(<span class="str">"Account opened with $"</span> + initialBalance);\r
    }\r
\r
    <span class="kw">public void</span> <span class="fn">deposit</span>(<span class="kw">double</span> amount) {\r
        <span class="kw">if</span> (amount <= <span class="num">0</span>) <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>(<span class="str">"Must be positive"</span>);\r
        balance += amount;\r
        <span class="fn">logTransaction</span>(<span class="str">"Deposited $"</span> + amount);\r
    }\r
\r
    <span class="kw">public void</span> <span class="fn">withdraw</span>(<span class="kw">double</span> amount) {\r
        <span class="kw">if</span> (amount <= <span class="num">0</span>) <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>(<span class="str">"Must be positive"</span>);\r
        <span class="kw">if</span> (amount > balance) <span class="kw">throw new</span> <span class="cl">IllegalStateException</span>(<span class="str">"Insufficient funds"</span>);\r
        balance -= amount;\r
        <span class="fn">logTransaction</span>(<span class="str">"Withdrew $"</span> + amount);\r
    }\r
\r
    <span class="kw">public double</span> <span class="fn">getBalance</span>() { <span class="kw">return</span> balance; }\r
\r
    <span class="cm">// DEFENSIVE COPY — never return the real list!</span>\r
    <span class="kw">public</span> <span class="cl">List</span>&lt;<span class="cl">String</span>&gt; <span class="fn">getTransactionHistory</span>() {\r
        <span class="kw">return</span> <span class="cl">Collections</span>.<span class="fn">unmodifiableList</span>(transactionHistory);\r
    }\r
\r
    <span class="kw">private void</span> <span class="fn">logTransaction</span>(<span class="cl">String</span> msg) {\r
        transactionHistory.<span class="fn">add</span>(<span class="cl">LocalDateTime</span>.<span class="fn">now</span>() + <span class="str">": "</span> + msg);\r
    }\r
}\r
\r
<span class="cm">// Usage — all access goes through controlled methods</span>\r
<span class="cl">BankAccount</span> acc = <span class="kw">new</span> <span class="cl">BankAccount</span>(<span class="str">"ACC-001"</span>, <span class="num">1000</span>);\r
acc.<span class="fn">deposit</span>(<span class="num">500</span>);\r
acc.<span class="fn">withdraw</span>(<span class="num">200</span>);\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(acc.<span class="fn">getBalance</span>()); <span class="cm">// 1300.0</span>\r
<span class="cm">// acc.balance = -9999; // COMPILE ERROR — field is private!</span>\r
</code></pre>\r
\r
  <h2>2. The "Invariant" Mastery</h2>\r
  <p>An <strong>Invariant</strong> is a condition that must always be true for an object to be valid.</p>\r
  <div class="compare">\r
    <div class="compare-col">\r
      <div class="compare-label compare-bad">❌ Bad: Naked Fields</div>\r
      <pre style="font-size:11px;"><code><span class="kw">class</span> <span class="cl">Account</span> {\r
    <span class="kw">public double</span> balance;\r
}\r
<span class="cm">// External code can do:</span>\r
account.balance = -<span class="num">100000</span>; <span class="cm">// BROKEN</span></code></pre>\r
    </div>\r
    <div class="compare-col">\r
      <div class="compare-label compare-good">✅ Good: Encapsulated</div>\r
      <pre style="font-size:11px;"><code><span class="kw">class</span> <span class="cl">Account</span> {\r
    <span class="kw">private double</span> balance;\r
    <span class="kw">public void</span> <span class="fn">withdraw</span>(<span class="kw">double</span> amt) {\r
        <span class="kw">if</span>(amt > <span class="num">0</span> && amt <= balance)\r
            balance -= amt;\r
    }\r
}</code></pre>\r
    </div>\r
  </div>\r
\r
  <h2>3. Defensive Copying</h2>\r
  <div class="box box-danger">\r
    <div class="box-title">🚨 Senior Trap: Leaking the Reference</div>\r
    If your private field is a mutable object (like a <code>Date</code> or <code>List</code>), returning it via a getter <strong>breaks encapsulation</strong>.\r
  </div>\r
  <pre><code><span class="cm">// BAD — leaks internal state</span>\r
<span class="kw">public</span> <span class="cl">List</span>&lt;<span class="cl">String</span>&gt; <span class="fn">getRoles</span>() {\r
    <span class="kw">return</span> roles; <span class="cm">// caller can do getRoles().clear()!</span>\r
}\r
\r
<span class="cm">// GOOD — defensive copy</span>\r
<span class="kw">public</span> <span class="cl">List</span>&lt;<span class="cl">String</span>&gt; <span class="fn">getRoles</span>() {\r
    <span class="kw">return new</span> <span class="cl">ArrayList</span>&lt;&gt;(roles); <span class="cm">// return a COPY</span>\r
}\r
\r
<span class="cm">// BEST — unmodifiable view (no memory copy)</span>\r
<span class="kw">public</span> <span class="cl">List</span>&lt;<span class="cl">String</span>&gt; <span class="fn">getRoles</span>() {\r
    <span class="kw">return</span> <span class="cl">Collections</span>.<span class="fn">unmodifiableList</span>(roles);\r
}\r
\r
<span class="cm">// Also defend on INPUT (setter/constructor)</span>\r
<span class="kw">public void</span> <span class="fn">setRoles</span>(<span class="cl">List</span>&lt;<span class="cl">String</span>&gt; roles) {\r
    <span class="kw">this</span>.roles = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;(roles); <span class="cm">// copy input too!</span>\r
}\r
</code></pre>\r
\r
  <h2>4. Tell, Don't Ask (Law of Demeter)</h2>\r
  <div class="box box-lld">\r
    <div class="box-title">⚙️ LLD Connection: Feature Envy</div>\r
    If an object is constantly asking another object for its data to perform an operation, it's called <strong>Feature Envy</strong>. The logic should be moved to the object that owns the data. This keeps objects highly cohesive.\r
  </div>\r
  <p>You shouldn't ask an object about its state to make a decision; you should tell the object what to do.</p>\r
  <pre><code><span class="cm">// BAD — asking for state, then deciding externally</span>\r
<span class="kw">if</span> (user.<span class="fn">getAddress</span>().<span class="fn">getCity</span>().<span class="fn">equals</span>(<span class="str">"NY"</span>)) {\r
    <span class="fn">applyNYTax</span>(order);\r
}\r
\r
<span class="cm">// GOOD — tell the object to handle it</span>\r
<span class="kw">if</span> (user.<span class="fn">isResidentOf</span>(<span class="str">"NY"</span>)) {\r
    <span class="fn">applyNYTax</span>(order);\r
}\r
\r
<span class="cm">// EVEN BETTER — the order handles its own tax</span>\r
order.<span class="fn">applyTaxFor</span>(user);\r
</code></pre>\r
\r
  <h2>5. Validation in Setters (Self-Defense)</h2>\r
  <div class="box box-smell">\r
    <div class="box-title">🤢 Design Smell: Primitive Obsession</div>\r
    Using a raw <code>String</code> for an Email or a raw <code>int</code> for an Age forces every layer of your application to validate it. Instead, encapsulate it into a <strong>Value Object</strong> (e.g., an <code>EmailAddress</code> class) that validates itself exactly once during construction.\r
  </div>\r
  <pre><code><span class="kw">public class</span> <span class="cl">Employee</span> {\r
    <span class="kw">private</span> <span class="cl">EmailAddress</span> email; <span class="cm">// Strongly typed, guaranteed valid</span>\r
    <span class="kw">private</span> <span class="cl">Age</span> age;\r
\r
    <span class="kw">public void</span> <span class="fn">setEmail</span>(<span class="cl">EmailAddress</span> email) {\r
        <span class="cm">// No regex needed here! EmailAddress handles its own validation.</span>\r
        <span class="kw">this</span>.email = email;\r
    }\r
}\r
</code></pre>\r
\r
  <h2>6. Reflection: The Encapsulation Breaker</h2>\r
  <pre><code><span class="cm">// Reflection can bypass private — DON'T do this in production!</span>\r
<span class="cl">Field</span> balanceField = <span class="cl">BankAccount</span>.<span class="kw">class</span>.<span class="fn">getDeclaredField</span>(<span class="str">"balance"</span>);\r
balanceField.<span class="fn">setAccessible</span>(<span class="kw">true</span>); <span class="cm">// bypasses private!</span>\r
balanceField.<span class="fn">setDouble</span>(account, <span class="num">999999</span>);\r
\r
<span class="cm">// Java 9+ modules can prevent this:</span>\r
<span class="cm">// module-info.java does NOT 'open' the package</span>\r
<span class="cm">// → IllegalAccessException at runtime</span>\r
</code></pre>\r
\r
  <div class="takeaways">\r
    <div class="takeaways-title">Key Takeaways — Section 04A</div>\r
    <ul>\r
      <li><strong>Bundle state and behavior</strong> to control access.</li>\r
      <li><strong>Defensive Copying</strong> is mandatory for mutable fields.</li>\r
      <li><strong>Invariants</strong> are business rules that the class must protect.</li>\r
      <li><strong>Law of Demeter</strong> prevents "Feature Envy" and reduces coupling.</li>\r
      <li><strong>Strong Encapsulation</strong> (Java 9+) protects even against Reflection.</li>\r
    </ul>\r
  </div>\r
\r
  <h2>Interview Deep Dive — Section 04A</h2>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">Why are getters/setters considered a "necessary evil"?<span class="arrow">▶</span></div>\r
    <div class="qa-a">Too many getters/setters make the data public again. You have an "Anemic Domain Model." True OOP favors methods that perform <strong>Business Actions</strong> (like <code>withdraw()</code>) rather than just setting raw values (like <code>setBalance()</code>).</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is the "Data Clump" smell?<span class="arrow">▶</span></div>\r
    <div class="qa-a">When a group of variables (e.g., <code>startDate</code>, <code>endDate</code>) always appear together. Encapsulate them into a <code>DateRange</code> object with behavior like <code>isOverlapping()</code>.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is 'Strong Encapsulation' in Java 17?<span class="arrow">▶</span></div>\r
    <div class="qa-a">Project Jigsaw means even Reflection cannot access internal classes unless explicitly <code>exported</code> or <code>opened</code> in <code>module-info.java</code>.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is an "Anemic Domain Model"?<span class="arrow">▶</span></div>\r
    <div class="qa-a">An Anemic Domain Model is one where classes only contain data (fields, getters, and setters) but no behavior. It violates encapsulation because the business logic that operates on that data is scattered across Service classes, rather than living inside the Domain object itself. In a Rich Domain Model, the object protects its invariants by having methods like <code>user.changePassword()</code> instead of a service calling <code>user.setPassword(hash)</code>.</div>\r
  </div>\r
</div>`,O=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"})),E=`<div id="enums" class="section">
  <div class="breadcrumb">handbook / deep dives / <span>section 15</span></div>
  <div class="section-eyebrow">The Special Classes</div>
  <h1>Enums: More than just Constants</h1>
  <div class="section-desc">In Java, an <code>Enum</code> is a full-featured class. We explore how to add behavior to constants, the "Enum Singleton" pattern, and the high-performance collections built specifically for enums.</div>

  <h2>1. Enums are Classes</h2>
  <p>Every enum in Java extends <code>java.lang.Enum</code>. You can add fields, constructors, and methods. Enum constants are essentially <code>public static final</code> instances of the enum class.</p>
  <pre><code><span class="kw">public enum</span> <span class="cl">Status</span> {
    <span class="cl">OPEN</span>(<span class="num">1</span>), <span class="cl">CLOSED</span>(<span class="num">0</span>);
    <span class="kw">private final int</span> code;
    <span class="cl">Status</span>(<span class="kw">int</span> code) { this.code = code; }
    <span class="kw">public int</span> <span class="fn">getCode</span>() { <span class="kw">return</span> code; }
}</code></pre>

  <h2>2. The "Enum Singleton" (The Ultimate Pattern)</h2>
  <div class="box box-insight">
    <div class="box-title">🏆 Joshua Bloch's Advice</div>
    "A single-element enum type is the best way to implement a singleton." 
    <br><br>
    <strong>Why?</strong> It is thread-safe, handles serialization automatically, and is protected against reflection attacks.
  </div>
  <pre><code><span class="kw">public enum</span> <span class="cl">AppConfig</span> {
    INSTANCE;

    <span class="kw">private</span> <span class="cl">String</span> dbUrl;

    <span class="kw">public void</span> <span class="fn">setDbUrl</span>(<span class="cl">String</span> url) { <span class="kw">this</span>.dbUrl = url; }
    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">getDbUrl</span>() { <span class="kw">return</span> dbUrl; }
}

<span class="cm">// Usage — guaranteed single instance</span>
<span class="cl">AppConfig</span>.INSTANCE.<span class="fn">setDbUrl</span>(<span class="str">"jdbc:mysql://prod"</span>);
<span class="cl">String</span> url = <span class="cl">AppConfig</span>.INSTANCE.<span class="fn">getDbUrl</span>();
</code></pre>

  <h2>3. Enums with Behavior (Strategy Pattern)</h2>
  <p>You can define an abstract method in an enum and have each constant provide its own implementation. This is the cleanest way to implement the <strong>Strategy Pattern</strong> when the strategies are fixed.</p>
  <pre><code><span class="kw">public enum</span> <span class="cl">Operation</span> {
    <span class="cl">PLUS</span> { <span class="kw">double</span> <span class="fn">apply</span>(<span class="kw">double</span> x, <span class="kw">double</span> y) { <span class="kw">return</span> x + y; } },
    <span class="cl">MINUS</span> { <span class="kw">double</span> <span class="fn">apply</span>(<span class="kw">double</span> x, <span class="kw">double</span> y) { <span class="kw">return</span> x - y; } };
    <span class="kw">abstract double</span> <span class="fn">apply</span>(<span class="kw">double</span> x, <span class="kw">double</span> y);
}</code></pre>

  <h2>4. The values() Performance Trap</h2>
  <div class="box box-danger">
    <div class="box-title">🚨 Senior Performance Fact</div>
    The <code>values()</code> method in an enum returns a <strong>new array</strong> every time it is called. The JVM does this for <strong>Defensive Copying</strong> (to prevent you from modifying the internal array of constants). 
    <br><br>
    <strong>The Fix</strong>: If you need to iterate over enums in a high-frequency loop, cache the result of <code>values()</code> in a static final field or use a <code>List</code>.
  </div>

  <h2>5. High-Performance: EnumSet & EnumMap</h2>
  <p>Don't use <code>HashSet</code> or <code>HashMap</code> for enums. Use <code>EnumSet</code> and <code>EnumMap</code>. 
  <ul>
    <li><strong>EnumSet</strong>: Represented as a <code>long</code> bit-vector. Adding, removing, and checking for existence are <strong>O(1)</strong> and incredibly fast.</li>
    <li><strong>EnumMap</strong>: Represented as a simple array. No hashing overhead.</li>
  </ul></p>
  <pre><code><span class="cm">// EnumSet — blazing fast O(1) operations</span>
<span class="cl">EnumSet</span>&lt;<span class="cl">Status</span>&gt; activeStatuses = <span class="cl">EnumSet</span>.<span class="fn">of</span>(<span class="cl">Status</span>.OPEN);
<span class="cl">EnumSet</span>&lt;<span class="cl">Status</span>&gt; all = <span class="cl">EnumSet</span>.<span class="fn">allOf</span>(<span class="cl">Status</span>.<span class="kw">class</span>);

<span class="cm">// EnumMap — faster than HashMap for enum keys</span>
<span class="cl">EnumMap</span>&lt;<span class="cl">OrderState</span>, <span class="cl">String</span>&gt; labels = <span class="kw">new</span> <span class="cl">EnumMap</span>&lt;&gt;(<span class="cl">OrderState</span>.<span class="kw">class</span>);
labels.<span class="fn">put</span>(<span class="cl">OrderState</span>.NEW, <span class="str">"Just created"</span>);
labels.<span class="fn">put</span>(<span class="cl">OrderState</span>.SHIPPED, <span class="str">"On the way"</span>);
</code></pre>

  <h2>6. Enums as State Machines</h2>
  <p>Enums are perfect for modeling finite state machines. Each constant can transition to another constant based on an input.</p>
  <pre><code><span class="kw">public enum</span> <span class="cl">OrderState</span> {
    <span class="cl">NEW</span> { <span class="kw">public</span> <span class="cl">OrderState</span> <span class="fn">next</span>() { <span class="kw">return</span> <span class="cl">PAID</span>; } },
    <span class="cl">PAID</span> { <span class="kw">public</span> <span class="cl">OrderState</span> <span class="fn">next</span>() { <span class="kw">return</span> <span class="cl">SHIPPED</span>; } },
    <span class="cl">SHIPPED</span> { <span class="kw">public</span> <span class="cl">OrderState</span> <span class="fn">next</span>() { <span class="kw">return</span> <span class="cl">DELIVERED</span>; } },
    <span class="cl">DELIVERED</span> { <span class="kw">public</span> <span class="cl">OrderState</span> <span class="fn">next</span>() { <span class="kw">return</span> this; } };
    <span class="kw">public abstract</span> <span class="cl">OrderState</span> <span class="fn">next</span>();
}</code></pre>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 15</div>
    <ul>
      <li><strong>Enums are classes</strong> with a fixed set of instances.</li>
      <li><strong>Enum Singleton</strong> is the safest way to implement Singletons.</li>
      <li><strong>Use EnumSet/EnumMap</strong> for maximum performance.</li>
      <li><strong>Enums can have state and behavior</strong> and can implement interfaces.</li>
      <li><strong>Avoid values() in loops</strong> to prevent unnecessary object allocation.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 15</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can we use Enums in a Switch statement?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes.</strong> This is one of the primary use cases. Modern Java (17+) also supports Switch Expressions with Enums, which are more concise and don't require <code>break</code>.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why is it better to use an Enum instead of 'static final int' constants?<span class="arrow">▶</span></div>
    <div class="qa-a">1. <strong>Type Safety</strong>: You cannot pass an arbitrary integer to a method that expects an enum. 2. <strong>Namespace</strong>: Constants are grouped logically. 3. <strong>Behavior</strong>: You can add methods and logic directly to the enum. 4. <strong>Serialization</strong>: Enums handle serialization and deserialization safely by default.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can an Enum extend another class or implement an interface?<span class="arrow">▶</span></div>
    <div class="qa-a">An enum <strong>cannot</strong> extend another class because all enums implicitly extend <code>java.lang.Enum</code>, and Java does not support multiple class inheritance. However, an enum <strong>can</strong> implement interfaces. This is extremely useful for things like the Strategy Pattern, where each enum value provides a different implementation of an interface method.</div>
  </div>
</div>
`,D=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"})),M=`<div id="exception-handling" class="section">
  <div class="breadcrumb">handbook / <span>section 16</span></div>
  <div class="section-eyebrow">The Error Handling</div>
  <h1>Exception Handling: Designing for Failure</h1>
  <div class="section-desc">Exceptions are objects. Handling them is not just about avoiding crashes; it's about defining how your system communicates failure across layers and managing the performance cost of failure.</div>

  <h2>1. The Throwable Hierarchy</h2>
  <div class="diagram">
        [ Throwable ]
       /             \\
  [ Error ]       [ Exception ]
  (JVM Failure)      /         \\
             [ RuntimeEx ] [ Checked Ex ]
             (Bugs)        (Recoverable)</div>

  <h2>2. Checked vs. Unchecked</h2>
  <div class="table-wrap"><table>
    <tr><th>Type</th><th>Must Catch/Declare?</th><th>Examples</th><th>Use When</th></tr>
    <tr><td><strong>Checked</strong></td><td>Yes</td><td>IOException, SQLException</td><td>Caller CAN recover</td></tr>
    <tr><td><strong>Unchecked</strong></td><td>No</td><td>NPE, IllegalArgument</td><td>Programming error (bug)</td></tr>
    <tr><td><strong>Error</strong></td><td>No (don't catch!)</td><td>OutOfMemoryError, StackOverflow</td><td>JVM is dying</td></tr>
  </table></div>

  <h3>Example: Custom Checked vs Unchecked Exception</h3>
  <pre><code><span class="cm">// CHECKED — caller is forced to handle</span>
<span class="kw">public class</span> <span class="cl">InsufficientFundsException</span> <span class="kw">extends</span> <span class="cl">Exception</span> {
    <span class="kw">private final double</span> deficit;

    <span class="kw">public</span> <span class="cl">InsufficientFundsException</span>(<span class="kw">double</span> deficit) {
        <span class="kw">super</span>(<span class="str">"Short by $"</span> + deficit);
        <span class="kw">this</span>.deficit = deficit;
    }

    <span class="kw">public double</span> <span class="fn">getDeficit</span>() { <span class="kw">return</span> deficit; }
}

<span class="cm">// UNCHECKED — programming error, fail fast</span>
<span class="kw">public class</span> <span class="cl">InvalidOrderException</span> <span class="kw">extends</span> <span class="cl">RuntimeException</span> {
    <span class="kw">public</span> <span class="cl">InvalidOrderException</span>(<span class="cl">String</span> msg) {
        <span class="kw">super</span>(msg);
    }
}
</code></pre>

  <h2>3. The "Fail-Fast" Principle</h2>
  <div class="box box-smell">
    <div class="box-title">🤢 Design Smell: Swallowing Exceptions</div>
    <code>try { risky(); } catch (Exception e) {}</code> is the most dangerous line of code you can write. It hides failures, corrupts state, and makes debugging impossible. Always log or rethrow. If you <em>must</em> ignore it, name the variable <code>ignored</code> to signal intent.
  </div>
  <pre><code><span class="cm">// BAD — null propagates, crashes deep in the stack</span>
<span class="kw">public void</span> <span class="fn">processOrder</span>(<span class="cl">Order</span> order) {
    <span class="cm">// ... 50 lines later ...</span>
    order.<span class="fn">getCustomer</span>().<span class="fn">getEmail</span>(); <span class="cm">// NPE! Where did null come from?</span>
}

<span class="cm">// GOOD — fail fast at the gate</span>
<span class="kw">public void</span> <span class="fn">processOrder</span>(<span class="cl">Order</span> order) {
    <span class="cl">Objects</span>.<span class="fn">requireNonNull</span>(order, <span class="str">"Order cannot be null"</span>);
    <span class="cl">Objects</span>.<span class="fn">requireNonNull</span>(order.<span class="fn">getCustomer</span>(), <span class="str">"Customer cannot be null"</span>);
    <span class="cm">// now proceed safely...</span>
}
</code></pre>

  <h2>4. Try-with-Resources (AutoCloseable)</h2>
  <pre><code><span class="cm">// MODERN — resources auto-closed, even if exception thrown</span>
<span class="kw">public</span> <span class="cl">String</span> <span class="fn">readFile</span>(<span class="cl">String</span> path) <span class="kw">throws</span> <span class="cl">IOException</span> {
    <span class="kw">try</span> (<span class="cl">BufferedReader</span> br = <span class="kw">new</span> <span class="cl">BufferedReader</span>(
            <span class="kw">new</span> <span class="cl">FileReader</span>(path))) {
        <span class="cl">StringBuilder</span> sb = <span class="kw">new</span> <span class="cl">StringBuilder</span>();
        <span class="cl">String</span> line;
        <span class="kw">while</span> ((line = br.<span class="fn">readLine</span>()) != <span class="kw">null</span>) {
            sb.<span class="fn">append</span>(line).<span class="fn">append</span>(<span class="str">"\\n"</span>);
        }
        <span class="kw">return</span> sb.<span class="fn">toString</span>();
    } <span class="cm">// br.close() called automatically!</span>
}

<span class="cm">// Multiple resources</span>
<span class="kw">try</span> (<span class="cl">Connection</span> conn = dataSource.<span class="fn">getConnection</span>();
     <span class="cl">PreparedStatement</span> ps = conn.<span class="fn">prepareStatement</span>(sql);
     <span class="cl">ResultSet</span> rs = ps.<span class="fn">executeQuery</span>()) {
    <span class="kw">while</span> (rs.<span class="fn">next</span>()) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(rs.<span class="fn">getString</span>(<span class="str">"name"</span>));
    }
} <span class="cm">// All three closed in REVERSE order!</span>
</code></pre>

  <h2>5. Multi-Catch and Exception Chaining</h2>
  <pre><code><span class="cm">// MULTI-CATCH (Java 7+)</span>
<span class="kw">try</span> {
    <span class="fn">riskyOperation</span>();
} <span class="kw">catch</span> (<span class="cl">IOException</span> | <span class="cl">SQLException</span> e) {
    logger.<span class="fn">error</span>(<span class="str">"Operation failed"</span>, e);
    <span class="kw">throw new</span> <span class="cl">ServiceException</span>(<span class="str">"Service unavailable"</span>, e);
}

<span class="cm">// EXCEPTION CHAINING — preserve the root cause</span>
<span class="kw">public class</span> <span class="cl">ServiceException</span> <span class="kw">extends</span> <span class="cl">RuntimeException</span> {
    <span class="kw">public</span> <span class="cl">ServiceException</span>(<span class="cl">String</span> msg, <span class="cl">Throwable</span> cause) {
        <span class="kw">super</span>(msg, cause); <span class="cm">// ALWAYS pass the cause!</span>
    }
}

<span class="cm">// Later, you can inspect the full chain:</span>
<span class="kw">catch</span> (<span class="cl">ServiceException</span> e) {
    <span class="cl">Throwable</span> root = e.<span class="fn">getCause</span>(); <span class="cm">// original IOException</span>
}
</code></pre>

  <h2>6. Creating Custom Exception Hierarchies</h2>
  <div class="box box-lld">
    <div class="box-title">⚙️ LLD Connection: API Error Handling</div>
    In a REST API, you shouldn't return Java stack traces to the client. You map <code>DomainExceptions</code> to HTTP Status Codes. In Spring Boot, this is done using <code>@RestControllerAdvice</code> to catch domain exceptions globally and return standardized JSON error responses.
  </div>
  <pre><code><span class="cm">// Base exception for your domain</span>
<span class="kw">public abstract class</span> <span class="cl">DomainException</span> <span class="kw">extends</span> <span class="cl">RuntimeException</span> {
    <span class="kw">private final</span> <span class="cl">String</span> errorCode;

    <span class="kw">protected</span> <span class="cl">DomainException</span>(<span class="cl">String</span> code, <span class="cl">String</span> msg) {
        <span class="kw">super</span>(msg);
        <span class="kw">this</span>.errorCode = code;
    }

    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">getErrorCode</span>() { <span class="kw">return</span> errorCode; }
}

<span class="cm">// Specific domain exceptions</span>
<span class="kw">public class</span> <span class="cl">UserNotFoundException</span> <span class="kw">extends</span> <span class="cl">DomainException</span> {
    <span class="kw">public</span> <span class="cl">UserNotFoundException</span>(<span class="cl">String</span> userId) {
        <span class="kw">super</span>(<span class="str">"USER_NOT_FOUND"</span>, <span class="str">"User not found: "</span> + userId);
    }
}

<span class="kw">public class</span> <span class="cl">OrderExpiredException</span> <span class="kw">extends</span> <span class="cl">DomainException</span> {
    <span class="kw">public</span> <span class="cl">OrderExpiredException</span>(<span class="cl">String</span> orderId) {
        <span class="kw">super</span>(<span class="str">"ORDER_EXPIRED"</span>, <span class="str">"Order expired: "</span> + orderId);
    }
}

<span class="cm">// Global handler catches all domain exceptions uniformly</span>
<span class="kw">try</span> {
    userService.<span class="fn">getUser</span>(<span class="str">"U99"</span>);
} <span class="kw">catch</span> (<span class="cl">DomainException</span> e) {
    <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Error ["</span> + e.<span class="fn">getErrorCode</span>() + <span class="str">"]: "</span> + e.<span class="fn">getMessage</span>());
}
</code></pre>

  <h2>7. Performance: fillInStackTrace() Cost</h2>
  <div class="box box-senior">
    <div class="box-title">🧠 How Senior Engineers Think: Exception Performance</div>
    Creating an exception is expensive because <code>fillInStackTrace()</code> walks the entire call stack. In high-frequency validation (e.g., parsing 1M records), use return codes or <code>Optional</code> instead of exceptions for flow control.
    <pre style="margin-top:10px;"><code><span class="cm">// High-performance: skip stack trace for expected validation failures</span>
<span class="kw">public class</span> <span class="cl">ValidationException</span> <span class="kw">extends</span> <span class="cl">RuntimeException</span> {
    <span class="kw">@Override</span>
    <span class="kw">public synchronized</span> <span class="cl">Throwable</span> <span class="fn">fillInStackTrace</span>() {
        <span class="kw">return this</span>; <span class="cm">// skip expensive stack walk!</span>
    }
}</code></pre>
  </div>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 16</div>
    <ul>
      <li><strong>Checked</strong> = recoverable. <strong>Unchecked</strong> = bugs. <strong>Error</strong> = JVM dying.</li>
      <li><strong>Always use try-with-resources</strong> for AutoCloseable objects.</li>
      <li><strong>Chain exceptions</strong> — never swallow the cause.</li>
      <li><strong>Fail fast</strong> with <code>Objects.requireNonNull()</code>.</li>
      <li><strong>Don't use exceptions for flow control</strong> — they're expensive.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 16</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What happens if an exception is thrown in a finally block?<span class="arrow">▶</span></div>
    <div class="qa-a">It <strong>masks</strong> the original exception from the try block. The caller only sees the finally-block exception. This is called <strong>Exception Masking</strong>. Try-with-resources solves this by attaching the suppressed exception via <code>addSuppressed()</code>.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Should you catch Exception or Throwable?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Never catch Throwable</strong> — you'd catch <code>Error</code> too (OutOfMemoryError). Catching <code>Exception</code> is acceptable at the top level (e.g., global handler), but prefer catching <strong>specific</strong> exceptions in business logic.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Checked vs Unchecked — which should you prefer?<span class="arrow">▶</span></div>
    <div class="qa-a">Modern consensus (Spring, Kotlin, C#): <strong>Unchecked</strong> for most cases. Checked exceptions create tight coupling between layers. Use checked only when the caller can genuinely recover (e.g., retry a network call).</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What happens if you return a value from inside a finally block?<span class="arrow">▶</span></div>
    <div class="qa-a">It will <strong>override</strong> any return value or thrown exception from the <code>try</code> or <code>catch</code> blocks. This is a notorious anti-pattern and can lead to bugs where exceptions are silently swallowed. Modern IDEs will typically warn you about returning from a finally block.</div>
  </div>
</div>`,q=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"})),L=`<div id="final-keyword" class="section">
  <div class="breadcrumb">handbook / <span>section 08</span></div>
  <div class="section-eyebrow">The Constraints</div>
  <h1>Final: Immutability and Security</h1>
  <div class="section-desc">The <code>final</code> keyword is a tool for <strong>Intent</strong>. It tells the compiler and other developers: "This must not change." We explore how it affects memory visibility, performance, and class design.</div>

  <h2>1. Final Variables: Constants and more</h2>
  <ul>
    <li><strong>Primitives</strong>: The value cannot change.</li>
    <li><strong>Objects</strong>: The <strong>Reference</strong> cannot change. You can still modify the internal state of the object!</li>
  </ul>
  <pre><code><span class="kw">final</span> <span class="cl">List</span>&lt;<span class="cl">String</span>&gt; names = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();
names.<span class="fn">add</span>(<span class="str">"Java"</span>); <span class="cm">// Legal! The object is modified.</span>
names = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;(); <span class="cm">// Illegal! The reference is final.</span></code></pre>

  <h2>2. Final Methods: Performance and Safety</h2>
  <p>A <code>final</code> method cannot be overridden. This has two benefits:</p>
  <ol>
    <li><strong>Security</strong>: You guarantee that critical logic (e.g., authentication) isn't subverted by a malicious subclass.</li>
    <li><strong>Performance</strong>: Because the method cannot be overridden, the JIT compiler can safely <strong>Inline</strong> the method code, removing the overhead of the vtable lookup entirely. This is known as <strong>Devirtualization</strong>.</li>
  </ol>

  <h2>3. Final Classes: No Inheritance</h2>
  <p>If a class is <code>final</code>, it cannot be extended.</p>
  <pre><code><span class="kw">public final class</span> <span class="cl">ImmutablePoint</span> {
    <span class="kw">private final int</span> x, y;

    <span class="kw">public</span> <span class="cl">ImmutablePoint</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) {
        <span class="kw">this</span>.x = x;
        <span class="kw">this</span>.y = y;
    }

    <span class="kw">public int</span> <span class="fn">getX</span>() { <span class="kw">return</span> x; }
    <span class="kw">public int</span> <span class="fn">getY</span>() { <span class="kw">return</span> y; }
}

<span class="cm">// class ExtendedPoint extends ImmutablePoint {} // COMPILE ERROR!</span>
</code></pre>
  <p><strong>Senior Fact</strong>: Many core Java classes like <code>String</code>, <code>Integer</code>, and <code>Math</code> are final for security and immutability. Java 17 <strong>Sealed Classes</strong> provide a middle ground.</p>

  <h2>4. The Java Memory Model (JMM) Guarantee</h2>
  <div class="box box-senior">
    <div class="box-title">🧠 How Senior Engineers Think: Safe Publication</div>
    The <code>final</code> keyword provides a unique thread-safety guarantee. Under the JMM, if an object is constructed correctly (without leaking <code>this</code>), any thread that sees the object is <strong>guaranteed</strong> to see the correctly initialized values of its <code>final</code> fields. 
    <br><br>
    <strong>The Magic</strong>: The JVM inserts a "StoreStore" barrier at the end of the constructor to ensure all final field writes are flushed to main memory before the object reference itself is published.
  </div>

  <div class="box box-lld">
    <div class="box-title">⚙️ LLD Connection: Immutability First</div>
    "Classes should be immutable unless there's a very good reason to make them mutable." (Effective Java Item 17). Immutable objects (where all fields are final) are inherently thread-safe. They require no synchronization. This is why <code>String</code> is immutable, and why <code>record</code> classes in Java 14+ are the preferred way to model Data Transfer Objects (DTOs).
  </div>

  <h2>5. Effectively Final (Java 8+)</h2>
  <p>If you have a local variable that is never changed after its initial assignment, Java treats it as "Effectively Final." This allows you to use it inside a <strong>Lambda</strong> or <strong>Anonymous Inner Class</strong>.</p>
  <pre><code><span class="cl">String</span> greeting = <span class="str">"Hello"</span>; <span class="cm">// effectively final (never reassigned)</span>

<span class="cl">Runnable</span> r = () -> <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(greeting); <span class="cm">// OK!</span>

<span class="cm">// greeting = "Bye"; // if you uncomment this, the lambda above won't compile!</span>
</code></pre>

  <h2>6. Blanket Final vs. Initializer</h2>
  <p>A final field can be initialized in the <strong>Constructor</strong> ("Blank Final").</p>
  <pre><code><span class="kw">public class</span> <span class="cl">Connection</span> {
    <span class="kw">private final</span> <span class="cl">String</span> url; <span class="cm">// blank final</span>

    <span class="kw">public</span> <span class="cl">Connection</span>(<span class="cl">String</span> url) {
        <span class="kw">this</span>.url = url; <span class="cm">// initialized here, constant for life</span>
    }
}

<span class="cl">Connection</span> c1 = <span class="kw">new</span> <span class="cl">Connection</span>(<span class="str">"jdbc:mysql://prod"</span>);
<span class="cl">Connection</span> c2 = <span class="kw">new</span> <span class="cl">Connection</span>(<span class="str">"jdbc:mysql://dev"</span>);
<span class="cm">// Each has a DIFFERENT but IMMUTABLE url</span>
</code></pre>

  <h2>7. Final Parameters</h2>
  <p>Marking method parameters as <code>final</code> prevents accidental reassignment inside the method.</p>
  <pre><code><span class="kw">public void</span> <span class="fn">save</span>(<span class="kw">final</span> <span class="cl">User</span> user) {
    <span class="cm">// user = new User(); // COMPILE ERROR! Can't reassign</span>
    user.<span class="fn">setName</span>(<span class="str">"Updated"</span>); <span class="cm">// OK! You can modify the object's state</span>
    repository.<span class="fn">save</span>(user);
}
</code></pre>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 08</div>
    <ul>
      <li><strong>Final Fields</strong> enforce constant references.</li>
      <li><strong>Final Methods</strong> allow JIT inlining and devirtualization.</li>
      <li><strong>Final Classes</strong> prevent the "Fragile Base Class" problem.</li>
      <li><strong>JMM Guarantee</strong>: Final fields are essential for thread-safe publication.</li>
      <li><strong>Blank Final</strong> allows constructor-driven constant state.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 08</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can a 'final' method be overloaded?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes.</strong> Overloading is about different method signatures. A <code>final</code> method just cannot be <strong>overridden</strong> (same signature in a subclass). You can have multiple final methods with the same name but different parameters in the same class.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Difference between 'final', 'finally', and 'finalize'? (The Classic)<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Final</strong> is a modifier (for variables/methods/classes). <strong>Finally</strong> is a block in try-catch-finally for cleanup. <strong>Finalize</strong> is a (deprecated) method in the Object class for pre-GC cleanup. They are unrelated except for their names.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is an "effectively final" variable?<span class="arrow">▶</span></div>
    <div class="qa-a">Introduced in Java 8, a local variable is effectively final if its value is never changed after initialization, even though it isn't explicitly declared with the <code>final</code> keyword. This is important because lambdas and anonymous inner classes can only capture local variables that are either final or effectively final.</div>
  </div>
</div>`,j=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"})),R=`<div id="home" class="section active" style="padding-top: 1rem;">
  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .hero-bg-glow {
      position: absolute;
      top: -20%;
      right: -10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
      filter: blur(80px);
      z-index: -1;
      pointer-events: none;
    }
    .stat-card {
      padding: 1.5rem;
      text-align: center;
      border-right: 1px solid var(--border);
    }
    .stat-card:last-child { border-right: none; }
    .stat-val { font-size: 1.8rem; font-weight: 800; color: var(--text); margin-bottom: 0.25rem; font-family: var(--font-mono); }
    .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); }
    
    @media (max-width: 768px) {
      .stat-grid { grid-template-columns: 1fr 1fr; }
      .stat-card { border-right: none; border-bottom: 1px solid var(--border); }
      .stat-card:nth-child(2) { border-bottom: 1px solid var(--border); }
    }
  </style>

  <div class="hero-bg-glow"></div>

  <div class="breadcrumb" style="margin-bottom: 3rem;">
    <span class="badge-glow">v2.4 LTS</span> 
    <span style="margin: 0 0.5rem; opacity: 0.3;">/</span> 
    Engineering Handbook
  </div>

  <div class="hero" style="padding: 0; border: none; margin-bottom: 5rem;">
    <h1 class="hero-title text-gradient" style="font-size: clamp(2.5rem, 8vw, 5rem); margin-bottom: 2rem;">
      Master the <span class="text-gradient-accent">Invisible Architecture</span> of Java.
    </h1>
    
    <p class="hero-sub" style="font-size: 1.4rem; line-height: 1.6; max-width: 800px; margin-bottom: 3rem;">
      This is not a beginner's guide. This is a compressed distillation of a decade of high-frequency engineering patterns, JVM internals, and the systemic logic that separates junior developers from Distinguished Architects.
    </p>

    <button class="btn-premium" onclick="showSection('why-oop-exists')">
      Start learning <i class="ri-terminal-box-line"></i>
    </button>
  </div>

  <!-- STATS BAR -->
  <div class="glass-card stat-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); margin-bottom: 5rem; overflow: hidden;">
    <div class="stat-card">
      <div class="stat-val">21</div>
      <div class="stat-label">Modules</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">100+</div>
      <div class="stat-label">Code Samples</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">JVM</div>
      <div class="stat-label">Internals</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">10k+</div>
      <div class="stat-label">Hours R&D</div>
    </div>
  </div>

  <h2 style="border: none; padding: 0; margin-bottom: 3rem;" class="text-gradient">The Core Pillars</h2>

  <div class="home-grid" style="margin-bottom: 5rem;">
    <div class="home-card glass-card">
      <div class="home-card-icon animate-float" style="background: linear-gradient(135deg, var(--accent), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">💎</div>
      <div class="home-card-title">JVM Engine Room</div>
      <div class="home-card-desc">Go beyond syntax. Master bytecode execution, heap dynamics, and the physical reality of how Java lives in memory.</div>
    </div>
    <div class="home-card glass-card">
      <div class="home-card-icon animate-float" style="animation-delay: 1s; background: linear-gradient(135deg, var(--green), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⚡</div>
      <div class="home-card-title">Low-Level Design</div>
      <div class="home-card-desc">Bridge the gap between "working code" and "maintainable systems" using professional-grade LLD patterns.</div>
    </div>
    <div class="home-card glass-card">
      <div class="home-card-icon animate-float" style="animation-delay: 2s; background: linear-gradient(135deg, var(--rose), var(--amber)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔥</div>
      <div class="home-card-title">FAANG Strategy</div>
      <div class="home-card-desc">Crush the "Why" and "Tradeoffs" in senior interviews. Learn the mental models that top-tier engineers use daily.</div>
    </div>
  </div>

  <div class="takeaways glass-card" style="margin-bottom: 5rem;">
    <div class="takeaways-title text-gradient-accent">The Engineering Creed</div>
    <p style="margin-bottom: 2rem; opacity: 0.8; font-style: italic;">Rules we live by in high-scale production systems:</p>
    <ul>
      <li><strong>Abstractions are Debts:</strong> Only take them if the decoupling interest is worth the overhead.</li>
      <li><strong>Decoupling is Survival:</strong> A system that cannot change is a system that is already dead.</li>
      <li><strong>Bytecode is Truth:</strong> When high-level logic fails, the lower levels never lie.</li>
      <li><strong>Simplicity over Cleverness:</strong> Senior engineers write code that juniors can debug.</li>
    </ul>
  </div>

  <div class="box box-lld" style="background: var(--bg-sidebar); border: 1px solid var(--accent); padding: 3rem; border-radius: 24px; text-align: center;">
    <h3 style="margin-top: 0; color: var(--text);">Ready to evolve your engineering perspective?</h3>
    <p style="color: var(--text-dim); margin-bottom: 2rem;">Join the ranks of architects who think in graphs, memory, and trade-offs.</p>
    <button class="btn-premium" onclick="showSection('why-oop-exists')">
      Begin Section 01: The Crisis <i class="ri-rocket-2-line"></i>
    </button>
  </div>

  <div class="hero-tags" style="justify-content:center; padding: 6rem 0; opacity: 0.4;">
    <span class="tag tag-purple">Architect Certified</span>
    <span class="tag tag-green">JVM Hardened</span>
    <span class="tag tag-amber">FAANG Optimized</span>
    <span class="tag tag-teal">LLD Fundamental</span>
  </div>
</div>
`,B=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"})),N=`<div id="immutability" class="section">
  <div class="breadcrumb">handbook / deep dives / <span>section 13</span></div>
  <div class="section-eyebrow">The Mastery</div>
  <h1>Immutability: The Architecture of Truth</h1>
  <div class="section-desc">An immutable object is one whose state cannot be changed after it is created. In a multi-threaded, complex system, immutability is the ultimate tool for <strong>Reliability</strong>, <strong>Thread Safety</strong>, and <strong>Predictability</strong>.</div>

  <h2>1. How to create an Immutable Class?</h2>
  <p>To make a class truly immutable, you must follow these 5 rules:</p>
  <ol>
    <li><strong>Make the class <code>final</code></strong> (no inheritance to override behavior).</li>
    <li><strong>Make all fields <code>private</code> and <code>final</code></strong>.</li>
    <li><strong>No setter methods</strong>.</li>
    <li><strong>Defensive Copying</strong>: For mutable fields (like <code>Date</code> or <code>List</code>), initialize them with a copy in the constructor and return a copy in the getter.</li>
    <li><strong>Deep Immutability</strong>: Ensure all child objects are also immutable or deeply copied.</li>
  </ol>

  <h3>Example: Complete Immutable Class</h3>
  <pre><code><span class="kw">public final class</span> <span class="cl">Money</span> {
    <span class="kw">private final</span> <span class="cl">BigDecimal</span> amount;
    <span class="kw">private final</span> <span class="cl">Currency</span> currency;

    <span class="kw">public</span> <span class="cl">Money</span>(<span class="cl">BigDecimal</span> amount, <span class="cl">Currency</span> currency) {
        <span class="kw">this</span>.amount = <span class="cl">Objects</span>.<span class="fn">requireNonNull</span>(amount);
        <span class="kw">this</span>.currency = <span class="cl">Objects</span>.<span class="fn">requireNonNull</span>(currency);
    }

    <span class="cm">// No setters! Return NEW objects instead.</span>
    <span class="kw">public</span> <span class="cl">Money</span> <span class="fn">add</span>(<span class="cl">Money</span> other) {
        <span class="kw">if</span> (!<span class="kw">this</span>.currency.<span class="fn">equals</span>(other.currency))
            <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>(<span class="str">"Currency mismatch"</span>);
        <span class="kw">return new</span> <span class="cl">Money</span>(amount.<span class="fn">add</span>(other.amount), currency);
    }

    <span class="kw">public</span> <span class="cl">BigDecimal</span> <span class="fn">getAmount</span>() { <span class="kw">return</span> amount; }
    <span class="kw">public</span> <span class="cl">Currency</span> <span class="fn">getCurrency</span>() { <span class="kw">return</span> currency; }
}

<span class="cm">// Usage — every operation creates a NEW object</span>
<span class="cl">Money</span> price = <span class="kw">new</span> <span class="cl">Money</span>(<span class="cl">BigDecimal</span>.<span class="fn">valueOf</span>(<span class="num">100</span>), <span class="cl">Currency</span>.USD);
<span class="cl">Money</span> tax = <span class="kw">new</span> <span class="cl">Money</span>(<span class="cl">BigDecimal</span>.<span class="fn">valueOf</span>(<span class="num">10</span>), <span class="cl">Currency</span>.USD);
<span class="cl">Money</span> total = price.<span class="fn">add</span>(tax); <span class="cm">// new Money(110, USD)</span>
<span class="cm">// price is still 100 — UNCHANGED!</span>
</code></pre>

  <h3>Modern Alternative: Records (Java 14+)</h3>
  <pre><code><span class="cm">// Records are immutable by default!</span>
<span class="kw">public record</span> <span class="cl">Coordinate</span>(<span class="kw">double</span> lat, <span class="kw">double</span> lng) {
    <span class="cm">// compact constructor for validation</span>
    <span class="kw">public</span> <span class="cl">Coordinate</span> {
        <span class="kw">if</span> (lat < -<span class="num">90</span> || lat > <span class="num">90</span>)
            <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>(<span class="str">"Invalid lat"</span>);
    }
}

<span class="cl">Coordinate</span> c = <span class="kw">new</span> <span class="cl">Coordinate</span>(<span class="num">40.7128</span>, -<span class="num">74.0060</span>);
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(c.lat()); <span class="cm">// 40.7128 — accessor, no "get" prefix</span>
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(c);       <span class="cm">// Coordinate[lat=40.7128, lng=-74.006]</span>
</code></pre>

  <h2>2. Defensive Copying: The #1 Senior Mistake</h2>
  <div class="box box-danger">
    <div class="box-title">🚨 The Breach</div>
    If you have a <code>private final List&lt;String&gt; roles</code>, and you return it directly in a getter, the caller can do <code>getRoles().add("ADMIN")</code>. Your object is no longer immutable!
    <br><br>
    <strong>The Fix (Constructor)</strong>: <code>this.roles = List.copyOf(roles);</code> (Creates an immutable copy).
    <br><strong>The Fix (Getter)</strong>: <code>return roles;</code> (If already immutable) or <code>return Collections.unmodifiableList(roles);</code>.
  </div>

  <h2>3. View vs. Copy vs. Immutable</h2>
  <div class="table-wrap"><table>
    <tr><th>Method</th><th>Type</th><th>Safety</th></tr>
    <tr><td><code>Collections.unmodifiableList(list)</code></td><td><strong>View</strong></td><td>Medium (Original list can still change)</td></tr>
    <tr><td><code>List.of(e1, e2)</code></td><td><strong>Immutable</strong></td><td>High (Fixed size, no nulls)</td></tr>
    <tr><td><code>List.copyOf(list)</code></td><td><strong>Immutable Copy</strong></td><td>High (Independent from original)</td></tr>
  </table></div>

  <h2>4. Why Immutability? (The Senior Benefits)</h2>
  <ul>
    <li><strong>Thread Safety</strong>: Multiple threads can read the same object without any locking or synchronization.</li>
    <li><strong>Consistent Hashing</strong>: Since the state never changes, the <code>hashCode()</code> never changes. You can <strong>cache the hash code</strong> for massive performance gains in Collections.</li>
    <li><strong>Predictability</strong>: You can pass an immutable object to any method and be 100% sure it won't be modified.</li>
    <li><strong>No Null Checks</strong>: Use <strong>Optional</strong> as an immutable container to avoid the Billion Dollar Mistake.</li>
  </ul>

  <h2>5. The "Wither" Pattern (Immutability with Modification)</h2>
  <p>How do you "change" an immutable object? You don't. You create a <strong>new</strong> one with the updated value. This is called the <strong>Wither</strong> pattern.</p>
  <pre><code><span class="kw">public class</span> <span class="cl">User</span> {
    <span class="kw">private final String</span> name;
    <span class="kw">public</span> <span class="cl">User</span> <span class="fn">withName</span>(<span class="cl">String</span> newName) {
        <span class="kw">return new</span> <span class="cl">User</span>(newName); <span class="cm">// Return a new instance</span>
    }
}</code></pre>

  <h2>6. Java Records (Modern Immutability)</h2>
  <p>Introduced in Java 14, <strong>Records</strong> are a concise way to create immutable data carriers. They are <strong>nominal tuples</strong>.</p>
  <pre><code><span class="kw">public record</span> <span class="cl">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) { }</code></pre>

  <h2>7. Performance Tradeoffs</h2>
  <p>Immutability can lead to many short-lived objects. However, with modern <strong>G1/ZGC</strong> collectors, this is extremely efficient due to the "Generational Hypothesis" (most objects die young in the Eden space). The gain in <strong>developer productivity and safety</strong> far outweighs the minor GC overhead.</p>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 13</div>
    <ul>
      <li><strong>Final class + Final fields</strong> = Immutability.</li>
      <li><strong>Defensive Copying</strong> is mandatory for collections.</li>
      <li><strong>Immutability simplifies concurrency</strong>.</li>
      <li><strong>Records</strong> are the modern standard for immutable data.</li>
      <li><strong>Cached HashCode</strong>: Immutability allows you to store the hash code after the first calculation.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 13</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Is <code>String</code> a pure immutable class in Java?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes.</strong> All its fields are private and final (except for a cached <code>hash</code> field). Every method that looks like it modifies the string actually returns a <strong>new</strong> String object.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why should you not use a mutable object as a HashMap key?<span class="arrow">▶</span></div>
    <div class="qa-a">If the object changes after being put in the Map, its <code>hashCode()</code> will change. When you try to retrieve it, the Map will look in the <strong>wrong bucket</strong> and fail to find it, even though the object is still in the map! This is a "Memory Leak" equivalent in Java.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">How do Java Records guarantee immutability?<span class="arrow">▶</span></div>
    <div class="qa-a">Java Records (introduced in Java 14) are a language-level feature to define immutable data carriers. They implicitly declare all fields as <code>private final</code>, do not provide setters, and their class is implicitly <code>final</code>. However, remember that if a Record holds a reference to a mutable object (like a standard <code>ArrayList</code>), the contents of that list can still be modified (shallow immutability).</div>
  </div>
</div>`,_=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"})),H=`<div id="inheritance" class="section">\r
  <div class="breadcrumb">handbook / the 4 pillars / <span>section 04C</span></div>\r
  <div class="section-eyebrow">The Deep Hierarchy</div>\r
  <h1>Inheritance: Hierarchy, State, and the Fragile Base</h1>\r
  <div class="section-desc">Inheritance represents the <strong>IS-A</strong> relationship. While powerful, it is the most dangerous tool in OOP due to tight coupling. We explore the memory layout, the dangers of deep hierarchies, and the modern transition to <strong>Composition</strong> and <strong>Sealed Classes</strong>.</div>\r
\r
  <h2>1. IS-A vs. HAS-A (The Golden Rule)</h2>\r
  <p>Use inheritance only if you can say "A [Subclass] IS-A [Superclass]." However, even when true, you must ask if it's the <em>right</em> abstraction.</p>\r
  <ul>\r
    <li><code>CreditCardProcessor</code> <strong>IS-A</strong> <code>PaymentProcessor</code> (Inheritance).</li>\r
    <li><code>PaymentService</code> <strong>HAS-A</strong> <code>PaymentProcessor</code> (Composition).</li>\r
  </ul>\r
\r
  <div class="box box-insight">\r
    <div class="box-title">🤔 Why This Exists</div>\r
    Inheritance exists because large systems repeat behavior. Without it, you would copy-paste the "Connect to Payment Gateway" code 50 times. <strong>But inheritance also creates tight coupling</strong>, which is why modern systems often prefer composition to share behavior.\r
  </div>\r
\r
  <h3>Example: Enterprise Payment Architecture</h3>\r
  <pre><code><span class="kw">public abstract class</span> <span class="cl">PaymentProcessor</span> {\r
    <span class="kw">protected</span> <span class="cl">String</span> transactionId;\r
\r
    <span class="kw">public</span> <span class="cl">PaymentProcessor</span>(<span class="cl">String</span> txId) { \r
        <span class="kw">this</span>.transactionId = txId; \r
    }\r
\r
    <span class="cm">// Concrete behavior shared by all subclasses</span>\r
    <span class="kw">public void</span> <span class="fn">logAudit</span>() {\r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"[AUDIT] Processing: "</span> + transactionId);\r
    }\r
\r
    <span class="cm">// Abstract behavior enforced on subclasses</span>\r
    <span class="kw">public abstract void</span> <span class="fn">processPayment</span>(<span class="kw">double</span> amount);\r
}\r
\r
<span class="kw">public class</span> <span class="cl">StripeProcessor</span> <span class="kw">extends</span> <span class="cl">PaymentProcessor</span> {\r
    <span class="kw">private</span> <span class="cl">String</span> apiKey;\r
\r
    <span class="kw">public</span> <span class="cl">StripeProcessor</span>(<span class="cl">String</span> txId, <span class="cl">String</span> apiKey) {\r
        <span class="kw">super</span>(txId); <span class="cm">// MUST call parent constructor</span>\r
        <span class="kw">this</span>.apiKey = apiKey;\r
    }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">processPayment</span>(<span class="kw">double</span> amount) {\r
        <span class="fn">logAudit</span>(); <span class="cm">// Inherited method</span>\r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Calling Stripe API with key... Amount: $"</span> + amount);\r
    }\r
}\r
\r
<span class="kw">public class</span> <span class="cl">CryptoProcessor</span> <span class="kw">extends</span> <span class="cl">PaymentProcessor</span> {\r
    <span class="kw">public</span> <span class="cl">CryptoProcessor</span>(<span class="cl">String</span> txId) { <span class="kw">super</span>(txId); }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">processPayment</span>(<span class="kw">double</span> amount) {\r
        <span class="fn">logAudit</span>();\r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Validating blockchain transaction... Amount: "</span> + amount + <span class="str">" ETH"</span>);\r
    }\r
}\r
\r
<span class="cm">// Usage — Polymorphism in action</span>\r
<span class="cl">PaymentProcessor</span> p1 = <span class="kw">new</span> <span class="cl">StripeProcessor</span>(<span class="str">"TX-991"</span>, <span class="str">"sk_live_123"</span>);\r
p1.<span class="fn">processPayment</span>(<span class="num">150.00</span>); <span class="cm">// Triggers Stripe implementation</span>\r
\r
<span class="cl">PaymentProcessor</span> p2 = <span class="kw">new</span> <span class="cl">CryptoProcessor</span>(<span class="str">"TX-992"</span>);\r
p2.<span class="fn">processPayment</span>(<span class="num">0.05</span>); <span class="cm">// Triggers Crypto implementation</span>\r
</code></pre>\r
\r
  <h2>2. Memory Layout: The Layered Object</h2>\r
  <p>When you create a <code>Child</code> object, the JVM creates a unified memory block with <strong>all</strong> fields from the entire hierarchy.</p>\r
  <div class="diagram">\r
[ CHILD OBJECT ON HEAP ]\r
┌───────────────────────────┐\r
│  Object Header            │\r
├───────────────────────────┤\r
│  Parent Fields (hidden)   │ <── Still takes space!\r
├───────────────────────────┤\r
│  Child Fields             │\r
└───────────────────────────┘</div>\r
  <div class="box box-insight">\r
    <div class="box-title">🕵️ Senior Insight: The Memory Cost</div>\r
    Even if you "shadow" a field (Parent and Child both have <code>int id</code>), <strong>both fields exist in memory</strong>. The JVM simply chooses which one to show you based on the reference type.\r
  </div>\r
\r
  <h2>3. The "super" Keyword Deep Dive</h2>\r
  <pre><code><span class="kw">public class</span> <span class="cl">Employee</span> {\r
    <span class="kw">protected</span> <span class="cl">String</span> name;\r
    <span class="kw">protected double</span> baseSalary;\r
\r
    <span class="kw">public</span> <span class="cl">Employee</span>(<span class="cl">String</span> name, <span class="kw">double</span> baseSalary) {\r
        <span class="kw">this</span>.name = name;\r
        <span class="kw">this</span>.baseSalary = baseSalary;\r
    }\r
\r
    <span class="kw">public double</span> <span class="fn">calculatePay</span>() {\r
        <span class="kw">return</span> baseSalary;\r
    }\r
\r
    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">toString</span>() {\r
        <span class="kw">return</span> name + <span class="str">": $"</span> + <span class="fn">calculatePay</span>();\r
    }\r
}\r
\r
<span class="kw">public class</span> <span class="cl">Manager</span> <span class="kw">extends</span> <span class="cl">Employee</span> {\r
    <span class="kw">private double</span> bonus;\r
\r
    <span class="kw">public</span> <span class="cl">Manager</span>(<span class="cl">String</span> name, <span class="kw">double</span> base, <span class="kw">double</span> bonus) {\r
        <span class="kw">super</span>(name, base); <span class="cm">// call parent constructor</span>\r
        <span class="kw">this</span>.bonus = bonus;\r
    }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">calculatePay</span>() {\r
        <span class="kw">return super</span>.<span class="fn">calculatePay</span>() + bonus; <span class="cm">// extend parent behavior</span>\r
    }\r
}\r
\r
<span class="cl">Employee</span> mgr = <span class="kw">new</span> <span class="cl">Manager</span>(<span class="str">"Alice"</span>, <span class="num">5000</span>, <span class="num">2000</span>);\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(mgr); <span class="cm">// Alice: $7000.0</span>\r
</code></pre>\r
\r
  <h2>4. The "Diamond Problem" (The Bytecode Fix)</h2>\r
  <p>Java forbids multiple inheritance of <strong>Classes</strong> but allows it for <strong>Interfaces</strong> with <code>default</code> methods.</p>\r
  <pre><code><span class="kw">interface</span> <span class="cl">Flyable</span> {\r
    <span class="kw">default void</span> <span class="fn">move</span>() { <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Flying"</span>); }\r
}\r
\r
<span class="kw">interface</span> <span class="cl">Swimmable</span> {\r
    <span class="kw">default void</span> <span class="fn">move</span>() { <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Swimming"</span>); }\r
}\r
\r
<span class="cm">// Diamond! Must resolve manually</span>\r
<span class="kw">class</span> <span class="cl">Duck</span> <span class="kw">implements</span> <span class="cl">Flyable</span>, <span class="cl">Swimmable</span> {\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">move</span>() {\r
        <span class="cl">Flyable</span>.<span class="kw">super</span>.<span class="fn">move</span>();   <span class="cm">// explicitly choose</span>\r
        <span class="cl">Swimmable</span>.<span class="kw">super</span>.<span class="fn">move</span>();\r
    }\r
}\r
\r
<span class="cl">Duck</span> d = <span class="kw">new</span> <span class="cl">Duck</span>();\r
d.<span class="fn">move</span>(); <span class="cm">// prints both "Flying" and "Swimming"</span>\r
</code></pre>\r
\r
  <h2>5. The "Fragile Base Class" Problem (Design Smell)</h2>\r
  <div class="box box-smell">\r
    <div class="box-title">🤢 Design Smell: Deep Inheritance Tree</div>\r
    If your class hierarchy is <code>Object -> Entity -> User -> AdminUser -> SuperAdminUser</code>, you have a <strong>Fragile Base Class</strong>. Changing one method in <code>Entity</code> will inadvertently break <code>SuperAdminUser</code>.\r
  </div>\r
\r
  <div class="box box-senior">\r
    <div class="box-title">🧠 How Senior Engineers Think</div>\r
    "Prefer Composition over Inheritance." Juniors use inheritance for code reuse. Seniors use it ONLY for polymorphic behavior substitution. If you just want to reuse a database connection, inject it (Composition). Don't inherit from <code>BaseDatabaseEntity</code>.\r
  </div>\r
\r
  <h2>6. Bad Code → Good Code: The Composition Shift</h2>\r
  <p>Let's fix a classic architectural mistake.</p>\r
  <div class="compare">\r
    <div class="compare-col">\r
      <div class="compare-label compare-bad">❌ Bad: Inheritance (Rigid)</div>\r
      <pre style="font-size:11px;"><code><span class="kw">class</span> <span class="cl">Notification</span> { \r
    <span class="kw">void</span> <span class="fn">send</span>() { ... } \r
}\r
<span class="kw">class</span> <span class="cl">EmailNotification</span> <span class="kw">extends</span> <span class="cl">Notification</span> { ... }\r
<span class="kw">class</span> <span class="cl">SMSNotification</span> <span class="kw">extends</span> <span class="cl">Notification</span> { ... }\r
\r
<span class="cm">// Requirements change: User wants BOTH Email and SMS!\r
// Now what? EmailAndSMSNotification? (Explosion of classes)</span></code></pre>\r
    </div>\r
    <div class="compare-col">\r
      <div class="compare-label compare-good">✅ Good: Composition (Flexible)</div>\r
      <pre style="font-size:11px;"><code><span class="kw">interface</span> <span class="cl">MessageChannel</span> {\r
    <span class="kw">void</span> <span class="fn">deliver</span>();\r
}\r
<span class="kw">class</span> <span class="cl">EmailChannel</span> <span class="kw">implements</span> <span class="cl">MessageChannel</span> { ... }\r
<span class="kw">class</span> <span class="cl">SMSChannel</span> <span class="kw">implements</span> <span class="cl">MessageChannel</span> { ... }\r
\r
<span class="kw">class</span> <span class="cl">NotificationService</span> {\r
    <span class="cm">// HAS-A relationship. We can inject a List of channels!</span>\r
    <span class="cl">List</span>&lt;<span class="cl">MessageChannel</span>&gt; channels;\r
    \r
    <span class="kw">void</span> <span class="fn">sendAll</span>() {\r
        channels.<span class="fn">forEach</span>(<span class="cl">MessageChannel</span>::deliver);\r
    }\r
}</code></pre>\r
    </div>\r
  </div>\r
  <div class="box box-lld">\r
    <div class="box-title">⚙️ LLD Connection</div>\r
    <strong>Composition</strong> enables the Strategy Pattern. By injecting <code>MessageChannel</code> dependencies at runtime (via Spring or manually), you achieve <strong>Loose Coupling</strong>. You can swap out an SMS provider without touching the <code>NotificationService</code> class.\r
  </div>\r
\r
  <h2>7. Sealed Classes (Java 17)</h2>\r
  <pre><code><span class="kw">public sealed class</span> <span class="cl">Shape</span>\r
    <span class="kw">permits</span> <span class="cl">Circle</span>, <span class="cl">Rectangle</span>, <span class="cl">Triangle</span> {\r
\r
    <span class="kw">public abstract double</span> <span class="fn">area</span>();\r
}\r
\r
<span class="kw">public final class</span> <span class="cl">Circle</span> <span class="kw">extends</span> <span class="cl">Shape</span> {\r
    <span class="kw">private final double</span> radius;\r
    <span class="kw">public</span> <span class="cl">Circle</span>(<span class="kw">double</span> r) { <span class="kw">this</span>.radius = r; }\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">area</span>() { <span class="kw">return</span> <span class="cl">Math</span>.PI * radius * radius; }\r
}\r
\r
<span class="kw">public final class</span> <span class="cl">Rectangle</span> <span class="kw">extends</span> <span class="cl">Shape</span> {\r
    <span class="kw">private final double</span> w, h;\r
    <span class="kw">public</span> <span class="cl">Rectangle</span>(<span class="kw">double</span> w, <span class="kw">double</span> h) { <span class="kw">this</span>.w = w; <span class="kw">this</span>.h = h; }\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">area</span>() { <span class="kw">return</span> w * h; }\r
}\r
\r
<span class="cm">// Exhaustive switch (Java 21)</span>\r
<span class="kw">double</span> <span class="fn">describeArea</span>(<span class="cl">Shape</span> s) {\r
    <span class="kw">return switch</span> (s) {\r
        <span class="kw">case</span> <span class="cl">Circle</span> c    -> c.<span class="fn">area</span>();\r
        <span class="kw">case</span> <span class="cl">Rectangle</span> r -> r.<span class="fn">area</span>();\r
        <span class="kw">case</span> <span class="cl">Triangle</span> t  -> t.<span class="fn">area</span>();\r
    }; <span class="cm">// no default needed — sealed!</span>\r
}\r
</code></pre>\r
\r
  <h2>8. Shadowing vs. Overriding</h2>\r
  <div class="table-wrap"><table>\r
    <tr><th>Feature</th><th>Methods</th><th>Fields / Static Methods</th></tr>\r
    <tr><td><strong>Resolution</strong></td><td>Runtime (Dynamic Dispatch)</td><td>Compile Time (Static Binding)</td></tr>\r
    <tr><td><strong>Decision</strong></td><td>Based on <strong>Object</strong> Type</td><td>Based on <strong>Reference</strong> Type</td></tr>\r
    <tr><td><strong>Term</strong></td><td>Overriding</td><td>Shadowing / Hiding</td></tr>\r
  </table></div>\r
\r
  <h3>Example: Field Shadowing Trap</h3>\r
  <pre><code><span class="kw">class</span> <span class="cl">Parent</span> {\r
    <span class="cl">String</span> name = <span class="str">"Parent"</span>;\r
}\r
\r
<span class="kw">class</span> <span class="cl">Child</span> <span class="kw">extends</span> <span class="cl">Parent</span> {\r
    <span class="cl">String</span> name = <span class="str">"Child"</span>; <span class="cm">// SHADOWS parent field</span>\r
}\r
\r
<span class="cl">Parent</span> obj = <span class="kw">new</span> <span class="cl">Child</span>();\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(obj.name); <span class="cm">// "Parent" — resolved by REFERENCE type!</span>\r
\r
<span class="cl">Child</span> obj2 = <span class="kw">new</span> <span class="cl">Child</span>();\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(obj2.name); <span class="cm">// "Child"</span>\r
</code></pre>\r
\r
  <div class="takeaways">\r
    <div class="takeaways-title">Key Takeaways — Section 04C</div>\r
    <ul>\r
      <li><strong>Inheritance is White-Box reuse</strong> (internal details leak to children).</li>\r
      <li><strong>Always use @Override</strong> to catch compile-time errors.</li>\r
      <li><strong>Favor Composition</strong>: "Has-A" is usually safer than "Is-A."</li>\r
      <li><strong>Shallow is better</strong>: Avoid the "God Parent" class.</li>\r
      <li><strong>Sealed Classes</strong> give you controlled inheritance for domain modeling.</li>\r
    </ul>\r
  </div>\r
\r
  <h2>Interview Questions — Section 04C</h2>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is the 'Object' class's role in the hierarchy?<span class="arrow">▶</span></div>\r
    <div class="qa-a">Every class implicitly inherits from <code>java.lang.Object</code>. It provides <code>equals()</code>, <code>hashCode()</code>, <code>toString()</code>, and <code>wait/notify</code>. It is the root of all polymorphism in Java.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">Why doesn't Java support multiple inheritance for classes?<span class="arrow">▶</span></div>\r
    <div class="qa-a">To avoid the <strong>Diamond Problem</strong>. If Class A and B have a field <code>x</code>, and Class C inherits from both, which <code>x</code> does it get? Java avoids this ambiguity. Interfaces with default methods re-introduced a controlled version.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is the difference between 'extends' and 'implements'?<span class="arrow">▶</span></div>\r
    <div class="qa-a"><code>extends</code> creates an IS-A relationship with a class (single inheritance). <code>implements</code> creates a CAN-DO relationship with an interface (multiple allowed). A class can <code>extend</code> one class and <code>implement</code> many interfaces simultaneously.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What happens if a child class doesn't call <code>super()</code> in its constructor?<span class="arrow">▶</span></div>\r
    <div class="qa-a">The compiler automatically inserts a call to the parent's no-args constructor (<code>super()</code>) as the first line of the child constructor. If the parent class does not have a no-args constructor, the code will fail to compile unless the child explicitly calls a matching <code>super(...)</code> with arguments.</div>\r
  </div>\r
</div>\r
`,J=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"})),F=`<div id="inner-classes" class="section">
  <div class="breadcrumb">handbook / deep dives / <span>section 14</span></div>
  <div class="section-eyebrow">The Mechanics</div>
  <h1>Inner Classes: Logic within Logic</h1>
  <div class="section-desc">Nested classes are a powerful way to group classes that are only used by one other class. We explore the memory implications, the "Hidden Pointer," the bytecode differences, and why Static Inner Classes are the preferred choice for modern architecture.</div>

  <h2>1. The Four Types of Nested Classes</h2>
  <ul>
    <li><strong>Static Nested Class</strong>: Behaves like a top-level class. Does not need an instance of the outer class.</li>
    <li><strong>Inner Class (Non-static)</strong>: Tied to a specific instance of the outer class.</li>
    <li><strong>Local Inner Class</strong>: Defined inside a method. Scoped to the method's lifecycle.</li>
    <li><strong>Anonymous Inner Class</strong>: A class without a name, used for one-time implementations of interfaces or abstract classes.</li>
  </ul>

  <h2>2. The "Hidden Pointer" (Memory Overhead)</h2>
  <div class="box box-danger">
    <div class="box-title">🚨 Senior Fact: Memory Leaks</div>
    A non-static <strong>Inner Class</strong> carries a hidden reference (<code>this$0</code>) to the instance of its <strong>Outer Class</strong>. 
    <br><br>
    <strong>The Chain</strong>: <code>Reference</code> -> <code>InnerObject</code> -> <code>OuterObject</code>.
    <br>If you store an InnerObject in a static collection (like a cache), the OuterObject can <strong>never</strong> be Garbage Collected, even if it is no longer used by the rest of the app. This is a common cause of <code>OutOfMemoryError</code> in Android and UI frameworks.
  </div>

  <p>Used to logically group classes. No access to the outer <code>this</code>. Foundation of the <strong>Builder Pattern</strong>.</p>
  <pre><code><span class="kw">public class</span> <span class="cl">Computer</span> {
    <span class="kw">private final</span> <span class="cl">String</span> cpu;
    <span class="kw">private final int</span> ram;
    <span class="kw">private final int</span> storage;

    <span class="kw">private</span> <span class="cl">Computer</span>(<span class="cl">Builder</span> b) {
        <span class="kw">this</span>.cpu = b.cpu;
        <span class="kw">this</span>.ram = b.ram;
        <span class="kw">this</span>.storage = b.storage;
    }

    <span class="cm">// Static nested class — no outer 'this' reference!</span>
    <span class="kw">public static class</span> <span class="cl">Builder</span> {
        <span class="kw">private</span> <span class="cl">String</span> cpu = <span class="str">"i5"</span>;
        <span class="kw">private int</span> ram = <span class="num">8</span>;
        <span class="kw">private int</span> storage = <span class="num">256</span>;

        <span class="kw">public</span> <span class="cl">Builder</span> <span class="fn">cpu</span>(<span class="cl">String</span> cpu) { <span class="kw">this</span>.cpu = cpu; <span class="kw">return this</span>; }
        <span class="kw">public</span> <span class="cl">Builder</span> <span class="fn">ram</span>(<span class="kw">int</span> ram) { <span class="kw">this</span>.ram = ram; <span class="kw">return this</span>; }
        <span class="kw">public</span> <span class="cl">Builder</span> <span class="fn">storage</span>(<span class="kw">int</span> s) { <span class="kw">this</span>.storage = s; <span class="kw">return this</span>; }
        <span class="kw">public</span> <span class="cl">Computer</span> <span class="fn">build</span>() { <span class="kw">return new</span> <span class="cl">Computer</span>(<span class="kw">this</span>); }
    }
}

<span class="cm">// Usage</span>
<span class="cl">Computer</span> pc = <span class="kw">new</span> <span class="cl">Computer</span>.<span class="cl">Builder</span>()
    .<span class="fn">cpu</span>(<span class="str">"Ryzen 9"</span>)
    .<span class="fn">ram</span>(<span class="num">64</span>)
    .<span class="fn">storage</span>(<span class="num">2048</span>)
    .<span class="fn">build</span>();
</code></pre>

  <h2>4. Anonymous Inner Classes vs. Lambdas</h2>
  <div class="compare">
    <div class="compare-col">
      <div class="compare-label compare-bad">Anonymous Class (Pre-Java 8)</div>
      <pre style="font-size:11px;"><code><span class="cl">Runnable</span> r = <span class="kw">new</span> <span class="cl">Runnable</span>() {
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">run</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Running"</span>);
    }
};</code></pre>
    </div>
    <div class="compare-col">
      <div class="compare-label compare-good">Lambda (Java 8+)</div>
      <pre style="font-size:11px;"><code><span class="cl">Runnable</span> r = () ->
    <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Running"</span>);

<span class="cm">// No .class file generated!</span>
<span class="cm">// Uses invokedynamic instead</span></code></pre>
    </div>
  </div>

  <h2>5. Shadowing & The Outer 'this'</h2>
  <p>If an inner class has a field with the same name as the outer class, use the <code>Outer.this</code> syntax to resolve the ambiguity.</p>
  <pre><code><span class="kw">class</span> <span class="cl">Outer</span> {
    <span class="kw">int</span> x = <span class="num">10</span>;
    <span class="kw">class</span> <span class="cl">Inner</span> {
        <span class="kw">int</span> x = <span class="num">20</span>;
        <span class="kw">void</span> <span class="fn">show</span>() {
            System.out.println(this.x); <span class="cm">// 20</span>
            System.out.println(<span class="cl">Outer</span>.this.x); <span class="cm">// 10</span>
        }
    }
}</code></pre>

  <h2>6. Serialization Pitfalls</h2>
  <p>Serializing a non-static inner class is <strong>highly discouraged</strong>. Because of the hidden reference to the outer class, serializing the inner object will attempt to serialize the entire outer object as well. If the outer class isn't <code>Serializable</code>, the whole operation fails with a <code>NotSerializableException</code>.</p>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 14</div>
    <ul>
      <li><strong>Static Nested</strong>: Preferred for performance and memory (No <code>this$0</code>).</li>
      <li><strong>Inner Class</strong>: Use only when you need to access private members of an outer instance.</li>
      <li><strong>Local Inner</strong>: Useful for complex logic that is only relevant to a single method.</li>
      <li><strong>Lambdas</strong>: Prefer over Anonymous Inner Classes for single-method interfaces.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 14</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why can inner classes access private members of the outer class?<span class="arrow">▶</span></div>
    <div class="qa-a">The compiler generates <strong>synthetic bridge methods</strong> (package-private) in the outer class that the inner class can call to access the private data. To the JVM, they are two separate classes in the same package.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can a local inner class access local variables of the method?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes, but only if they are effectively final.</strong> This is because the local inner class object might outlive the method execution. The JVM "captures" the value of the variable and stores a copy in the inner object. If the variable could change, the copy and the original would go out of sync.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can an interface have an inner class?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes.</strong> Any class defined inside an interface is implicitly <code>public static</code>. This is often used to group a default implementation or a related builder/factory class with the interface it serves.</div>
  </div>
</div>
`,U=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"})),W=`<div id="interfaces" class="section">
  <div class="breadcrumb">handbook / <span>section 09</span></div>
  <div class="section-eyebrow">The Contracts</div>
  <h1>Interfaces: Defining Capability</h1>
  <div class="section-desc">Interfaces are the backbone of decoupled architecture. They define <strong>What</strong> an object can do without caring about <strong>How</strong> it does it. We explore their evolution from pure abstractions to functional powerhouses and the JVM-level itables.</div>

  <h2>1. The Evolution of Interfaces</h2>
  <div class="table-wrap"><table>
    <tr><th>Java Version</th><th>Feature Added</th></tr>
    <tr><td><strong>Java 7 & below</strong></td><td>Purely Abstract (only public abstract methods and constants).</td></tr>
    <tr><td><strong>Java 8</strong></td><td><code>default</code> and <code>static</code> methods (allowing evolution without breaking code).</td></tr>
    <tr><td><strong>Java 9</strong></td><td><code>private</code> methods (helper logic shared between default methods).</td></tr>
  </table></div>

  <h2>2. Default Methods: Multiple Inheritance of Behavior</h2>
  <p>Default methods allowed Java to add new functionality to interfaces (like <code>forEach</code> in <code>Iterable</code>) without breaking existing implementations. 
  <br><strong>The Diamond Problem</strong>: If a class implements <code>InterfaceA</code> and <code>InterfaceB</code>, and both have the same <code>default void log()</code>, the compiler forces the class to override <code>log()</code> and manually choose: <code>InterfaceA.super.log()</code>.</p>

  <h3>Example: Default Methods &amp; Diamond Resolution</h3>
  <pre><code><span class="kw">interface</span> <span class="cl">Printable</span> {
    <span class="kw">default void</span> <span class="fn">log</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Printable log"</span>);
    }
}

<span class="kw">interface</span> <span class="cl">Loggable</span> {
    <span class="kw">default void</span> <span class="fn">log</span>() {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Loggable log"</span>);
    }
}

<span class="cm">// Must resolve the diamond manually!</span>
<span class="kw">class</span> <span class="cl">Report</span> <span class="kw">implements</span> <span class="cl">Printable</span>, <span class="cl">Loggable</span> {
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">log</span>() {
        <span class="cl">Printable</span>.<span class="kw">super</span>.<span class="fn">log</span>(); <span class="cm">// explicitly choose</span>
    }
}

<span class="kw">new</span> <span class="cl">Report</span>().<span class="fn">log</span>(); <span class="cm">// prints "Printable log"</span>
</code></pre>

  <h2>3. Functional Interfaces & Lambdas</h2>
  <p>An interface with exactly one abstract method is a <strong>Functional Interface</strong> (SAM - Single Abstract Method). These enable Java's functional programming support.</p>
  <pre><code><span class="kw">@FunctionalInterface</span>
<span class="kw">public interface</span> <span class="cl">Validator</span> {
    <span class="kw">boolean</span> <span class="fn">isValid</span>(<span class="kw">String</span> input);
}
<span class="cm">// Used as:</span>
<span class="cl">Validator</span> v = (s) -> s.<span class="fn">length</span>() > <span class="num">5</span>;</code></pre>

  <h2>4. Marker Interfaces vs. Annotations</h2>
  <p><strong>Marker Interfaces</strong> (e.g., <code>Serializable</code>) have zero methods and tag a class. 
  <br><strong>Modern Shift</strong>: Annotations (<code>@Entity</code>, <code>@Component</code>) are preferred as they are more flexible and don't affect the type hierarchy. However, <code>instanceof Serializable</code> is still faster than reading an annotation via reflection.</p>

  <h2>5. Interface vs. Abstract Class (The LLD Choice)</h2>
  <div class="box box-senior">
    <div class="box-title">🧠 How Senior Engineers Think</div>
    Juniors use abstract classes to avoid writing the same code twice. Seniors know that interfaces define <strong>System Boundaries (APIs)</strong>, while abstract classes define <strong>Domain Taxonomies</strong>. You expose the Interface to the world, and you hide the Abstract Class as an internal base implementation.
  </div>

  <div class="box box-lld">
    <div class="box-title">⚙️ LLD Connection: The Plugin Architecture</div>
    Every massive software system (IntelliJ, VSCode, Chrome) is a microkernel surrounded by plugins. How do plugins work? <strong>Interfaces.</strong> The core system exposes an <code>ExtensionPoint</code> interface. Third-party developers implement it. The core system loads them dynamically at runtime (via SPI or classloaders) without knowing <em>anything</em> about the concrete classes.
  </div>

  <h2>6. Internal: The itable (How JVM Handles Interfaces)</h2>
  <p>While classes use a vtable with fixed offsets, the JVM uses an <strong>itable</strong> for interface calls. Because a class can implement many interfaces, the JVM must search the itable at runtime to find the method pointer.</p>
  <div class="ascii-diagram">
[ CLASS: PAYMENT PROCESSOR ]
vtable: 0x1A2B (Fixed offsets for class methods)
itable: [
   interface: Payable   -> offset: 12
   interface: Auditable -> offset: 24
] (JVM must search this list at runtime!)
  </div>
  <p><strong>Performance</strong>: <code>invokeinterface</code> is slightly slower than <code>invokevirtual</code> because of this search step, although modern JIT compilers optimize it heavily.</p>

  <h2>7. Sealed Interfaces (Java 17+)</h2>
  <p>Just like sealed classes, <strong>Sealed Interfaces</strong> allow you to define exactly which classes or interfaces can implement them.</p>
  <pre><code><span class="kw">public sealed interface</span> <span class="cl">Payment</span>
    <span class="kw">permits</span> <span class="cl">CreditCard</span>, <span class="cl">UPI</span>, <span class="cl">BankTransfer</span> {
    <span class="kw">double</span> <span class="fn">amount</span>();
}

<span class="kw">public record</span> <span class="cl">CreditCard</span>(<span class="kw">double</span> amount, <span class="cl">String</span> cardNum)
    <span class="kw">implements</span> <span class="cl">Payment</span> {}

<span class="kw">public record</span> <span class="cl">UPI</span>(<span class="kw">double</span> amount, <span class="cl">String</span> upiId)
    <span class="kw">implements</span> <span class="cl">Payment</span> {}

<span class="kw">public record</span> <span class="cl">BankTransfer</span>(<span class="kw">double</span> amount, <span class="cl">String</span> ifsc)
    <span class="kw">implements</span> <span class="cl">Payment</span> {}

<span class="cm">// Exhaustive switch (Java 21)</span>
<span class="cl">String</span> <span class="fn">process</span>(<span class="cl">Payment</span> p) {
    <span class="kw">return switch</span> (p) {
        <span class="kw">case</span> <span class="cl">CreditCard</span> cc  -> <span class="str">"Charging card "</span> + cc.<span class="fn">cardNum</span>();
        <span class="kw">case</span> <span class="cl">UPI</span> upi        -> <span class="str">"UPI to "</span> + upi.<span class="fn">upiId</span>();
        <span class="kw">case</span> <span class="cl">BankTransfer</span> bt -> <span class="str">"NEFT via "</span> + bt.<span class="fn">ifsc</span>();
    };
}
</code></pre>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 09</div>
    <ul>
      <li><strong>Interfaces decouple</strong> the caller from the implementation.</li>
      <li><strong>Default methods</strong> allow "Multiple Inheritance of Behavior" safely.</li>
      <li><strong>Functional interfaces</strong> are the foundation of Lambdas and Streams.</li>
      <li><strong>Private methods</strong> (Java 9) allow sharing code between default methods without exposing it.</li>
      <li><strong>Itables</strong> handle the dynamic lookup for interface calls.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 09</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can an interface have a constructor?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>No.</strong> Interfaces cannot have state (instance fields) and cannot be instantiated directly, so they have no need for constructors. Abstract classes DO have constructors to initialize their shared state.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is the 'Three-Tier Architecture' link?<span class="arrow">▶</span></div>
    <div class="qa-a">In professional backend development, we use <strong>Interfaces</strong> to separate layers: <code>Controller</code> -> <code>IService</code> -> <code>IRepository</code>. This allows us to change the implementation of the Service or Repository (e.g., swapping a Database for a Mock) without affecting other layers.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What happens if a class implements two interfaces that have the exact same default method?<span class="arrow">▶</span></div>
    <div class="qa-a">The compiler will throw an error to prevent the "Diamond Problem." The class <strong>must</strong> resolve the ambiguity by overriding the method itself. Inside that override, the class can choose to call one of the specific interface defaults using <code>InterfaceName.super.methodName()</code>, or provide an entirely new implementation.</div>
  </div>
</div>`,z=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"})),G=`<div id="interview-qa" class="section">
  <div class="breadcrumb">handbook / <span>section 19</span></div>
  <div class="section-eyebrow">The Senior Engineer's Guide</div>
  <h1>The Interview Masterclass: FAANG-Level Deep Dives</h1>
  <div class="section-desc">FAANG-level interviews don't ask for definitions. They ask for architectural decisions, JVM internals, and the 'Why' behind every design choice. We've tiered these answers to help you reach the L6/Senior level.</div>

  <h2>1. Core Concepts (Tricky Edition)</h2>
  
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can an Interface have private methods?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes, since Java 9.</strong> Private methods are used to share code between <code>default</code> methods within the same interface without exposing that helper logic to implementing classes. It keeps the interface clean while avoiding code duplication.</div>
  </div>

  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What happens if you don't override <code>hashCode()</code> but override <code>equals()</code>?<span class="arrow">▶</span></div>
    <div class="qa-a">This is a <strong>Major Bug</strong>. Objects that are equal (<code>equals()</code> returns true) will have different hashes (based on memory address). If you put them in a <code>HashMap</code>, you might never find them again because the map looks in the wrong bucket. <strong>The Contract is broken.</strong> 
    <br><strong>L6 Insight</strong>: Always use <code>Objects.hash(field1, field2)</code> to ensure consistency and avoid the "Unequal objects in same bucket" performance degradation.</div>
  </div>

  <h2>2. Architectural Tradeoffs & Patterns</h2>

  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why is 'Composition over Inheritance' a rule of thumb?<span class="arrow">▶</span></div>
    <div class="qa-a">Inheritance is <strong>White-box Reuse</strong>: the child sees the internals of the parent, creating tight coupling. It's static. <strong>Composition</strong> is <strong>Black-box Reuse</strong>: you only see the public interface of the contained object. It allows you to change behavior at runtime (Dependency Injection) and keeps the class hierarchy flat and manageable. 
    <br><strong>Senior Tip</strong>: Use inheritance for <strong>Structural</strong> IS-A (Base class provides a framework) and composition for <strong>Functional</strong> HAS-A (Injecting behaviors).</div>
  </div>

  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">When would you use an Abstract Class instead of an Interface in Java 17?<span class="arrow">▶</span></div>
    <div class="qa-a">Even though Interfaces have <code>default</code> methods, I would use an <strong>Abstract Class</strong> if I need: 
    <ul>
      <li><strong>State</strong> (non-static, non-final fields).</li>
      <li><strong>Non-public methods</strong> (protected or package-private).</li>
      <li><strong>Constructors</strong> to ensure the base state is initialized in a specific way.</li>
    </ul>
    If it's purely for behavior/contract, interfaces are superior.</div>
  </div>

  <h2>3. JVM, Memory & Concurrency</h2>

  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is 'Type Erasure' in Java and how does it relate to OOP?<span class="arrow">▶</span></div>
    <div class="qa-a">Type Erasure means that Generic type info (e.g., <code>&lt;String&gt;</code>) is only available at compile time. At runtime, the JVM treats it as <code>Object</code>. This affects polymorphism: you can't have overloaded methods like <code>doWork(List&lt;String&gt; list)</code> and <code>doWork(List&lt;Integer&gt; list)</code> because their runtime signatures are identical. 
    <br><strong>Workaround</strong>: Use <strong>Type Tokens</strong> or <strong>Reified Types</strong> (via anonymous inner classes) to capture type info at runtime.</div>
  </div>

  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">How does 'Upcasting' affect method access?<span class="arrow">▶</span></div>
    <div class="qa-a">Upcasting changes the <strong>Scope</strong> but not the <strong>Behavior</strong>. <code>Animal a = new Dog();</code> allows access only to methods defined in <code>Animal</code>. However, if <code>Dog</code> overrides <code>makeSound()</code>, calling <code>a.makeSound()</code> will still execute the <code>Dog</code> version because of <strong>Dynamic Method Dispatch</strong>.</div>
  </div>

  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Are Immutable objects thread-safe? (The Trap)<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Yes, but with a caveat.</strong> The object itself is thread-safe because its state cannot change. However, the <strong>reference</strong> to that object is NOT thread-safe. If one thread is reading the reference and another is swapping it with a new immutable object, you still need <code>volatile</code> or synchronization on the reference itself.</div>
  </div>

  <h2>4. Scenario-Based Design (LLD Prep)</h2>

  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Design Question: "How would you implement a Logging library that supports multiple outputs (File, Console, Cloud)?"<span class="arrow">▶</span></div>
    <div class="qa-a">I would use the <strong>Observer Pattern</strong> or a simple <strong>Strategy Pattern</strong>. The <code>Logger</code> class maintains a list of <code>LogAppender</code> interfaces. When a message is logged, it iterates through the list and calls <code>append(msg)</code> on each. This allows users to add new appenders without modifying the core Logger. 
    <br><strong>Architect Detail</strong>: I'd add an <strong>AsyncAppender</strong> (using a Queue) to ensure logging doesn't block the main application thread.</div>
  </div>

  <div class="box box-interview">
    <div class="box-title">🎯 The "Senior" Answer Format</div>
    When answering, use this structure:
    1. <strong>Direct Answer</strong> (Yes/No/Definition).
    2. <strong>The 'Why'</strong> (Tradeoffs/Reasoning).
    3. <strong>The Caveat</strong> (When it fails/Edge cases).
    4. <strong>Real-world Example</strong> (How you've used it).
  </div>

  <div class="takeaways">
    <div class="takeaways-title">The Interview Mindset</div>
    <ul>
      <li>Never just say "what" something is; always say <strong>"why"</strong> it was designed that way.</li>
      <li>Mention <strong>Tradeoffs</strong>. (e.g., "This pattern increases flexibility but adds class explosion.")</li>
      <li>Reference <strong>JVM behavior</strong> for extra points.</li>
    </ul>
  </div>
</div>`,V=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"})),Q=`<div id="memory-model" class="section">\r
  <div class="breadcrumb">handbook / <span>section 12</span></div>\r
  <div class="section-eyebrow">The Engine Room</div>\r
  <h1>JVM Memory: The Generational Architecture</h1>\r
  <div class="section-desc">We move beyond "Stack vs Heap." We explore the TLABs, the Survivor space rotation, the ZGC revolution, and the memory regions that make Java's Garbage Collector one of the most advanced in the world.</div>\r
\r
  <h2>1. The "Big Three" Regions</h2>\r
  <div class="box box-senior">\r
    <div class="box-title">🧠 How Senior Engineers Think</div>\r
    Juniors memorize "Objects go on the Heap, primitives on the Stack." Seniors know that <strong>reachability is everything</strong>. Memory leaks happen when a long-lived object (like a static Map) holds a strong reference to a short-lived object, preventing the GC from reclaiming the Heap space.\r
  </div>\r
\r
  <div class="ascii-diagram">\r
[ THE JVM MEMORY MAP ]\r
\r
   STACK (Thread-Local)                      HEAP (Shared)\r
  +--------------------+                 +----------------------+\r
  |                    |                 |                      |\r
  | personRef ---------+---------------->| 0xA123: Person       |\r
  |                    |                 |  |- name = "Pujan"   |\r
  | count = 42         |                 |  |- age  = 22        |\r
  |                    |                 |                      |\r
  | listRef -----------+----------+      | 0xB456: ArrayList    |\r
  |                    |          +----->|  |- size = 1         |\r
  +--------------------+                 |  |- elementData      |\r
                                         +----------------------+\r
  * Primitives & References              * Actual Object Data\r
  * LIFO execution context               * GC Managed Area\r
  * Dies when method returns             * Dies when unreachable\r
  </div>\r
\r
  <div class="box box-lld">\r
    <div class="box-title">⚙️ LLD Connection</div>\r
    When designing a high-throughput system (like a Trading Engine or a WebSocket server), understanding the Heap is critical. You use <strong>Object Pooling</strong> or <strong>Off-Heap Memory</strong> (like ByteBuffer) to completely bypass the Garbage Collector and ensure zero-latency execution.\r
  </div>\r
\r
  <div class="diagram">\r
[ HEAP ANATOMY ]\r
+-------------+-------------+-------------+\r
| YOUNG GEN   | OLD GEN     | HUMONGOUS   | (G1 Layout)\r
| [E][S0][S1] | [Tenured]   | [Regions]   |\r
+-------------+-------------+-------------+</div>\r
\r
  <h2>2. The Generational Hypothesis</h2>\r
  <p>The entire memory system is built on one observation: <strong>"Most objects die young."</strong></p>\r
  <ul>\r
    <li><strong>Eden Space</strong>: Where 99% of objects are born.</li>\r
    <li><strong>Survivor Spaces (S0/S1)</strong>: "The Waiting Room." Objects that survive a Minor GC move here. They swap roles (From/To) every cycle to ensure <strong>Zero Fragmentation</strong>.</li>\r
    <li><strong>Old Generation</strong>: "The Retirement Home." If an object survives enough cycles (usually 15, the "Tenuring Threshold"), it is promoted here.</li>\r
  </ul>\r
\r
  <div class="box box-insight">\r
    <div class="box-title">🚀 Senior Speed: TLAB (Thread Local Allocation Buffer)</div>\r
    Allocating memory on a shared heap requires "locking" (to prevent two threads from taking the same spot). To avoid this bottleneck, the JVM gives each thread a small chunk of the Eden space called a <strong>TLAB</strong>. A thread can allocate objects in its TLAB without any locking. This makes Java's <code>new</code> almost as fast as a pointer increment.\r
  </div>\r
\r
  <h2>3. Garbage Collection: G1 vs ZGC</h2>\r
  <p>Modern Java (9+) uses the <strong>G1 (Garbage First)</strong> collector as default. But for low-latency systems, we use <strong>ZGC</strong>.</p>\r
  <ul>\r
    <li><strong>G1 GC</strong>: Regional collector. Targets "Garbage First" regions. Optimized for <strong>Throughput</strong>.</li>\r
    <li><strong>ZGC (Java 15+)</strong>: A concurrent, NUMA-aware collector. It handles heaps from 8MB to 16TB with <strong>max pause times of 1ms</strong>. It uses "Colored Pointers" and "Load Barriers" to move objects while the app is still running.</li>\r
  </ul>\r
\r
  <h2>4. The String Pool: Memory vs Identity</h2>\r
  <p>The <strong>String Pool</strong> lives on the Heap (since Java 7). It stores one copy of each unique string literal.</p>\r
  <pre><code><span class="cl">String</span> a = <span class="str">"Hello"</span>;            <span class="cm">// goes to String Pool</span>\r
<span class="cl">String</span> b = <span class="str">"Hello"</span>;            <span class="cm">// reuses SAME reference from Pool</span>\r
<span class="cl">String</span> c = <span class="kw">new</span> <span class="cl">String</span>(<span class="str">"Hello"</span>); <span class="cm">// creates NEW object on Heap</span>\r
\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(a == b);  <span class="cm">// true  (same reference)</span>\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(a == c);  <span class="cm">// false (different objects)</span>\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(a.<span class="fn">equals</span>(c)); <span class="cm">// true  (same content)</span>\r
\r
<span class="cl">String</span> d = c.<span class="fn">intern</span>(); <span class="cm">// puts c into pool, returns pool reference</span>\r
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(a == d); <span class="cm">// true</span>\r
</code></pre>\r
\r
  <h2>5. JIT & HotSpot: The Magic of Speed</h2>\r
  <div class="box box-insight">\r
    <div class="box-title">⚡ The JIT Compiler</div>\r
    The JVM doesn't just interpret code. It identifies "Hot Methods" and compiles them into <strong>Native Machine Code</strong>. It performs optimizations like:\r
    <ul>\r
      <li><strong>Inlining</strong>: Replacing a method call with the method's actual code.</li>\r
      <li><strong>Loop Unrolling</strong>: Optimizing loops for CPU branch prediction.</li>\r
      <li><strong>Dead Code Elimination</strong>: Removing code that never runs.</li>\r
    </ul>\r
  </div>\r
\r
  <h2>6. Reference Reachability (Edge Cases)</h2>\r
  <div class="table-wrap"><table>\r
    <tr><th>Reference Type</th><th>JVM Behavior</th><th>Architectural Use Case</th></tr>\r
    <tr><td><strong>Strong</strong></td><td>The default. Never collected.</td><td>Business logic data.</td></tr>\r
    <tr><td><strong>Soft</strong></td><td>Collected ONLY if OOM is imminent.</td><td>Memory-sensitive caches (Image loaders).</td></tr>\r
    <tr><td><strong>Weak</strong></td><td>Collected in the NEXT Minor GC.</td><td>WeakHashMap (Thread-locals, metadata).</td></tr>\r
    <tr><td><strong>Phantom</strong></td><td>Never de-referenced. Used for cleanup.</td><td>Replacing <code>finalize()</code> for resource management.</td></tr>\r
  </table></div>\r
\r
  <h3>Example: WeakReference for Cache</h3>\r
  <pre><code><span class="cm">// WeakReference — object collected at next GC if no strong refs</span>\r
<span class="cl">WeakReference</span>&lt;<span class="cl">byte</span>[]&gt; cache = <span class="kw">new</span> <span class="cl">WeakReference</span>&lt;&gt;(\r
    <span class="kw">new byte</span>[<span class="num">1024</span> * <span class="num">1024</span>] <span class="cm">// 1MB</span>\r
);\r
\r
<span class="kw">byte</span>[] data = cache.<span class="fn">get</span>(); <span class="cm">// may return null after GC!</span>\r
<span class="kw">if</span> (data == <span class="kw">null</span>) {\r
    data = <span class="fn">loadFromDisk</span>(); <span class="cm">// reload</span>\r
    cache = <span class="kw">new</span> <span class="cl">WeakReference</span>&lt;&gt;(data);\r
}\r
</code></pre>\r
\r
  <h2>7. The Memory Leak Checklist</h2>\r
  <div class="box box-danger">\r
    <div class="box-title">🚨 Senior Warning: The "Unfinished Thread" Leak</div>\r
    If a Thread is started but never finished, it keeps its entire <strong>Stack</strong> (1MB) alive. If that thread uses <code>ThreadLocal</code> variables, they will NEVER be GC'd. This is the #1 cause of memory leaks in Tomcat/Spring apps.\r
  </div>\r
\r
  <div class="takeaways">\r
    <div class="takeaways-title">Key Takeaways — Section 12</div>\r
    <ul>\r
      <li><strong>Stack is for Context</strong>; <strong>Heap is for Data</strong>.</li>\r
      <li><strong>Survivor Rotation</strong> ensures memory is always contiguous.</li>\r
      <li><strong>ZGC</strong> is the future of low-latency Java.</li>\r
      <li><strong>JIT Inlining</strong> is why Java is often as fast as C++.</li>\r
      <li><strong>Off-Heap (Direct Memory)</strong>: Use for large buffers to avoid GC pressure.</li>\r
    </ul>\r
  </div>\r
\r
  <h2>Interview Deep Dive — Section 12</h2>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is 'Stop the World' (STW) and why is it dangerous?<span class="arrow">▶</span></div>\r
    <div class="qa-a">STW is a pause where the JVM stops all application threads to perform GC. It's dangerous for real-time systems because the app becomes unresponsive. Modern collectors like <strong>ZGC</strong> aim for sub-millisecond STW pauses by performing most work concurrently.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">Why did Java 8 remove 'PermGen' and introduce 'Metaspace'?<span class="arrow">▶</span></div>\r
    <div class="qa-a">PermGen was part of the Heap and had a fixed size, leading to the frequent <code>java.lang.OutOfMemoryError: PermGen space</code>. Metaspace is part of <strong>Native Memory</strong>. It can grow dynamically with the OS, reducing the risk of crashes due to class-loading heavy frameworks.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is the difference between Strong, Weak, Soft, and Phantom References?<span class="arrow">▶</span></div>\r
    <div class="qa-a"><strong>Strong</strong>: Default reference, prevents GC. <strong>Soft</strong>: Keeps object alive until JVM is desperate for memory (good for caches). <strong>Weak</strong>: Does not prevent GC; object is collected on the next run (used in <code>WeakHashMap</code>). <strong>Phantom</strong>: Enqueued after object is finalized but before memory is reclaimed; used for manual native memory cleanup instead of <code>finalize()</code>.</div>\r
  </div>\r
</div>`,Y=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"})),K=`<div id="object-class" class="section">
  <div class="breadcrumb">handbook / <span>section 11</span></div>
  <div class="section-eyebrow">The Root</div>
  <h1>java.lang.Object: The Mother of All</h1>
  <div class="section-desc">Every class in Java, whether you write it or not, inherits from <code>Object</code>. We explore the universal methods that define what it means to be an object in the JVM, the monitor lock internals, and the broken <code>clone()</code> contract.</div>

  <h2>1. The equals() and hashCode() Contract</h2>
  <p>This is the most critical part of the <code>Object</code> class. If you override <code>equals()</code>, you <strong>must</strong> override <code>hashCode()</code>. </p>
  <ul>
    <li><strong>The Rule</strong>: If two objects are equal according to <code>equals()</code>, they must have the same <code>hashCode()</code>.</li>
    <li><strong>The Consequence</strong>: If you break this rule, your objects will behave unpredictably in <code>HashMap</code>, <code>HashSet</code>, and other collections.</li>
  </ul>

  <div class="box box-insight">
    <div class="box-title">⚖️ The 5 Rules of Equals</div>
    <ol>
      <li><strong>Reflexive</strong>: <code>a.equals(a)</code> must be true.</li>
      <li><strong>Symmetric</strong>: If <code>a.equals(b)</code>, then <code>b.equals(a)</code>.</li>
      <li><strong>Transitive</strong>: If <code>a.equals(b)</code> and <code>b.equals(c)</code>, then <code>a.equals(c)</code>.</li>
      <li><strong>Consistent</strong>: Multiple calls return the same result (unless state changes).</li>
      <li><strong>Non-null</strong>: <code>a.equals(null)</code> must always be false.</li>
    </ol>
  </div>

  <div class="box box-smell">
    <div class="box-title">🤢 Design Smell: Hash Mutation</div>
    If you use mutable fields in your <code>hashCode()</code> (e.g., a <code>List</code> or a mutable <code>String</code> name) and you change that field <strong>after</strong> adding the object to a <code>HashSet</code>, the object's hash changes. The Set will never find it again, creating a silent <strong>Memory Leak</strong>.
  </div>

  <div class="box box-senior">
    <div class="box-title">🧠 How Senior Engineers Think: HashMap Internals</div>
    When you put an object in a HashMap:
    <br>1. The Map uses <code>hashCode()</code> to find the correct <strong>Bucket</strong>.
    <br>2. If there are multiple objects in that bucket, it uses <code>equals()</code> to find the <strong>Exact Match</strong>.
    <br>If equal objects have different hashes, the Map will look in the wrong bucket and never find your object.
  </div>

  <h3>Example: Correct equals() and hashCode()</h3>
  <pre><code><span class="kw">public class</span> <span class="cl">Employee</span> {
    <span class="kw">private final</span> <span class="cl">String</span> id;
    <span class="kw">private</span> <span class="cl">String</span> name;

    <span class="kw">@Override</span>
    <span class="kw">public boolean</span> <span class="fn">equals</span>(<span class="cl">Object</span> o) {
        <span class="kw">if</span> (<span class="kw">this</span> == o) <span class="kw">return true</span>;
        <span class="kw">if</span> (o == <span class="kw">null</span> || getClass() != o.<span class="fn">getClass</span>()) <span class="kw">return false</span>;
        <span class="cl">Employee</span> other = (<span class="cl">Employee</span>) o;
        <span class="kw">return</span> <span class="cl">Objects</span>.<span class="fn">equals</span>(id, other.id);
    }

    <span class="kw">@Override</span>
    <span class="kw">public int</span> <span class="fn">hashCode</span>() {
        <span class="kw">return</span> <span class="cl">Objects</span>.<span class="fn">hash</span>(id);
    }
}

<span class="cm">// Now works correctly in HashMap</span>
<span class="cl">Map</span>&lt;<span class="cl">Employee</span>, <span class="cl">String</span>&gt; map = <span class="kw">new</span> <span class="cl">HashMap</span>&lt;&gt;();
<span class="cl">Employee</span> e1 = <span class="kw">new</span> <span class="cl">Employee</span>(<span class="str">"E1"</span>, <span class="str">"Alice"</span>);
map.<span class="fn">put</span>(e1, <span class="str">"Engineering"</span>);

<span class="cl">Employee</span> e2 = <span class="kw">new</span> <span class="cl">Employee</span>(<span class="str">"E1"</span>, <span class="str">"Alice"</span>); <span class="cm">// different object, same ID</span>
map.<span class="fn">get</span>(e2); <span class="cm">// returns "Engineering" — because equals + hashCode work!</span>
</code></pre>

  <h2>2. toString(): The Developer's Friend</h2>
  <p>The default implementation returns <code>ClassName@HashCode</code>. Always override this.</p>
  <pre><code><span class="kw">@Override</span>
<span class="kw">public</span> <span class="cl">String</span> <span class="fn">toString</span>() {
    <span class="kw">return</span> <span class="str">"Employee{id='"</span> + id + <span class="str">"', name='"</span> + name + <span class="str">"'}"</span>;
}

<span class="cm">// Better: use String.format or record (auto-generates toString)</span>
<span class="kw">public record</span> <span class="cl">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) {} <span class="cm">// toString: Point[x=1, y=2]</span>
</code></pre>
  <p><strong>Senior Tip</strong>: Don't include passwords or PII in <code>toString()</code> to avoid leaking them in logs.</p>

  <h2>3. getClass(): The Gateway to Reflection</h2>
  <p>Returns the <code>Class</code> object that represents the runtime class of the object. Unlike <code>instanceof</code>, <code>getClass() == Other.class</code> is <strong>Strict</strong>; it doesn't return true for subclasses. </p>

  <h2>4. clone(): The "Shallow" Heritage</h2>
  <div class="box box-smell">
    <div class="box-title">🤢 Design Smell: The Broken Clone Contract</div>
    The <code>clone()</code> method is universally considered broken by Java architects. It requires implementing the <code>Cloneable</code> marker interface, but doesn't actually define the method. It bypasses constructors, which breaks invariants and <code>final</code> field guarantees.
  </div>
  <ul>
    <li><strong>Shallow Copy</strong>: Copies field values. If a field is a reference, both objects point to the same child.</li>
    <li><strong>Deep Copy</strong>: Requires manual implementation to clone every child object.</li>
  </ul>
  <p><strong>Senior Recommendation</strong>: Use <strong>Copy Constructors</strong> or <strong>Serialization</strong> (like JSON mapping) for deep copying. Avoid <code>clone()</code>.</p>

  <h2>5. finalize(): The Deprecated Reaper</h2>
  <p>Historically used for cleanup before GC. However, it is unpredictable, slow, and can lead to memory leaks. 
  <br><strong>Object Resurrection</strong>: A finalize method could potentially save an object by assigning <code>this</code> to a static variable. This is extremely dangerous and confusing. <strong>Deprecated since Java 9.</strong> Use <code>try-with-resources</code>.</p>

  <h2>6. wait(), notify(), notifyAll(): The Monitor</h2>
  <p>These methods are on the <code>Object</code> class because every object in Java can act as a <strong>Lock (Monitor)</strong>.</p>
  <ul>
    <li><strong>Wait Set</strong>: Threads that called <code>wait()</code> and are waiting for a signal.</li>
    <li><strong>Entry Set</strong>: Threads waiting to acquire the lock.</li>
  </ul>
  <div class="box box-warning">
    <div class="box-title">⚠️ Synchronization Rule</div>
    They can <strong>only</strong> be called inside a <code>synchronized</code> block on that specific object, otherwise they throw <code>IllegalMonitorStateException</code>.
  </div>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 11</div>
    <ul>
      <li><strong>Always override equals/hashCode</strong> together.</li>
      <li><strong>Object is the root</strong> of all polymorphism.</li>
      <li><strong>Every object has a monitor</strong> for synchronization.</li>
      <li><strong>Prefer AutoCloseable</strong> over finalize().</li>
      <li><strong>Java 8+ HashMap Optimization</strong>: If a bucket has too many collisions, it converts the linked list to a <strong>Balanced Tree</strong> (O(log n) vs O(n)).</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 11</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is the difference between '==' and 'equals()'?<span class="arrow">▶</span></div>
    <div class="qa-a"><code>==</code> compares <strong>References</strong> (do they point to the same memory address?). <code>equals()</code> compares <strong>Content</strong> (do they have the same data?). By default, <code>Object.equals()</code> uses <code>==</code>, so you must override it to compare fields.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why is it bad to use <code>instanceof</code> in an <code>equals()</code> override? (Architect level)<span class="arrow">▶</span></div>
    <div class="qa-a">Using <code>instanceof</code> violates <strong>Symmetry</strong> if inheritance is involved. If <code>Point(x,y)</code> uses <code>instanceof</code>, it might return true for a <code>ColorPoint(x,y,z)</code>. But <code>ColorPoint.equals(Point)</code> would be false because of the extra field. Using <code>getClass() == other.getClass()</code> is safer as it ensures both objects are the exact same type.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is a Shallow Copy vs a Deep Copy (regarding <code>clone()</code>)?<span class="arrow">▶</span></div>
    <div class="qa-a">The default <code>Object.clone()</code> creates a <strong>Shallow Copy</strong>. It copies primitive values and the <em>references</em> to objects. If you clone an object containing a list, both the original and the clone will point to the exact same list. A <strong>Deep Copy</strong> creates a new list and recursively clones all nested objects.</div>
  </div>
</div>`,$=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"})),X=`<div id="oop-design-thinking" class="section">
  <div class="breadcrumb">handbook / architecture / <span>section 18</span></div>
  <div class="section-eyebrow">LLD Framework</div>
  <h1>OOP Design Thinking: The Architect's Mindset</h1>
  <div class="section-desc">Design thinking is about decomposing a complex problem into a collection of interacting objects. It’s the first step of any Low-Level Design (LLD) interview. We move from raw requirements to a structured object-oriented system.</div>

  <h2>1. The "Noun-Verb" Strategy</h2>
  <p>How do you start designing a system? Use the <strong>Grammatical Analysis</strong> of the requirements:</p>
  <ul>
    <li><strong>Nouns</strong>: Become Classes (e.g., <code>User</code>, <code>Account</code>, <code>Product</code>).</li>
    <li><strong>Verbs</strong>: Become Methods (e.g., <code>deposit()</code>, <code>validate()</code>, <code>checkout()</code>).</li>
    <li><strong>Adjectives</strong>: Become State/Enum values (e.g., <code>ACTIVE</code>, <code>PREMIUM</code>).</li>
  </ul>

  <h2>2. The LLD Interview Framework</h2>
  <div class="box box-insight">
    <div class="box-title">🚀 Step-by-Step Execution</div>
    <ol>
      <li><strong>Clarify</strong>: Ask for the scale and scope. (e.g., "Is it a single parking lot or a global chain?")</li>
      <li><strong>Define Entities</strong>: List all nouns and their properties.</li>
      <li><strong>Establish Relationships</strong>: Composition, Aggregation, or Inheritance?</li>
      <li><strong>Design APIs</strong>: Define the public methods and contracts.</li>
      <li><strong>Deep Dive</strong>: Optimize for performance, concurrency, or extensibility.</li>
    </ol>
  </div>

  <h2>3. Modeling Case Studies (Extreme Depth)</h2>
  
  <h3>A. ATM System (The State Pattern)</h3>
  <p>Don't just use <code>if-else</code> for ATM states (Idle, Authenticated, OutOfCash). Use the <strong>State Pattern</strong>.</p>
  <div class="diagram" style="font-size:12px;">
[ ATM ] ──► [ INTERFACE: ATMState ]
                ▲
     ┌──────────┼──────────┐
[ IdleState ] [ AuthState ] [ TransactionState ]</div>
  <ul>
    <li><strong>CardReader</strong>: Handles hardware signals.</li>
    <li><strong>CashDispenser</strong>: Managed by a <strong>Chain of Responsibility</strong> (to dispense 2000, 500, 100 notes).</li>
  </ul>

  <h3>ATM State Pattern Code</h3>
  <pre><code><span class="kw">public interface</span> <span class="cl">ATMState</span> {
    <span class="kw">void</span> <span class="fn">insertCard</span>(<span class="cl">ATM</span> atm);
    <span class="kw">void</span> <span class="fn">enterPin</span>(<span class="cl">ATM</span> atm, <span class="kw">int</span> pin);
    <span class="kw">void</span> <span class="fn">withdraw</span>(<span class="cl">ATM</span> atm, <span class="kw">double</span> amount);
}

<span class="kw">public class</span> <span class="cl">IdleState</span> <span class="kw">implements</span> <span class="cl">ATMState</span> {
    <span class="kw">public void</span> <span class="fn">insertCard</span>(<span class="cl">ATM</span> atm) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Card inserted"</span>);
        atm.<span class="fn">setState</span>(<span class="kw">new</span> <span class="cl">AuthState</span>());
    }
    <span class="kw">public void</span> <span class="fn">enterPin</span>(<span class="cl">ATM</span> atm, <span class="kw">int</span> pin) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Insert card first!"</span>);
    }
    <span class="kw">public void</span> <span class="fn">withdraw</span>(<span class="cl">ATM</span> atm, <span class="kw">double</span> amt) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Insert card first!"</span>);
    }
}
</code></pre>

  <h3>B. Library Management System</h3>
  <div class="box box-insight">
    <div class="box-title">💡 Modeling Tip: Don't miss the 'Relation' entities</div>
    In a Library, a <code>Book</code> and a <code>Member</code> aren't enough. You need a <code>BookLending</code> or <code>Transaction</code> entity to track the <strong>state</strong> of a book being borrowed (who has it, when is it due?).
  </div>
  <ul>
    <li><strong>Classes</strong>: <code>Book</code>, <code>Author</code>, <code>Member</code>, <code>Library</code>, <code>BookItem</code> (specific copy).</li>
    <li><strong>Abstraction</strong>: <code>SearchService</code> (Interface) -> <code>CategorySearch</code>, <code>TitleSearch</code>.</li>
  </ul>

  <h3>C. Parking Lot (The LLD Classic)</h3>
  <ul>
    <li><strong>Entities</strong>: <code>ParkingLot</code>, <code>Floor</code>, <code>ParkingSpot</code> (Abstract), <code>Vehicle</code> (Abstract).</li>
    <li><strong>Logic</strong>: A <code>LargeSpot</code> can hold a <code>Truck</code>. A <code>CompactSpot</code> can hold a <code>Car</code>. This is <strong>Polymorphism</strong> in action.</li>
    <li><strong>Payment</strong>: <code>HourlyStrategy</code> vs <code>FlatStrategy</code> (OCP via Strategy Pattern).</li>
  </ul>

  <h2>4. High Cohesion & Low Coupling</h2>
  <div class="table-wrap"><table>
    <tr><th>Metric</th><th>Goal</th><th>Why?</th></tr>
    <tr><td><strong>Cohesion</strong></td><td>High</td><td>A class should do one job well. It's easier to understand and test.</td></tr>
    <tr><td><strong>Coupling</strong></td><td>Low</td><td>Classes should have minimal dependency on each other's internals.</td></tr>
  </table></div>
  
  <p><strong>Example of High Coupling (Bad)</strong>:</p>
  <pre><code><span class="kw">class</span> <span class="cl">Order</span> {
    <span class="kw">void</span> <span class="fn">pay</span>() {
        <span class="cl">Payment</span> p = <span class="kw">new</span> <span class="cl">Payment</span>();
        p.<span class="fn">process</span>(); <span class="cm">// Order is now TIED to Payment class</span>
    }
}</code></pre>

  <p><strong>Fixed — Low Coupling</strong>:</p>
  <pre><code><span class="kw">class</span> <span class="cl">Order</span> {
    <span class="kw">private final</span> <span class="cl">PaymentProcessor</span> processor; <span class="cm">// interface!</span>

    <span class="cl">Order</span>(<span class="cl">PaymentProcessor</span> processor) {
        <span class="kw">this</span>.processor = processor; <span class="cm">// DI</span>
    }

    <span class="kw">void</span> <span class="fn">pay</span>() {
        processor.<span class="fn">process</span>(); <span class="cm">// can be any implementation!</span>
    }
}
</code></pre>

  <h2>5. Top-Down vs. Bottom-Up Design</h2>
  <ul>
    <li><strong>Top-Down</strong>: Start with the User Interface / API and work down to the database. (Focus on User Experience).</li>
    <li><strong>Bottom-Up</strong>: Start with the data schema and build logic on top. (Focus on Data Integrity).</li>
  </ul>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 18</div>
    <ul>
      <li><strong>Think in Entities</strong>, not functions.</li>
      <li><strong>Use Composition</strong> to build complex behaviors from small parts.</li>
      <li><strong>Design for Change</strong>: Use interfaces for anything that might have multiple implementations.</li>
      <li><strong>Rich Domain Models</strong> keep logic where the data is.</li>
    </ul>
  </div>

  <h2>Interview Questions — Section 18</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">How do you handle "Circular Dependencies" in design?<span class="arrow">▶</span></div>
    <div class="qa-a">Circular dependency (Class A needs B, and B needs A) is a major design smell. Fix it by: (1) Introducing an <strong>Interface</strong> to break the direct link. (2) Creating a third "Orchestrator" class that manages both. (3) Moving the shared logic into a common base class.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is "Skinny Models, Fat Services" vs "Rich Domain Models"?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>Skinny Models</strong> (Anemic Domain Model) have only data, and logic is in Service classes. <strong>Rich Domain Models</strong> put logic inside the entities themselves (true OOP). In complex LLD, Rich Domain Models are usually preferred as they keep the code more organized.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is the difference between Composition and Aggregation in OOP Design?<span class="arrow">▶</span></div>
    <div class="qa-a">Both are "HAS-A" relationships, but they differ in <strong>lifecycle dependency</strong>. <strong>Composition</strong> is a strong "owns-a" relationship; if the parent (House) is destroyed, the child (Room) is also destroyed. <strong>Aggregation</strong> is a weak "uses-a" relationship; if the parent (Department) is destroyed, the child (Professor) can still exist independently.</div>
  </div>
</div>`,Z=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"})),ss=`<div id="oop-lld-bridge" class="section">
  <div class="breadcrumb">handbook / architecture / <span>section 18</span></div>
  <div class="section-eyebrow">The Professional Bridge</div>
  <h1>OOP → LLD: From Code to Architecture</h1>
  <div class="section-desc">Low-Level Design (LLD) is where OOP meets real-world constraints. We map the pillars of OOP to the patterns of architecture, focusing on coupling, cohesion, and scalability.</div>

  <h2>1. Design Patterns: Formalized OOP Solutions</h2>
  <p>Every design pattern is an application of OOP principles — inheritance, polymorphism, encapsulation, and composition — to a recurring problem.</p>

  <div class="table-wrap"><table>
    <tr><th>Pattern</th><th>OOP Concept</th><th>Solves</th><th>Real Usage</th></tr>
    <tr><td><strong>Strategy</strong></td><td>Polymorphism + DI</td><td>Swappable algorithms</td><td>Payment methods, sorting.</td></tr>
    <tr><td><strong>Observer</strong></td><td>Association + Interface</td><td>Loosely coupled events</td><td>Event systems, Kafka consumers.</td></tr>
    <tr><td><strong>Decorator</strong></td><td>Composition</td><td>Add behavior without inheritance</td><td>Java I/O streams, Logging.</td></tr>
    <li><strong>State</strong></td><td>Polymorphism</td><td>Complex lifecycles</td><td>ATM states, Order status.</td></tr>
  </table></div>

  <h2>2. Coupling vs. Cohesion (The LLD North Star)</h2>
  <div class="box box-insight">
    <div class="box-title">⚖️ The Architect's Balance</div>
    <ul>
      <li><strong>High Cohesion</strong>: A class should do <strong>one thing</strong> and do it well (SRP). All methods in a class should be related to its purpose.</li>
      <li><strong>Low Coupling</strong>: Classes should depend on <strong>Abstractions</strong> (Interfaces), not concrete implementations. This allows you to change one class without breaking 50 others.</li>
    </ul>
    <strong>Goal</strong>: Design systems that are easy to test and impossible to break during a refactor.
  </div>

  <h2>3. LLD Case Study: Vending Machine</h2>
  <p>How do we map OOP to a real LLD problem? Let's take a <strong>Vending Machine</strong>.</p>
  <ul>
    <li><strong>Encapsulation</strong>: The <code>Inventory</code> class protects the item count and price. You can't just decrement an item; you must call <code>dispense()</code>.</li>
    <li><strong>Abstraction</strong>: The <code>VendingState</code> interface hides the complexity of what happens when you press a button (Idle, HasMoney, Dispensing).</li>
    <li><strong>Polymorphism</strong>: Different payment methods (Cash, Card, Crypto) implement a <code>PaymentStrategy</code> interface.</li>
    <li><strong>Relationships</strong>: A <code>VendingMachine</code> <strong>HAS-A</strong> <code>Inventory</code> (Composition) and <strong>IS-A</strong> <code>StateMachine</code> (Inheritance).</li>
  </ul>

  <h3>Example: Observer Pattern</h3>
  <pre><code><span class="kw">public interface</span> <span class="cl">EventListener</span> {
    <span class="kw">void</span> <span class="fn">onEvent</span>(<span class="cl">String</span> event);
}

<span class="kw">public class</span> <span class="cl">EventBus</span> {
    <span class="kw">private final</span> <span class="cl">Map</span>&lt;<span class="cl">String</span>, <span class="cl">List</span>&lt;<span class="cl">EventListener</span>&gt;&gt; listeners = <span class="kw">new</span> <span class="cl">HashMap</span>&lt;&gt;();

    <span class="kw">public void</span> <span class="fn">subscribe</span>(<span class="cl">String</span> event, <span class="cl">EventListener</span> listener) {
        listeners.<span class="fn">computeIfAbsent</span>(event, k -> <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;()).<span class="fn">add</span>(listener);
    }

    <span class="kw">public void</span> <span class="fn">publish</span>(<span class="cl">String</span> event) {
        listeners.<span class="fn">getOrDefault</span>(event, <span class="cl">List</span>.<span class="fn">of</span>())
            .<span class="fn">forEach</span>(l -> l.<span class="fn">onEvent</span>(event));
    }
}

<span class="cm">// Usage — fully decoupled components</span>
<span class="cl">EventBus</span> bus = <span class="kw">new</span> <span class="cl">EventBus</span>();
bus.<span class="fn">subscribe</span>(<span class="str">"ORDER_PLACED"</span>, e -> <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Send email"</span>));
bus.<span class="fn">subscribe</span>(<span class="str">"ORDER_PLACED"</span>, e -> <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Update inventory"</span>));
bus.<span class="fn">publish</span>(<span class="str">"ORDER_PLACED"</span>); <span class="cm">// both listeners fire!</span>
</code></pre>


  <h2>4. Domain Modeling vs. Data Modeling</h2>
  <p>Senior devs don't design tables first; they design <strong>Objects</strong>. 
  <br><strong>Anemic Domain Model</strong>: Classes that only have getters/setters (Data only).
  <br><strong>Rich Domain Model</strong>: Classes that have both data and the logic to manipulate that data (Encapsulation). <strong>Always aim for a Rich Domain Model in LLD.</strong></p>

  <h2>5. Concurrency in LLD</h2>
  <div class="box box-danger">
    <div class="box-title">🚨 Thread Safety by Design</div>
    In a real LLD (like a Cab Booking system), objects are accessed by multiple threads simultaneously.
    <ul>
      <li>Use <strong>Immutability</strong> for value objects (Location, Price).</li>
      <li>Use <strong>Atomic</strong> variables or <strong>Locks</strong> in Service classes.</li>
      <li>Use <strong>ThreadLocal</strong> for context-specific data.</li>
    </ul>
  </div>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 18</div>
    <ul>
      <li><strong>LLD is about relationships</strong>, not just individual classes.</li>
      <li><strong>Patterns are tools</strong>, not rules. Use them only when they solve a specific problem.</li>
      <li><strong>Design for Change</strong>: Use Abstraction and Polymorphism to make your system "Open for Extension, Closed for Modification."</li>
      <li><strong>Cohesion > Coupling</strong>: It's better to have 10 small, focused classes than 1 giant "God Class."</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 18</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">"Favor Composition over Inheritance" — Why? (LLD Level)<span class="arrow">▶</span></div>
    <div class="qa-a">Inheritance is static and creates a "Fragile Base Class" problem. If you change the parent, all children might break. Composition is dynamic; you can swap the behavior at runtime by injecting a different implementation. It keeps the class hierarchy flat and flexible.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">How do you handle a "Circular Dependency" between two classes in LLD?<span class="arrow">▶</span></div>
    <div class="qa-a">Circular dependency is an architectural smell. <strong>Fix 1</strong>: Use an Interface to break the cycle. <strong>Fix 2</strong>: Introduce a third "Orchestrator" class that handles the interaction between the two. <strong>Fix 3</strong>: Use Dependency Injection (Setter injection) if using a framework like Spring.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is a "God Object" or "God Class" Anti-Pattern?<span class="arrow">▶</span></div>
    <div class="qa-a">A God Object is a single class that knows too much or does too much. It becomes a central point of maintenance, violating the Single Responsibility Principle. In LLD, you fix this by identifying distinct responsibilities and refactoring the God Class into multiple smaller, cohesive classes (Delegation).</div>
  </div>
</div>`,ns=Object.freeze(Object.defineProperty({__proto__:null,default:ss},Symbol.toStringTag,{value:"Module"})),as=`<div id="polymorphism" class="section">\r
	<div class="breadcrumb">\r
		handbook / the 4 pillars / <span>section 04D</span>\r
	</div>\r
	<div class="section-eyebrow">The Mastery</div>\r
	<h1>Polymorphism: The Power of Many Forms</h1>\r
	<div class="section-desc">\r
		Polymorphism is the ability of an object to take on many forms. We explore\r
		bytecode instructions, vtable internals, and JVM optimizations that make\r
		polymorphism surprisingly fast.\r
	</div>\r
\r
	<h2>1. Static vs. Dynamic Polymorphism</h2>\r
	<div class="table-wrap">\r
		<table>\r
			<tr>\r
				<th>Type</th>\r
				<th>Mechanism</th>\r
				<th>Binding Time</th>\r
			</tr>\r
			<tr>\r
				<td><strong>Static</strong></td>\r
				<td>Method Overloading</td>\r
				<td>Compile Time (Early Binding)</td>\r
			</tr>\r
			<tr>\r
				<td><strong>Dynamic</strong></td>\r
				<td>Method Overriding</td>\r
				<td>Runtime (Late Binding)</td>\r
			</tr>\r
		</table>\r
	</div>\r
\r
	<h3>Example: Method Overloading (Static Polymorphism)</h3>\r
	<pre><code><span class="kw">public class</span> <span class="cl">MathUtils</span> {\r
    <span class="cm">// Same name, different parameter types = overloading</span>\r
    <span class="kw">public int</span> <span class="fn">add</span>(<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> a + b; }\r
    <span class="kw">public double</span> <span class="fn">add</span>(<span class="kw">double</span> a, <span class="kw">double</span> b) { <span class="kw">return</span> a + b; }\r
    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">add</span>(<span class="cl">String</span> a, <span class="cl">String</span> b) { <span class="kw">return</span> a + b; }\r
}\r
\r
<span class="cl">MathUtils</span> m = <span class="kw">new</span> <span class="cl">MathUtils</span>();\r
m.<span class="fn">add</span>(<span class="num">1</span>, <span class="num">2</span>);           <span class="cm">// calls int version</span>\r
m.<span class="fn">add</span>(<span class="num">1.5</span>, <span class="num">2.5</span>);       <span class="cm">// calls double version</span>\r
m.<span class="fn">add</span>(<span class="str">"Hi"</span>, <span class="str">" World"</span>); <span class="cm">// calls String version</span>\r
</code></pre>\r
\r
	<h3>Example: Method Overriding (Dynamic Polymorphism)</h3>\r
	<pre><code><span class="kw">public abstract class</span> <span class="cl">Logger</span> {\r
    <span class="kw">public abstract void</span> <span class="fn">write</span>(<span class="cl">String</span> log);\r
}\r
\r
<span class="kw">public class</span> <span class="cl">FileLogger</span> <span class="kw">extends</span> <span class="cl">Logger</span> {\r
    <span class="kw">private</span> <span class="cl">String</span> filePath;\r
    <span class="kw">public</span> <span class="cl">FileLogger</span>(<span class="cl">String</span> path) { <span class="kw">this</span>.filePath = path; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">write</span>(<span class="cl">String</span> log) { \r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Appending to file "</span> + filePath + <span class="str">": "</span> + log); \r
    }\r
}\r
\r
<span class="kw">public class</span> <span class="cl">CloudLogger</span> <span class="kw">extends</span> <span class="cl">Logger</span> {\r
    <span class="kw">private</span> <span class="cl">String</span> bucketUrl;\r
    <span class="kw">public</span> <span class="cl">CloudLogger</span>(<span class="cl">String</span> url) { <span class="kw">this</span>.bucketUrl = url; }\r
\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">write</span>(<span class="cl">String</span> log) { \r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Sending over network to "</span> + bucketUrl + <span class="str">": "</span> + log); \r
    }\r
}\r
\r
<span class="cm">// Dynamic dispatch — JVM decides at RUNTIME</span>\r
<span class="cl">List</span>&lt;<span class="cl">Logger</span>&gt; loggers = <span class="cl">List</span>.<span class="fn">of</span>(\r
    <span class="kw">new</span> <span class="cl">FileLogger</span>(<span class="str">"/var/logs/app.log"</span>),\r
    <span class="kw">new</span> <span class="cl">CloudLogger</span>(<span class="str">"s3://bucket/logs"</span>)\r
);\r
\r
<span class="kw">for</span> (<span class="cl">Logger</span> logger : loggers) {\r
    logger.<span class="fn">write</span>(<span class="str">"System booted."</span>); <span class="cm">// Correct method called via vtable</span>\r
}\r
</code></pre>\r
\r
	<h2>2. Bytecode: invokevirtual vs invokespecial</h2>\r
	<ul>\r
		<li>\r
			<strong>invokestatic</strong>: Static methods (fixed at compile time).\r
		</li>\r
		<li>\r
			<strong>invokespecial</strong>: Constructors, private methods, super\r
			(fixed at compile time).\r
		</li>\r
		<li>\r
			<strong>invokevirtual</strong>: Public/protected instance methods.\r
			<strong>Dynamic Dispatch</strong>.\r
		</li>\r
		<li>\r
			<strong>invokeinterface</strong>: Interface methods. Slightly slower\r
			(itable lookup).\r
		</li>\r
		<li>\r
			<strong>invokedynamic</strong>: Lambdas, var-args (Java 7+). Bootstrap\r
			method resolves target.\r
		</li>\r
	</ul>\r
\r
	<h2>3. Internal Wiring: How the JVM Thinks</h2>\r
	<div class="box box-senior">\r
		<div class="box-title">🧠 How Senior Engineers Think</div>\r
		Juniors think polymorphism is "magic." Seniors know it's just a pointer\r
		lookup. Every object has a hidden header pointing to its class's\r
		<strong>vtable</strong> (Virtual Method Table). At runtime,\r
		<code>logger.write()</code> looks up index 1 in the vtable and jumps to that\r
		memory address.\r
	</div>\r
\r
	<div class="ascii-diagram">\r
		[ CLASS: LOGGER ] [ CLASS: FILELOGGER ] vtable: vtable: 0: Object.toString()\r
		0: Object.toString() 1: Logger.write() 1: FileLogger.write() <──\r
		(OVERRIDDEN) 2: FileLogger.rotate() <── (NEW)\r
	</div>\r
\r
	<div class="box box-insight">\r
		<div class="box-title">🚀 JIT Optimization: Devirtualization</div>\r
		If the JIT compiler notices a specific call site always calls the same class\r
		(<strong>Monomorphic Call Site</strong>), it "devirtualizes" the call —\r
		removing the vtable lookup and inlining the method code directly. This is\r
		why polymorphism in modern Java has almost zero overhead.\r
	</div>\r
\r
	<h2>4. Interface-Based Polymorphism (The Professional Way)</h2>\r
	<div class="box box-lld">\r
		<div class="box-title">⚙️ LLD Connection: The Strategy Pattern</div>\r
		Polymorphism is the engine behind the <strong>Strategy Pattern</strong>. By\r
		programming to an interface (<code>Notifier</code>), the\r
		<code>AlertService</code> is completely decoupled from the specific\r
		transport mechanism. This makes the code highly testable (via Mocks) and\r
		extensible.\r
	</div>\r
\r
	<pre><code><span class="kw">public interface</span> <span class="cl">Notifier</span> {\r
    <span class="kw">void</span> <span class="fn">send</span>(<span class="cl">String</span> message, <span class="cl">String</span> recipient);\r
}\r
\r
<span class="kw">public class</span> <span class="cl">EmailNotifier</span> <span class="kw">implements</span> <span class="cl">Notifier</span> {\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">send</span>(<span class="cl">String</span> msg, <span class="cl">String</span> to) {\r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Email to "</span> + to + <span class="str">": "</span> + msg);\r
    }\r
}\r
\r
<span class="kw">public class</span> <span class="cl">SmsNotifier</span> <span class="kw">implements</span> <span class="cl">Notifier</span> {\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">send</span>(<span class="cl">String</span> msg, <span class="cl">String</span> to) {\r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"SMS to "</span> + to + <span class="str">": "</span> + msg);\r
    }\r
}\r
\r
<span class="cm">// SERVICE — depends on abstraction, not concrete classes</span>\r
<span class="kw">public class</span> <span class="cl">AlertService</span> {\r
    <span class="kw">private final</span> <span class="cl">List</span>&lt;<span class="cl">Notifier</span>&gt; notifiers;\r
\r
    <span class="cm">// Dependency Injection via Constructor</span>\r
    <span class="kw">public</span> <span class="cl">AlertService</span>(<span class="cl">List</span>&lt;<span class="cl">Notifier</span>&gt; notifiers) {\r
        <span class="kw">this</span>.notifiers = notifiers;\r
    }\r
\r
    <span class="kw">public void</span> <span class="fn">alert</span>(<span class="cl">String</span> msg) {\r
        notifiers.<span class="fn">forEach</span>(n -> n.<span class="fn">send</span>(msg, <span class="str">"admin"</span>));\r
    }\r
}\r
\r
<span class="cm">// USAGE — add new notifiers without changing AlertService!</span>\r
<span class="cl">AlertService</span> svc = <span class="kw">new</span> <span class="cl">AlertService</span>(<span class="cl">List</span>.<span class="fn">of</span>(\r
    <span class="kw">new</span> <span class="cl">EmailNotifier</span>(),\r
    <span class="kw">new</span> <span class="cl">SmsNotifier</span>()\r
));\r
svc.<span class="fn">alert</span>(<span class="str">"Server is down!"</span>);\r
</code></pre>\r
\r
	<h2>5. Method Hiding vs Overriding</h2>\r
	<div class="compare">\r
		<div class="compare-col">\r
			<div class="compare-label compare-bad">Static: Method Hiding</div>\r
			<pre\r
				style="font-size: 11px"\r
			><code><span class="kw">class</span> <span class="cl">A</span> { <span class="kw">static void</span> <span class="fn">go</span>() { <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"A"</span>); } }\r
<span class="kw">class</span> <span class="cl">B</span> <span class="kw">extends</span> <span class="cl">A</span> { <span class="kw">static void</span> <span class="fn">go</span>() { <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"B"</span>); } }\r
<span class="cl">A</span> obj = <span class="kw">new</span> <span class="cl">B</span>();\r
obj.<span class="fn">go</span>(); <span class="cm">// Calls A.go()!</span></code></pre>\r
		</div>\r
		<div class="compare-col">\r
			<div class="compare-label compare-good">Instance: Overriding</div>\r
			<pre\r
				style="font-size: 11px"\r
			><code><span class="kw">class</span> <span class="cl">A</span> { <span class="kw">void</span> <span class="fn">go</span>() { <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"A"</span>); } }\r
<span class="kw">class</span> <span class="cl">B</span> <span class="kw">extends</span> <span class="cl">A</span> { <span class="kw">void</span> <span class="fn">go</span>() { <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"B"</span>); } }\r
<span class="cl">A</span> obj = <span class="kw">new</span> <span class="cl">B</span>();\r
obj.<span class="fn">go</span>(); <span class="cm">// Calls B.go()!</span></code></pre>\r
		</div>\r
	</div>\r
\r
	<h2>6. Rules for Method Overriding</h2>\r
	<ul>\r
		<li>\r
			<strong>Access Level</strong>: Cannot be more restrictive than parent.\r
		</li>\r
		<li>\r
			<strong>Return Type</strong>: Must be same or a\r
			<strong>Covariant Type</strong> (subtype).\r
		</li>\r
		<li>\r
			<strong>Exceptions</strong>: Can throw fewer/narrower checked exceptions,\r
			never more.\r
		</li>\r
		<li><strong>Final/Static</strong>: Cannot be overridden.</li>\r
	</ul>\r
\r
	<h2>7. The 'instanceof' Evolution + Downcasting</h2>\r
	<pre><code><span class="cm">// OLD WAY (pre-Java 16)</span>\r
<span class="kw">if</span> (animal <span class="kw">instanceof</span> <span class="cl">Dog</span>) {\r
    <span class="cl">Dog</span> dog = (<span class="cl">Dog</span>) animal; <span class="cm">// manual cast</span>\r
    dog.<span class="fn">bark</span>();\r
}\r
\r
<span class="cm">// MODERN WAY (Java 16+) — Pattern Matching</span>\r
<span class="kw">if</span> (animal <span class="kw">instanceof</span> <span class="cl">Dog</span> dog) {\r
    dog.<span class="fn">bark</span>(); <span class="cm">// already cast — no ClassCastException risk!</span>\r
}\r
\r
<span class="cm">// SWITCH PATTERN (Java 21)</span>\r
<span class="cl">String</span> <span class="fn">describe</span>(<span class="cl">Shape</span> s) {\r
    <span class="kw">return switch</span> (s) {\r
        <span class="kw">case</span> <span class="cl">Circle</span> c -> <span class="str">"Circle r="</span> + c.<span class="fn">getRadius</span>();\r
        <span class="kw">case</span> <span class="cl">Square</span> sq -> <span class="str">"Square s="</span> + sq.<span class="fn">getSide</span>();\r
        <span class="kw">default</span> -> <span class="str">"Unknown shape"</span>;\r
    };\r
}\r
</code></pre>\r
\r
	<h2>8. Covariant Return Types</h2>\r
	<pre><code><span class="kw">interface</span> <span class="cl">Provider</span> { <span class="cl">Connection</span> <span class="fn">get</span>(); }\r
<span class="kw">class</span> <span class="cl">MySQLProvider</span> <span class="kw">implements</span> <span class="cl">Provider</span> {\r
    <span class="cl">MySQLConnection</span> <span class="fn">get</span>() { <span class="kw">return new</span> <span class="cl">MySQLConnection</span>(); }\r
    <span class="cm">// Valid! MySQLConnection IS-A Connection</span>\r
}\r
</code></pre>\r
\r
	<div class="takeaways">\r
		<div class="takeaways-title">Key Takeaways — Section 04D</div>\r
		<ul>\r
			<li>\r
				<strong>Polymorphism</strong> is enabled by\r
				<strong>Dynamic Dispatch</strong> (invokevirtual).\r
			</li>\r
			<li>\r
				<strong>vtable</strong> is the primary mechanism for method lookup.\r
			</li>\r
			<li>\r
				<strong>JIT Devirtualization</strong> makes polymorphic code run at\r
				native speed.\r
			</li>\r
			<li>\r
				<strong>Static methods cannot be overridden</strong> (they are hidden).\r
			</li>\r
			<li>\r
				<strong>Interface-based polymorphism</strong> is the professional way to\r
				write extensible systems.\r
			</li>\r
		</ul>\r
	</div>\r
\r
	<h2>Interview Deep Dive — Section 04D</h2>\r
	<div class="qa-block">\r
		<div class="qa-q" onclick="toggleQA(this)">\r
			What is a 'Megamorphic' call site?<span class="arrow">▶</span>\r
		</div>\r
		<div class="qa-a">\r
			A call site where many different subclasses are being called. The JVM\r
			cannot optimize this easily via devirtualization, and must fall back to\r
			slower vtable lookup. Senior devs avoid this in tight, high-performance\r
			loops.\r
		</div>\r
	</div>\r
	<div class="qa-block">\r
		<div class="qa-q" onclick="toggleQA(this)">\r
			Why is 'invokeinterface' slower than 'invokevirtual'?<span class="arrow"\r
				>▶</span\r
			>\r
		</div>\r
		<div class="qa-a">\r
			Because a class can implement multiple interfaces, the method offset can\r
			change between classes. <code>invokeinterface</code> must search the\r
			<strong>itable</strong>, whereas <code>invokevirtual</code> has a fixed\r
			offset in the vtable.\r
		</div>\r
	</div>\r
	<div class="qa-block">\r
		<div class="qa-q" onclick="toggleQA(this)">\r
			Can we override a private method?<span class="arrow">▶</span>\r
		</div>\r
		<div class="qa-a">\r
			<strong>No.</strong> Private methods are not visible to subclasses. A\r
			method with the same signature in the subclass is a completely\r
			<strong>new</strong> method, not an override.\r
		</div>\r
	</div>\r
	<div class="qa-block">\r
		<div class="qa-q" onclick="toggleQA(this)">\r
			What is Method Hiding?<span class="arrow">▶</span>\r
		</div>\r
		<div class="qa-a">\r
			Method hiding occurs when a subclass defines a static method with the same signature as a static method in the superclass. Unlike overriding, which is resolved at runtime (dynamic dispatch), method hiding is resolved at compile time based on the <strong>reference type</strong>, not the object type.\r
		</div>\r
	</div>\r
</div>\r
`,es=Object.freeze(Object.defineProperty({__proto__:null,default:as},Symbol.toStringTag,{value:"Module"})),ts=`<div id="relationships" class="section">
  <div class="breadcrumb">handbook / <span>section 05</span></div>
  <div class="section-eyebrow">The Connections</div>
  <h1>Object Relationships: Beyond IS-A</h1>
  <div class="section-desc">Objects don't live in isolation. We explore how they connect, own each other, and manage each other's lifecycles through Association, Aggregation, Composition, and Dependency.</div>

  <h2>1. The Spectrum of Ownership</h2>
  <p>In LLD, the most important question is: <strong>"If the parent dies, what happens to the child?"</strong></p>

  <div class="table-wrap"><table>
    <tr><th>Relationship</th><th>Ownership</th><th>Lifecycle</th><th>UML</th><th>Java Clue</th></tr>
    <tr><td><strong>Dependency</strong></td><td>None (uses temporarily)</td><td>Independent</td><td>- - -></td><td>Method parameter</td></tr>
    <tr><td><strong>Association</strong></td><td>No ownership</td><td>Independent</td><td>───</td><td>Field reference</td></tr>
    <tr><td><strong>Aggregation</strong></td><td>Weak (HAS-A)</td><td>Independent (child survives)</td><td>◇──</td><td>Field injected via constructor</td></tr>
    <tr><td><strong>Composition</strong></td><td>Strong (PART-OF)</td><td>Dependent (child dies with parent)</td><td>◆──</td><td>Field created with <code>new</code> inside class</td></tr>
  </table></div>

  <h2>2. Dependency: "I use you temporarily"</h2>
  <p>The weakest relationship. Object A uses Object B only inside a method — no field reference is stored.</p>
  <pre><code><span class="kw">public class</span> <span class="cl">ReportGenerator</span> {
    <span class="cm">// No field for Printer — it's just a parameter</span>
    <span class="kw">public void</span> <span class="fn">generateReport</span>(<span class="cl">Printer</span> printer) {
        <span class="cl">String</span> report = <span class="str">"Sales Report Q1"</span>;
        printer.<span class="fn">print</span>(report); <span class="cm">// uses Printer temporarily</span>
    }
}

<span class="cm">// Usage</span>
<span class="cl">ReportGenerator</span> gen = <span class="kw">new</span> <span class="cl">ReportGenerator</span>();
gen.<span class="fn">generateReport</span>(<span class="kw">new</span> <span class="cl">LaserPrinter</span>()); <span class="cm">// dependency injected as param</span>
</code></pre>

  <h2>3. Association: "I know you"</h2>
  <p>The simplest relationship. One object uses another, but neither owns the other. Both can exist independently. It is a <strong>bidirectional or unidirectional</strong> reference stored as a field.</p>
  <pre><code><span class="cm">// ASSOCIATION: Doctor ↔ Patient (both exist independently)</span>
<span class="kw">public class</span> <span class="cl">Doctor</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;
    <span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">Patient</span>&gt; patients = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();

    <span class="kw">public</span> <span class="cl">Doctor</span>(<span class="cl">String</span> name) { <span class="kw">this</span>.name = name; }

    <span class="kw">public void</span> <span class="fn">addPatient</span>(<span class="cl">Patient</span> p) {
        patients.<span class="fn">add</span>(p);
    }

    <span class="kw">public void</span> <span class="fn">diagnose</span>(<span class="cl">Patient</span> p) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(name + <span class="str">" diagnosing "</span> + p.<span class="fn">getName</span>());
    }
}

<span class="kw">public class</span> <span class="cl">Patient</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;
    <span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">Doctor</span>&gt; doctors = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();

    <span class="kw">public</span> <span class="cl">Patient</span>(<span class="cl">String</span> name) { <span class="kw">this</span>.name = name; }
    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">getName</span>() { <span class="kw">return</span> name; }

    <span class="kw">public void</span> <span class="fn">addDoctor</span>(<span class="cl">Doctor</span> d) {
        doctors.<span class="fn">add</span>(d);
    }
}

<span class="cm">// Both exist independently — deleting a Doctor doesn't delete a Patient</span>
<span class="cl">Doctor</span> doc = <span class="kw">new</span> <span class="cl">Doctor</span>(<span class="str">"Dr. Smith"</span>);
<span class="cl">Patient</span> pat = <span class="kw">new</span> <span class="cl">Patient</span>(<span class="str">"Alice"</span>);
doc.<span class="fn">addPatient</span>(pat);
pat.<span class="fn">addDoctor</span>(doc);
doc.<span class="fn">diagnose</span>(pat); <span class="cm">// Dr. Smith diagnosing Alice</span>
</code></pre>

  <h2>4. Aggregation: "I have you (but you can leave)"</h2>
  <p>A "Whole-Part" relationship where the parts can belong to more than one "Whole" or exist without it. The child is <strong>injected from outside</strong>.</p>
  <pre><code><span class="cm">// AGGREGATION: Department HAS-A Professor (professor survives without dept)</span>
<span class="kw">public class</span> <span class="cl">Professor</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;
    <span class="kw">public</span> <span class="cl">Professor</span>(<span class="cl">String</span> name) { <span class="kw">this</span>.name = name; }
    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">getName</span>() { <span class="kw">return</span> name; }
}

<span class="kw">public class</span> <span class="cl">Department</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;
    <span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">Professor</span>&gt; professors; <span class="cm">// aggregation</span>

    <span class="cm">// Child is INJECTED — not created here</span>
    <span class="kw">public</span> <span class="cl">Department</span>(<span class="cl">String</span> name, <span class="cl">List</span>&lt;<span class="cl">Professor</span>&gt; professors) {
        <span class="kw">this</span>.name = name;
        <span class="kw">this</span>.professors = professors;
    }

    <span class="kw">public void</span> <span class="fn">printRoster</span>() {
        professors.<span class="fn">forEach</span>(p ->
            <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(name + <span class="str">": "</span> + p.<span class="fn">getName</span>()));
    }
}

<span class="cm">// Professors exist BEFORE the department</span>
<span class="cl">Professor</span> p1 = <span class="kw">new</span> <span class="cl">Professor</span>(<span class="str">"Dr. Turing"</span>);
<span class="cl">Professor</span> p2 = <span class="kw">new</span> <span class="cl">Professor</span>(<span class="str">"Dr. Knuth"</span>);
<span class="cl">Department</span> cs = <span class="kw">new</span> <span class="cl">Department</span>(<span class="str">"CS"</span>, <span class="cl">List</span>.<span class="fn">of</span>(p1, p2));
cs.<span class="fn">printRoster</span>();

<span class="cm">// If department is deleted, professors still exist!</span>
cs = <span class="kw">null</span>;
<span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(p1.<span class="fn">getName</span>()); <span class="cm">// "Dr. Turing" — still alive</span>
</code></pre>

  <h2>5. Composition: "I own you completely"</h2>
  <p>A strict ownership where the child is physically or logically a part of the parent. The child cannot exist without the parent. The parent <strong>creates</strong> the child internally.</p>
  <pre><code><span class="cm">// COMPOSITION: House OWNS Rooms (rooms die with the house)</span>
<span class="kw">public class</span> <span class="cl">Room</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;
    <span class="kw">private int</span> squareFeet;

    <span class="kw">public</span> <span class="cl">Room</span>(<span class="cl">String</span> name, <span class="kw">int</span> sqft) {
        <span class="kw">this</span>.name = name;
        <span class="kw">this</span>.squareFeet = sqft;
    }

    <span class="kw">public</span> <span class="cl">String</span> <span class="fn">toString</span>() {
        <span class="kw">return</span> name + <span class="str">" ("</span> + squareFeet + <span class="str">" sqft)"</span>;
    }
}

<span class="kw">public class</span> <span class="cl">House</span> {
    <span class="kw">private final</span> <span class="cl">List</span>&lt;<span class="cl">Room</span>&gt; rooms;

    <span class="kw">public</span> <span class="cl">House</span>() {
        <span class="cm">// Rooms are CREATED inside — composition!</span>
        <span class="kw">this</span>.rooms = <span class="cl">List</span>.<span class="fn">of</span>(
            <span class="kw">new</span> <span class="cl">Room</span>(<span class="str">"Living Room"</span>, <span class="num">300</span>),
            <span class="kw">new</span> <span class="cl">Room</span>(<span class="str">"Kitchen"</span>, <span class="num">150</span>),
            <span class="kw">new</span> <span class="cl">Room</span>(<span class="str">"Bedroom"</span>, <span class="num">200</span>)
        );
    }

    <span class="kw">public void</span> <span class="fn">showRooms</span>() {
        rooms.<span class="fn">forEach</span>(r -> <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(r));
    }
}

<span class="cm">// If House is garbage collected, Rooms are too — no external references</span>
<span class="cl">House</span> h = <span class="kw">new</span> <span class="cl">House</span>();
h.<span class="fn">showRooms</span>();
</code></pre>

  <div class="box box-insight">
    <div class="box-title">💡 Senior Insight: The ORM Perspective</div>
    In Hibernate/JPA, Composition maps to <code>CascadeType.ALL</code> and <code>orphanRemoval=true</code>. Aggregation typically uses no cascade or just <code>CascadeType.PERSIST</code>.
    <pre style="margin-top:10px;"><code><span class="cm">// JPA Composition</span>
<span class="kw">@OneToMany</span>(cascade = <span class="cl">CascadeType</span>.ALL, orphanRemoval = <span class="kw">true</span>)
<span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">Room</span>&gt; rooms;

<span class="cm">// JPA Aggregation</span>
<span class="kw">@ManyToMany</span>
<span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">Professor</span>&gt; professors;
</code></pre>
  </div>

  <h2>6. Multiplicity &amp; Mapping</h2>
  <ul>
    <li><strong>1-to-1</strong>: One <code>User</code> has one <code>Profile</code>.</li>
    <li><strong>1-to-Many</strong>: One <code>Author</code> has many <code>Books</code>.</li>
    <li><strong>Many-to-Many</strong>: Many <code>Students</code> attend many <code>Courses</code>. (Usually requires a "Join Object" like <code>Enrollment</code>).</li>
  </ul>

  <h3>Example: Many-to-Many with Join Entity</h3>
  <pre><code><span class="cm">// Instead of direct Many-to-Many, use a Join Entity</span>
<span class="kw">public class</span> <span class="cl">Student</span> {
    <span class="kw">private</span> <span class="cl">String</span> name;
    <span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">Enrollment</span>&gt; enrollments = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();
}

<span class="kw">public class</span> <span class="cl">Course</span> {
    <span class="kw">private</span> <span class="cl">String</span> title;
    <span class="kw">private</span> <span class="cl">List</span>&lt;<span class="cl">Enrollment</span>&gt; enrollments = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();
}

<span class="cm">// The JOIN entity — holds relationship data</span>
<span class="kw">public class</span> <span class="cl">Enrollment</span> {
    <span class="kw">private</span> <span class="cl">Student</span> student;
    <span class="kw">private</span> <span class="cl">Course</span> course;
    <span class="kw">private</span> <span class="cl">LocalDate</span> enrolledDate;
    <span class="kw">private</span> <span class="cl">String</span> grade;

    <span class="kw">public</span> <span class="cl">Enrollment</span>(<span class="cl">Student</span> s, <span class="cl">Course</span> c) {
        <span class="kw">this</span>.student = s;
        <span class="kw">this</span>.course = c;
        <span class="kw">this</span>.enrolledDate = <span class="cl">LocalDate</span>.<span class="fn">now</span>();
    }
}
</code></pre>

  <h2>7. Breaking Circular Dependencies</h2>
  <div class="box box-danger">
    <div class="box-title">🚨 Architectural Smell</div>
    If <code>Class A</code> HAS-A <code>Class B</code>, and <code>Class B</code> HAS-A <code>Class A</code>, you have a <strong>Circular Dependency</strong>. This makes testing, compilation, and Garbage Collection much harder.
  </div>

  <h3>Example: Breaking a Circular Dependency with an Interface</h3>
  <pre><code><span class="cm">// BAD — Circular dependency</span>
<span class="kw">class</span> <span class="cl">OrderService</span> {
    <span class="kw">private</span> <span class="cl">PaymentService</span> paymentService; <span class="cm">// depends on Payment</span>
}
<span class="kw">class</span> <span class="cl">PaymentService</span> {
    <span class="kw">private</span> <span class="cl">OrderService</span> orderService; <span class="cm">// depends on Order — CIRCULAR!</span>
}

<span class="cm">// GOOD — Break with an Interface</span>
<span class="kw">interface</span> <span class="cl">OrderLookup</span> {
    <span class="cl">Order</span> <span class="fn">findById</span>(<span class="cl">String</span> orderId);
}

<span class="kw">class</span> <span class="cl">OrderService</span> <span class="kw">implements</span> <span class="cl">OrderLookup</span> {
    <span class="kw">private</span> <span class="cl">PaymentService</span> paymentService;

    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="cl">Order</span> <span class="fn">findById</span>(<span class="cl">String</span> id) { <span class="cm">/* ... */</span> <span class="kw">return null</span>; }
}

<span class="kw">class</span> <span class="cl">PaymentService</span> {
    <span class="kw">private</span> <span class="cl">OrderLookup</span> orderLookup; <span class="cm">// depends on abstraction, not concrete!</span>
}
</code></pre>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 05</div>
    <ul>
      <li><strong>Favor Composition</strong> for strictly owned entities.</li>
      <li><strong>Use Aggregation</strong> when entities are shared or independent.</li>
      <li><strong>Associations</strong> are the most flexible but weakest links.</li>
      <li><strong>Lifecycle management</strong> is the key differentiator.</li>
      <li><strong>Break circular deps</strong> with Interfaces (DIP).</li>
      <li><strong>Many-to-Many</strong> should use a Join Entity for clean domain modeling.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 05</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Difference between Aggregation and Composition in a real coding interview?<span class="arrow">▶</span></div>
    <div class="qa-a">In code, they look identical (both are just fields). The difference is in <strong>Intent and Lifecycle</strong>. If you pass the child object into the constructor (Dependency Injection), it's usually Aggregation. If you create the child object inside the constructor with <code>new</code>, it's usually Composition.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why is Many-to-Many avoided in pure Domain Models?<span class="arrow">▶</span></div>
    <div class="qa-a">Because it's complex to manage the state of the relationship. Instead of a direct link, we usually introduce a "Relationship Entity" (e.g., <code>OrderLineItem</code> between <code>Order</code> and <code>Product</code>) that can hold its own data (like quantity or price-at-time-of-purchase).</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">How do you decide between Association and Aggregation?<span class="arrow">▶</span></div>
    <div class="qa-a">Ask: <strong>"Does the container logically 'own' the contained object?"</strong> If a <code>Team</code> has <code>Players</code>, the Team "owns" them in context — that's Aggregation. If a <code>Student</code> knows a <code>Library</code>, neither owns the other — that's Association. The UML diamond (◇) indicates "whole-part" thinking.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is the danger of bi-directional associations?<span class="arrow">▶</span></div>
    <div class="qa-a">If Class A has a reference to Class B, and Class B has a reference to Class A, you have a <strong>Circular Reference</strong>. In languages without garbage collection (like C++), this causes memory leaks. In Java, the GC handles it, but it creates huge problems for <strong>Serialization</strong> (like converting to JSON), causing infinite loops unless you use annotations like <code>@JsonIgnore</code>.</div>
  </div>
</div>
`,cs=Object.freeze(Object.defineProperty({__proto__:null,default:ts},Symbol.toStringTag,{value:"Module"})),ls=`<div id="solid-principles" class="section">\r
  <div class="breadcrumb">handbook / <span>section 17</span></div>\r
  <div class="section-eyebrow">The Architecture</div>\r
  <h1>SOLID Principles: The Engineering Compass</h1>\r
  <div class="section-desc">SOLID is the difference between "code that works" and "code that lasts." These five principles are the foundation of scalable, maintainable, and testable software systems.</div>\r
\r
  <h2>1. S: Single Responsibility (SRP)</h2>\r
  <p><strong>"A class should have only one reason to change."</strong></p>\r
  <div class="box box-insight">\r
    <div class="box-title">🏛️ Architect's Tip: The 'Conway's Law' Link</div>\r
    SRP isn't just about code; it's about people. If two different departments (e.g., Finance and HR) ask for changes to the same class, you have violated SRP. Each class should serve exactly one stakeholder.\r
  </div>\r
  <div class="box box-smell">\r
    <div class="box-title">🤢 Design Smell: The God Object & Shotgun Surgery</div>\r
    If a class is 2,000 lines long and handles validation, database access, and UI formatting, it is a <strong>God Object</strong>. When you have to change 5 different files to add one tiny feature, you are suffering from <strong>Shotgun Surgery</strong> (a clear violation of SRP).\r
  </div>\r
  <div class="compare">\r
    <div class="compare-col">\r
      <div class="compare-label compare-bad">❌ Bad: God Class</div>\r
      <pre style="font-size:11px;"><code><span class="kw">class</span> <span class="cl">Invoice</span> {\r
  <span class="kw">void</span> <span class="fn">calculate</span>() { ... }\r
  <span class="kw">void</span> <span class="fn">saveToDb</span>() { ... }\r
  <span class="kw">void</span> <span class="fn">emailUser</span>() { ... }\r
}</code></pre>\r
    </div>\r
    <div class="compare-col">\r
      <div class="compare-label compare-good">✅ Good: Decoupled</div>\r
      <pre style="font-size:11px;"><code><span class="kw">class</span> <span class="cl">InvoiceCalculator</span> { ... }\r
<span class="kw">class</span> <span class="cl">InvoiceRepository</span> { ... }\r
<span class="kw">class</span> <span class="cl">NotificationService</span> { ... }</code></pre>\r
    </div>\r
  </div>\r
\r
  <h2>2. O: Open/Closed Principle (OCP)</h2>\r
  <p><strong>"Open for extension, Closed for modification."</strong></p>\r
  <p>You should be able to add a new "Discount Type" without opening the <code>DiscountService.java</code> file and adding an <code>if-else</code> or <code>switch</code> block.</p>\r
  <div class="diagram">\r
[ CLIENT ] ──► [ INTERFACE: DiscountStrategy ]\r
                       ▲\r
          ┌────────────┴────────────┐\r
    [ StudentDiscount ]      [ VIPDiscount ]\r
\r
To add 'BlackFridayDiscount', just implement the interface. \r
The CLIENT code stays exactly the same.</div>\r
\r
  <h3>Example: OCP with Strategy Pattern</h3>\r
  <pre><code><span class="kw">public interface</span> <span class="cl">DiscountStrategy</span> {\r
    <span class="kw">double</span> <span class="fn">apply</span>(<span class="kw">double</span> price);\r
}\r
\r
<span class="kw">public class</span> <span class="cl">StudentDiscount</span> <span class="kw">implements</span> <span class="cl">DiscountStrategy</span> {\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">apply</span>(<span class="kw">double</span> price) { <span class="kw">return</span> price * <span class="num">0.8</span>; }\r
}\r
\r
<span class="kw">public class</span> <span class="cl">VIPDiscount</span> <span class="kw">implements</span> <span class="cl">DiscountStrategy</span> {\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">apply</span>(<span class="kw">double</span> price) { <span class="kw">return</span> price * <span class="num">0.7</span>; }\r
}\r
\r
<span class="cm">// Adding new discount — NO modification to existing code!</span>\r
<span class="kw">public class</span> <span class="cl">BlackFridayDiscount</span> <span class="kw">implements</span> <span class="cl">DiscountStrategy</span> {\r
    <span class="kw">@Override</span>\r
    <span class="kw">public double</span> <span class="fn">apply</span>(<span class="kw">double</span> price) { <span class="kw">return</span> price * <span class="num">0.5</span>; }\r
}\r
\r
<span class="cm">// Client code is CLOSED for modification</span>\r
<span class="kw">public class</span> <span class="cl">PriceCalculator</span> {\r
    <span class="kw">public double</span> <span class="fn">finalPrice</span>(<span class="kw">double</span> price, <span class="cl">DiscountStrategy</span> strategy) {\r
        <span class="kw">return</span> strategy.<span class="fn">apply</span>(price);\r
    }\r
}\r
\r
<span class="cl">PriceCalculator</span> calc = <span class="kw">new</span> <span class="cl">PriceCalculator</span>();\r
calc.<span class="fn">finalPrice</span>(<span class="num">100</span>, <span class="kw">new</span> <span class="cl">VIPDiscount</span>());          <span class="cm">// 70.0</span>\r
calc.<span class="fn">finalPrice</span>(<span class="num">100</span>, <span class="kw">new</span> <span class="cl">BlackFridayDiscount</span>()); <span class="cm">// 50.0</span>\r
</code></pre>\r
\r
  <h2>3. L: Liskov Substitution (LSP)</h2>\r
  <p><strong>"Subtypes must be substitutable for their base types without breaking behavior."</strong></p>\r
  <div class="box box-danger">\r
    <div class="box-title">🚨 The LSP Test: The "Duck" Rule</div>\r
    "If it looks like a duck and quacks like a duck but needs batteries, you probably have the wrong abstraction."\r
    <br><br>\r
    If you override a method to throw <code>UnsupportedOperationException</code>, you have violated LSP. A subclass should never "do less" than its parent.\r
  </div>\r
\r
  <div class="box box-warning">\r
    <div class="box-title">⚠️ The Square-Rectangle Problem</div>\r
    If <code>Square</code> inherits from <code>Rectangle</code>, and <code>Rectangle</code> has <code>setWidth()</code> and <code>setHeight()</code>, the <code>Square</code> override must set <strong>both</strong> to the same value to stay a square. But a user of <code>Rectangle</code> expects to set width without changing height! This is an LSP violation.\r
    <br><strong>Solution</strong>: Inheritance isn't always the answer. Use a common <code>Shape</code> interface instead.\r
  </div>\r
\r
  <h2>4. I: Interface Segregation (ISP)</h2>\r
  <p><strong>"Clients should not be forced to depend on methods they do not use."</strong></p>\r
  <p>Fat interfaces lead to <strong>Rigid Coupling</strong>. Break them down into specific, atomic capabilities.</p>\r
  <pre><code><span class="cm">// BAD: Fat Interface</span>\r
<span class="kw">interface</span> <span class="cl">SmartDevice</span> { <span class="kw">void</span> <span class="fn">print</span>(); <span class="kw">void</span> <span class="fn">fax</span>(); <span class="kw">void</span> <span class="fn">scan</span>(); }\r
\r
<span class="cm">// GOOD: Segregated Interfaces</span>\r
<span class="kw">interface</span> <span class="cl">Printer</span> { <span class="kw">void</span> <span class="fn">print</span>(); }\r
<span class="kw">interface</span> <span class="cl">Scanner</span> { <span class="kw">void</span> <span class="fn">scan</span>(); }</code></pre>\r
\r
  <h2>5. D: Dependency Inversion (DIP)</h2>\r
  <p><strong>"Depend on abstractions, not concretions."</strong></p>\r
  <p>High-level modules (Business Logic) should not depend on low-level modules (Database/API). Both should depend on Interfaces.</p>\r
  <div class="box box-insight">\r
    <div class="box-title">💡 Spring Framework Perspective</div>\r
    DIP is what makes <strong>Dependency Injection</strong> possible. Spring injects the concrete implementation into your constructor based on the interface. This allows you to swap a <code>MockDatabase</code> for a <code>RealDatabase</code> during testing without changing a single line of code.\r
  </div>\r
\r
  <h3>Example: DIP with Constructor Injection</h3>\r
  <pre><code><span class="cm">// ABSTRACTION (Port)</span>\r
<span class="kw">public interface</span> <span class="cl">MessageSender</span> {\r
    <span class="kw">void</span> <span class="fn">send</span>(<span class="cl">String</span> to, <span class="cl">String</span> body);\r
}\r
\r
<span class="cm">// LOW-LEVEL (Adapter 1)</span>\r
<span class="kw">public class</span> <span class="cl">EmailSender</span> <span class="kw">implements</span> <span class="cl">MessageSender</span> {\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">send</span>(<span class="cl">String</span> to, <span class="cl">String</span> body) {\r
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(<span class="str">"Email to "</span> + to + <span class="str">": "</span> + body);\r
    }\r
}\r
\r
<span class="cm">// LOW-LEVEL (Adapter 2 — for testing)</span>\r
<span class="kw">public class</span> <span class="cl">MockSender</span> <span class="kw">implements</span> <span class="cl">MessageSender</span> {\r
    <span class="kw">public</span> <span class="cl">List</span>&lt;<span class="cl">String</span>&gt; sent = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();\r
    <span class="kw">@Override</span>\r
    <span class="kw">public void</span> <span class="fn">send</span>(<span class="cl">String</span> to, <span class="cl">String</span> body) {\r
        sent.<span class="fn">add</span>(to + <span class="str">":"</span> + body);\r
    }\r
}\r
\r
<span class="cm">// HIGH-LEVEL — depends on ABSTRACTION, not concrete</span>\r
<span class="kw">public class</span> <span class="cl">NotificationService</span> {\r
    <span class="kw">private final</span> <span class="cl">MessageSender</span> sender; <span class="cm">// interface!</span>\r
\r
    <span class="kw">public</span> <span class="cl">NotificationService</span>(<span class="cl">MessageSender</span> sender) {\r
        <span class="kw">this</span>.sender = sender;\r
    }\r
\r
    <span class="kw">public void</span> <span class="fn">notifyUser</span>(<span class="cl">String</span> userId) {\r
        sender.<span class="fn">send</span>(userId, <span class="str">"Your order has shipped!"</span>);\r
    }\r
}\r
\r
<span class="cm">// PRODUCTION</span>\r
<span class="kw">new</span> <span class="cl">NotificationService</span>(<span class="kw">new</span> <span class="cl">EmailSender</span>()).<span class="fn">notifyUser</span>(<span class="str">"alice"</span>);\r
\r
<span class="cm">// TESTING — swap implementation, zero code changes!</span>\r
<span class="cl">MockSender</span> mock = <span class="kw">new</span> <span class="cl">MockSender</span>();\r
<span class="kw">new</span> <span class="cl">NotificationService</span>(mock).<span class="fn">notifyUser</span>(<span class="str">"bob"</span>);\r
assertEquals(<span class="num">1</span>, mock.sent.<span class="fn">size</span>());\r
</code></pre>\r
\r
\r
  <h2>6. SOLID vs. YAGNI/KISS</h2>\r
  <div class="box box-senior">\r
    <div class="box-title">🧠 How Senior Engineers Think</div>\r
    Junior devs read about SOLID and instantly create 5 interfaces, 3 abstract classes, and a factory for a script that just reads a CSV file. Senior devs balance SOLID against practical delivery. Over-abstracting code before the requirements demand it is called <strong>Premature Optimization</strong>.\r
  </div>\r
  <p>While SOLID is powerful, it can lead to <strong>Over-Engineering</strong> if misapplied. Balance these with:</p>\r
  <ul>\r
    <li><strong>KISS (Keep It Simple, Stupid)</strong>: Don't use 5 interfaces if 1 simple class will suffice for the next 2 years.</li>\r
    <li><strong>YAGNI (You Ain't Gonna Need It)</strong>: Don't build an OCP-compliant pluggable system for a feature that will never change.</li>\r
  </ul>\r
\r
  <div class="takeaways">\r
    <div class="takeaways-title">Key Takeaways — Section 17</div>\r
    <ul>\r
      <li><strong>SOLID is about Managing Change.</strong></li>\r
      <li><strong>SRP</strong> reduces the scope of bugs.</li>\r
      <li><strong>OCP</strong> allows the system to grow safely.</li>\r
      <li><strong>LSP</strong> ensures inheritance is used correctly.</li>\r
      <li><strong>ISP</strong> keeps interfaces lean and relevant.</li>\r
      <li><strong>DIP</strong> enables loose coupling and testability.</li>\r
      <li><strong>Balance is key</strong>: Don't over-engineer for scenarios that don't exist.</li>\r
    </ul>\r
  </div>\r
\r
  <h2>Interview Deep Dive — Section 17</h2>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">Is SOLID always necessary for small projects?<span class="arrow">▶</span></div>\r
    <div class="qa-a">No. Over-applying SOLID to a 100-line script is <strong>Over-Engineering</strong>. SOLID is a defense mechanism against the complexity of <strong>Scale</strong>. It comes at the cost of more classes and files. A senior dev knows when to keep it simple and when to pull out the SOLID "big guns."</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">What is the "Dependency Inversion" vs "Dependency Injection"?<span class="arrow">▶</span></div>\r
    <div class="qa-a"><strong>Dependency Inversion</strong> is the <em>Principle</em> (The Goal: decouple). <strong>Dependency Injection</strong> is the <em>Pattern</em> (The Tool: passing dependencies via constructor/setter). DI is how we achieve DIP.</div>\r
  </div>\r
  <div class="qa-block">\r
    <div class="qa-q" onclick="toggleQA(this)">How do you spot an Open-Closed Principle (OCP) violation?<span class="arrow">▶</span></div>\r
    <div class="qa-a">A classic sign of an OCP violation is a class filled with a large <code>switch</code> statement or a long chain of <code>if-else if</code> blocks checking the <em>type</em> of an object or an enum (e.g., <code>if (type == Type.ADMIN) ... else if (type == Type.USER)</code>). When a new type is added, you have to modify this existing code. The solution is usually polymorphism.</div>\r
  </div>\r
</div>`,os=Object.freeze(Object.defineProperty({__proto__:null,default:ls},Symbol.toStringTag,{value:"Module"})),rs=`<div id="static-keyword" class="section">
  <div class="breadcrumb">handbook / <span>section 07</span></div>
  <div class="section-eyebrow">The Shared State</div>
  <h1>Static: Class-Level Mechanics</h1>
  <div class="section-desc">The <code>static</code> keyword takes a member out of the instance lifecycle and attaches it to the class itself. We explore the memory implications, the "Hiding" behavior, and the critical execution order of initializers.</div>

  <h2>1. Memory: Where does Static live?</h2>
  <p>Historically, static members lived in the "PermGen." Since Java 8, they live in the <strong>Metaspace</strong> (for metadata) and the <strong>Heap</strong> (for actual static objects). They are loaded when the class is first accessed by the ClassLoader.</p>
  
  <div class="diagram">
[ HEAP ]
   ├─ [ Object 1 ]
   ├─ [ Object 2 ]
   └─ [ Static Field Value ] <── Shared by all objects!

[ METASPACE ]
   └─ [ Class Metadata: Methods, vtable, etc. ]</div>

  <h2>2. The Static Initialization Order (Master Table)</h2>
  <div class="table-wrap"><table>
    <tr><th>Order</th><th>Construct</th><th>Scope</th><th>Frequency</th></tr>
    <tr><td>1</td><td><strong>Static Variables</strong></td><td>Class</td><td>Once</td></tr>
    <tr><td>2</td><td><strong>Static Blocks</strong></td><td>Class</td><td>Once</td></tr>
    <tr><td>3</td><td><strong>Instance Variables</strong></td><td>Instance</td><td>Every 'new'</td></tr>
    <tr><td>4</td><td><strong>Instance Blocks</strong></td><td>Instance</td><td>Every 'new'</td></tr>
    <tr><td>5</td><td><strong>Constructor</strong></td><td>Instance</td><td>Every 'new'</td></tr>
  </table></div>

  <div class="box box-insight">
    <div class="box-title">🚨 Execution Secret</div>
    Static blocks run when the class is loaded, <strong>even if you never create an object</strong>. Instance blocks run right before the constructor but <strong>after</strong> the <code>super()</code> call.
  </div>
  
  <div class="box box-smell">
    <div class="box-title">🤢 Design Smell: Global Mutable State</div>
    Senior developers hate <code>public static</code> variables. Why? Because they represent <strong>Global Mutable State</strong>. If a static variable is changed by Thread A, Thread B instantly sees the corrupted state. It also makes <strong>Unit Testing</strong> impossible because tests running in parallel will overwrite each other's data. If you need shared state, use Dependency Injection to pass a Singleton object.
  </div>

  <h3>Example: Initialization Order</h3>
  <pre><code><span class="kw">public class</span> <span class="cl">InitDemo</span> {
    <span class="kw">static</span> <span class="cl">String</span> s = <span class="fn">print</span>(<span class="str">"1. Static field"</span>);
    <span class="kw">static</span> { <span class="fn">print</span>(<span class="str">"2. Static block"</span>); }

    <span class="cl">String</span> i = <span class="fn">print</span>(<span class="str">"3. Instance field"</span>);
    { <span class="fn">print</span>(<span class="str">"4. Instance block"</span>); }

    <span class="kw">public</span> <span class="cl">InitDemo</span>() { <span class="fn">print</span>(<span class="str">"5. Constructor"</span>); }

    <span class="kw">static</span> <span class="cl">String</span> <span class="fn">print</span>(<span class="cl">String</span> msg) {
        <span class="cl">System</span>.<span class="fn">out</span>.<span class="fn">println</span>(msg);
        <span class="kw">return</span> msg;
    }
}

<span class="cm">// Output when running: new InitDemo()</span>
<span class="cm">// 1. Static field</span>
<span class="cm">// 2. Static block</span>
<span class="cm">// 3. Instance field</span>
<span class="cm">// 4. Instance block</span>
<span class="cm">// 5. Constructor</span>
</code></pre>

  <h2>3. Static Methods: Hiding, not Overriding</h2>
  <p>Static methods use <strong>Early Binding (Static Binding)</strong>. The JVM decides which method to call based on the <strong>Reference Type</strong> at compile time, not the object type at runtime.</p>
  <pre><code><span class="kw">class</span> <span class="cl">Parent</span> { <span class="kw">static void</span> <span class="fn">show</span>() { ... } }
<span class="kw">class</span> <span class="cl">Child</span> <span class="kw">extends</span> <span class="cl">Parent</span> { <span class="kw">static void</span> <span class="fn">show</span>() { ... } }

<span class="cl">Parent</span> p = <span class="kw">new</span> <span class="cl">Child</span>();
p.<span class="fn">show</span>(); <span class="cm">// Calls Parent.show()! This is "Method Hiding."</span></code></pre>

  <h2>4. Static in Interfaces (Java 8+)</h2>
  <div class="box box-lld">
    <div class="box-title">⚙️ LLD Connection: Static Factory Methods</div>
    "Consider static factory methods instead of constructors." (Effective Java Item 1). Static methods in interfaces allow you to create clean factory methods that return specific implementations without exposing the implementation classes.
  </div>
  <pre><code><span class="kw">public interface</span> <span class="cl">DatabaseConnection</span> {
    <span class="kw">void</span> <span class="fn">connect</span>();
    
    <span class="cm">// Factory method hides the concrete classes!</span>
    <span class="kw">static</span> <span class="cl">DatabaseConnection</span> <span class="fn">create</span>(<span class="cl">String</span> url) {
        <span class="kw">if</span> (url.<span class="fn">startsWith</span>(<span class="str">"jdbc:mysql"</span>)) <span class="kw">return new</span> <span class="cl">MySqlConnection</span>();
        <span class="kw">if</span> (url.<span class="fn">startsWith</span>(<span class="str">"jdbc:postgres"</span>)) <span class="kw">return new</span> <span class="cl">PostgresConnection</span>();
        <span class="kw">throw new</span> <span class="cl">IllegalArgumentException</span>(<span class="str">"Unsupported DB"</span>);
    }
}

<span class="cm">// Client Code</span>
<span class="cl">DatabaseConnection</span> conn = <span class="cl">DatabaseConnection</span>.<span class="fn">create</span>(<span class="str">"jdbc:mysql://..."</span>);
</code></pre>

  <h2>5. The "Bill Pugh" Singleton Pattern</h2>
  <p>The most efficient way to implement a Singleton in Java is using a <strong>Static Inner Class</strong>. It provides "Lazy Initialization" and is thread-safe without any <code>synchronized</code> keyword.</p>
  <pre><code><span class="kw">public class</span> <span class="cl">Singleton</span> {
    <span class="kw">private</span> <span class="cl">Singleton</span>() {}
    <span class="kw">private static class</span> <span class="cl">Holder</span> {
        <span class="kw">private static final</span> <span class="cl">Singleton</span> INSTANCE = <span class="kw">new</span> <span class="cl">Singleton</span>();
    }
    <span class="kw">public static</span> <span class="cl">Singleton</span> <span class="fn">getInstance</span>() { return <span class="cl">Holder</span>.INSTANCE; }
}</code></pre>

  <h2>6. Thread Safety and Statics</h2>
  <div class="box box-danger">
    <div class="box-title">🚨 The Shared State Trap</div>
    Since <code>static</code> fields are shared by all threads in the JVM, any modification to a static variable must be <strong>Thread-Safe</strong>.
  </div>
  <pre><code><span class="cm">// BAD — race condition</span>
<span class="kw">public class</span> <span class="cl">Counter</span> {
    <span class="kw">private static int</span> count = <span class="num">0</span>;
    <span class="kw">public static void</span> <span class="fn">increment</span>() { count++; } <span class="cm">// NOT thread-safe!</span>
}

<span class="cm">// GOOD — use AtomicInteger</span>
<span class="kw">public class</span> <span class="cl">SafeCounter</span> {
    <span class="kw">private static final</span> <span class="cl">AtomicInteger</span> count = <span class="kw">new</span> <span class="cl">AtomicInteger</span>(<span class="num">0</span>);
    <span class="kw">public static int</span> <span class="fn">increment</span>() {
        <span class="kw">return</span> count.<span class="fn">incrementAndGet</span>(); <span class="cm">// atomic, thread-safe</span>
    }
}
</code></pre>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 07</div>
    <ul>
      <li><strong>One copy per classloader</strong>, not per instance.</li>
      <li><strong>Early Binding</strong>: Decisions are made at compile time based on the reference type.</li>
      <li><strong>Static blocks</strong> are for complex class-level initialization (e.g., loading native libraries).</li>
      <li><strong>Static Nested Classes</strong> prevent memory leaks by not holding an outer reference.</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 07</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Can we override the 'main' method?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>No.</strong> Since <code>main</code> is static, it can only be <strong>hidden</strong>, not overridden. The JVM will always call the <code>main</code> method of the specific class you provide in the command line.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Why is a static method faster than an instance method?<span class="arrow">▶</span></div>
    <div class="qa-a">Because the JVM doesn't have to perform a vtable lookup (Dynamic Dispatch). It knows the exact address of the static method at compile time. However, with JIT optimizations, the difference is negligible in modern Java.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Are static variables Thread-Safe?<span class="arrow">▶</span></div>
    <div class="qa-a"><strong>No, they are inherently dangerous in multi-threaded environments.</strong> Since there is only one copy of a static variable per classloader, if multiple threads access and modify it simultaneously, you will face race conditions. If you need a global counter, use <code>AtomicInteger</code> or synchronize the access.</div>
  </div>
</div>`,is=Object.freeze(Object.defineProperty({__proto__:null,default:rs},Symbol.toStringTag,{value:"Module"})),ps=`<div id="why-oop-exists" class="section">
  <div class="breadcrumb">handbook / <span>section 01</span></div>
  <div class="section-eyebrow">The Foundations</div>
  <h1>Why OOP Exists: The Architecture of Scale</h1>
  <div class="section-desc">Beyond the "Everything is an Object" cliché. We explore the structural crisis that demanded a new way to think about software, the fundamental shift in data-centric modeling, and why OOP remains the backbone of enterprise engineering.</div>

  <h2>1. The Pre-OOP Crisis: The Maintenance Nightmare</h2>
  <p>In the era of <strong>Procedural Programming</strong> (C, Pascal, BASIC), software was a sequence of instructions acting on shared data. As systems grew, three fatal flaws emerged that made scaling impossible:</p>

  <div class="home-grid">
    <div class="home-card">
      <div class="home-card-icon">🌪️</div>
      <div class="home-card-title">Global State Corruption</div>
      <div class="home-card-desc">Since data was global, any function could modify it. A bug in a 'Printer' module could silently corrupt a 'Payment' record, leading to untraceable crashes.</div>
    </div>
    <div class="home-card">
      <div class="home-card-icon">🖇️</div>
      <div class="home-card-title">Rigid Coupling</div>
      <div class="home-card-desc">Functions depended on the exact memory layout of data. Changing a field name required updating 500+ files. The system was "too fragile to touch."</div>
    </div>
    <div class="home-card">
      <div class="home-card-icon">🧠</div>
      <div class="home-card-title">Cognitive Load</div>
      <div class="home-card-desc">Humans think in entities (User, Order, Car). Procedural code forced us to think in offsets and pointers, creating a massive "mental translation" overhead.</div>
    </div>
  </div>

  <h2>2. Procedure-Centric vs. Data-Centric</h2>
  <div class="box box-smell">
    <div class="box-title">🤢 Design Smell: The Anemic Domain Model</div>
    If your objects are just "bags of getters and setters" (e.g., a User class with 15 fields but zero business logic), and all the logic lives in a massive <code>UserService</code> class, you aren't doing OOP. You are doing Procedural Programming in Java. This anti-pattern is called the <strong>Anemic Domain Model</strong>.
  </div>
  <p>Procedural programming is <strong>Procedure-Centric</strong> (verbs take priority). OOP is <strong>Data-Centric</strong> (nouns take priority). In a procedural world, a 'Save' function knows about Users, Orders, and Products. In OOP, the <code>User</code> knows how to save itself.</p>

  <h2>3. The OOP Mental Model: Entities as Sovereigns</h2>
  <p>OOP flipped the script. Instead of logic acting on data, we created <strong>Objects</strong> that own their data and control their behavior. This shifted the paradigm from "Execution Flow" to "Message Passing."</p>

  <div class="box box-insight">
    <div class="box-title">🏛️ Architect's Tip: The 'Black Box' Principle</div>
    An object should be a black box. You tell it <em>what</em> to do (Message), and it decides <em>how</em> to do it (Method). This isolation is the secret to building systems where 500 developers can work simultaneously without breaking each other's code.
  </div>

  <h2>4. Procedural vs. OOP vs. Functional</h2>
  <div class="table-wrap"><table>
    <tr><th>Feature</th><th>Procedural (C)</th><th>OOP (Java/C++)</th><th>Functional (Haskell/Scala)</th></tr>
    <tr><td><strong>Core Unit</strong></td><td>Function</td><td>Object (State + Behavior)</td><td>Pure Function</td></tr>
    <tr><td><strong>Data Handling</strong></td><td>Global / Shared</td><td>Encapsulated / Hidden</td><td>Immutable / Persistent</td></tr>
    <tr><td><strong>Scaling</strong></td><td>Modular Files</td><td>Classes & Hierarchies</td><td>Composition & Recursion</td></tr>
    <tr><td><strong>State</strong></td><td>Mutable (Dangerous)</td><td>Controlled Mutation</td><td>Avoided (Stateless)</td></tr>
    <tr><td><strong>Paradigm</strong></td><td>Imperative</td><td>Imperative / Declarative</td><td>Declarative</td></tr>
  </table></div>

  <h2>5. The Expression Problem</h2>
  <div class="box box-lld">
    <div class="box-title">⚙️ LLD Connection: The Visitor Pattern</div>
    The Visitor Pattern is the classic OOP workaround for the Expression Problem. It allows you to add new behaviors (operations) to a hierarchy of objects without modifying the classes themselves, effectively giving OOP languages the functional power of "adding behavior easily."
  </div>
  <p>In software engineering, the <strong>Expression Problem</strong> asks: How easy is it to add new data types vs. new behaviors?</p>
  <ul>
    <li><strong>OOP excels at adding new types</strong>: Just create a new subclass. You don't have to touch existing code.</li>
    <li><strong>Functional excels at adding new behaviors</strong>: Just write a new function that acts on existing data. You don't have to touch the data definition.</li>
  </ul>

  <h2>6. Why Java? The "Blue Collar" Language</h2>
  <p>Java wasn't designed to be the most "pure" language; it was designed to be the most <strong>productive</strong> for large teams. It removed the dangerous parts of C++ (pointers, manual memory management) and enforced OOP rules through the compiler.</p>
  
  <ul>
    <li><strong>Strong Typing</strong>: Prevents "Square peg in a round hole" errors at compile time.</li>
    <li><strong>The Metaspace</strong>: Class-level structure is managed by the JVM, not the app.</li>
    <li><strong>Strict Encapsulation</strong>: You can't even print an object without going through its <code>toString()</code> method.</li>
  </ul>

  <div class="box box-danger">
    <div class="box-title">🚨 The "Billion Dollar Mistake": Null</div>
    Tony Hoare, the creator of the null reference, called it his billion-dollar mistake. In pure OOP, an object should always be valid. However, Java allows references to be <code>null</code>. Modern senior devs avoid <code>null</code> at all costs, using <code>Optional<T></code> or <code>@NonNull</code> annotations.
  </div>

  <h2>7. Modern Reality: The Multi-Paradigm Engineer</h2>
  <p>Modern Java is no longer "just" OOP. Since Java 8, it is a hybrid. You use <strong>OOP for the Architecture</strong> (modeling the domain) and <strong>Functional for the Data Flow</strong> (streams, lambdas).</p>

  <div class="compare">
    <div class="compare-col">
      <div class="compare-label compare-bad">❌ Bad: Only OOP (Boilerplate)</div>
      <pre style="font-size:11px;"><code><span class="kw">List</span>&lt;<span class="cl">Integer</span>&gt; results = <span class="kw">new</span> <span class="cl">ArrayList</span>&lt;&gt;();
<span class="kw">for</span>(<span class="cl">Order</span> o : orders) {
    <span class="kw">if</span>(o.<span class="fn">isPaid</span>()) results.<span class="fn">add</span>(o.<span class="fn">amount</span>());
}</code></pre>
    </div>
    <div class="compare-col">
      <div class="compare-label compare-good">✅ Good: OOP + Functional</div>
      <pre style="font-size:11px;"><code><span class="kw">var</span> results = orders.<span class="fn">stream</span>()
    .<span class="fn">filter</span>(<span class="cl">Order</span>::isPaid)
    .<span class="fn">map</span>(<span class="cl">Order</span>::amount)
    .<span class="fn">toList</span>();</code></pre>
    </div>
  </div>

  <div class="takeaways">
    <div class="takeaways-title">Key Takeaways — Section 01</div>
    <ul>
      <li><strong>OOP solves the complexity crisis</strong> of large-scale software.</li>
      <li><strong>State + Behavior</strong> belonging together is the fundamental unit of scaling.</li>
      <li><strong>Java's strictness</strong> is its superpower in enterprise environments.</li>
      <li><strong>Think in Entities</strong>, but process data with <strong>Functional pipelines</strong>.</li>
      <li><strong>Noun-Verb Modeling</strong>: Model the system as nouns (objects) interacting via verbs (methods).</li>
    </ul>
  </div>

  <h2>Interview Deep Dive — Section 01</h2>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">Is OOP always the right choice? (Senior follow-up)<span class="arrow">▶</span></div>
    <div class="qa-a">No. For high-frequency trading or embedded systems where every byte counts, the memory overhead of Object Headers and vtables might be too high. For data-science heavy workloads, Functional or Data-Oriented design is often more efficient. OOP shines where <strong>Business Logic Complexity</strong> is high and <strong>Maintainability</strong> is the priority.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is the "Fragile Base Class" problem?<span class="arrow">▶</span></div>
    <div class="qa-a">A major pitfall of inheritance. If you change a small detail in a parent class, you might unknowingly break 50 subclasses that depend on that specific (sometimes accidental) behavior. This is why senior architects favor <strong>Composition</strong> over Inheritance.</div>
  </div>
  <div class="qa-block">
    <div class="qa-q" onclick="toggleQA(this)">What is the "Expression Problem" in software design?<span class="arrow">▶</span></div>
    <div class="qa-a">The Expression Problem highlights a fundamental trade-off between OOP and Functional Programming (FP). In OOP, it is very easy to add new <strong>types</strong> (classes) without modifying existing code, but hard to add new <strong>behaviors</strong> (methods) across all types. In FP, it's the exact opposite. Modern Java tries to bridge this with features like Sealed Classes and Pattern Matching.</div>
  </div>
</div>`,ds=Object.freeze(Object.defineProperty({__proto__:null,default:ps},Symbol.toStringTag,{value:"Module"})),h={},l=["home","why-oop-exists","classes-objects","constructors","encapsulation","abstraction","inheritance","polymorphism","relationships","access-modifiers","static-keyword","final-keyword","interfaces","abstract-classes","object-class","memory-model","immutability","inner-classes","enums","exception-handling","solid-principles","oop-lld-bridge","oop-design-thinking","interview-qa","cheat-sheets"],g={home:"Home","why-oop-exists":"Why OOP Exists","classes-objects":"Classes & Objects",constructors:"Constructors",encapsulation:"Encapsulation",abstraction:"Abstraction",inheritance:"Inheritance",polymorphism:"Polymorphism",relationships:"Relationships","access-modifiers":"Access Modifiers","static-keyword":"Static Keyword","final-keyword":"Final Keyword",interfaces:"Interfaces","abstract-classes":"Abstract Classes","object-class":"Object Class","memory-model":"Memory Model",immutability:"Immutability","inner-classes":"Inner Classes",enums:"Enums","exception-handling":"Exception Handling","solid-principles":"SOLID Principles","oop-lld-bridge":"OOP → LLD Bridge","oop-design-thinking":"Design Thinking","interview-qa":"Interview Q&A","cheat-sheets":"Quick Review Sheet"};let i="home";const d=Object.assign({"../content/abstract-classes.html":b,"../content/abstraction.html":w,"../content/access-modifiers.html":k,"../content/cheat-sheets.html":x,"../content/classes-objects.html":T,"../content/constructors.html":A,"../content/encapsulation.html":O,"../content/enums.html":D,"../content/exception-handling.html":q,"../content/final-keyword.html":j,"../content/home.html":B,"../content/immutability.html":_,"../content/inheritance.html":J,"../content/inner-classes.html":U,"../content/interfaces.html":z,"../content/interview-qa.html":V,"../content/memory-model.html":Y,"../content/object-class.html":$,"../content/oop-design-thinking.html":Z,"../content/oop-lld-bridge.html":ns,"../content/polymorphism.html":es,"../content/relationships.html":cs,"../content/solid-principles.html":os,"../content/static-keyword.html":is,"../content/why-oop-exists.html":ds});for(const s in d){const a=s.split("/").pop().replace(".html","");h[a]=d[s].default||d[s]}function r(s){const a=document.getElementById("mainContent");let e=document.getElementById(s);if(!e&&h[s]){const n=document.createElement("div");n.innerHTML=h[s],e=n.firstElementChild,a.appendChild(e),hs(e)}document.querySelectorAll(".section").forEach(n=>n.classList.remove("active")),e&&e.classList.add("active"),document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));const t=[...document.querySelectorAll(".nav-item")].find(n=>{var c;return(c=n.getAttribute("onclick"))==null?void 0:c.includes(`'${s}'`)});t&&t.classList.add("active"),i=s,m(),vs(),bs(e),window.scrollTo({top:0,behavior:"smooth"})}function hs(s){s.querySelectorAll("pre").forEach(a=>{const e=document.createElement("button");e.className="copy-btn",e.innerText="Copy",e.onclick=()=>{var n;const t=((n=a.querySelector("code"))==null?void 0:n.innerText)||a.innerText;navigator.clipboard.writeText(t).then(()=>{e.innerText="Copied!",setTimeout(()=>e.innerText="Copy",2e3)})},a.appendChild(e)})}function gs(s){s.classList.toggle("open"),s.nextElementSibling.classList.toggle("open")}const p=document.getElementById("themeToggle");if(p){const s=p.querySelector("i"),a=document.body,e=localStorage.getItem("theme")||"dark";a.setAttribute("data-theme",e),s&&u(s,e),p.addEventListener("click",()=>{const n=a.getAttribute("data-theme")==="dark"?"light":"dark";a.setAttribute("data-theme",n),localStorage.setItem("theme",n),s&&u(s,n)})}function u(s,a){const e=p.querySelector("span");a==="dark"?(s.className="ri-moon-line",e&&(e.textContent="Dark Mode")):(s.className="ri-sun-line",e&&(e.textContent="Light Mode"))}function us(s){document.querySelectorAll(".nav-item").forEach(e=>{const t=e.textContent.toLowerCase(),n=s.toLowerCase();e.style.display=s===""||t.includes(n)?"":"none"})}function ms(){window.addEventListener("scroll",()=>{const s=document.documentElement,a=s.scrollTop||document.body.scrollTop,e=s.scrollHeight-s.clientHeight,t=document.getElementById("progress");t&&(t.style.width=(e>0?a/e*100:0)+"%");const n=document.getElementById("scrollTopBtn");n&&n.classList.toggle("visible",a>400)},{passive:!0})}function vs(){const s=l.indexOf(i),a=s>0?l[s-1]:null,e=s<l.length-1?l[s+1]:null,t=document.getElementById("bottomNav");if(!t)return;const n=t.querySelector(".bottom-nav-prev");a?(n.classList.remove("hidden"),n.querySelector(".bottom-nav-label").textContent=g[a]||a,n.onclick=()=>r(a)):n.classList.add("hidden");const c=t.querySelector(".bottom-nav-next");e?(c.classList.remove("hidden"),c.querySelector(".bottom-nav-label").textContent=g[e]||e,c.onclick=()=>r(e)):c.classList.add("hidden");const o=t.querySelector(".bottom-nav-counter");o&&(o.textContent=`${s+1} / ${l.length}`),t.classList.toggle("hidden",i==="home")}function bs(s){const a=document.getElementById("readingTime");if(!a)return;if(!s||i==="home"){a.classList.add("hidden");return}a.classList.remove("hidden");const t=(s.innerText||"").split(/\s+/).length,n=Math.max(1,Math.round(t/200));a.textContent=`☕ ${n} min read`}function fs(){document.addEventListener("keydown",s=>{if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA")return;const a=l.indexOf(i);(s.key==="ArrowRight"||s.key==="ArrowDown")&&(s.preventDefault(),a<l.length-1&&r(l[a+1])),(s.key==="ArrowLeft"||s.key==="ArrowUp")&&(s.preventDefault(),a>0&&r(l[a-1]))})}function ws(){window.scrollTo({top:0,behavior:"smooth"})}function ys(){document.getElementById("sidebar").classList.toggle("sidebar-open"),document.getElementById("sidebarOverlay").classList.toggle("visible")}function m(){document.getElementById("sidebar").classList.remove("sidebar-open"),document.getElementById("sidebarOverlay").classList.remove("visible")}window.showSection=r;window.toggleQA=gs;window.filterNav=us;window.scrollToTop=ws;window.toggleSidebar=ys;window.closeSidebar=m;document.addEventListener("DOMContentLoaded",()=>{try{ms(),fs(),document.getElementById("mainContent")||console.error("CRITICAL: mainContent container missing"),r("home");const s=localStorage.getItem("theme")||"dark";document.body.setAttribute("data-theme",s)}catch(s){console.error("Boot error:",s)}});
