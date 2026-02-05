"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getAIRecommendation } from "@/actions/server/ai";

const steps = [
  {
    id: "need",
    title: "Who needs care?",
    options: [
      { id: "baby", label: "Baby / Child", icon: "👶" },
      { id: "elderly", label: "Elderly Parent", icon: "👵" },
      { id: "adult", label: "Adult / Relative", icon: "🧍" },
    ],
  },
  {
    id: "timing",
    title: "When is care needed?",
    options: [
      { id: "daytime", label: "Regular Daytime", icon: "☀️" },
      { id: "overnight", label: "Overnight Support", icon: "🌙" },
      { id: "respite", label: "Short-term Break", icon: "☕" },
    ],
  },
  {
    id: "specificity",
    title: "Any specific focus?",
    options: [
      { id: "general", label: "General Care", icon: "✨" },
      { id: "newborn", label: "Newborn Support", icon: "🍾" },
      { id: "special", label: "Special Needs", icon: "🧩" },
      { id: "recovery", label: "Post-Surgery / Recovery", icon: "🏥" },
    ],
  },
  {
    id: "style",
    title: "Desired personality style?",
    options: [
      { id: "quiet", label: "Quiet / Calm", icon: "🤫" },
      { id: "active", label: "Active / Playful", icon: "🏃" },
      { id: "social", label: "Social / Talkative", icon: "💬" },
    ],
  },
];

export default function FindMatchWizard({ services }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = async (stepId, optionId) => {
    const newSelections = { ...selections, [stepId]: optionId };
    setSelections(newSelections);

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await getRecommendation(newSelections);
    }
  };

  const calculateFallback = (s) => {
    // Scoring system per service
    const scores = {
      "respite-care": 0,
      "companion-care": 0,
      "overnight-care": 0,
      "special-needs-care": 0,
      "post-surgery-care": 0,
      "newborn-support": 0,
      "sick-care": 0,
      "elderly-care": 0,
      "baby-care": 0,
    };

    // Step 1: Who?
    if (s.need === "baby") {
      scores["baby-care"] += 10;
      scores["newborn-support"] += 5;
    } else if (s.need === "elderly") {
      scores["elderly-care"] += 10;
      scores["companion-care"] += 5;
    } else if (s.need === "adult") {
      scores["sick-care"] += 10;
      scores["post-surgery-care"] += 5;
    }

    // Step 2: Timing?
    if (s.timing === "respite") scores["respite-care"] += 20; // High priority for Respite
    if (s.timing === "overnight") scores["overnight-care"] += 20;

    // Step 3: Specificity?
    if (s.specificity === "newborn") scores["newborn-support"] += 15;
    if (s.specificity === "special") scores["special-needs-care"] += 20;
    if (s.specificity === "recovery") scores["post-surgery-care"] += 15;

    // Step 4: Style?
    if (s.style === "social") scores["companion-care"] += 10;

    // Tie-breakers and refine
    if (s.need === "baby" && s.specificity === "newborn") scores["newborn-support"] += 10;
    if (s.need === "adult" && s.specificity === "recovery") scores["post-surgery-care"] += 10;

    // Find highest score
    let bestSlug = "baby-care";
    let highestScore = -1;

    for (const slug in scores) {
      if (scores[slug] > highestScore) {
        highestScore = scores[slug];
        bestSlug = slug;
      }
    }

    return services.find((sv) => sv.slug === bestSlug) || services[0];
  };

  const getRecommendation = async (finalSelections) => {
    setIsThinking(true);
    setError(null);

    try {
      const result = await getAIRecommendation(finalSelections, services);
      setRecommendation(result);
    } catch (err) {
      console.error("AI Match Error:", err);
      setError("AI service unavailable. Using high-accuracy matching algorithm.");
      setRecommendation(calculateFallback(finalSelections));
    } finally {
      setIsThinking(false);
    }
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setSelections({});
    setRecommendation(null);
    setIsThinking(false);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 min-h-[500px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!isThinking && !recommendation && (
          <motion.div
            key={steps[currentStep].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-600)">
                Question {currentStep + 1} of {steps.length}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-(--color-text-main)">
                {steps[currentStep].title}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps[currentStep].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(steps[currentStep].id, option.id)}
                  className="group relative rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-6 hover:border-(--color-primary-500) hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                  <h3 className="font-semibold text-(--color-text-main)">
                    {option.label}
                  </h3>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-sm font-medium text-(--color-text-soft) hover:text-(--color-primary-600) transition-colors"
              >
                ← Go back
              </button>
            )}
          </motion.div>
        )}

        {isThinking && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
            <h2 className="text-xl font-semibold text-(--color-text-main) animate-pulse">
              Matching your requirements...
            </h2>
          </motion.div>
        )}

        {!isThinking && recommendation && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 p-8 rounded-3xl border border-(--color-border-subtle) bg-(--color-surface) shadow-2xl"
          >
            <div className="space-y-2 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-(--color-success-100) text-3xl mb-4">
                ✨
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-(--color-success-600)">
                Perfect Match Found!
              </h2>
              <h1 className="text-3xl font-bold text-(--color-text-main)">
                {recommendation.name}
              </h1>
            </div>

            {error && (
              <div className="p-3 text-xs bg-(--color-error-50) text-(--color-error-600) rounded-lg border border-(--color-error-100)">
                ⚠️ {error}
              </div>
            )}

            <div className="p-6 bg-(--color-bg-soft) rounded-2xl border border-(--color-border-subtle) space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{recommendation.icon}</div>
                <div>
                  <h3 className="font-bold text-xl text-(--color-text-main)">{recommendation.name}</h3>
                  <p className="text-xs text-(--color-primary-600) font-medium">{recommendation.label}</p>
                </div>
              </div>

              <p className="text-sm text-(--color-text-muted) leading-relaxed">
                {recommendation.descriptions?.short || recommendation.descriptions?.tagline}
              </p>

              <div className="flex flex-wrap gap-4 text-[11px] font-medium text-(--color-text-soft) pt-2">
                <span>✅ Quality Assured</span>
                <span>💰 {recommendation.pricing?.baseRate} {recommendation.pricing?.currency}/hr</span>
                <span>📋 Instant Booking</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href={`/booking/${recommendation.slug}`}
                className="btn btn-primary px-8 rounded-xl"
              >
                Book This Service
              </Link>
              <button
                onClick={resetWizard}
                className="btn btn-ghost"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
