"use client";

import { Button, Stepper, Text } from "@mantine/core";
import { useCallback, useState, type FC } from "react";

import { CitySelect } from "@/modules/cities";
import { TopicSelect } from "@/modules/topics";
import type { TCity } from "@/modules/cities/types";
import type { TTopic } from "@/modules/topics/types";

enum EStep {
  City = 0,
  Topic = 1,
  Recommendations = 2,
}

type TRecommendationsProps = {
  className?: string;
};

export const Recommendations: FC<TRecommendationsProps> = ({ className }) => {
  const [activeStep, setActiveStep] = useState<EStep>(EStep.City);
  const [maxStep, setMaxStep] = useState<EStep>(activeStep);

  const [selectedCity, setSelectedCity] = useState<TCity>();
  const [selectedTopic, setSelectedTopic] = useState<TTopic>();

  const handleChangeStep = useCallback((nextStep: number) => {
    setActiveStep(nextStep);
    setMaxStep((value) => Math.max(value, nextStep));
  }, []);

  const handleClickNext = useCallback(() => {
    handleChangeStep(activeStep + 1);
  }, [activeStep, handleChangeStep]);

  const getAllowStepSelect = useCallback(
    (step: EStep) => step !== activeStep && step <= maxStep,
    [activeStep, maxStep],
  );

  return (
    <Stepper active={activeStep} onStepClick={setActiveStep} className={className}>
      <Stepper.Step
        label="Step 1"
        description="Select city"
        allowStepSelect={getAllowStepSelect(EStep.City)}
      >
        <div className="flex flex-col gap-6 py-12">
          <CitySelect initialValue={selectedCity} onChange={setSelectedCity} />
          <Button
            fullWidth
            size="md"
            variant="filled"
            disabled={!selectedCity}
            onClick={handleClickNext}
          >
            Next
          </Button>
        </div>
      </Stepper.Step>

      <Stepper.Step
        label="Step 2"
        description="Choose topic"
        allowStepSelect={getAllowStepSelect(EStep.Topic)}
      >
        <div className="flex flex-col gap-6 py-12">
          <TopicSelect initialValue={selectedTopic} onChange={setSelectedTopic} />
          <Button
            fullWidth
            size="md"
            variant="filled"
            disabled={!selectedTopic}
            onClick={handleClickNext}
          >
            Next
          </Button>
        </div>
      </Stepper.Step>

      <Stepper.Step
        label="🎉 You're all set!"
        description="Get personalized recommendations"
        allowStepSelect={getAllowStepSelect(EStep.Recommendations)}
      >
        <div className="flex flex-col gap-6 py-12">
          <Text>AI Recommendations...</Text>
        </div>
      </Stepper.Step>
    </Stepper>
  );
};
