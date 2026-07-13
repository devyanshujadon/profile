import React from "react";

const lines = [
  ["Languages", "JavaScript, TypeScript, Python, Go"],
  ["AI", "LLMs, LangChain, LangGraph, RAG, TensorFlow, PyTorch"],
  ["Infrastructure", "PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS"],
  ["Frameworks", "FastAPI, Next.js, Node.js, Flask, Pydantic, SQLAlchemy"],
];

const TechStack = () => {
  return (
    <section id="tools" className="scroll-mt-8 py-14 md:py-16 border-t border-line">
      <p className="label mb-8">Tools</p>

      <dl className="surface-card divide-y divide-[var(--color-line)] overflow-hidden">
        {lines.map(([title, items]) => (
          <div
            key={title}
            className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-1 sm:gap-6 px-5 sm:px-6 py-4"
          >
            <dt className="text-sm text-ink-3 sm:pt-0.5 font-medium">{title}</dt>
            <dd className="text-ink-2 leading-relaxed text-[0.95rem]">{items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TechStack;
