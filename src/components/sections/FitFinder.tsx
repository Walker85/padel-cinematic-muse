import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface FitResult {
  racketType: string;
  description: string;
  recommendation: string;
}

const FitFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<FitResult | null>(null);

  const questions = [
    {
      question: "What's your playing style?",
      options: [
        "Aggressive power player",
        "Control and precision",
        "Balanced all-around",
        "Defensive retrieval"
      ]
    },
    {
      question: "How long have you been playing padel?",
      options: [
        "Just starting out (0-6 months)",
        "Beginner (6-12 months)",
        "Intermediate (1-3 years)",
        "Advanced (3+ years)"
      ]
    },
    {
      question: "What's your primary concern?",
      options: [
        "Power and speed",
        "Control and accuracy",
        "Comfort and feel",
        "Durability and value"
      ]
    }
  ];

  const racketTypes = [
    {
      name: "Pro Carbon",
      description: "Maximum power and control for aggressive players",
      recommendation: "Perfect for advanced players who prioritize power and precision."
    },
    {
      name: "Classic Elite",
      description: "Balanced performance for all playing styles",
      recommendation: "Ideal for intermediate players seeking versatile performance."
    },
    {
      name: "Comfort Pro",
      description: "Comfortable and forgiving for developing players",
      recommendation: "Great for beginners focusing on technique and comfort."
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    const newAnswers = [...answers, selectedIndex];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result based on answers
      const avgAnswer = newAnswers.reduce((a, b) => a + b, 0) / newAnswers.length;
      const racketIndex = Math.floor(avgAnswer / 2) % racketTypes.length;
      const selected = racketTypes[racketIndex];
      setResult({
        racketType: selected.name,
        description: selected.description,
        recommendation: selected.recommendation
      });
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-foreground">
            Find Your Perfect Fit
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Answer a few simple questions to discover the Padel Ready racket that matches your playing style.
          </p>
        </div>

        {!result && (
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-body text-muted-foreground mb-2">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="font-display text-2xl md:text-3xl mb-8 text-foreground">
              {questions[currentStep].question}
            </h3>

            {/* Options */}
            <div className="space-y-4">
              {questions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-6 border-2 border-border rounded-xl hover:border-primary transition-all duration-300 group hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-lg group-hover:text-primary transition-colors">
                      {option}
                    </span>
                    <div className="w-6 h-6 rounded-full border-2 border-border group-hover:border-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            {/* Back Button */}
            {currentStep > 0 && (
              <button
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setAnswers(answers.slice(0, -1));
                }}
                className="mt-8 font-body text-muted-foreground hover:text-primary transition-colors"
              >
                ← Previous
              </button>
            )}
          </div>
        )}

        {result && (
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg animate-fade-in">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-display text-3xl md:text-4xl uppercase mb-2 text-foreground">
                Your Perfect Match
              </h3>
            </div>

            <div className="text-center mb-8">
              <h4 className="font-display text-2xl md:text-3xl text-primary mb-4">
                {result.racketType}
              </h4>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <p className="font-body text-base leading-relaxed text-foreground">
                {result.recommendation}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-8 py-4 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-display uppercase text-sm tracking-wider transition-all duration-300"
              >
                Start Over
              </button>
              <button className="px-8 py-4 bg-primary text-foreground hover:bg-primary/90 font-display uppercase text-sm tracking-wider transition-all duration-300 shadow-lg">
                Shop Collection
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FitFinder;
