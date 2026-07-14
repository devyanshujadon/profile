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

      <dl className="space-y-5">
        {lines.map(([title, items]) => (
          <div
            key={title}
            className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6"
          >
            <dt className="text-sm text-ink-3 sm:pt-0.5">{title}</dt>
            <dd className="text-[0.95rem] text-ink-2 leading-relaxed">
              {items}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TechStack;
