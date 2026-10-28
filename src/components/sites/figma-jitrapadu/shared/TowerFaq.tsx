"use client";

import { useId, useState } from "react";
import {usePublishedContent} from "./PublishedContentProvider";
import { FigmaIcon } from "./FigmaIcon";

const questions = [
  {
    question: "What types of telecommunication towers does Jitrapadu provide?",
    answer: "We provide angular towers, 3-legged towers, 4-legged towers, monopoles, rooftop unipoles, guyed masts and customised tower structures.",
  },
  {
    question: "What height range is available for angular towers?",
    answer: "Angular towers range from 30m to 120m, in 3-legged and 4-legged configurations with light, medium and heavy-duty classifications.",
  },
  {
    question: "How many operators can a monopole support?",
    answer: "Capacity is tailored to telco-sharing requirements. Our projects include a 36m monopole for five telco sharers.",
  },
  {
    question: "Are the towers fabricated in-house?",
    answer: "Yes. Approved designs are fabricated at our Klang facility, where steel components are cut, formed, welded and prepared for finishing.",
  },
  {
    question: "What standards do your structures follow?",
    answer: "Structures are designed to applicable structural standards, based on the required height, loading category and telco-sharing capacity.",
  },
];

export function TowerFaq({ items }: { items?: { question: string; answer: string }[] }) {
  const content=usePublishedContent();
  const displayQuestions=items ?? (content.faqs.length?content.faqs:questions);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="tower-faq-list relative flex w-full shrink-0 flex-col items-start md:w-[1053px]" data-node-id="92:449">
      {displayQuestions.map(({ question, answer }, index) => {
        const open = openIndex === index;
        const questionId = `${id}-question-${index}`;
        const answerId = `${id}-answer-${index}`;

        return (
          <div
            key={question}
            data-open={open}
            className={`tower-faq-row flex w-full flex-col gap-0 border-b border-solid border-[#c5ced8] p-[24px] font-sans md:p-[40px] ${open ? "rounded-[16px] bg-[#007cf8] text-white" : "text-[#102033]"}`}
          >
            <h3 className="w-full">
              <button
                type="button"
                id={questionId}
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full cursor-pointer items-center gap-[10px] text-left text-[18px] leading-[26px] font-semibold tracking-[-0.3px] focus-visible:outline-2 focus-visible:outline-offset-4 md:text-[24px] md:leading-[32px]"
              >
                <span className="min-w-0 flex-1">{question}</span>
                <FigmaIcon name="arrow-down" className={`tower-faq-arrow shrink-0 ${open ? "text-[#e8f3ff]" : ""}`} />
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              aria-hidden={!open}
              inert={!open}
              className={`tower-faq-panel w-full ${open ? "is-open" : ""}`}
            >
              <div className="tower-faq-panel-inner">
                <p className="tower-faq-answer w-full text-[16px] leading-[26px] font-normal md:text-[18px] md:leading-[30px]">{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
